import { Component, OnInit, AfterViewInit, OnDestroy, Input } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
// import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap'
import { GlaciarStorageService } from '../../services/glaciar-storage.service'
//import { environment } from '../../../environments/environment'
import { DomainModel, ChartConfig, TDD, KEY } from '../../model/domainmodel'
import { DataService } from '../../services/data.service'
import { MessageService } from '../../services/message.service'
import { saveAs } from 'file-saver/FileSaver'


import * as Global from '../../model/global'
import * as moment from 'moment'

const AIRQ = Global.QUALITY_TAB.AIRQ
const WATERQ = Global.QUALITY_TAB.WATERQ

@Component({
  selector: 'gcr-data-dashboard',
  templateUrl: './data-dashboard.component.html',
  styleUrls: ['./data-dashboard.component.scss'],
})
export class DataDashboardComponent implements OnInit, AfterViewInit, OnDestroy {

  contextTDD: TDD.Context

  envChartLib: string
  summariesSelected: string

  dataset: DomainModel.IDataset
  dateRange: DomainModel.DateRange
  dateFilter: DomainModel.DateFilter
  chartConfig: ChartConfig.Options

  dataset_id: Global.DS
  quality_id: Global.QUALITY_TAB
  param_id: Global.VAR
  selector: KEY.PARAM_DS05
  datasets: any

  enabled_guality_airq = true
  enabled_guality_waterq = true

  subParams:   Subscription
  subObjects:  Subscription

  // Google map lat-long
  lat: -34.599722
  lng: -58.381944

  viewHelper = {
    sub_header: '',
    dataset_desc: '',
    dataset_name: ''
  }

  

  constructor(
    private route: ActivatedRoute,
    // private router: Router,
    private glaciarStorage: GlaciarStorageService,
    private dataService: DataService,
    private messageService: MessageService
  ) {
    this.contextTDD = new TDD.Context()
    this.envChartLib = this.dataService.envChartLib
    // console.debug('environment: ' + JSON.stringify(environment))
    console.debug('envChartLib: ' + JSON.stringify(this.envChartLib))
    console.debug('contextTDD:  ' + JSON.stringify(this.contextTDD))
  }



  onDateChange(dates) {
    console.debug(`DatasetComponent::onDateChange() @Output Capturado ::  ${Global.ff1_Date(dates.from)} - ${Global.ff1_Date(dates.to)}`)

    this.dateFilter.from = dates.from
    this.dateFilter.to = dates.to

    // https://stackoverflow.com/questions/34827334/triggering-change-detection-manually-in-angular
    // Triggering change detection manually in Angular

    this.doReload()
  }

  onChartConfigChange(cfg: ChartConfig.Options) {
    console.debug(`DatasetComponent::onChartConfigChange() @Output Capturado ::  ${JSON.stringify(cfg)}`)
    this.chartConfig = cfg
    this.doReload()
  }

  ngAfterViewInit() {
    console.debug(`DatasetComponent::ngAfterViewInit()`)
  }

  doReload() {
    this.summariesSelected = 'true-' + Math.random()
    console.debug('doReload:: [' + this.summariesSelected + ']' )
  }

  ngOnInit() {

    console.debug('DatasetComponent:&:ngOnInit() Inicio ')

    this.chartConfig = this.dataService.getChartConfigDefautl(this.quality_id)

    this.subObjects  = this.messageService.getObject().subscribe(
      (obj: ChartConfig.Options) => {
        console.debug(`DatasetComponent:#:subscribe() Object ::  ${JSON.stringify(obj)}`)
        this.chartConfig = obj
        this.doReload()
      }
    )


    this.subParams = this.route.params.subscribe(params => {
      this.dataset_id = params['dataset_id']
      this.quality_id = params['quality_id']
      this.param_id   = params['param_id']
      this.selector   = params['selector']

      this.viewHelper.sub_header = this.getSubHeader(this.quality_id)

      if (this.contextTDD.mode === Global.IAM_DOING_TDD) {
          this.dataset_id  = this.contextTDD.dataset_id
          this.quality_id  = this.contextTDD.quality_id
          this.param_id    = this.contextTDD.param_id
          this.selector    = this.contextTDD.selector
          this.envChartLib = this.contextTDD.envChartLib
      }

      console.debug(`DatasetComponent:&:ngOnInit() Subscribe
        GET -> dataset_id = ${this.dataset_id}
        GET -> quality_id = ${this.quality_id}
        GET -> param_id   = ${this.param_id  }
        GET -> selector   = ${this.selector  }
      `)

      this.isDisabledQualityTab()

      this.viewHelper.dataset_name = this.dataService.getDataset_name(this.dataset_id)
      this.viewHelper.dataset_desc = this.dataService.getDataset_desc(this.dataset_id)

      if (!this.param_id) {
           this.param_id = this.getParamIdDefault()
      }

      this.envChartLib = this.dataService.envChartLib

      this.dateRange = this.dataService.getDataset_dates(this.dataset_id)

      console.debug(`DatasetComponent:&:ngOnInit() Subscribe :: this.dateRange
          { minDate: ${Global.ff1_Date(this.dateRange.minDate)},  maxDate: ${Global.ff1_Date(this.dateRange.maxDate)} } `)
      // if (!this.dateFilter) {

          //  -dateFilter : Last two monts // Deprecado
          //  -dateFilter : Last 1 monts
          this.dateFilter = new DomainModel.DateFilter()
          this.dateFilter.to = this.dateRange.maxDate
          this.dateFilter.from = (Global.isDS05(this.dataset_id)   ) ? moment(this.dateFilter.to).subtract(20, 'year').toDate()
                               : (this.dataset_id == Global.DS.DS04) ? moment(this.dateFilter.to).subtract(10, 'year').toDate()
                               : moment(this.dateFilter.to).subtract(1, 'month').toDate()


      // }

      console.debug(`DatasetComponent:&:ngOnInit() Subscribe :: this.dateFilter
          {    from: ${Global.ff1_Date(this.dateFilter.from)  },  to     : ${Global.ff1_Date(this.dateFilter.to)}     } `)

      this.setLocation()


      this.setupChartConfig(this.quality_id)

    })

    console.debug('DatasetComponent:&:ngOnInit() Fin ')
  }


  /**
   * SETUP INICIAL DEL STORAGE: outliers + umbrals
   * @param quality 
   */
  setupChartConfig(quality: Global.QUALITY_TAB) {
    console.debug(`DatasetComponent:[SETUP INICIAL]:setupChartConfig(${quality})`)
    this.chartConfig = this.dataService.getChartConfigDefautl(quality)
    this.glaciarStorage.setUmbrales(this.chartConfig.umbrals)
    this.glaciarStorage.setOutliers(this.chartConfig.outliers)
    console.debug(`DatasetComponent:[SETUP INICIAL]:setupChartConfig(${quality}) = ${JSON.stringify(this.chartConfig)}`)
  }

  onTabChange($event) {
  }

  // onTabChange($event: NgbTabChangeEvent) {

  //   console.debug('DatasetComponent.onTabChange(' + JSON.stringify($event) + ') ')

  //   // This fixes the bug of changing the activatedRoute even if you don't click exactly
  //   // on the title of the tab.
  //   // this.router.navigate(['/g', this.geography.id, 'p', $event.nextId])

  //   this.quality_id = ($event.nextId === Global.QUALITY_TAB.AIRQ)   ? Global.QUALITY_TAB.AIRQ
  //                   : ($event.nextId === Global.QUALITY_TAB.WATERQ) ? Global.QUALITY_TAB.WATERQ
  //                   :  Global.QUALITY_TAB.AIRQ

  //   this.param_id = this.getParamIdDefault()

  //   this.viewHelper.sub_header = this.getSubHeader(this.quality_id)

  //   console.debug('DatasetComponent::onTabChange[this.dataset_id=' + this.dataset_id
  //                       + ', this.quality_id=' + this.quality_id
  //                       + ', this.param_id=' + this.param_id
  //                       + ', $event.nextIdP=' + $event.nextId + ']')
  // }

  getParamIdDefault(): Global.VAR {
    return this.dataService.getDatasetDefaultParam(this.dataset_id, this.quality_id)
  }

  isDisabledQualityTab() {
    const enabled_tabls = this.dataService.areEnabledQualityTab(this.dataset_id)
    this.enabled_guality_airq   = enabled_tabls.QUALITY_TAB_ENABLED_AIRQ
    this.enabled_guality_waterq = enabled_tabls.QUALITY_TAB_ENABLED_WATERQ
  }

  getMapDataset(obj: any): Map<string, any> {
    const map = new Map()
    for (const p of obj) {
        map.set(p.code, p)
    }
    return map
  }

  getSubHeader(quality): string {

    const q = (quality === Global.QUALITY_TAB.AIRQ   ) ? ' Calidad del Aire'
            : (quality === Global.QUALITY_TAB.WATERQ ) ? ' Calidad del Agua' : ''

    return q
  }

  setLocation() {

    const loc = this.dataService.getDataset_location(this.dataset_id)
    this.lat = loc.latitude
    this.lng = loc.longitude
  }


  ngOnDestroy() {
    this.subParams.unsubscribe()
    this.subObjects.unsubscribe()
  }




  doDownload() {

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

  ff1_Date = (date: Date) => Global.ff1_Date(date)


  iWantUse_AMCHARTS4    = () => (true)

  iWant_SELECT_CHARTS  = () => { return false }

  onClick_Select_ChartLib = () => { console.debug('BUTTON Select ChartLib : clicked [value?]') }

}



// NOTA: Component lifecycle hooks sequence
// - https://angular.io/guide/lifecycle-hooks#lifecycle-sequence
// - After creating a component/directive by calling its constructor,
// - Angular calls the lifecycle hook methods in the following sequence at specific moments:
//   - ngOnChanges()
//   - ngOnInit()
//   - ngDoCheck()
//   - ngAfterContentInit()
//   - ngAfterContentChecked()
//   - ngAfterViewInit()
//   - ngAfterViewChecked()
//   - ngOnDestroy() ...
