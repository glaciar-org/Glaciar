import { Component, Input, NgZone, OnInit, AfterViewInit, OnDestroy } from '@angular/core'
import { ChartConfig } from '../../../model/domainmodel'
import { DataService } from '../../../services/data.service'

import { MessageService } from '../../../services/message.service'
import { DomainModel } from '../../../model/domainmodel'
import * as Global from '../../../model/global'
import * as moment from 'moment'
import * as chx from '../../../chartz/chartz.libs'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4lang_es_ES from '@amcharts/amcharts4/lang/es_ES'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

import { DateFormatPipe } from '../../../components/pipe/date-format-pipe'
import { TextTransfPipe } from '../../../components/pipe/text-transf-pipe'

@Component({
  selector: 'gcr-dispersion',
  templateUrl: './dispersion.component.html',
  styleUrls: ['./dispersion.component.scss']
})
export class DispersionComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() dataset_id: Global.DS  
  @Input() seed: string  // seedReload

  viewHelper = { 
    Y     : '',
    M     : '',
    D     : '',
    info  : '',
  }

  selectedButton;


  startTime: any

  private chart: am4charts.XYChart
  private dateAxis: am4charts.DateAxis
  private valueAxis: am4charts.ValueAxis
  private series: am4charts.ColumnSeries

  typeDataResponse =  Global.RES_TYPE.JSON_for_AMCHARTS4_MULTI_SERIES_V3

  constructor(
    private dataService: DataService,
    private messageService: MessageService,
  //  private spinner: NgxSpinnerService,
    private zone: NgZone) {
    
    if (this.dataset_id === undefined) {
      this.dataset_id = Global.DS.DS01
      this.seed  = '3333'
    }

    this.whenSelectButton(chx.OPCION_YY)
  }

  whenSelectButton(opcion: string) {
    this.selectedButton = opcion
    this.viewHelper[chx.OPCION_YY] = ''
    this.viewHelper[chx.OPCION_MM] = ''
    this.viewHelper[chx.OPCION_DD] = ''
    this.viewHelper[opcion] = 'active'
  }

  ngOnInit() {
    this.startTime = moment()

    let dataset = this.dataService.getDatasets(this.dataset_id)[0]

    this.viewHelper.info = dataset.desc
    
    console.debug(`DispersionComponent::clock START -> ${Global.ff1(this.startTime) } `)
  }

  ngAfterViewInit() {
    this.loadTheData_And_DrawAmChart4('ngAfterViewInit')
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
          this.chart.dispose()
      }
    })
  }


  loadTheData_And_DrawAmChart4(src: string) {

    console.debug('loadTheData::my_ngOnInit_OnChange(src=' + src + ') ')

    this
      .dataService
      .getBackendDataDistribution(this.dataset_id, this.code(this.selectedButton))
      .subscribe((ndata: any) => {

         console.debug('RTA getBackendDataDistribution : ' + JSON.stringify(ndata))

        let MODO = '' 
        // ndata = this.getSampleData(); MODO = "SAMPLE" 
        // ndata = this.getMockData(chx.OPCION_YY);   MODO = "MOCK" 

        /// -------------------
        this.zone.runOutsideAngular(() => {
          setTimeout(() => { 
              this.chart = this.demoAmChart4_base(ndata, MODO)
          }, 3000); 
          // setTimeout() fix the "ERROR Error: html container not found para DS04 "
        })
        /// -------------------

        // this.spinner.hide()
    })

    console.debug('loadTheData::my_ngOnInit_OnChange - fin')

  }

  demoAmChart4_base(ndata: any, MODO: string) {
    const chart = am4core.create('chartdiv_dispercion', am4charts.XYChart)

    chart.language.locale = am4lang_es_ES

    chart.data = ndata

    chart.paddingRight = 20

    
    // chart.dateFormatter.inputDateFormat = 'yyyy-MM-ddTHH:mm:ss'
    // chart.dateFormatter.dateFormat      = 'yyyy-MM-dd HH:mm'
  

    const dateAxis = chart.xAxes.push(new am4charts.DateAxis())
    dateAxis.renderer.grid.template.location = 0
    dateAxis.renderer.labels.template.horizontalCenter = 'middle'

    // Labels Inside
    dateAxis.renderer.minGridDistance = 50
    dateAxis.startLocation = 0.5
    dateAxis.endLocation = 0.5
    // dateAxis.renderer.minLabelPosition = 0.05
    // dateAxis.renderer.maxLabelPosition = 0.95
    // dateAxis.renderer.inside = true

    dateAxis.periodChangeDateFormats.setKey('day',    '[bold]dd MMM')
    dateAxis.periodChangeDateFormats.setKey('month',  `[bold]MMM
yyyy`)
    dateAxis.periodChangeDateFormats.setKey('year',   '[bold]yyyy')

    // Define default intervals
    dateAxis.gridIntervals.clear()
    dateAxis.gridIntervals.pushAll(
      [
        { timeUnit: 'day', count: 1 },
        { timeUnit: 'month', count: 1 },
        { timeUnit: 'year', count: 1 }
      ]
    )

    this.dateAxis = dateAxis

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
    valueAxis.tooltip.disabled = true
    valueAxis.renderer.minWidth = 35

    valueAxis.renderer.labels.template.fill = am4core.color('#e59165')
    valueAxis.renderer.minWidth = 1
    valueAxis.title.text = this.labelXtime(this.selectedButton)

    
    this.valueAxis = valueAxis

    // const series = chart.series.push(new am4charts.LineSeries())
    const series = chart.series.push(new am4charts.ColumnSeries())

    if (MODO === "SAMPLE") {
      series.dataFields.valueY = 'value0'
      series.dataFields.dateX = 'date'
    } else if (MODO === "MOCK") {
      series.dataFields.valueY = 'count'
      series.dataFields.dateX = 'FECHA_HORA'
    } else {
      series.dataFields.valueY = 'count'
      series.dataFields.dateX = 'FECHA_HORA'
    }

    series.tooltipText = this.tooltipText()

    this.series = series

    chart.cursor = new am4charts.XYCursor()


    chart.scrollbarX = new am4core.Scrollbar()
    chart.scrollbarX.parent = chart.topAxesContainer
    // chart.scrollbarX.parent = chart.bottomAxesContainer


    // ready | validated
    chart.events.on('ready', function () {

      const readyTime = moment()
      const d1 = moment.duration(readyTime.diff(this.startTime))

      console.debug(`DispersionComponent::clock READY -> ${Global.ff1(readyTime) } `)
      console.debug(`DispersionComponent::clock TOTAL -> ${ d1.asSeconds() } segundos`)

    }, this)

    return chart
  }


  // replaceSeries = () => {
  //   var seriesId = this.chart.series.length;
    
  //   // Update data
  //   for(var i = 0; i < this.chart.data.length; i++) {
  //     this.chart.data[i]["count"] = Math.random() * 300;
  //   }
    
  //   console.debug(this.chart.data);
    
  //   // Create series
  //   // const series = this.chart.series.push(new am4charts.LineSeries());
  //   const series = this.chart.series.push(new am4charts.ColumnSeries())
  //   series.dataFields.valueY = "count" + seriesId;
  //   series.dataFields.categoryX = "year";
  //   series.name = "Series #" + seriesId;
  //   series.strokeWidth = 3;
  //   series.fillOpacity = 0.2;
  //   series.stacked = true;

  //   this.chart.data = chx.getMockData_MM()
  //   this.chart.invalidateData();
  // }

  // --[ Zoom Section ]-------------
  tooltipText(): string {

    let formatPattern = (this.selectedButton === chx.OPCION_YY) ? 'YYYY'
    : (this.selectedButton === chx.OPCION_MM) ? 'MMM YYYY'
    : (this.selectedButton === chx.OPCION_DD) ? 'dd-MM-YYYY'
    : 'YYYY' 
    return `Cantidad de Registros: [bold]{valueY.value}[/]
    Período: [bold]{dateX.formatDate("${formatPattern}")}[/]
    `
  }

  labelXtime(opcion): string {
    return (opcion === chx.OPCION_YY) ? 'Registros por año'
         : (opcion === chx.OPCION_MM) ? 'Registros por mes'
         : (opcion === chx.OPCION_DD) ? 'Registros por día'
         : 'Cantidad de Registros'
  }
  code(opcion) {
    return (opcion === chx.OPCION_YY) ? 'YYYY'
         : (opcion === chx.OPCION_MM) ? 'MM'
         : (opcion === chx.OPCION_DD) ? 'DD'
         : 'YYYY'
  }
  
  click_Button_D() {  this.click_Button_X(chx.OPCION_DD)  }
  click_Button_M() {  this.click_Button_X(chx.OPCION_MM)  }
  click_Button_Y() {  this.click_Button_X(chx.OPCION_YY)  }

  click_Button_X(opcion) {

    console.debug(`DispersionComponent.click_Button_[${opcion}]`)

 
    // this.selectedButton = opcion
    this.whenSelectButton(opcion)

    this
    .dataService
    .getBackendDataDistribution(this.dataset_id, this.code(opcion))
    .subscribe((ndata: any) => {

      this.chart.data = ndata
      this.series.tooltipText = this.tooltipText()
      this.valueAxis.title.text = this.labelXtime(this.selectedButton)
      this.chart.invalidateData()

      if (opcion === chx.OPCION_DD) {
        const firstDate  = moment.utc(ndata[0].FECHA_HORA)
        const lastDate   = moment.utc(ndata[ndata.length - 1].FECHA_HORA)
        const aYearAgo   = lastDate.clone().subtract( 365, 'd')
        
        console.debug(`DATES: 
               firstDate      : ${ Global.ff1(firstDate) } 
               lastDate       : ${ Global.ff1(lastDate)  }
               aYearAgo       : ${ Global.ff1(aYearAgo)  } `)
        this.dateAxis.zoomToDates(aYearAgo.toDate(), lastDate.toDate())
      }

      console.debug(`DispersionComponent.click_Button_[${opcion}] Actuaizado`)
    })

    // this.dateAxis.zoomToDates(rango.dDesde, rango.dHasta)

  }


  click_Zoom_Out = () =>  {
    console.debug('DispersionComponent.click_Zoom_Out Ini')

    this.chart.zoomOutButton.dispatchImmediately('hit')
  }

  // --[ Zoom Section ]-------------




  getSampleData() {
    const data = []
    let visits = 10
    for (let i = 1; i < 100; i ++) {
      visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10)
      data.push({ date: new Date(2018, 0, i), name: 'name' + i, value0: visits })
    }
    return data
  }


  getMockData(opcion) {

    return (opcion === chx.OPCION_YY) ? chx.getMockData_YYYY()
         : (opcion === chx.OPCION_MM) ? chx.getMockData_MM()     
         : chx.getMockData_YYYY()  // default
  }

  
}


// RESOURCES:
// Dynamically adding and removing Series
// https://www.amcharts.com/docs/v4/tutorials/dynamically-adding-and-removing-series/

