import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { DomainModel, ChartConfig, Umbral, ST, Outlier } from '../model/domainmodel'
import { UmbralService } from './umbral.service'
import * as Global from '../model/global'

const URL_JSON_SERVER  = 'http://localhost:4001'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  datos: Array<any>

  urlBackend: string
  urlBackendMsg: ''

  envChartLib: string

  constructor(
    private http: HttpClient, 
    private umbralService: UmbralService) {

    console.debug('DataService#constructor()')

    this.urlBackend  = Global.getValue(Global.HOST_BACKEND.UPSALA)
    this.envChartLib = Global.getValue(Global.GlaciaR_Viedma__CHARTLIB)

   }


  public getChartConfigDefautl(quality: string, isLabMode?: boolean): ChartConfig.Options {

    return (Global.isLabMode())
      ? this.getChartConfigDefautl_lab2(quality) 
      : {
          labelY: true,
          adaptativeY: true,

          cursor: true,
          zoom: true,
          zoom_tipo: ChartConfig.ZOOM_Command.zoomX,

          umbrals_on: false,
          umbral_min: true,
          umbral_avg: true,
          umbral_max: true,
          umbrals: this.getUmbralesDefault(quality),

          scrollbarX: true,
          scrollbarY: true,
          scrollbarY_abajo: true,
          scrollbarY_preview: true,

          serie_tipo_area: true,
          serie_tooltip: true,
          serie_connect: false,

          awq_estandar: this.getAWQ_estandar_Default(quality),
          // awq_estandar: (quality === Global.QUALITY_TAB.AIRQ) ? ST.AWQ.REF_BIB_AIRQ : ST.AWQ.REF_BIB,

          nil_action: ChartConfig.NIL_Command.DISCARD,

          outliers_action: ChartConfig.OUTLIER_Command.CONSIDER,

          outliers: this.getOutlierDefault(quality)
        }
  }

  public getChartConfigDefautl_lab1(quality: string): ChartConfig.Options {
    
    console.debug(`DataService::getChartConfigDefautl_lab1()`)

    return {
      labelY: false,
      adaptativeY: true,   // No se usa ...

      cursor: false,
      zoom: false,
      zoom_tipo: ChartConfig.ZOOM_Command.zoomX,

      umbrals_on: true,
      umbral_min: true,
      umbral_avg: true,
      umbral_max: true,
      umbrals: this.getUmbralesDefault(quality),

      scrollbarX: false,
      scrollbarY: false,
      scrollbarY_abajo: true,
      scrollbarY_preview: true,

      serie_tipo_area: false,
      serie_tooltip: false,
      serie_connect: false,

      awq_estandar: this.getAWQ_estandar_Default(quality),

      nil_action: ChartConfig.NIL_Command.CONSIDER,

      outliers_action: ChartConfig.OUTLIER_Command.DISCARD,

      outliers: this.getOutlierDefault(quality)
    }
  }
  
  public getChartConfigDefautl_lab2(quality: string): ChartConfig.Options {
    
    console.debug(`DataService::getChartConfigDefautl_lab2()`)

    return {
      labelY: false,
      adaptativeY: true,   // No se usa ...

      cursor: true,
      zoom: false,
      zoom_tipo: ChartConfig.ZOOM_Command.zoomX,

      umbrals_on: true,
      umbral_min: true,
      umbral_avg: true,
      umbral_max: true,
      umbrals: this.getUmbralesDefault(quality),

      scrollbarX: true,
      scrollbarY: false,
      scrollbarY_abajo: false,
      scrollbarY_preview: false,

      serie_tipo_area: false, 
      serie_tooltip: true,
      serie_connect: false,

      awq_estandar: this.getAWQ_estandar_Default(quality),

      nil_action: ChartConfig.NIL_Command.DISCARD,

      outliers_action: ChartConfig.OUTLIER_Command.DISCARD,

      outliers: this.getOutlierDefault(quality)
    }
  }

  public getAWQ_estandar_Default(quality: string): ST.AWQ {
    return (quality === Global.QUALITY_TAB.AIRQ) ? ST.AWQ.REF_BIB_AIRQ : ST.AWQ.REF_BIB
  }


  public getUmbralesDefault(quality: string): Array<Umbral> {
    let umbrales = this.umbralService.getUmbralArray(quality, ST.AWQ.DEFAULT)
    return umbrales
  }

  public getOutlierDefault(quality: string): Array<Outlier> {

    let outliers = this.umbralService.getOutliers(quality)

    let set = (e: Outlier, v: Global.VAR, min: number, max: number) => {
      if (e.var === v) {
          e.min = min
          e.max = max
      }
    }

    outliers.map(e => {
      set(e, Global.VAR.CO,         0,   10)   // [0,   10] http://www.aragonaire.es/assets/documents/IDCA_GobAragon.pdf
      set(e, Global.VAR.CO2,        0, 2000)   // [0, 2000] https://www.pce-iberica.es/medidor-detalles-tecnicos/definicion-calidad-aire-y-co2.htm
      set(e, Global.VAR.NO,         0,  200)   // REPLICO A NO2 => sin referencias ... 
      set(e, Global.VAR.NO2,        0,  200)   // [0,  200] http://www.aragonaire.es/assets/documents/IDCA_GobAragon.pdf


      set(e, Global.VAR.Temp,      16,  44)
    })

    return outliers
  }
  
      // [{value: 500},
    //  {value: 800, class: 'grid800', text: 'LABEL 800'}]

  public getLinesY(code: Global.VAR): Array<any> {

    console.debug('DataService.getLinesY(' + code + ')')

    const rta: Array<any> = [

        { code: Global.VAR.CO   },
        { code: Global.VAR.CO2  },
        { code: Global.VAR.NO   },
        { code: Global.VAR.NO2  },

        { code: Global.VAR.Temp  ,  linesY: [
          {value: 35.0,                   text: 'Temperatura estandar para aguas naturales (25°C ± 10°C)' },
          {value: 25.0, class: 'lineAVG', text: 'Temperatura estandar para aguas naturales (25°C ± 10°C)' },
          {value: 15.0,                   text: 'Temperatura estandar para aguas naturales (25°C ± 10°C)' }
        ] },

        { code: Global.VAR.pH    ,  linesY: [
          {value:  8.5,                   text: 'ph nivel superior aceptable (8.5 aprox.)' },
          {value:  7.0, class: 'lineAVG', text: 'pH neutro' },
          {value:  6.5,                   text: 'ph nivel inferior aceptable (6 aprox)' },
        ] },


        { code: Global.VAR.OD    ,  linesY: {} },
        { code: Global.VAR.Redox ,  linesY: {} },
        { code: Global.VAR.Cond  ,  linesY: {} },

    ]

    const p = (code === undefined) ?  rta : rta.filter(e => e.code === code)

    console.debug('DataService.getLinesY(' + code + ') : ' + JSON.stringify(p))

    return p[0].linesY
  }

  public getDatasets(code: Global.DS): Array<DomainModel.IDataset> {

    console.debug('DataService.getDatasets(' + code + ')')

    const rta: Array<DomainModel.IDataset> =
      [
        {
          id: '1', code: 'DS01',  name: 'Buenos Aires',  desc: 'Buenos Aires Data',
          series : [ 'Estación Ambiental LA BOCA', 'Estación Ambiental PALERMO', 'Estación Ambiental CORDOBA', 'Estación Ambiental CENTENARIO' ],
          location: { latitude: -34.599722, longitude: -58.381944 },
          frecuencia: 'dia',
          params: {   AIRQ: [Global.AIRQ.CO, Global.AIRQ.NO2],
                    WATERQ: [ ] },
          dates: { minDate: new Date('2009-10-01T13:00:00.000Z'),
                   maxDate: new Date('2019-01-31T23:00:00.000Z') }
        },
        {
          id: '2', code: 'DS02',  name: 'Bahía Blanca',  desc: 'Gobierno Abierto Bahía Blanca',
          series : [],
          location: { latitude: -38.7167, longitude: -62.2833 },
          frecuencia: 'hora',
          params: {   AIRQ: [Global.AIRQ.CO, Global.AIRQ.NO, Global.AIRQ.NO2],
                    WATERQ: [ ] },
          dates: { minDate: new Date('2010-01-01T00:00:00.000Z'),
                   maxDate: new Date('2015-12-31T23:00:00.000Z') }
        },
        {
          id: '3', code: 'DS03',  name: 'Charles River', desc: 'Water Quality Data for the Lower Charles River',
          series : [],
          location: { latitude: 42.367893, longitude: -71.071129 },
          frecuencia: '15m',
          params: {   AIRQ: [ ],
                    WATERQ: [Global.WATERQ.Temp, Global.WATERQ.pH, Global.WATERQ.OD] },
          dates: { minDate: new Date('2015-05-13T12:00:00.000Z'),
                   maxDate: new Date('2018-10-30T22:15:00.000Z') }
        },
        {
          id: '4', code: 'DS04',  name: 'BDHI',          desc: 'Base de Datos Hidrológica Integrada',
          series : [],
          location: { latitude: -31.8016111, longitude: -59.126 },
          frecuencia: 'anual',
          params: {   AIRQ: [Global.AIRQ.NO, Global.AIRQ.NO2],
                    WATERQ: [Global.WATERQ.Temp, Global.WATERQ.pH, Global.WATERQ.OD, Global.WATERQ.Cond] },
          dates: { minDate: new Date('2011-02-22T01:01:00.000Z'),
                   maxDate: new Date('2017-03-03T09:41:00.000Z') }
        },
        {
          id: '5', code: 'DS05',  name: 'Emisiones de CO2', desc: 'World Resources Institute (WRI)',
          series : [],
          location: { latitude: 52.520008, longitude: 13.404954 },
          frecuencia: 'anual',
          params: {   AIRQ: [Global.AIRQ.CO2],
                    WATERQ: [] },
          dates: { minDate: new Date('1850-01-01T00:00:00.000Z'),
                   maxDate: new Date('2012-01-01T00:00:00.000Z') }
        }
      ]

      const dataset = (code === undefined) ?  rta : rta.filter(e => e.code === code)

      // console.debug('DataService.getDatasets(' + code + ') : ' + JSON.stringify(dataset))

      return dataset
  }

  public getDatasetDefaultParam(code: Global.DS, quality_id: Global.QUALITY_TAB): Global.VAR {

    console.debug('DataService.getDatasetParamDefault(code=' + code + ')')

    const params_defautl = {
      DEFAULT_AIRQ:   this.getDatasets(code)[0].params.AIRQ[0],
      DEFAULT_WATERQ: this.getDatasets(code)[0].params.WATERQ[0]
    }

    const param_id = (quality_id === Global.QUALITY_TAB.AIRQ)   ? params_defautl.DEFAULT_AIRQ
                   : (quality_id === Global.QUALITY_TAB.WATERQ) ? params_defautl.DEFAULT_WATERQ
                   : 'PARAM_UNDEF'

    return Global.pq(param_id)
  }

  public areEnabledQualityTab(code: Global.DS) {

    return {
      QUALITY_TAB_ENABLED_AIRQ:   this.getDatasets(code)[0].params.AIRQ.length > 0,
      QUALITY_TAB_ENABLED_WATERQ: this.getDatasets(code)[0].params.WATERQ.length > 0
    }

  }


  private getMapDataset(obj: any): Map<string, any> {
    const map = new Map()
    for (const p of obj) {
        map.set(p.code, p)
    }
    return map
  }

  private dsx(dataset_id: Global.DS) {
    const datasets = this.getDatasets(undefined)
    return this.getMapDataset(datasets).get(dataset_id)
  }

  getDataset_name = (ds_id: Global.DS): string => this.dsx(ds_id).name
  getDataset_desc = (ds_id: Global.DS): string => this.dsx(ds_id).desc
  getDataset_dates = (ds_id: Global.DS): DomainModel.DateRange => this.dsx(ds_id).dates
  getDataset_location = (ds_id: Global.DS): any => this.dsx(ds_id).location
  getDataset_frecuencia = (ds_id: Global.DS): '15m' | 'hora' | 'dia' | 'mes' | 'anual' => this.dsx(ds_id).frecuencia

  // ---------

  getBackendUrl(dataset_id: Global.DS,
    quality_id: Global.QUALITY_TAB,
      param_id: Global.VAR,
    dateFilter: DomainModel.DateFilter,
          type: string, 
  customParam?: DomainModel.CustomParams) {

    console.info(`DataService.getBackendUrl( ${dataset_id}, ${quality_id}, ${param_id}, `
                + `filters: { from: ${Global.ff1_Date(dateFilter.from)}, `
                +              `to: ${Global.ff1_Date(dateFilter.to)} }) & type=${type}` )

    const VAPI = '' // 'v2/'
    const THE_URL = this.urlBackend + VAPI + Global.getQueryString(dataset_id, quality_id, param_id, dateFilter, customParam) + '&type=' + type

    return THE_URL
  }

  getBackendDataAsBlob(dataset_id: Global.DS,
    quality_id: Global.QUALITY_TAB,
      param_id: Global.VAR,
    dateFilter: DomainModel.DateFilter,
  customParam?: DomainModel.CustomParams) {

    const THE_URL = this.getBackendUrl(dataset_id, quality_id, param_id, dateFilter, Global.RES_TYPE.CSV, customParam)

    return this.http.get(`${THE_URL}`, {responseType: 'blob'} )
  }

  getBackendDataByType(dataset_id: Global.DS,
    quality_id: Global.QUALITY_TAB,
      param_id: Global.VAR,
    dateFilter: DomainModel.DateFilter,
          type: string, 
  customParam?: DomainModel.CustomParams) {

    console.info(`DataService.getBackendDataByType( ${dataset_id}, ${quality_id}, ${param_id}, `
                + `filters: { from: ${Global.ff1_Date(dateFilter.from)}, `
                +              `to: ${Global.ff1_Date(dateFilter.to)} }) & type=${type}` )

    const THE_URL = this.getBackendUrl(dataset_id, quality_id, param_id, dateFilter, type, customParam)

    console.info(`DataService.getBackendDataByType: THE_URL=${THE_URL} `)

    return this.http.get(`${THE_URL}` )
  }

  getJsonServerData(queryString: string) {

    console.info(`GET ${URL_JSON_SERVER}/${queryString}`)

    return this.http.get(`${URL_JSON_SERVER}/${queryString}`)
  }


  //--------

  getBackendDataDistribution(dataset_id: Global.DS, zoom: string) {

    console.info(`DataService.getBackendDataDistribution( ${dataset_id}, ${zoom} ) ` )

    const THE_URL = `${this.urlBackend}v2/densidad/${Global.getDatasetId(dataset_id)}/p/${zoom}`

    console.info(`DataService.getBackendDataDistribution: THE_URL=${THE_URL} `)

    return this.http.get(`${THE_URL}` )
  }


}


