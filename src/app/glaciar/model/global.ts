import { DomainModel, KEY } from './domainmodel'
import * as moment from 'moment'


/**
 * TDD of Global.ts: in debug.component.spec
 * http://localhost:9876/debug.html?spec=DebugComponent
 */
export const SD = Number.NEGATIVE_INFINITY // '-'
export const NOT_DEF = 'S/D'

export enum VAR {
    CO    = 'CO',
    CO2   = 'CO2',
    NO    = 'NO',
    NO2   = 'NO2',
    
    Temp  = 'Temp',
    pH    = 'pH',
    OD    = 'OD',
    Redox = 'Redox',
    Cond  = 'Cond',

    WorkInProgress = 'WIP',
}

export enum DS {
    DS01      = 'DS01',
    DS02      = 'DS02',
    DS03      = 'DS03',
    DS04      = 'DS04',
    DS05      = 'DS05',
    DS05a     = 'DS05a',
    DS05b     = 'DS05b',
}

export enum DS_NAME {
    DS01      = 'MGSET_01_2009_2018',
    DS02      = 'MGSET_02_2010_2015',
    DS03      = 'MGSET_03_2015_2017',
    DS04      = 'MGSET_04_2010_2015-PRN',
    DS05_a    = 'MGSET_05_WRI_CAIT_EESS_CO2',
    DS05_b    = 'MGSET_05_WRI_CAIT_ETOT_CO2',

    // Estaciones
    DS05_EESS = 'WRI_CAIT_EESS_CO2',
    DS05_ETOT = 'WRI_CAIT_ETOT_C02',

    // Estaciones 
    DS01_BO   = 'MGSET_01_2009_2018_BO',
    DS01_PA   = 'MGSET_01_2009_2018_PA',
    DS01_CO   = 'MGSET_01_2009_2018_CO',
    DS01_CE   = 'MGSET_01_2009_2018_CE',

    // Estaciones 
    DS04_PRN  = 'DATASET-PRN-{{param}}',
    DS04_GGY  = 'DATASET-GGY-{{param}}',
    DS04_PGY  = 'DATASET-PGY-{{param}}',
}

export enum AIRQ {
    CO    = 'AIRQ_CO',
    CO2   = 'AIRQ_CO2',
    NO    = 'AIRQ_NO',
    NO2   = 'AIRQ_NO2',
}

export enum WATERQ {
    Temp  = 'WATERQ_Temp',
    pH    = 'WATERQ_pH',
    OD    = 'WATERQ_OD',
    Redox = 'WATERQ_Redox',
    Cond  = 'WATERQ_Cond',
}

export enum QUALITY_TAB {
    AIRQ   = 'AIRQ',
    WATERQ = 'WATERQ'
}

export const DATASRC_PROD   = '<**{DATASRC_PROD    :: from mongob      }**>'
export const DATASRC_DESA   = '<**{DATASRC_DESA    :: data/chart.js    }**>'
export const IAM_DOING_TDD  = 'IAM DOING TDD'

export const GlaciaR_Viedma__RUNTIME         = 'GlaciaR_Viedma__RUNTIME'
export const GlaciaR_Viedma__RUNTIME_MASTER  = 'HEROKU [MASTER]'
export const GlaciaR_Viedma__RUNTIME_DEVELOP = 'HEROKU [DEVELOP]'

export enum GlaciaR_CHARTLIB  {
    CHARTJS       = 'CHARTJS',
    C3_D3         = 'C3_D3',
    AMCHARTS4     = 'AMCHARTS4',
}

export const GlaciaR_Viedma__CHARTLIB = 'GlaciaR_Viedma__CHARTLIB'




export enum HOST_BACKEND  {
    UPSALA              = 'HOST_BACKEND.UPSALA',
    UPSALA_LOCALHIP     = 'http://192.168.1.120:5000/',
    UPSALA_LOCALHOST    = 'http://localhost:5000/',
    UPSALA_DEVELOP      = 'https://glaciar-upsala-backend-dev.herokuapp.com/',
    UPSALA_MASTER       = 'https://glaciar-upsala-backend.herokuapp.com/',
    UPSALA_ORG_DEVELOP  = 'https://glaciar-org-backend-develop.herokuapp.com/',
    UPSALA_ORG_MASTER   = 'https://glaciar-org-backend.herokuapp.com/',
}

export enum RES_TYPE  {
    TEXT = 'text',
    CSV  = 'csv',
    JSON = 'json',                              // === json_x_chartjs_s,
    JSON_for_CHARTJS_S = 'json_x_chartjs_s',    // === json,
    JSON_for_CHARTJS_M = 'json_x_chartjs_m',
    JSON_for_CHARTJS_MULTI_SERIES = 'json_x_chartjs_multi_series',
    JSON_for_AMCHARTS4_MULTI_SERIES    = 'json_x_amcharts4_multi_series',
    JSON_for_AMCHARTS4_MULTI_SERIES_V2 = 'json_x_amcharts4_multi_series_v2',
    JSON_for_AMCHARTS4_MULTI_SERIES_V3 = 'json_x_amcharts4_multi_series_v3',
    JSON_for_HIGHSTOCK = 'json_x_highstock',
}


// -- [Format Dates] ----
// Recordar utilizar moment.utc para que no me cambie un día ...
export function ff1_Date(date: Date): string { return moment.utc(date).format('DD-MM-YYYY') }
export function ff2_Date(date: Date): string { return moment.utc(date).format('YYYY-MM-DD') }
export function ff3_Date(date: Date): string { return moment.utc(date).format('YYYYMMDD') }

export function ff1(m: any): string { return moment.utc(m).format('YYYY-MM-DD HH:mm:ss') }

export function isHost_Local(): boolean {
    return window.location.href.includes('http://localhost')
        || window.location.href.includes('http://127.0.0.1')
        || window.location.href.includes('http://192.168')
}

export function isHost_Prod(): boolean {
    return window.location.href.includes('glaciar-viedma.herokuapp.com')
        || window.location.href.includes('glaciar-org.herokuapp.com')
        || window.location.href.includes('glaciar.org')
        
}

export function isHost_Dev(): boolean {
    return window.location.href.includes('glaciar-viedma-dev.herokuapp.com')
        || window.location.href.includes(              '-dev.herokuapp.com')
        || window.location.href.includes(          '-develop.herokuapp.com')  
}

export function isLabMode(): boolean {
    console.debug(`Global.isLabMode("${window.location.href}")`)
    return window.location.href.includes('/lab/wip/')
}

export function isTDD_mode(): boolean {
    return window.location.href.includes('http://localhost:9876/?id=')
        || window.location.href.includes(                ':9876/?id=')
        || window.location.href.includes('http://localhost:9876/debug.html?spec=')
        || window.location.href.includes(                ':9876/debug.html?spec=')
        
}

// Global.getValue(Global.HOST_BACKEND.UPSALA)
// Global.getValue(Globa.GlaciaR_Viedma__CHARTLIB)
export function getValue(key: string): string {

    if (key === HOST_BACKEND.UPSALA) {
        if (isHost_Local()) { return HOST_BACKEND.UPSALA_LOCALHIP }
        // if (isHost_Local()) { return HOST_BACKEND.UPSALA_LOCALHOST }
        // if (isHost_Dev())   { return HOST_BACKEND.UPSALA_DEVELOP }
        // if (isHost_Prod())  { return HOST_BACKEND.UPSALA_MASTER }
        if (isHost_Dev())   { return HOST_BACKEND.UPSALA_ORG_DEVELOP }
        if (isHost_Prod())  { return HOST_BACKEND.UPSALA_ORG_MASTER }
    }

    if (key === GlaciaR_Viedma__CHARTLIB) {

        // if (isHost_Local()) { return 'nothing' }
        // if (isHost_Local()) { return GlaciaR_CHARTLIB.C3_D3 }

        // if (isHost_Dev())   { return GlaciaR_CHARTLIB.C3_D3 }
        
        if (isHost_Local()) { return GlaciaR_CHARTLIB.AMCHARTS4 }
        if (isHost_Dev())   { return GlaciaR_CHARTLIB.AMCHARTS4 }
        if (isHost_Prod())  { return GlaciaR_CHARTLIB.AMCHARTS4 }
    }

}

export function isValue_CHARTLIB(value: string): boolean {
    return getValue(GlaciaR_Viedma__CHARTLIB) === value
}

export function  parseVar(param: string): VAR {

    if (param === VAR.CO)    { return VAR.CO }
    if (param === VAR.CO2)   { return VAR.CO2 }
    if (param === VAR.NO)    { return VAR.NO }
    if (param === VAR.NO2)   { return VAR.NO2 }

    if (param === VAR.Temp)  { return VAR.Temp }
    if (param === VAR.pH)    { return VAR.pH }
    if (param === VAR.OD)    { return VAR.OD }
    if (param === VAR.Redox) { return VAR.Redox }
    if (param === VAR.Cond)  { return VAR.Cond }

    return VAR.WorkInProgress
}

export function isParamAIRQ(param: VAR): boolean {
    return (param === VAR.CO || param === VAR.CO2 || 
            param === VAR.NO || param === VAR.NO2 )
}

export function isParamWATERQ(param: VAR): boolean {
    return (param === VAR.Temp || param === VAR.pH    || 
            param === VAR.OD   || param === VAR.Redox || param == VAR.Cond)
}

export function getQuality(param: VAR): QUALITY_TAB {
    return (isParamAIRQ  (param)) ? QUALITY_TAB.AIRQ
         : (isParamWATERQ(param)) ? QUALITY_TAB.WATERQ
         : QUALITY_TAB.AIRQ // Just in Case 
}

export function  getLabelUnits(param: VAR, s?: boolean): string {

    if (param === VAR.CO)  { return (s) ? 'ppm'   : 'Partes por millón (PPM)' }
    if (param === VAR.CO2) { return (s) ? 'ppm'   : 'Partes por millón (PPM)' }
    if (param === VAR.NO)  { return (s) ? 'ppb'   : 'Partes por billón (PPB)' }
    if (param === VAR.NO2) { return (s) ? 'ppb'   : 'Partes por billón (PPB)' }

    if (param === VAR.Temp) {  return (s) ? '°C' : 'Grados Celsius (°C)' }
    if (param === VAR.pH) {    return (s) ? 'pH' : 'pH' }
    if (param === VAR.OD) {    return (s) ?  '%' : 'Porcentaje de Saturación (%)' }
    if (param === VAR.Redox) { return (s) ? 'mV' : 'Milivoltios (mV)' }
    if (param === VAR.Cond) {  return (s) ? 'uS/cm' : 'Microsiemens por centímetros (uS/cm)' }

    return 'Unidades.'
}

export function  getLabelUnitsWRI(s?: boolean): string {
    return (s) ? 'MtCO2' : 'Millones de toneladas de CO2'    
}

/**
 *                     WRI_CAIT_EESS_CO2_Argentina_Construction   <-- dataset_name
 * DS05_a  = 'MGSET_05_WRI_CAIT_EESS_CO2',
 * @param dataset_name 
 * @param label 
 */
export function getLabelEstacion(dataset_name: DS_NAME, label: string, param: string): string {

    console.debug(`getLabelEstacion('${dataset_name}', '${label}', '${param}')`)
    // -58,3663735070165 -34,6252584813295 LA BOCA
    // -58,4320717652753 -34,6066080998154 CENTENARIO
    // -58,391552893462  -34,5995643433432 CORDOBA
    // -58,4053598727298 -34,5834529467442 PALERMO

    if (dataset_name.indexOf(DS_NAME.DS05_EESS)!=-1) {
        let pais   = toSpanish(dataset_name.split('_')[4])
        let sector = toSpanish(dataset_name.split('_')[5])
        return (label === KEY.PARAM_DS05.SELECT_xPaises) ? sector : pais
    }

    // DS04: 
    // DS04_PRN  = 'DATASET-PRN-{{param}}',  Río estación Paraná de las Palmas, Zárate, Buenos Aires
    // DS04_GGY  = 'DATASET-GGY-{{param}}',  Río estación Gualeguay, Villaguay, Entre Ríos
    // DS04_PGY  = 'DATASET-PGY-{{param}}',  Río estación Paraguay, Puerto Pilcomayo, Formosa
    // if (dataset_name.indexOf("{{param}}")!=-1) {
    //     return dataset_name.replace("{{param}}", param)
    // }

    if (dataset_name === DS_NAME.DS04_PRN) { return 'Río estación Paraná de las Palmas, Zárate, Buenos Aires'    }
    if (dataset_name === DS_NAME.DS04_GGY) { return 'Río estación Gualeguay, Villaguay, Entre Ríos' }
    if (dataset_name === DS_NAME.DS04_PGY) { return 'Río estación Paraguay, Puerto Pilcomayo, Formosa' }

    if (dataset_name === DS_NAME.DS01_BO)  { return 'Estación Ambiental LA BOCA' }
    if (dataset_name === DS_NAME.DS01_PA)  { return 'Estación Ambiental PALERMO' }
    if (dataset_name === DS_NAME.DS01_CO)  { return 'Estación Ambiental CORDOBA' }
    if (dataset_name === DS_NAME.DS01_CE)  { return 'Estación Ambiental CENTENARIO' }
    if (label === '') { return dataset_name }

    return label
}

export function getDatosFrecuencia(frecuencia: string): string {
    if (frecuencia === '15m')   { return 'Cada 15 minutos' }
    if (frecuencia === 'dia')   { return 'Diaria' }
    if (frecuencia === 'hora')  { return 'Cada una Hora' }
    if (frecuencia === 'mes')   { return 'mensual' }
    if (frecuencia === 'anual') { return 'Anual' } 
    return frecuencia
}

export function toSpanish(txt: string): string {
    if (txt === KEY.PARAM_DS05.COUNTRY_Germany) return 'Alemania'
    if (txt === KEY.PARAM_DS05.COUNTRY_Brazil)  return 'Brasil'
    if (txt === KEY.PARAM_DS05.SECTOR_Electricity)  return 'Electricidad'
    if (txt === KEY.PARAM_DS05.SECTOR_Construction)  return 'Construction'
    if (txt === KEY.PARAM_DS05.SECTOR_Transportation)  return 'Transporte'
    if (txt === KEY.PARAM_DS05.SECTOR_Other)  return 'Otros'
    return txt
}

export function getDatasetAxis(dataset_id: DS): number {
    return (dataset_id === DS.DS01) ? 4 : 1
}

export function getDatasetId(dataset_id) {

    if (dataset_id === DS.DS01  )  { return DS_NAME.DS01 }
    if (dataset_id === DS.DS02  )  { return DS_NAME.DS02 }
    if (dataset_id === DS.DS03  )  { return DS_NAME.DS03 }
    if (dataset_id === DS.DS04  )  { return DS_NAME.DS04 }
    if (dataset_id === DS.DS05  )  { return DS_NAME.DS05_a }  // Lo considero Default para el DS05
    if (dataset_id === DS.DS05a )  { return DS_NAME.DS05_a }
    if (dataset_id === DS.DS05b )  { return DS_NAME.DS05_b }

    return dataset_id
}

export function getDatasetHome(dataset_id) {

    if (dataset_id === DS.DS01  )  { return '/qz/d/DS01/q/AIRQ/p/CO' }
    if (dataset_id === DS.DS02  )  { return '/qy/d/DS02/q/AIRQ/p/CO' }
    if (dataset_id === DS.DS03  )  { return '/qx/d/DS03/q/WATERQ/p/Temp' }
    if (dataset_id === DS.DS04  )  { return '/qw/d/DS04/q/WATERQ/p/Temp' }
    if (dataset_id === DS.DS05  )  { return '/qv/d/DS05/q/AIRQ/p/CO2/x/PAISES' }  
    if (dataset_id === DS.DS05a )  { return '/qv/d/DS05/q/AIRQ/p/CO2/x/PAISES' }
    if (dataset_id === DS.DS05b )  { return '/qv/d/DS05/q/AIRQ/p/CO2/x/SECTORES' }

    return dataset_id
}

export function isDS05(dataset_id: DS) {
    return (dataset_id === DS.DS05 || dataset_id === DS.DS05a || dataset_id === DS.DS05b)
}

export function getParamIdDescription(param: string): string {

    if (param === VAR.CO)    { return 'Monóxido de Carbono (CO)' }
    if (param === VAR.CO2)   { return 'Dióxido de Carbono (CO2)' }
    if (param === VAR.NO)    { return 'Monóxido de Nitrógeno (NO)' }
    if (param === VAR.NO2)   { return 'Dióxido de Nitrógeno (NO2)' }

    if (param === VAR.Temp)  { return 'Temperatura' }
    if (param === VAR.pH)    { return 'Grado de Acidez (pH)' }
    if (param === VAR.OD)    { return 'Oxígeno Disuelto (OD)' }
    if (param === VAR.Redox) { return 'Potencial de Oxidación-Reducción (Redox)' }
    if (param === VAR.Cond)  { return 'Conductividad del agua (Cond)' }

    return 'WIP'
}

export function qq(q: string): string {
    if (q === QUALITY_TAB.AIRQ)   { return 'Calidad del Aire' }
    if (q === QUALITY_TAB.WATERQ) { return 'Calidad del Agua' }
    return q
}

export function pp(param: VAR): string {

    if (param === VAR.CO)     { return AIRQ.CO }
    if (param === VAR.CO2)    { return AIRQ.CO2 }
    if (param === VAR.NO)     { return AIRQ.NO }
    if (param === VAR.NO2)    { return AIRQ.NO2 }

    if (param === VAR.Temp)   { return WATERQ.Temp }
    if (param === VAR.pH)     { return WATERQ.pH }
    if (param === VAR.OD)     { return WATERQ.OD }
    if (param === VAR.Redox)  { return WATERQ.Redox }
    if (param === VAR.Cond)   { return WATERQ.Cond }

    return 'WIP'
}

export function pq(paramName: string): VAR {

    if (paramName === AIRQ.CO)      { return VAR.CO }
    if (paramName === AIRQ.CO2)     { return VAR.CO2 }
    if (paramName === AIRQ.NO)      { return VAR.NO }
    if (paramName === AIRQ.NO2)     { return VAR.NO2 }

    if (paramName === WATERQ.Temp)  { return VAR.Temp }
    if (paramName === WATERQ.pH)    { return VAR.pH }
    if (paramName === WATERQ.OD)    { return VAR.OD }
    if (paramName === WATERQ.Redox) { return VAR.Redox }
    if (paramName === WATERQ.Cond)  { return VAR.Cond }

    return VAR.WorkInProgress
}

export function ff(filters: DomainModel.DateFilter): string {

    if (filters.from !== undefined &&
        filters.to   !== undefined) {

        return `from=${ff2_Date(filters.from)}`
             +  `&to=${ff2_Date(filters.to)}`
    }

    return ''
}

export function numfmt(n: Number): string {
    return (n === undefined || n === null  || n === SD ||
            n === Number.NEGATIVE_INFINITY ||
            n === Number.POSITIVE_INFINITY) ? '-' : `${n}` 
}

export function getQueryString(dataset_id: DS,
                               quality_id: string,
                                 param_id: VAR,
                                  filters: DomainModel.DateFilter,
                             customParam?: DomainModel.CustomParams) {

    let scp = (customParam===undefined) ? '' 
            : `, customParam: { 
                  sector: ${customParam.sector}, country: ${customParam.country}
               } `

    let ps = (customParam === undefined || customParam.sector  === undefined) ? '' : `/s/${customParam.sector}`
    let pc = (customParam === undefined || customParam.country === undefined) ? '' : `/c/${customParam.country}`

    console.debug(`Global.getQueryString(dataset_id:  ${dataset_id},` +
                                       ` quality_id:  ${quality_id},` +
                                         ` param_id:  ${param_id},` +
                                          ` filters: { from: ${ff1_Date(filters.from)}, `
                                                    + `  to: ${ff1_Date(filters.to)}  }) ` + scp )

    const queryString = `dataset/${getDatasetId(dataset_id)}/p/${pp(param_id)}${ps}${pc}?${ff(filters)}`

    console.debug('Global.getQueryString():' + queryString)

    return queryString

}

