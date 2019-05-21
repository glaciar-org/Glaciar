// --[ Charts Commons]---
import { DataService } from '../services/data.service'
import { DomainModel, KEY } from '../model/domainmodel'
import * as Global from '../model/global'
import * as moment from 'moment'

export const MIN = 'MIN'
export const AVG = 'AVG'
export const MAX = 'MAX'

export const UP = 'UP'
export const DW = 'DW'

export function round2d(n) {
    return Math.round(n * 100) / 100
} 

/**
 * Retorna el valor mas grande entre máximos y umbrales
 */
export function getMaximoValor(self, max: number): number {

    let UMBRAL = self.glaciarStorage.getUmbral(self.param_id, self.chartConfig.awq_estandar)

    if (!self.chartConfig.umbral_max) UMBRAL.max = 0
    if (!self.chartConfig.umbral_avg) UMBRAL.avg = 0
    if (!self.chartConfig.umbral_min) UMBRAL.min = 0

    let maxValorActivo = Math.max(max, UMBRAL.max, UMBRAL.avg, UMBRAL.min)

    let K = 1.15
    if (UMBRAL.max * K > maxValorActivo) {
        maxValorActivo = maxValorActivo * K
    }

    return  maxValorActivo
}

export function getContext(dataset_id: Global.DS,
    quality_id: Global.QUALITY_TAB,
      param_id: Global.VAR,
    dateFilter: DomainModel.DateFilter,
     dateRange: DomainModel.DateRange): string {
    const context = `  d/${dataset_id}/q/${quality_id}/p/${param_id}/? `
                      + ` dateFilter= { from: ${Global.ff1_Date(dateFilter.from)},`
                                     + `  to: ${Global.ff1_Date(dateFilter.to)} }`
                       + ` dateRange= { minDate: ${Global.ff1_Date(dateRange.minDate)},`
                                   + `  minDate: ${Global.ff1_Date(dateRange.maxDate)} }`
    return context
}



export function getMenuTabs(dataService: DataService, dataset_id: Global.DS, param_id: Global.VAR): any {

    console.debug(`Charts.libs.getMenuTabs(${dataset_id}, ${param_id})`)

    const AIRQ   = [Global.AIRQ.CO, Global.AIRQ.CO2, Global.AIRQ.NO, Global.AIRQ.NO2]
    const WATERQ = [Global.WATERQ.Temp, Global.WATERQ.pH, Global.WATERQ.OD, Global.WATERQ.Redox, Global.WATERQ.Cond]
    const MENU   = { TABS: { AIRQ: [], WATERQ: [] }  }

    const dataset = dataService.getDatasets(dataset_id)[0]

    let style = (e) => (Global.pq(e) === param_id) ? 'active' : ''

    AIRQ.forEach(e => {
        const enabled = (dataset.params.AIRQ.indexOf(e) !== -1)
        MENU.TABS.AIRQ.push({ name: e, disabled: !enabled, style: style(e) })
    })

    WATERQ.forEach(e => {
        const enabled = (dataset.params.WATERQ.indexOf(e) !== -1)
        MENU.TABS.WATERQ.push({ name: e, disabled: !enabled, style: style(e) })
    })

    return MENU
}

export function getMenuTabs_DS05(viewHelper, selector: KEY.PARAM_DS05): any {

    console.debug(`Charts.libs.getMenuTabs_DS05(${JSON.stringify(viewHelper)}, ${selector})`)

    const MENU_COUNTRY = [ 
        { name: KEY.PARAM_DS05.COUNTRY_Argentina,      style: '', selected: false },
        { name: KEY.PARAM_DS05.COUNTRY_Bolivia,        style: '', selected: false },
        { name: KEY.PARAM_DS05.COUNTRY_Brazil,         style: '', selected: false },
        { name: KEY.PARAM_DS05.COUNTRY_Chile,          style: '', selected: false },
        { name: KEY.PARAM_DS05.COUNTRY_Germany,        style: '', selected: false },
    ]

    const MENU_SECTOR = [ 
        { name: KEY.PARAM_DS05.SECTOR_Electricity,     style: '', selected: false },
        { name: KEY.PARAM_DS05.SECTOR_Transportation,  style: '', selected: false },
        { name: KEY.PARAM_DS05.SECTOR_Construction,    style: '', selected: false },
        { name: KEY.PARAM_DS05.SECTOR_Other,           style: '', selected: false },
    ]

    let set = (MENU, value) => {
        for (let i = 0; i < MENU.length; i++) {
            if (MENU[i].name === value) {
                MENU[i].style = 'active'
                MENU[i].selected = true
            }
        }
    }

    set(MENU_SECTOR,  viewHelper.sectorSelected)
    set(MENU_COUNTRY, viewHelper.countrySelected)

    return (selector === KEY.PARAM_DS05.SELECT_xSectores) ? MENU_SECTOR 
         : (selector === KEY.PARAM_DS05.SELECT_xPaises)   ? MENU_COUNTRY : MENU_COUNTRY

}

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}


export function getlabelY(param: Global.VAR) {
    return `${Global.getParamIdDescription(param)} ${Global.getLabelUnits(param, true)}`
}

export function getlabelY_WRI(param: Global.VAR) {
    return `${Global.getParamIdDescription(param)} ${Global.getLabelUnitsWRI(true)}`
}


// --[ SON PRINCIAPLEMNTE DE AMCHART$] -------------



export const OPCION_HH       = 'H'
export const OPCION_DD       = 'D'
export const OPCION_WW       = 'W'
export const OPCION_MM       = 'M'
export const OPCION_YY       = 'Y'
export const OPCION_ZOOM_OUT = 'ZOOM_OUT'

export function mff1(m: moment.Moment) {
    return moment.utc(m).format('YYYY-MM-DD HH:mm:ss')
}

export function rangeToDate(opcion, firstDate, lastDate) {

    console.debug('rangeToDate(' + opcion + ')  ')

    console.debug('rangeToDate [firstDate=' + mff1(firstDate) + ', lastDate=' + mff1(lastDate) + '] ')

    const before_2HOUR = lastDate.clone().subtract(  2.10, 'h')
    const before_DAY   = lastDate.clone().subtract( 23, 'h')
    const before_WEEK  = lastDate.clone().subtract(  7, 'd')
    const before_MONTH = lastDate.clone().subtract( 30, 'd')
    const before_YEAR  = lastDate.clone().subtract(365, 'd')

    console.debug(`firstDate     = ${this.mff1(firstDate)}`)
    console.debug(`lastDate      = ${this.mff1(lastDate)}`)

    console.debug(`before_2HOUR  = ${this.mff1(before_2HOUR)}`)
    console.debug(`before_DAY    = ${this.mff1(before_DAY)}`)
    console.debug(`before_WEEK   = ${this.mff1(before_WEEK)}`)
    console.debug(`before_MONTH  = ${this.mff1(before_MONTH)}`)
    console.debug(`before_YEAR   = ${this.mff1(before_YEAR)}`)

    const RANGE_H = (firstDate.isBefore(before_DAY)) ? before_2HOUR : firstDate
    const RANGE_D = (firstDate.isBefore(before_DAY)) ? before_DAY : firstDate
    const RANGE_W = (firstDate.isBefore(before_WEEK)) ? before_WEEK : firstDate
    const RANGE_M = (firstDate.isBefore(before_MONTH)) ? before_MONTH : firstDate
    const RANGE_Y = (firstDate.isBefore(before_YEAR)) ? before_YEAR : firstDate

    const rango = {
        mDesde : '',  mHasta : '',
        dDesde : new Date(),  dHasta : new Date()
    }

    if (opcion === OPCION_HH) {  setRangoo(rango, RANGE_H, lastDate)  }
    if (opcion === OPCION_DD) {  setRangoo(rango, RANGE_D, lastDate)  }
    if (opcion === OPCION_WW) {  setRangoo(rango, RANGE_W, lastDate)  }
    if (opcion === OPCION_MM) {  setRangoo(rango, RANGE_M, lastDate)  }
    if (opcion === OPCION_YY) {  setRangoo(rango, RANGE_Y, lastDate)  }

    console.debug('rangeToDate(' + opcion + ') = [rango' + JSON.stringify(rango) + ']')

    return rango
}

function setRangoo(rango, desde, hasta) {

    rango.mDesde = desde
    rango.mHasta = hasta
    rango.dDesde = desde.toDate()
    rango.dHasta = hasta.toDate()

}

export function tooltipText(esMultiple: boolean, param_id: Global.VAR): string {

    return (esMultiple) ?
      `[font-size: 12px] {dateX.formatDate("yyyy-MM-dd   HH:mm ")} [/]
       [font-size: 12px] ${Global.getParamIdDescription(param_id)} [/]
       [font-size: 13px font-family: 'Archivo Narrow'] - Series 1: {value0}[/]
       [font-size: 13px font-family: 'Archivo Narrow'] - Series 2: {value1}[/]
       [font-size: 13px font-family: 'Archivo Narrow'] - Series 3: {value2}[/]
       [font-size: 13px font-family: 'Archivo Narrow'] - Series 4: {value3}[/]
       `
      :
      `[font-size: 12px] {dateX.formatDate("yyyy-MM-dd   HH:mm ")} [/]
       [font-size: 12px] ${Global.getParamIdDescription(param_id)} [/]
       [font-size: 13px font-family: 'Archivo Narrow'] - Serie: {value0}[/]
       `
  }

// --[ MOCKS DE DATOS ] -------------

// http://localhost:5000/dataset/MGSET_02_2010_2015/p/AIRQ_CO?from=2015-12-15&to=2015-12-17&type=json_x_amcharts4_multi_series_v3

export function getMockData_DS02_original() {

    console.debug(`getMockData_DS02()`)

    return [
        {"date":"2015-12-15T01:00:00.000Z","value0":"0.14"},
        {"date":"2015-12-15T02:00:00.000Z","value0":"0.14"},
        {"date":"2015-12-15T03:00:00.000Z","value0":"0.14"},
        {"date":"2015-12-15T04:00:00.000Z","value0":"0.13"},
        {"date":"2015-12-15T05:00:00.000Z","value0":"0.15"},
        {"date":"2015-12-15T06:00:00.000Z","value0":"0.20"},
        {"date":"2015-12-15T07:00:00.000Z","value0":"0.28"},
        {"date":"2015-12-15T08:00:00.000Z","value0":"0.27"},
        {"date":"2015-12-15T09:00:00.000Z","value0":"0.17"},
        {"date":"2015-12-15T10:00:00.000Z","value0":"0.15"},
        {"date":"2015-12-15T11:00:00.000Z","value0":"0.14"},
        {"date":"2015-12-15T12:00:00.000Z","value0":"0.12"},
        {"date":"2015-12-15T13:00:00.000Z","value0":"0.12"},
        {"date":"2015-12-15T14:00:00.000Z","value0":"0.12"},
        {"date":"2015-12-15T15:00:00.000Z","value0":"0.12"},
        {"date":"2015-12-15T16:00:00.000Z","value0":"0.12"},
        {"date":"2015-12-15T17:00:00.000Z","value0":"0.11"},
        {"date":"2015-12-15T18:00:00.000Z","value0":"0.09"},
        {"date":"2015-12-15T19:00:00.000Z","value0":"0.09"},
        {"date":"2015-12-15T20:00:00.000Z","value0":"0.11"},
        {"date":"2015-12-15T21:00:00.000Z","value0":"0.16"},
        {"date":"2015-12-15T22:00:00.000Z","value0":"0.11"},
        {"date":"2015-12-15T23:00:00.000Z","value0":"0.23"},
        {"date":"2015-12-16T00:00:00.000Z","value0":"0.61"},
        {"date":"2015-12-16T01:00:00.000Z","value0":"0.40"},
        {"date":"2015-12-16T02:00:00.000Z","value0":"0.28"},
        {"date":"2015-12-16T03:00:00.000Z","value0":"0.23"},
        {"date":"2015-12-16T04:00:00.000Z","value0":"0.17"},
        {"date":"2015-12-16T05:00:00.000Z","value0":"0.14"},
        {"date":"2015-12-16T06:00:00.000Z","value0":"0.17"},
        {"date":"2015-12-16T07:00:00.000Z","value0":"0.26"},
        {"date":"2015-12-16T08:00:00.000Z","value0":"0.22"},
        {"date":"2015-12-16T09:00:00.000Z","value0":"0.17"},
        {"date":"2015-12-16T10:00:00.000Z","value0":"0.19"},
        {"date":"2015-12-16T11:00:00.000Z","value0":"0.20"},
        {"date":"2015-12-16T12:00:00.000Z","value0":"0.24"},
        {"date":"2015-12-16T13:00:00.000Z","value0":"0.28"},
        {"date":"2015-12-16T14:00:00.000Z","value0":"0.23"},
        {"date":"2015-12-16T15:00:00.000Z","value0":"0.21"},
        {"date":"2015-12-16T16:00:00.000Z","value0":""},
        {"date":"2015-12-16T17:00:00.000Z","value0":""},
        {"date":"2015-12-16T18:00:00.000Z","value0":""},
        {"date":"2015-12-16T19:00:00.000Z","value0":""},
        {"date":"2015-12-16T20:00:00.000Z","value0":""},
        {"date":"2015-12-16T21:00:00.000Z","value0":""},
        {"date":"2015-12-16T22:00:00.000Z","value0":""},
        {"date":"2015-12-16T23:00:00.000Z","value0":""},
        {"date":"2015-12-17T00:00:00.000Z","value0":""},
        {"date":"2015-12-17T01:00:00.000Z","value0":""},
        {"date":"2015-12-17T02:00:00.000Z","value0":""},
        {"date":"2015-12-17T03:00:00.000Z","value0":""},
        {"date":"2015-12-17T04:00:00.000Z","value0":""},
        {"date":"2015-12-17T05:00:00.000Z","value0":""},
        {"date":"2015-12-17T06:00:00.000Z","value0":""},
        {"date":"2015-12-17T07:00:00.000Z","value0":""},
        {"date":"2015-12-17T08:00:00.000Z","value0":""},
        {"date":"2015-12-17T09:00:00.000Z","value0":""},
        {"date":"2015-12-17T10:00:00.000Z","value0":""},
        {"date":"2015-12-17T11:00:00.000Z","value0":""},
        {"date":"2015-12-17T12:00:00.000Z","value0":""},
        {"date":"2015-12-17T13:00:00.000Z","value0":"0.49"},
        {"date":"2015-12-17T14:00:00.000Z","value0":"0.34"},
        {"date":"2015-12-17T15:00:00.000Z","value0":"0.29"},
        {"date":"2015-12-17T16:00:00.000Z","value0":"0.27"},
        {"date":"2015-12-17T17:00:00.000Z","value0":"0.26"},
        {"date":"2015-12-17T18:00:00.000Z","value0":"0.24"},
        {"date":"2015-12-17T19:00:00.000Z","value0":"0.23"},
        {"date":"2015-12-17T20:00:00.000Z","value0":"0.26"},
        {"date":"2015-12-17T21:00:00.000Z","value0":"0.29"},
        {"date":"2015-12-17T22:00:00.000Z","value0":"0.29"},
        {"date":"2015-12-17T23:00:00.000Z","value0":"0.26"}
    ]
}



export function getMockData_DS02_Un_DIA_VACIO() {

    console.debug(`getMockData_DS02()`)

    return [

        // Día 15
        {"date":"2015-12-15T01:00:00.000Z","value0":"0.14"},
        {"date":"2015-12-15T02:00:00.000Z","value0":"0.14"},
        {"date":"2015-12-15T03:00:00.000Z","value0":"0.14"},
        {"date":"2015-12-15T04:00:00.000Z","value0":"0.13"},
        {"date":"2015-12-15T05:00:00.000Z","value0":"0.15"},
        {"date":"2015-12-15T06:00:00.000Z","value0":"0.20"},
        {"date":"2015-12-15T07:00:00.000Z","value0":"0.28"},
        {"date":"2015-12-15T08:00:00.000Z","value0":"0.27"},
        {"date":"2015-12-15T09:00:00.000Z","value0":"0.17"},
        {"date":"2015-12-15T10:00:00.000Z","value0":"0.15"},
        {"date":"2015-12-15T11:00:00.000Z","value0":"0.14"},
        {"date":"2015-12-15T12:00:00.000Z","value0":"0.12"},
        {"date":"2015-12-15T13:00:00.000Z","value0":"0.12"},
        {"date":"2015-12-15T14:00:00.000Z","value0":"0.12"},
        {"date":"2015-12-15T15:00:00.000Z","value0":"0.12"},
        {"date":"2015-12-15T16:00:00.000Z","value0":"0.12"},
        {"date":"2015-12-15T17:00:00.000Z","value0":"0.11"},
        {"date":"2015-12-15T18:00:00.000Z","value0":"0.09"},
        {"date":"2015-12-15T19:00:00.000Z","value0":"0.09"},
        {"date":"2015-12-15T20:00:00.000Z","value0":"0.11"},
        {"date":"2015-12-15T21:00:00.000Z","value0":"0.16"},
        {"date":"2015-12-15T22:00:00.000Z","value0":"0.11"},
        {"date":"2015-12-15T23:00:00.000Z","value0":"0.23"},

        // Día 16
        {"date":"2015-12-16T00:00:00.000Z","value0":""},
        {"date":"2015-12-16T01:00:00.000Z","value0":""},
        {"date":"2015-12-16T02:00:00.000Z","value0":""},
        {"date":"2015-12-16T03:00:00.000Z","value0":""},
        {"date":"2015-12-16T04:00:00.000Z","value0":""},
        {"date":"2015-12-16T05:00:00.000Z","value0":""},
        {"date":"2015-12-16T06:00:00.000Z","value0":""},
        {"date":"2015-12-16T07:00:00.000Z","value0":""},
        {"date":"2015-12-16T08:00:00.000Z","value0":""},
        {"date":"2015-12-16T09:00:00.000Z","value0":""},
        {"date":"2015-12-16T10:00:00.000Z","value0":""},
        {"date":"2015-12-16T11:00:00.000Z","value0":""},
        {"date":"2015-12-16T12:00:00.000Z","value0":""},
        {"date":"2015-12-16T13:00:00.000Z","value0":""},
        {"date":"2015-12-16T14:00:00.000Z","value0":""},
        {"date":"2015-12-16T15:00:00.000Z","value0":""},
        {"date":"2015-12-16T16:00:00.000Z","value0":""},
        {"date":"2015-12-16T17:00:00.000Z","value0":""},
        {"date":"2015-12-16T18:00:00.000Z","value0":""},
        {"date":"2015-12-16T19:00:00.000Z","value0":""},
        {"date":"2015-12-16T20:00:00.000Z","value0":""},
        {"date":"2015-12-16T21:00:00.000Z","value0":""},
        {"date":"2015-12-16T22:00:00.000Z","value0":""},
        {"date":"2015-12-16T23:00:00.000Z","value0":""},

        // Dia 17
        {"date":"2015-12-17T00:00:00.000Z","value0":"0.61"},
        {"date":"2015-12-17T01:00:00.000Z","value0":"0.40"},
        {"date":"2015-12-17T02:00:00.000Z","value0":"0.28"},
        {"date":"2015-12-17T03:00:00.000Z","value0":"0.23"},
        {"date":"2015-12-17T04:00:00.000Z","value0":"0.17"},
        {"date":"2015-12-17T05:00:00.000Z","value0":"0.14"},
        {"date":"2015-12-17T06:00:00.000Z","value0":"0.17"},
        {"date":"2015-12-17T07:00:00.000Z","value0":"0.26"},
        {"date":"2015-12-17T08:00:00.000Z","value0":"0.22"},
        {"date":"2015-12-17T09:00:00.000Z","value0":"0.17"},
        {"date":"2015-12-17T10:00:00.000Z","value0":"0.19"},
        {"date":"2015-12-17T11:00:00.000Z","value0":"0.20"},
        {"date":"2015-12-17T12:00:00.000Z","value0":"0.24"},
        {"date":"2015-12-17T13:00:00.000Z","value0":"0.28"},
        {"date":"2015-12-17T14:00:00.000Z","value0":"0.23"},
        {"date":"2015-12-17T15:00:00.000Z","value0":"0.21"},
        {"date":"2015-12-17T16:00:00.000Z","value0":"0.27"},
        {"date":"2015-12-17T17:00:00.000Z","value0":"0.26"},
        {"date":"2015-12-17T18:00:00.000Z","value0":"0.24"},
        {"date":"2015-12-17T19:00:00.000Z","value0":"0.23"},
        {"date":"2015-12-17T20:00:00.000Z","value0":"0.26"},
        {"date":"2015-12-17T21:00:00.000Z","value0":"0.29"},
        {"date":"2015-12-17T22:00:00.000Z","value0":"0.29"},
        {"date":"2015-12-17T23:00:00.000Z","value0":"0.26"}
    ]
}



//--[ Del Componente Dispersion ]---
export function getMockData_YYYY() {
    console.debug(`getMockData_YYYY()`)

    return  [
      {'_id':{'year':2009},'count':7292, 'FECHA_HORA':'2009-01-10T16:00:00.000Z', 'SOY_FAKE': 'SI'},
      {'_id':{'year':2010},'count':33700,'FECHA_HORA':'2010-01-01T00:00:00.000Z', 'SOY_FAKE': 'SI'},
      {'_id':{'year':2011},'count':35040,'FECHA_HORA':'2011-01-01T00:00:00.000Z', 'SOY_FAKE': 'SI'},
      {'_id':{'year':2012},'count':34944,'FECHA_HORA':'2012-01-01T00:00:00.000Z', 'SOY_FAKE': 'SI'},
      {'_id':{'year':2013},'count':35040,'FECHA_HORA':'2013-01-01T00:00:00.000Z', 'SOY_FAKE': 'SI'},
      {'_id':{'year':2014},'count':34944,'FECHA_HORA':'2014-01-01T00:00:00.000Z', 'SOY_FAKE': 'SI'},
      {'_id':{'year':2015},'count':27696,'FECHA_HORA':'2015-01-01T00:00:00.000Z', 'SOY_FAKE': 'SI'},
      {'_id':{'year':2016},'count':33848,'FECHA_HORA':'2016-01-01T00:00:00.000Z', 'SOY_FAKE': 'SI'},
      {'_id':{'year':2017},'count':34608,'FECHA_HORA':'2017-01-01T00:00:00.000Z', 'SOY_FAKE': 'SI'},
      {'_id':{'year':2018},'count':25776,'FECHA_HORA':'2018-01-01T00:00:00.000Z', 'SOY_FAKE': 'SI'}
    ]
  }

export function getMockData_MM() {
    console.debug(`getMockData_MM()`)
    return  [
        {'_id':{'year':2009,'month':1},'count':188,'FECHA_HORA':'2009-01-10T16:00:00.000Z'},
        {'_id':{'year':2009,'month':2},'count':192,'FECHA_HORA':'2009-02-10T00:00:00.000Z'},
        {'_id':{'year':2009,'month':3},'count':96,'FECHA_HORA':'2009-03-12T00:00:00.000Z'},
        {'_id':{'year':2009,'month':4},'count':240,'FECHA_HORA':'2009-04-10T12:00:00.000Z'},
        {'_id':{'year':2009,'month':5},'count':288,'FECHA_HORA':'2009-05-10T00:00:00.000Z'},
        {'_id':{'year':2009,'month':6},'count':288,'FECHA_HORA':'2009-06-10T01:00:00.000Z'},
        {'_id':{'year':2009,'month':7},'count':288,'FECHA_HORA':'2009-07-10T00:00:00.000Z'},
        {'_id':{'year':2009,'month':8},'count':288,'FECHA_HORA':'2009-08-10T00:00:00.000Z'},
        {'_id':{'year':2009,'month':9},'count':240,'FECHA_HORA':'2009-09-10T00:00:00.000Z'},
        {'_id':{'year':2009,'month':10},'count':1296,'FECHA_HORA':'2009-10-13T00:00:00.000Z'},
        {'_id':{'year':2009,'month':11},'count':1920,'FECHA_HORA':'2009-11-11T00:00:00.000Z'},
        {'_id':{'year':2009,'month':12},'count':1968,'FECHA_HORA':'2009-12-10T13:00:00.000Z'},
        {'_id':{'year':2010,'month':1},'count':2928,'FECHA_HORA':'2010-01-01T00:00:00.000Z'},
        {'_id':{'year':2010,'month':2},'count':2352,'FECHA_HORA':'2010-02-01T00:00:00.000Z'},
        {'_id':{'year':2010,'month':3},'count':2976,'FECHA_HORA':'2010-03-01T00:00:00.000Z'},
        {'_id':{'year':2010,'month':4},'count':2832,'FECHA_HORA':'2010-04-01T02:00:00.000Z'},
        {'_id':{'year':2010,'month':5},'count':2640,'FECHA_HORA':'2010-05-01T00:00:00.000Z'},
        {'_id':{'year':2010,'month':6},'count':2832,'FECHA_HORA':'2010-06-01T00:00:00.000Z'},
        {'_id':{'year':2010,'month':7},'count':2644,'FECHA_HORA':'2010-07-01T00:00:00.000Z'},
        {'_id':{'year':2010,'month':8},'count':2928,'FECHA_HORA':'2010-08-01T00:00:00.000Z'},
        {'_id':{'year':2010,'month':9},'count':2832,'FECHA_HORA':'2010-09-01T00:00:00.000Z'},
        {'_id':{'year':2010,'month':10},'count':2928,'FECHA_HORA':'2010-10-01T00:00:00.000Z'},
        {'_id':{'year':2010,'month':11},'count':2880,'FECHA_HORA':'2010-11-01T00:00:00.000Z'},
        {'_id':{'year':2010,'month':12},'count':2928,'FECHA_HORA':'2010-12-01T00:00:00.000Z'},
        {'_id':{'year':2011,'month':1},'count':2976,'FECHA_HORA':'2011-01-01T00:00:00.000Z'},
        {'_id':{'year':2011,'month':2},'count':2688,'FECHA_HORA':'2011-02-01T00:00:00.000Z'},
        {'_id':{'year':2011,'month':3},'count':2976,'FECHA_HORA':'2011-03-01T00:00:00.000Z'},
        {'_id':{'year':2011,'month':4},'count':2880,'FECHA_HORA':'2011-04-01T00:00:00.000Z'},
        {'_id':{'year':2011,'month':5},'count':2976,'FECHA_HORA':'2011-05-01T00:00:00.000Z'},
        {'_id':{'year':2011,'month':6},'count':2880,'FECHA_HORA':'2011-06-01T00:00:00.000Z'},
        {'_id':{'year':2011,'month':7},'count':2976,'FECHA_HORA':'2011-07-01T00:00:00.000Z'},
        {'_id':{'year':2011,'month':8},'count':2976,'FECHA_HORA':'2011-08-01T00:00:00.000Z'},
        {'_id':{'year':2011,'month':9},'count':2880,'FECHA_HORA':'2011-09-01T00:00:00.000Z'},
        {'_id':{'year':2011,'month':10},'count':2976,'FECHA_HORA':'2011-10-01T00:00:00.000Z'},
        {'_id':{'year':2011,'month':11},'count':2880,'FECHA_HORA':'2011-11-01T00:00:00.000Z'},
        {'_id':{'year':2011,'month':12},'count':2976,'FECHA_HORA':'2011-12-01T00:00:00.000Z'},
        {'_id':{'year':2012,'month':1},'count':2976,'FECHA_HORA':'2012-01-01T00:00:00.000Z'},
        {'_id':{'year':2012,'month':2},'count':2784,'FECHA_HORA':'2012-02-01T01:00:00.000Z'},
        {'_id':{'year':2012,'month':3},'count':2976,'FECHA_HORA':'2012-03-01T00:00:00.000Z'},
        {'_id':{'year':2012,'month':4},'count':2784,'FECHA_HORA':'2012-04-01T00:00:00.000Z'},
        {'_id':{'year':2012,'month':5},'count':2928,'FECHA_HORA':'2012-05-01T00:00:00.000Z'},
        {'_id':{'year':2012,'month':6},'count':2832,'FECHA_HORA':'2012-06-01T12:00:00.000Z'},
        {'_id':{'year':2012,'month':7},'count':2976,'FECHA_HORA':'2012-07-01T00:00:00.000Z'},
        {'_id':{'year':2012,'month':8},'count':2976,'FECHA_HORA':'2012-08-01T00:00:00.000Z'},
        {'_id':{'year':2012,'month':9},'count':2880,'FECHA_HORA':'2012-09-01T02:00:00.000Z'},
        {'_id':{'year':2012,'month':10},'count':2976,'FECHA_HORA':'2012-10-01T00:00:00.000Z'},
        {'_id':{'year':2012,'month':11},'count':2880,'FECHA_HORA':'2012-11-01T01:00:00.000Z'},
        {'_id':{'year':2012,'month':12},'count':2976,'FECHA_HORA':'2012-12-01T00:00:00.000Z'},
        {'_id':{'year':2013,'month':1},'count':2976,'FECHA_HORA':'2013-01-01T00:00:00.000Z'},
        {'_id':{'year':2013,'month':2},'count':2688,'FECHA_HORA':'2013-02-01T00:00:00.000Z'},
        {'_id':{'year':2013,'month':3},'count':2976,'FECHA_HORA':'2013-03-01T00:00:00.000Z'},
        {'_id':{'year':2013,'month':4},'count':2880,'FECHA_HORA':'2013-04-01T00:00:00.000Z'},
        {'_id':{'year':2013,'month':5},'count':2976,'FECHA_HORA':'2013-05-01T00:00:00.000Z'},
        {'_id':{'year':2013,'month':6},'count':2880,'FECHA_HORA':'2013-06-01T00:00:00.000Z'},
        {'_id':{'year':2013,'month':7},'count':2976,'FECHA_HORA':'2013-07-01T00:00:00.000Z'},
        {'_id':{'year':2013,'month':8},'count':2976,'FECHA_HORA':'2013-08-01T00:00:00.000Z'},
        {'_id':{'year':2013,'month':9},'count':2880,'FECHA_HORA':'2013-09-01T00:00:00.000Z'},
        {'_id':{'year':2013,'month':10},'count':2976,'FECHA_HORA':'2013-10-01T00:00:00.000Z'},
        {'_id':{'year':2013,'month':11},'count':2880,'FECHA_HORA':'2013-11-01T00:00:00.000Z'},
        {'_id':{'year':2013,'month':12},'count':2976,'FECHA_HORA':'2013-12-01T00:00:00.000Z'},
        {'_id':{'year':2014,'month':1},'count':2976,'FECHA_HORA':'2014-01-01T00:00:00.000Z'},
        {'_id':{'year':2014,'month':2},'count':2688,'FECHA_HORA':'2014-02-01T00:00:00.000Z'},
        {'_id':{'year':2014,'month':3},'count':2976,'FECHA_HORA':'2014-03-01T00:00:00.000Z'},
        {'_id':{'year':2014,'month':4},'count':2880,'FECHA_HORA':'2014-04-01T00:00:00.000Z'},
        {'_id':{'year':2014,'month':5},'count':2976,'FECHA_HORA':'2014-05-01T00:00:00.000Z'},
        {'_id':{'year':2014,'month':6},'count':2880,'FECHA_HORA':'2014-06-01T02:00:00.000Z'},
        {'_id':{'year':2014,'month':7},'count':2976,'FECHA_HORA':'2014-07-01T00:00:00.000Z'},
        {'_id':{'year':2014,'month':8},'count':2976,'FECHA_HORA':'2014-08-01T00:00:00.000Z'},
        {'_id':{'year':2014,'month':9},'count':2784,'FECHA_HORA':'2014-09-01T00:00:00.000Z'},
        {'_id':{'year':2014,'month':10},'count':2976,'FECHA_HORA':'2014-10-01T00:00:00.000Z'},
        {'_id':{'year':2014,'month':11},'count':2880,'FECHA_HORA':'2014-11-01T01:00:00.000Z'},
        {'_id':{'year':2014,'month':12},'count':2976,'FECHA_HORA':'2014-12-01T01:00:00.000Z'},
        {'_id':{'year':2015,'month':1},'count':2784,'FECHA_HORA':'2015-01-01T00:00:00.000Z'},
        {'_id':{'year':2015,'month':2},'count':2496,'FECHA_HORA':'2015-02-01T00:00:00.000Z'},
        {'_id':{'year':2015,'month':3},'count':2688,'FECHA_HORA':'2015-03-01T01:00:00.000Z'},
        {'_id':{'year':2015,'month':4},'count':2592,'FECHA_HORA':'2015-04-01T00:00:00.000Z'},
        {'_id':{'year':2015,'month':5},'count':2784,'FECHA_HORA':'2015-05-01T00:00:00.000Z'},
        {'_id':{'year':2015,'month':6},'count':2688,'FECHA_HORA':'2015-06-01T00:00:00.000Z'},
        {'_id':{'year':2015,'month':7},'count':2784,'FECHA_HORA':'2015-07-01T01:00:00.000Z'},
        {'_id':{'year':2015,'month':8},'count':2784,'FECHA_HORA':'2015-08-01T02:00:00.000Z'},
        {'_id':{'year':2015,'month':9},'count':2688,'FECHA_HORA':'2015-09-01T00:00:00.000Z'},
        {'_id':{'year':2015,'month':10},'count':1488,'FECHA_HORA':'2015-10-01T01:00:00.000Z'},
        {'_id':{'year':2015,'month':11},'count':960,'FECHA_HORA':'2015-11-01T01:00:00.000Z'},
        {'_id':{'year':2015,'month':12},'count':960,'FECHA_HORA':'2015-12-01T00:00:00.000Z'},
        {'_id':{'year':2016,'month':1},'count':2832,'FECHA_HORA':'2016-01-01T00:00:00.000Z'},
        {'_id':{'year':2016,'month':2},'count':2692,'FECHA_HORA':'2016-02-01T00:00:00.000Z'},
        {'_id':{'year':2016,'month':3},'count':2736,'FECHA_HORA':'2016-03-01T12:00:00.000Z'},
        {'_id':{'year':2016,'month':4},'count':2836,'FECHA_HORA':'2016-04-01T00:00:00.000Z'},
        {'_id':{'year':2016,'month':5},'count':2880,'FECHA_HORA':'2016-05-01T00:00:00.000Z'},
        {'_id':{'year':2016,'month':6},'count':2880,'FECHA_HORA':'2016-06-01T00:00:00.000Z'},
        {'_id':{'year':2016,'month':7},'count':2928,'FECHA_HORA':'2016-07-01T01:00:00.000Z'},
        {'_id':{'year':2016,'month':8},'count':2784,'FECHA_HORA':'2016-08-01T00:00:00.000Z'},
        {'_id':{'year':2016,'month':9},'count':2736,'FECHA_HORA':'2016-09-01T00:00:00.000Z'},
        {'_id':{'year':2016,'month':10},'count':2832,'FECHA_HORA':'2016-10-01T00:00:00.000Z'},
        {'_id':{'year':2016,'month':11},'count':2784,'FECHA_HORA':'2016-11-01T00:00:00.000Z'},
        {'_id':{'year':2016,'month':12},'count':2928,'FECHA_HORA':'2016-12-01T00:00:00.000Z'},
        {'_id':{'year':2017,'month':1},'count':2880,'FECHA_HORA':'2017-01-01T00:00:00.000Z'},
        {'_id':{'year':2017,'month':2},'count':2448,'FECHA_HORA':'2017-02-01T00:00:00.000Z'},
        {'_id':{'year':2017,'month':3},'count':2976,'FECHA_HORA':'2017-03-01T00:00:00.000Z'},
        {'_id':{'year':2017,'month':4},'count':2832,'FECHA_HORA':'2017-04-01T03:00:00.000Z'},
        {'_id':{'year':2017,'month':5},'count':2976,'FECHA_HORA':'2017-05-01T00:00:00.000Z'},
        {'_id':{'year':2017,'month':6},'count':2880,'FECHA_HORA':'2017-06-01T00:00:00.000Z'},
        {'_id':{'year':2017,'month':7},'count':2928,'FECHA_HORA':'2017-07-01T00:00:00.000Z'},
        {'_id':{'year':2017,'month':8},'count':2976,'FECHA_HORA':'2017-08-01T00:00:00.000Z'},
        {'_id':{'year':2017,'month':9},'count':2880,'FECHA_HORA':'2017-09-01T00:00:00.000Z'},
        {'_id':{'year':2017,'month':10},'count':2976,'FECHA_HORA':'2017-10-01T00:00:00.000Z'},
        {'_id':{'year':2017,'month':11},'count':2880,'FECHA_HORA':'2017-11-01T00:00:00.000Z'},
        {'_id':{'year':2017,'month':12},'count':2976,'FECHA_HORA':'2017-12-01T00:00:00.000Z'},
        {'_id':{'year':2018,'month':1},'count':2976,'FECHA_HORA':'2018-01-01T00:00:00.000Z'},
        {'_id':{'year':2018,'month':2},'count':2688,'FECHA_HORA':'2018-02-01T00:00:00.000Z'},
        {'_id':{'year':2018,'month':3},'count':2976,'FECHA_HORA':'2018-03-01T00:00:00.000Z'},
        {'_id':{'year':2018,'month':4},'count':2880,'FECHA_HORA':'2018-04-01T00:00:00.000Z'},
        {'_id':{'year':2018,'month':5},'count':2976,'FECHA_HORA':'2018-05-01T01:00:00.000Z'},
        {'_id':{'year':2018,'month':6},'count':2880,'FECHA_HORA':'2018-06-01T00:00:00.000Z'},
        {'_id':{'year':2018,'month':7},'count':2880,'FECHA_HORA':'2018-07-01T00:00:00.000Z'},
        {'_id':{'year':2018,'month':8},'count':2880,'FECHA_HORA':'2018-08-01T01:00:00.000Z'},
        {'_id':{'year':2018,'month':9},'count':2640,'FECHA_HORA':'2018-09-01T00:00:00.000Z'}
    ]
}

