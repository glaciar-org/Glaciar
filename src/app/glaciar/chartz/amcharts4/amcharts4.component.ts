import { Component, Input, OnInit, NgZone, AfterViewInit, SimpleChanges, OnChanges, OnDestroy } from '@angular/core'

import { Subscription } from 'rxjs/Subscription'
import { ChartConfig, DomainModel, Outlier, Umbral, KEY } from '../../model/domainmodel'
import { DataService } from '../../services/data.service'
import { MessageService } from '../../services/message.service'
import { GlaciarStorageService } from '../../services/glaciar-storage.service'
import { DateFormatPipe } from '../../components/pipe/date-format-pipe'
import { TextTransfPipe } from '../../components/pipe/text-transf-pipe'
import { ST }  from '../../model/domainmodel'

import * as ch4 from './amcharts4.libs'
import * as chx from '../chartz.libs'
import * as Global from '../../model/global'
import * as moment from 'moment'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'

import am4lang_en_US from '@amcharts/amcharts4/lang/en_US'
import am4lang_es_ES from '@amcharts/amcharts4/lang/es_ES'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import am4themes_frozen from '@amcharts/amcharts4/themes/frozen'
import { ActivatedRoute } from '@angular/router'
import { saveAs } from 'file-saver/FileSaver'

am4core.useTheme(am4themes_frozen)
am4core.useTheme(am4themes_animated)

@Component({
  selector: 'gcr-amcharts4',
  templateUrl: './amcharts4.component.html',
  styleUrls: ['./amcharts4.component.scss']
})
export class Amcharts4Component implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  @Input() dataset_id: Global.DS
  @Input() quality_id: Global.QUALITY_TAB
  @Input() param_id: Global.VAR
  @Input() selector: KEY.PARAM_DS05
  @Input() dateFilter: DomainModel.DateFilter
  @Input() dateRange: DomainModel.DateRange
  @Input() seed: string  // seedReload

  viewHelper = {
    isDS05: false,
    sectorSelected  : KEY.PARAM_DS05.SECTOR_Electricity,
    countrySelected : KEY.PARAM_DS05.COUNTRY_Argentina,
  }

  param_menu_tabs: any

  firstDate
  lastDate

  UMBRALES  : Array<Umbral>
  OUTLIER_PARAM : Outlier

  subLabModeParams: Subscription

  subActions: Subscription
  subObjects: Subscription
  chartConfig: ChartConfig.Options

  setup: string

  private chart:       am4charts.XYChart
  private dateAxis:    am4charts.DateAxis
  private cursor:      am4charts.XYCursor
  private scrollbarY:  am4core.Scrollbar
  private valueAxis:   am4charts.ValueAxis   // NEW!  const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
  private series:      Array<am4charts.LineSeries>   // NEW!

  private axisRange_min;
  private axisRange_avg;
  private axisRange_max;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private messageService: MessageService,
    private glaciarStorage: GlaciarStorageService,
 //   private spinner: NgxSpinnerService,
    private zone: NgZone) {


    this.series = new Array<am4charts.LineSeries>()

    if (Global.isLabMode()) {
        console.debug(`Amcharts4Component::LabMode Enabled`)
        console.debug(`Amcharts4Component::LabMode context =  d/${this.dataset_id}/q/${this.quality_id}/p/${this.param_id}/ `)


        // --[ Buenos Aires ]----
        // this.dataset_id = Global.DS.DS01
        // this.quality_id = Global.QUALITY_TAB.AIRQ
        // this.param_id   = Global.VAR.CO
        // this.seed       = '3344'

        // this.dateFilter = new DomainModel.DateFilter()
        // this.dateFilter.from = new Date('2018-07-01T00:00:00.000Z')
        // this.dateFilter.to   = new Date('2018-12-24T00:00:00.000Z')


        // // --[ Bahia Blanca ]----
        // this.dataset_id = Global.DS.DS02
        // this.quality_id = Global.QUALITY_TAB.AIRQ
        // this.param_id   = Global.VAR.CO

        // this.dateFilter = new DomainModel.DateFilter()
        // this.dateFilter.from = new Date('2015-12-15T00:00:00.000Z')
        // this.dateFilter.to   = new Date('2015-12-20T00:00:00.000Z')


        // // --[ Bahia Blanca ]---- 
        // this.dataset_id = Global.DS.DS02
        // this.quality_id = Global.QUALITY_TAB.AIRQ
        // this.param_id   = Global.VAR.NO

        // this.dateFilter = new DomainModel.DateFilter()
        // this.dateFilter.from = new Date('2010-08-01T00:00:00.000Z')
        // this.dateFilter.to   = new Date('2010-08-10T00:00:00.000Z')


        // --[ Charles River ]----
        this.dataset_id = Global.DS.DS03
        this.quality_id = Global.QUALITY_TAB.WATERQ
        this.param_id   = Global.VAR.Temp
        this.seed       = '3344'

        this.dateFilter = new DomainModel.DateFilter()
        this.dateFilter.from = new Date('2015-10-01T13:00:00.000Z')
        this.dateFilter.to   = new Date('2015-12-31T23:00:00.000Z')

    }
  }


  ngOnInit() {
    console.debug(`Amcharts4Component::ngOnInit() `)
    console.debug(`Amcharts4Component::ngOnInit() context =  d/${this.dataset_id}/q/${this.quality_id}/p/${this.param_id}/ `)

    if (Global.isLabMode()) {
      this.subLabModeParams = this.route.params.subscribe(params => {
        this.dataset_id = params['dataset_id']
        this.quality_id = params['quality_id']
        this.param_id   = params['param_id']
        this.selector   = params['selector']
      })
    }

    console.debug(`Amcharts4Component::ngOnInit() context =  d/${this.dataset_id}/q/${this.quality_id}/p/${this.param_id}/ `)

    this.setupViewHelper()

    this.param_menu_tabs = (Global.isDS05(this.dataset_id))
                         ? chx.getMenuTabs_DS05(this.viewHelper, this.selector)
                         : chx.getMenuTabs(this.dataService, this.dataset_id, this.param_id)

    this.chartConfig = this.dataService.getChartConfigDefautl(this.quality_id)

    this.subActions = this.messageService.getAction().subscribe(
      (obj: ChartConfig.Options) => {
        console.debug(`Amcharts4Component:[sin friccion]:subscribe Acction() obj ::  ${JSON.stringify(obj)}`)
   
        this.chartConfig = obj

        // OK!
        this.doActionSetup_labelY()
        this.doActionSetup_umbral_min()
        this.doActionSetup_umbral_avg()
        this.doActionSetup_umbral_max()
        this.doActionSetup_scrollbarY()

        // WIP
        this.doActionSetup_serie_tipo_area()
        this.doActionSetup_cursor()

      }
    )

    this.subObjects = this.messageService.getObject().subscribe(
      (obj: ChartConfig.Options) => {
        console.debug(`Amcharts4Component:[<<--Friccion]:subscribe() obj ::  ${JSON.stringify(obj)}`)

        this.chartConfig = obj

        // SETEAR UMBRALES & OUTLIER_PARAM ...
        this.UMBRALES = this.glaciarStorage.getUmbrales(Global.getQuality(this.param_id), this.chartConfig.awq_estandar)
        this.OUTLIER_PARAM = this.getOutlierParam(this.param_id)

        this.chart.validate()
      }
    )
  }

  getOutlierParam(param: Global.VAR): Outlier {
    if (this.chartConfig === undefined) {
        this.chartConfig = this.dataService.getChartConfigDefautl(this.quality_id)
    }
    // if (this.chartConfig.outliers === undefined) {
    // La verdad ... es que me conviene tener un buen setup ... al inicio para cargar todo ok y ahorrarme esta clase de if que son propensos a errores .... 
      //  ... y esto lo podrìa lograr directamente persistiendo a chartConfig al inicio  
        this.chartConfig.outliers = this.glaciarStorage.getOutliers(this.quality_id)
    // }
    return this.chartConfig.outliers.filter(e => e.var === param)[0]
  }

  ngAfterViewInit() {

    this.loadTheData_And_DrawAmChart4 ('ngAfterViewInit')

  }

  ngOnChanges(changes: SimpleChanges) {
    console.debug(`Amcharts4Component::ngOnChanges(changes=${JSON.stringify(changes)})`)

    console.debug(`Amcharts4Component ::  ${ JSON.stringify(this.chartConfig)} `)

    this.setupViewHelper()
    
    this.loadTheData_And_DrawAmChart4('ngOnChanges')
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
          this.chart.dispose()
      }
    })

    this.subObjects.unsubscribe()

    // if (Global.isLabMode()) {
    //     this.subLabModeParams.unsubscribe()
    // }
  }



  loadTheData_And_DrawAmChart4 (src: string) {

    console.debug(`Amcharts4Component::loadTheData_And_DrawAmChart4(src=${src}) context = ` + chx.getContext(this.dataset_id, this.quality_id, this.param_id, this.dateFilter, this.dateRange))

    const AWQ = (this.quality_id === Global.QUALITY_TAB.AIRQ) ? ST.AWQ.REF_BIB_AIRQ : ST.AWQ.REF_BIB

    this.OUTLIER_PARAM = this.getOutlierParam(this.param_id)

    // this.spinner.show()

    this.setup = ch4.SETUP5

    let customParam = new DomainModel.CustomParams()

    console.debug(`Amcharts4Component::selector=${this.selector}`)

    if (Global.isDS05(this.dataset_id)) {

      customParam.country = this.viewHelper.countrySelected 
      customParam.sector  = this.viewHelper.sectorSelected  

      this.param_menu_tabs = chx.getMenuTabs_DS05(this.viewHelper, this.selector)

    } else {

      this.param_menu_tabs = chx.getMenuTabs(this.dataService, this.dataset_id, this.param_id)

    }

    this
      .dataService
      .getBackendDataByType(this.dataset_id, this.quality_id, this.param_id, 
                            this.dateFilter, ch4.getTypeDataResponse(this.setup), customParam)
      .subscribe((ndata: any) => {

        // this.setNewData(ndata)

        console.info(`GET getBackendDataByType : ` + chx.getContext(this.dataset_id, this.quality_id, this.param_id, this.dateFilter, this.dateRange))

        // console.debug('RTA getBackendDataByType : ' + JSON.stringify(ndata))

        console.table(ndata[0])


        /// -------------------

        this.zone.runOutsideAngular(() => {
          // this.chart = this.demoAmChart4(SETUP3, ndata)
          // this.chart = this.demoAmChart4(SETUP4, ndata)
          this.chart = this.demoAmChart4(this.setup, ndata)
        })

        /// -------------------

        // this.spinner.hide()
    })

    console.debug(`Amcharts4Component::loadTheData_And_DrawAmChart4 - fin`)

  }



  addSerieToChart_SETUP5(chart, i: number, nseries): am4charts.LineSeries {

    const seriesId = i

    // console.debug(chart.data)

    // Create series
    const serie = chart.series.push(new am4charts.LineSeries())

    // Set the serie globally!
    this.series.push(serie)

    serie.dataFields.valueY = 'value' + seriesId
    serie.dataFields.dateX = 'date'
    serie.name = Global.getLabelEstacion(nseries.series[i].dataset, this.selector, this.param_id) // 'Serie #' + seriesId
    serie.strokeWidth = 2
    serie.tensionX = 0.85
    this.doActionSetup_serie_tipo_area()
    
    // serie.fillOpacity = (this.chartConfig.serie_tipo_area) ? 0.2 : 0
    

    // serie.stacked = true
    serie.minBulletDistance = 30
    serie.connect = this.chartConfig.serie_connect

    const bullet = serie.bullets.push(new am4charts.CircleBullet())
    bullet.circle.strokeWidth = 2
    bullet.circle.radius = 4
    bullet.circle.fill = am4core.color('#fff')



    if (this.chartConfig.serie_tooltip) {

      const esMultiples = nseries.series.length > 1

      // if (i === (nseries.series.length - 1) ) {
        if (i === (0) ) {

          serie.tooltipText = chx.tooltipText(esMultiples, this.param_id)
          serie.tooltip.y = -115
          serie.tooltip.x  = 60
      }
    }

    let scale  = (v) => (v === ChartConfig.NIL_Command.NIL_ONLY) ? 6 : 1.8

    const bullethover = bullet.states.create('hover')
    bullethover.properties.scale = scale(this.chartConfig.nil_action)

    chart.invalidateData()

    return serie

  }

  /**
   * Esta demo tiene escala Hora Minutos
   */
  demoAmChart4(setup: string, ndata: any) {
    console.debug(`Amcharts4Component::demoAmChart4(${setup})`)

    const chart = am4core.create('chartdiv', am4charts.XYChart)

    this.chart = chart // Globally!

    if (setup === ch4.SETUP4) {
        ch4.doChart_SETUP4(chart, ndata)
    }

    if (setup === ch4.SETUP5) {

      chart.language.locale = am4lang_es_ES

      // if (Global.isHost_Local()) {
      //   ndata.data = chx.getMockData_DS02_original()
      //   ndata.data = chx.getMockData_DS02_Un_DIA_VACIO()
      // }

      // --[utiles ini]---
      let nil_only    = (v) =>  v === ChartConfig.NIL_Command.NIL_ONLY
      let nil_discard = (v) => (v === ChartConfig.NIL_Command.DISCARD)


      let outlier_only    = (v) =>  v === ChartConfig.OUTLIER_Command.OUTLIER_ONLY
      let outlier_discard = (v) => (v === ChartConfig.OUTLIER_Command.DISCARD)

      let isOutlier = (v): boolean => {
          let isOut = false 
          if (this.OUTLIER_PARAM !== undefined) {
              isOut = v< this.OUTLIER_PARAM.min ||  v > this.OUTLIER_PARAM.max
          }
          return isOut
      }
       // --[utiles fin]---

      if (nil_discard(this.chartConfig.nil_action)) {
          ndata.data = ndata.data.map(e =>(e.value0 !== "") ? e : { date: e.date } )
      }

      if (nil_only(this.chartConfig.nil_action)) {
          ndata.data = ndata.data.map(e =>(e.value0 === "") ? e : { date: e.date } )
      }

      //--------------
      if (outlier_discard(this.chartConfig.outliers_action)) {
          ndata.data = ndata.data.map(e =>(!isOutlier(e.value0)) ? e : { date: e.date } )
      }

      if (outlier_only(this.chartConfig.outliers_action)) {
          ndata.data = ndata.data.map(e =>(isOutlier(e.value0)) ? e : { date: e.date } )
      }

      chart.data = ndata.data

      chart.dateFormatter.inputDateFormat = 'yyyy-MM-ddTHH:mm:ss'
      chart.dateFormatter.dateFormat      = 'yyyy-MM-dd HH:mm'

      const dateAxis = chart.xAxes.push(new am4charts.DateAxis())
      dateAxis.renderer.minGridDistance = 50
      dateAxis.renderer.grid.template.location = 0.5
      dateAxis.startLocation = 0.5
      dateAxis.endLocation = 0.5
      dateAxis.renderer.minGridDistance = 50

      // // ??
      // dateAxis.baseInterval = {
      //   count: 1,
      //   timeUnit: "hour"   // Type "millisecond" | "second" | "minute" | "hour" | "day" | "week" | "month" | "year"
      // }


      this.dateAxis = dateAxis

      /* Create value axis */
      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())

      /* Set the value axis Globally! */
      this.valueAxis  = valueAxis

      this.doActionSetup_labelY()

      if (this.chartConfig) {

        if (this.quality_id === Global.QUALITY_TAB.WATERQ) {
            // Pad values by 20%
            valueAxis.extraMin = 0.2
            valueAxis.extraMax = 0.2
        }

        this.doActionSetup_SUPER_umbral()
      }

      // --> Sospecha de Antiperformante:
      dateAxis.renderer.labels.template.adapter.add('rotation', function (rotation, target) {
          const dataItem = target.dataItem

          if (dateAxis['_gridInterval'].timeUnit === 'hour' ||
              dateAxis['_gridInterval'].timeUnit === 'minute' ) {
              target.verticalCenter = 'middle'
              target.horizontalCenter = 'left'
              return 315
          } else {
              return 0
          }
      })


      // Pablo: Remove grid
      // valueAxis.renderer.grid.template.disabled = true;
      // dateAxis.renderer.grid.template.disabled = true;

      console.debug(`Amcharts4Component::demoAmChart4() chartConfig=(${JSON.stringify(this.chartConfig)}) `)
      
      // this.series = new Array()

      let pserie; 

      for (let i = 0; i < ndata.series.length; i++) {

          const datasetId = ndata.series[i]
          const serie = this.addSerieToChart_SETUP5(chart, i, ndata)
        
          if (i === ndata.series.length) {
              pserie = serie
          }
      }



      if (this.chartConfig.scrollbarX) {

          const posicion = (this.chartConfig.scrollbarY_abajo) ? chart.bottomAxesContainer : chart.topAxesContainer

          // let scrollbarX = new am4charts.XYChartScrollbar();
  // scrollbarX.series.push(series);
  // chart.scrollbarX = scrollbarX;
          // if (this.chartConfig.scrollbarY_preview) {
          //     const scrollbarX = new am4charts.XYChartScrollbar()
          //     scrollbarX.series.push(pserie)

          //     // ------------------------------------------------------------
          //     // scrollbarX.scrollbarChart::
          //     //    It can be configured just like any other XYChart.
          //     // scrollbarX.scrollbarChart.seriesContainer.hide()  // No dibuja a la serie
          //     scrollbarX.scrollbarChart.fontSize = 8
          //     // ------------------------------------------------------------

          //     chart.scrollbarX = scrollbarX
          //     chart.scrollbarX.parent = posicion
          //     chart.scrollbarX.thumb.minWidth = 50
          // } else {
          //     chart.scrollbarX = new am4core.Scrollbar()
          //     chart.scrollbarX.parent = posicion
          // }

          chart.scrollbarX = new am4core.Scrollbar()
          chart.scrollbarX.parent = posicion



          console.log('que pasa')
        }



        if (this.chartConfig.scrollbarY) {
          this.scrollbarY = new am4core.Scrollbar()
          chart.scrollbarY = this.scrollbarY
          chart.scrollbarY.thumb.minHeight = 50
          // chart.scrollbarY.__disabled = false
        }


        if (this.chartConfig.cursor) {
          // Make a panning cursor
          this.cursor = new am4charts.XYCursor()
          chart.cursor = this.cursor
          chart.cursor.snapToSeries = pserie
          chart.cursor.xAxis = dateAxis
          this.doActionSetup_cursor()
          if (this.chartConfig.zoom) {
              chart.cursor.behavior = this.chartConfig.zoom_tipo
          }



          let scrollbarX = new am4charts.XYChartScrollbar();
          scrollbarX.series.push(pserie);
          chart.scrollbarX = scrollbarX;

      }
  

      chart.legend = new am4charts.Legend()
      chart.legend.fontSize = 12



      chart.events.on('ready', function () {

          // const OOPPCCIONN = chx.OPCION_HH

          // console.debug('!ready(' + OOPPCCIONN + ') Start!')

          // const rango  = chx.rangeToDate(OOPPCCIONN)

          // console.debug('!ready(' + OOPPCCIONN + ') [desde=' + this.mff1(rango.dDesde) + ', hasta=' + this.mff1(rango.dHasta) + '] ')

          // chx.zoomToDates(OOPPCCIONN, rango.dDesde, rango.dHasta)


      })



      // Del archivo es...
      // _date_millisecond: "mm:ss SSS",
      // _date_second: "HH:mm:ss",
      // _date_minute: "HH:mm",

      // _date_hour: "HH:mm (dd)",          // OK
      // _date_day: "dd MMM",               // WIP


      // _date_week: "ww",
      // _date_month: "MMM",
      // _date_year: "yyyy",

      // // dateAxis.dateFormat
      dateAxis.periodChangeDateFormats.setKey('minute', '[bold]HH:mm')
      dateAxis.periodChangeDateFormats.setKey('hour',   '[bold]HH:mm (dd)')
      dateAxis.periodChangeDateFormats.setKey('day',    '[bold]dd MMM')
      // dateAxis.periodChangeDateFormats.setKey('week',   '[bold]dd-MM-yyyy')
      dateAxis.periodChangeDateFormats.setKey('month',  '[bold]MM-yyyy')
      dateAxis.periodChangeDateFormats.setKey('year',   '[bold]yyyy')

      // Define default intervals
      dateAxis.gridIntervals.clear()

      if (Global.isDS05(this.dataset_id)) {
        dateAxis.gridIntervals.pushAll([
          { timeUnit: 'year', count: 1 }
        ])
      } else if (this.dataset_id === Global.DS.DS04) {
        dateAxis.gridIntervals.pushAll([
          { timeUnit: 'month', count: 1 },
          { timeUnit: 'month', count: 3 },
          { timeUnit: 'year', count: 1 }
       ])
      } else {        
        dateAxis.gridIntervals.pushAll([
          { timeUnit: 'minute', count: 15 },
          { timeUnit: 'hour', count: 1 },
          { timeUnit: 'day', count: 1 },
          { timeUnit: 'week', count: 1 },
          { timeUnit: 'month', count: 1 },
          { timeUnit: 'month', count: 3 },
          { timeUnit: 'year', count: 1 }
       ])
      }

    }

    return chart
  }




  // --[ Menu Selection Section ]-------------
  isSelector_xPais   = () => (this.selector === KEY.PARAM_DS05.SELECT_xPaises)
  isSelector_xSector = () => (this.selector === KEY.PARAM_DS05.SELECT_xSectores)

  setupViewHelper = () => {
    this.viewHelper.isDS05 = Global.isDS05(this.dataset_id)
    this.viewHelper.countrySelected = (this.isSelector_xPais())   ? KEY.PARAM_DS05.COUNTRY_Argentina  : undefined
    this.viewHelper.sectorSelected  = (this.isSelector_xSector()) ? KEY.PARAM_DS05.SECTOR_Electricity : undefined
  }
  

  // doChangeItem
  click_ChangeItem(itemSelected: KEY.PARAM_DS05) {

    console.debug(`click_ChangeItem(${itemSelected})`)

    this.viewHelper.countrySelected = (this.isSelector_xPais())   ? itemSelected : undefined
    this.viewHelper.sectorSelected  = (this.isSelector_xSector()) ? itemSelected : undefined

    this.loadTheData_And_DrawAmChart4('from click_ChangeItem')
  }

  // --[ Zoom Section ]-------------

  click_Button_H() {  this.click_Button_X(chx.OPCION_HH)  }
  click_Button_D() {  this.click_Button_X(chx.OPCION_DD)  }
  click_Button_M() {  this.click_Button_X(chx.OPCION_MM)  }
  click_Button_Y() {  this.click_Button_X(chx.OPCION_YY)  }

  click_Button_X(opcion) {

    console.debug(`click_Button_[${opcion}]`)

    const firstDate  = moment.utc(this.chart.data[0].date)
    const lastDate   = moment.utc(this.chart.data[this.chart.data.length - 1].date)

    const rango = chx.rangeToDate(opcion, firstDate, lastDate)

    this.dateAxis.zoomToDates(rango.dDesde, rango.dHasta)

    console.debug(`click_Button_[${opcion}] fin`)
  }


  click_Zoom_Out = () =>  {
    console.debug(`click_Zoom_Out Ini`)

    this.chart.zoomOutButton.dispatchImmediately('hit')

    console.debug(`click_Zoom_Out Fin`)
  }

  // --[ Botoneraa ]-------------
  click_Button_UP_MAX() {
    console.debug(`click_Button_UP_MAX[]`)
    
  }

  click_Button_DW_MAX() {
    console.debug(`click_Button_DW_MAX[]`)
    
  }

  click_Button_RESET() {
    console.debug(`click_Button_RESET[]`)

  }
  

  // --[ Botonera ]-------------
  onDateChange(dates) {
    console.debug(`Amcharts4Component::onDateChange() @Output Capturado ::  ${Global.ff1_Date(dates.from)} - ${Global.ff1_Date(dates.to)}`)

    this.dateFilter.from = dates.from
    this.dateFilter.to = dates.to

    this.loadTheData_And_DrawAmChart4('onDateChange')
  }


  doDownload($event) {

    $event.preventDefault();
    console.debug('doDownload()')
    this.dataService
        .getBackendDataAsBlob(this.dataset_id, this.quality_id, this.param_id, this.dateFilter)
        .subscribe((data) => {
          //  console.debug('doDownload Blob ' + JSON.stringify(data))
            saveAs(data, this.getFileName())
      })
  }

  getFileName() {
    console.debug(this.dataset_id, this.quality_id, this.param_id, this.dateFilter)

    const filename = 'glaciar-' + this.dataset_id + '-'
                                + this.quality_id + '-'
                                + this.param_id   + '-'
                                + Global.ff3_Date(this.dateFilter.from) + '_'
                                + Global.ff3_Date(this.dateFilter.to) + '.csv'
    return filename
  }

  // --[ Zoom Section ]-------------
  hayUmbral = (u) => u !== Global.SD && typeof u !== 'undefined' && u !== null

  getUmbralInfo = (u) => (this.hayUmbral(u)) ? `[min=${u.min}, avg=${u.avg}, max=${u.max}]` : ` ... umbrales undefined ... `
  
  doActionSetup_SUPER_umbral = () => {
    
    let UMBRAL = this.glaciarStorage.getUmbral(this.param_id, this.chartConfig.awq_estandar)

    console.debug(`Amcharts4Component::demoAmChart4() ${this.param_id} = ${this.getUmbralInfo(UMBRAL)} `)

    if (this.hayUmbral(UMBRAL)) {

        this.doActionSetup_umbralRange('MIN', UMBRAL.min, `Min ${UMBRAL.min}` )
        this.doActionSetup_umbralRange('AVG', UMBRAL.avg, `Avg ${UMBRAL.avg}` )  
        this.doActionSetup_umbralRange('MAX', UMBRAL.max, `${this.param_id}
        Max ${UMBRAL.max}` )

        if (this.hayUmbral(UMBRAL.min)) this.valueAxis.min = UMBRAL.min
        if (this.hayUmbral(UMBRAL.max)) this.valueAxis.max = UMBRAL.max

        this.doActionSetup_umbral_min()
        this.doActionSetup_umbral_avg()
        this.doActionSetup_umbral_max()

    }
  }

  doActionSetup_umbralRange = (op: string, UMBRAL_VALUE, text)=> {
    
    if (this.hayUmbral(UMBRAL_VALUE)) {
      
        const axisRange = this.valueAxis.axisRanges.create()
        axisRange.value = UMBRAL_VALUE
        axisRange.grid.stroke = am4core.color('#396478')
        axisRange.grid.strokeWidth = 2
        axisRange.grid.strokeOpacity = 1

        axisRange.label.inside = true
        axisRange.label.text = text
        axisRange.label.fill = axisRange.grid.stroke
        axisRange.label.verticalCenter = 'bottom'

        if (op === 'MIN') this.axisRange_min = axisRange
        if (op === 'AVG') this.axisRange_avg = axisRange
        if (op === 'MAX') this.axisRange_max = axisRange

    }
  }

  doActionSetup_umbral_min = () => {
    if (this.axisRange_min != undefined) {
        this.axisRange_min.visible = false
        if (this.chartConfig.umbrals_on && this.chartConfig.umbral_min) { 
            this.axisRange_min.show()
        }
    }
  }

  doActionSetup_umbral_avg = () => {
    if (this.axisRange_avg != undefined) {
        this.axisRange_avg.visible = false
        if (this.chartConfig.umbrals_on && this.chartConfig.umbral_avg) { 
            this.axisRange_avg.show()
        }
    }
  }

  doActionSetup_umbral_max = () => {
    if (this.axisRange_max != undefined) {
        this.axisRange_max.visible = false
        if (this.chartConfig.umbrals_on && this.chartConfig.umbral_max) { 
            this.axisRange_max.show()
        }
    }
  }
  

  doActionSetup_labelY = () => {
    if (this.chartConfig.labelY) {
      this.valueAxis.renderer.labels.template.fill = am4core.color('#e59165')
      this.valueAxis.renderer.minWidth = 1
      this.valueAxis.title.text = chx.getlabelY(this.param_id)

      if (this.dataset_id === Global.DS.DS05) {
          this.valueAxis.title.text = chx.getlabelY_WRI(this.param_id)
      }
    } else {
      this.valueAxis.title.text = ''
    }
  } 

  doActionSetup_cursor = () => {
    if (this.chartConfig.cursor) {
        this.chart.cursor.behavior = this.chartConfig.zoom_tipo
    } else {
        this.chart.cursor.behavior = ChartConfig.ZOOM_Command.none   
    }
  } 

  doActionSetup_serie_tipo_area = () => {
    console.debug(`doActionSetup_serie_tipo_area`)
    let opacity = (this.chartConfig.serie_tipo_area) ? 0.2 : 0.9
    this.series.forEach(serie => serie.fillOpacity = opacity)
  } 

  doActionSetup_scrollbarY = () => {
    if (this.chartConfig.scrollbarY) {
      this.scrollbarY.show()
    } else {
      this.scrollbarY.visible = false
    }
  }

  // --[ UI del Chart ]-------------

  pq(param: string): string {
    return Global.pq(param)
  }

}
