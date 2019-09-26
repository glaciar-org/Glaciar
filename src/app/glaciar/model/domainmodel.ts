import * as Global from './global'

export namespace DomainModel {

    export interface IDataset {
        id: string
        code: string
        name: string
        desc: string
        series: any
        params: {  
              AIRQ: Array<Global.AIRQ>   
            WATERQ: Array<Global.WATERQ>   
        },
        location: Geo
        dates: DateRange
        frecuencia: '15m' | 'hora' | 'dia' | 'mes' | 'anual'
    }

    export class Marker {
      latitude: number
      longitude: number
      name?: string
      label?: string
      link?: string
      draggable?: boolean
    }

    export class Geo {
      latitude: number
      longitude: number
    }

    export class DateFilter {
        from: Date
        to: Date
    }

    export class DateRange {
        minDate: Date
        maxDate: Date
    }

    export class CustomParams {
        sector   : KEY.PARAM_DS05
        country  : KEY.PARAM_DS05
    }

    export class FAQ {
        public faqId: number
        public title: string
        public content: string
      
        constructor(faqId: number, title:string, content: string) {
          this.faqId = faqId
          this.title = title
          this.content = content
        }
      }
}


export namespace ChartConfig {

    export class Options {

        labelY: boolean
        adaptativeY: boolean     // obsoleto o TBD ?

        zoom: boolean
        zoom_tipo: ZOOM_Command

        cursor: boolean
        umbrals_on: boolean
        umbral_min: boolean
        umbral_avg: boolean
        umbral_max: boolean
        umbrals: Array<Umbral>

        scrollbarX: boolean
        scrollbarY: boolean
        scrollbarY_abajo: boolean
        scrollbarY_preview: boolean

        serie_tipo_area: boolean
        serie_tooltip: boolean
        serie_connect: boolean    // conectar los puntos || mostrar los Gaps

        time_unit_fixed: boolean             // default false
        time_unit_scale: TIME_Unit_Scale     // default 'none'

        awq_estandar: ST.AWQ

        nil_action: NIL_Command

        outliers_action: OUTLIER_Command

        outliers: Array<Outlier>
    }

    export enum NIL_Command {

        CONSIDER      = 'consider',
        DISCARD       = 'discard',
        NIL_ONLY      = 'nil_only',
    }

    export enum OUTLIER_Command {

        CONSIDER      = 'consider',
        DISCARD       = 'discard',
        OUTLIER_ONLY  = 'outlier_only',
    }

    export enum ZOOM_Command {

        zoomX    = 'zoomX',
        zoomY    = 'zoomY',
        zoomXY   = 'zoomXY',
        selectX  = 'selectX',
        selectY  = 'selectY',
        selectXY = 'selectXY',
        panX     = 'panX',
        panY     = 'panY',
        panXY    = 'panXY',
        none     = 'none',
    }

    export enum TIME_Unit_Scale {

        year     = 'year',
        month    = 'month',
        day      = 'day',
        hour     = 'hour',
        minute   = 'minute',
        none     = 'none',
    }

}

export class Outlier {
    quality : Global.QUALITY_TAB
    var     : Global.VAR
    min     : number
    max     : number
}

export class Umbral {
    norma   : ST.AWQ
    quality : Global.QUALITY_TAB
    var     : Global.VAR
    min     : number
    avg     : number
    max     : number
}

export namespace ST {


//     Provincia de Buenos Aires
// Ley 5965
// Decreto reglamentario 3395/96

    export enum AWQ {

        DEFAULT                     = 'DEFAULT',
        
        REF_BIB                     = 'REF_BIB',
        GCBA_LEY_1356_DEC_198_006   = 'GCBA_LEY_1356_DEC_198_006',
        BSAS_DEC_3395_LEY_5965      = 'BSAS_DEC_3395_LEY_5965',
        EPA_AIRQ_INDEX              = 'EPA_AIRQ_INDEX',
        OMS_GUIA_CALIDAD_AIRE       = 'OMS_GUIA_CALIDAD_AIRE',
        OMS_ENVIRONMENTAL_EHC_CO    = 'OMS_ENVIRONMENTAL_EHC_CO',

        ACUMAR_2009_03_USO_IV       = 'ACUMAR_2009_03_USO_IV',
        ACUMAR_2017_46_USO_Ia       = 'ACUMAR_2017_46_USO_Ia',
        ACUMAR_2017_46_USO_Ib       = 'ACUMAR_2017_46_USO_Ib',
        ACUMAR_2017_46_USO_II       = 'ACUMAR_2017_46_USO_II',
        ACUMAR_2017_46_USO_III      = 'ACUMAR_2017_46_USO_III',
        ACUMAR_2017_46_USO_IV       = 'ACUMAR_2017_46_USO_IV',

        BSAS_ADA_RES_42_2006        = 'BSAS_ADA_RES_42_2006',

        OMS_REDOX_1971_AGUA_POT     = 'OMS_REDOX_1971_AGUA_POT',

        REF_BIB_AIRQ                = 'REF_BIB_AIRQ',
    }

    export class AWS_SYSTEM {
    
        code: AWQ
        combo: string
        desc: string
        link: string
        info?: string
    }
    
}


export namespace KEY {

    export enum GLACIAR {

        UMBRAL   = 'GLACIAR_KEY_UMBRAL',
        OUTLIERS = 'GLACIAR_KEY_OUTLIERS',
    }

    export enum PARAM_DS05 {

        SELECT_xPaises        = 'PAISES',
        SELECT_xSectores      = 'SECTORES',

        SECTOR_All            = 'Todos',
        SECTOR_Electricity    = 'Electricity',
        SECTOR_Construction   = 'Construction',
        SECTOR_Transportation = 'Transportation',
        SECTOR_Other          = 'Other',
    
        COUNTRY_All           = 'Todos',
        COUNTRY_Argentina     = 'Argentina',
        COUNTRY_Germany       = 'Germany',
        COUNTRY_Chile         = 'Chile',
        COUNTRY_Bolivia       = 'Bolivia',
        COUNTRY_Brazil        = 'Brazil',
    }
}


export namespace TDD {

    export class Context {
        mode       : string
        dataset_id : Global.DS
        quality_id : Global.QUALITY_TAB
        param_id   : Global.VAR
        selector   : KEY.PARAM_DS05
        envChartLib: Global.GlaciaR_CHARTLIB
    }
}

// Res. 3/09
// https://www.buenosaires.gob.ar/sites/gcaba/files/documents/usos_cmr_gorybc_ante_mev.pdf
// http://servicios.infoleg.gob.ar/infolegInternet/anexos/150000-154999/153768/norma.htm
// http://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=153768
// Usos definidos por ACUMAR
// Uso I - Apta para consumo humano con tratamiento convencional 
// Uso II - Apta para actividades recreativas con contacto directo 
// Uso III - Apta para actividades recreativas sin contacto directo
// Uso IV - Apta para actividades recreativas pasivas   <---
// Uso V - Apta para preservación de vida acuática con exposición prolongada
// Uso VI - Apta para preservación de vida acuática sin exposición prolongada.

// 46-E/2017
// http://servicios.infoleg.gob.ar/infolegInternet/anexos/270000-274999/273042/norma.htm
// http://servicios.infoleg.gob.ar/infolegInternet/anexos/270000-274999/273042/res46.pdf
// ACUMAR_2017_46_USO_Ia  = 'ACUMAR Res. 46-E/2017 I a. Apta para protección de biota y uso recreativo c/contacto directo'
// ACUMAR_2017_46_USO_Ib  = 'ACUMAR Res. 46-E/2017 I b. Apta para protección de biota'
// ACUMAR_2017_46_USO_II  = 'ACUMAR Res. 46-E/2017 II. Apta para actividades recreativas c/contacto directo'
// ACUMAR_2017_46_USO_III = 'ACUMAR Res. 46-E/2017 III. Apta para actividades recreativas s/contacto directo'
// ACUMAR_2017_46_USO_IV  = 'ACUMAR Res. 46-E/2017 IV. Apta para actividades recreativas pasivas.'

// RIIGLO - Niveles guia - Uso recreativo
// ACUMAR RES. 03/2009. USO IV
// ADA - Resolución 42 - Agua dulce - Uso recreativo - Valores de referencia
// ADA - Resolución 42 - Agua marina - Uso recreativo - Valores de referencia
// ADA - Resolución 42 - Protección de la Biota - Agua Dulce - Valores de referencia
// ADA - Resolución 42 - Protección de la Biota - Agua Marina - Valores de referencia
// CARU - Estandares de calidad de las aguas
// Freplata - Niveles Guía Provisorios - Agua Dulce
// Freplata - Niveles Guía Provisorios - Agua Marina



