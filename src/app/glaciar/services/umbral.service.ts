import { Injectable } from '@angular/core'
import { ST, Umbral, Outlier }  from '../model/domainmodel'
import * as Global from '../model/global'

@Injectable({
  providedIn: 'root'
})
export class UmbralService {

  constructor() { }

  /**
   * La explicación de estas referencias está en --> front.libs.ts
   * Ver también que se pisa en runtime en       --> data.service.ts
   * 
   * @param code 
   */
  public getOutliers(code: string): Array<Outlier> {

    const data: Array<Outlier> = [
        { quality: Global.QUALITY_TAB.AIRQ,    var: Global.VAR.CO    ,  min: 0,      max: 2    }, 
        { quality: Global.QUALITY_TAB.AIRQ,    var: Global.VAR.CO2   ,  min: 0,      max: 50000 },
        { quality: Global.QUALITY_TAB.AIRQ,    var: Global.VAR.NO    ,  min: 0,      max: 600 },  
        { quality: Global.QUALITY_TAB.AIRQ,    var: Global.VAR.NO2   ,  min: 0,      max: 600 },  
 
     // { quality: Global.QUALITY_TAB.WATERQ,  var: Global.VAR.Temp  ,  min: 0,      max: 100 },   // Es muy incomodo 100
        { quality: Global.QUALITY_TAB.WATERQ,  var: Global.VAR.Temp  ,  min: 0,      max: 60 },   // el máximo casi por 2.x 
        { quality: Global.QUALITY_TAB.WATERQ,  var: Global.VAR.pH    ,  min: 0,      max: 14 },
        { quality: Global.QUALITY_TAB.WATERQ,  var: Global.VAR.OD    ,  min: 0,      max: 180 },
        { quality: Global.QUALITY_TAB.WATERQ,  var: Global.VAR.Redox ,  min: -500,   max: 1000 },
        { quality: Global.QUALITY_TAB.WATERQ,  var: Global.VAR.Cond  ,  min: 0,      max: 20000 },
    ]

    if (code === undefined) return data

    const outliers = (code === Global.QUALITY_TAB.AIRQ || code === Global.QUALITY_TAB.WATERQ)
                   ?  data.filter(e => e.quality  === code) 
                   :  data.filter(e => e.var      === code)

    console.debug('UmbralService.getOutliers(' + code + ') : ' + JSON.stringify(outliers))

    return outliers
  }


  public getUmbralArray(code: string, norma: ST.AWQ): Array<Umbral> {
    
      let umbrales: Array<Umbral> = []

      this.getUmbrales(code, norma).forEach(e => {
        let u = new Umbral()
        u.norma   = e.norma
        u.quality = e.cat
        u.var     = e.code
        u.max     = e.max
        u.avg     = e.avg
        u.min     = e.min
        umbrales.push(u)
      })

      return umbrales
  }

  public getUmbrales(code: string, norma: ST.AWQ): Array<any> {

    console.debug(`DataService.getUmbrales(code=${code}, norma=${norma})`)

    if (norma === ST.AWQ.DEFAULT) {
        norma = (code === Global.QUALITY_TAB.AIRQ)   ? ST.AWQ.REF_BIB_AIRQ
              : (code === Global.QUALITY_TAB.WATERQ) ? ST.AWQ.REF_BIB
              :  ST.AWQ.REF_BIB
    }
    // console.debug('UmbralService.getUmbrales(' + code + ')')

    const data: Array<any> = [

        // --[WATERQ:: Normas]-----------************-----------************-----------************----------- 

        // --[REF_BIB_AIRQ]--------------
        { norma: ST.AWQ.REF_BIB_AIRQ,                 cat: Global.QUALITY_TAB.AIRQ,   code: Global.VAR.CO     , min:           0, avg:        4.5, max:         9.4, range: [ ] },
        { norma: ST.AWQ.REF_BIB_AIRQ,                 cat: Global.QUALITY_TAB.AIRQ,   code: Global.VAR.CO2    , min:   Global.SD, avg:  Global.SD, max:   Global.SD, range: [ ] },
        { norma: ST.AWQ.REF_BIB_AIRQ,                 cat: Global.QUALITY_TAB.AIRQ,   code: Global.VAR.NO     , min:   Global.SD, avg:  Global.SD, max:   Global.SD, range: [ ] },
        { norma: ST.AWQ.REF_BIB_AIRQ,                 cat: Global.QUALITY_TAB.AIRQ,   code: Global.VAR.NO2    , min:           0, avg:         54, max:         101, range: [ ] },

        // --[GCBA_LEY_1356_DEC_198_006]------------
        // https://www.buenosaires.gob.ar/sites/gcaba/files/documents/ley_1356.pdf
        { norma: ST.AWQ.GCBA_LEY_1356_DEC_198_006,    cat: Global.QUALITY_TAB.AIRQ,   code: Global.VAR.CO     , min:   Global.SD, avg:  Global.SD, max:           8, range: [ ] },
        { norma: ST.AWQ.GCBA_LEY_1356_DEC_198_006,    cat: Global.QUALITY_TAB.AIRQ,   code: Global.VAR.CO2    , min:   Global.SD, avg:  Global.SD, max:   Global.SD, range: [ ] },
        { norma: ST.AWQ.GCBA_LEY_1356_DEC_198_006,    cat: Global.QUALITY_TAB.AIRQ,   code: Global.VAR.NO     , min:   Global.SD, avg:  Global.SD, max:   Global.SD, range: [ ] },
        { norma: ST.AWQ.GCBA_LEY_1356_DEC_198_006,    cat: Global.QUALITY_TAB.AIRQ,   code: Global.VAR.NO2    , min:   Global.SD, avg:  Global.SD, max:         200, range: [ ] },

        // --[BSAS_DEC_3395_LEY_5965]------------
        // http://www.opds.gba.gov.ar/sites/default/files/Decreto%203395%2096.pdf
        { norma: ST.AWQ.BSAS_DEC_3395_LEY_5965,       cat: Global.QUALITY_TAB.AIRQ,   code: Global.VAR.CO     , min:   Global.SD, avg:  Global.SD, max:           9, range: [ ] },
        { norma: ST.AWQ.BSAS_DEC_3395_LEY_5965,       cat: Global.QUALITY_TAB.AIRQ,   code: Global.VAR.CO2    , min:   Global.SD, avg:  Global.SD, max:   Global.SD, range: [ ] },
        { norma: ST.AWQ.BSAS_DEC_3395_LEY_5965,       cat: Global.QUALITY_TAB.AIRQ,   code: Global.VAR.NO     , min:   Global.SD, avg:  Global.SD, max:   Global.SD, range: [ ] },
        { norma: ST.AWQ.BSAS_DEC_3395_LEY_5965,       cat: Global.QUALITY_TAB.AIRQ,   code: Global.VAR.NO2    , min:   Global.SD, avg:  Global.SD, max:         200, range: [ ] },

        // --[EPA_AIRQ_INDEX]--------------------
        { norma: ST.AWQ.EPA_AIRQ_INDEX,               cat: Global.QUALITY_TAB.AIRQ,   code: Global.VAR.CO     , min:           0, avg:        4.5, max:         9.4, range: [ ] },
        { norma: ST.AWQ.EPA_AIRQ_INDEX,               cat: Global.QUALITY_TAB.AIRQ,   code: Global.VAR.CO2    , min:   Global.SD, avg:  Global.SD, max:   Global.SD, range: [ ] },
        { norma: ST.AWQ.EPA_AIRQ_INDEX,               cat: Global.QUALITY_TAB.AIRQ,   code: Global.VAR.NO     , min:   Global.SD, avg:  Global.SD, max:   Global.SD, range: [ ] },
        { norma: ST.AWQ.EPA_AIRQ_INDEX,               cat: Global.QUALITY_TAB.AIRQ,   code: Global.VAR.NO2    , min:           0, avg:         54, max:         101, range: [ ] },

        // --[OMS_GUIA_CALIDAD_AIRE]-------------
        { norma: ST.AWQ.OMS_GUIA_CALIDAD_AIRE,        cat: Global.QUALITY_TAB.AIRQ,   code: Global.VAR.CO     , min:   Global.SD, avg:  Global.SD, max:   Global.SD, range: [ ] },
        { norma: ST.AWQ.OMS_GUIA_CALIDAD_AIRE,        cat: Global.QUALITY_TAB.AIRQ,   code: Global.VAR.CO2    , min:   Global.SD, avg:  Global.SD, max:   Global.SD, range: [ ] },
        { norma: ST.AWQ.OMS_GUIA_CALIDAD_AIRE,        cat: Global.QUALITY_TAB.AIRQ,   code: Global.VAR.NO     , min:   Global.SD, avg:  Global.SD, max:   Global.SD, range: [ ] },
        { norma: ST.AWQ.OMS_GUIA_CALIDAD_AIRE,        cat: Global.QUALITY_TAB.AIRQ,   code: Global.VAR.NO2    , min:   Global.SD, avg:  Global.SD, max:         110, range: [ ] },

        // --[OMS_ENVIRONMENTAL_EHC_CO]---------------
        { norma: ST.AWQ.OMS_ENVIRONMENTAL_EHC_CO,     cat: Global.QUALITY_TAB.AIRQ,   code: Global.VAR.CO     , min:   Global.SD, avg:  Global.SD, max:           9, range: [ ] },
        { norma: ST.AWQ.OMS_ENVIRONMENTAL_EHC_CO,     cat: Global.QUALITY_TAB.AIRQ,   code: Global.VAR.CO2    , min:   Global.SD, avg:  Global.SD, max:   Global.SD, range: [ ] },
        { norma: ST.AWQ.OMS_ENVIRONMENTAL_EHC_CO,     cat: Global.QUALITY_TAB.AIRQ,   code: Global.VAR.NO     , min:   Global.SD, avg:  Global.SD, max:   Global.SD, range: [ ] },
        { norma: ST.AWQ.OMS_ENVIRONMENTAL_EHC_CO,     cat: Global.QUALITY_TAB.AIRQ,   code: Global.VAR.NO2    , min:   Global.SD, avg:  Global.SD, max:   Global.SD, range: [ ] },
        
        

        // --[WATERQ:: Normas]-----------************-----------************-----------************----------- 

        // --[REF_BIB]--------------------
        { norma: ST.AWQ.REF_BIB,                 cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.Temp   , min:          15, avg:         25, max:          35, range: [ ] },
        { norma: ST.AWQ.REF_BIB,                 cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.pH     , min:         6.5, avg:          7, max:           8, range: [ ] },
        { norma: ST.AWQ.REF_BIB,                 cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.OD     , min:        7.54, avg:          9, max:       12.75, range: [ ] },
        { norma: ST.AWQ.REF_BIB,                 cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.Redox  , min:         100, avg:        150, max:         200, range: [ ] },
        { norma: ST.AWQ.REF_BIB,                 cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.Cond   , min:   Global.SD, avg:        100, max:   Global.SD, range: [ ] },
        
        // --[ACUMAR_2009_03_USO_IV]------
        { norma: ST.AWQ.ACUMAR_2009_03_USO_IV,   cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.Temp   , min:   Global.SD, avg:  Global.SD, max:          35, range: [ ] },
        { norma: ST.AWQ.ACUMAR_2009_03_USO_IV,   cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.pH     , min:           6, avg:  Global.SD, max:           9, range: [ ] },
        { norma: ST.AWQ.ACUMAR_2009_03_USO_IV,   cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.OD     , min:           2, avg:  Global.SD, max:   Global.SD, range: [ ] },
        { norma: ST.AWQ.ACUMAR_2009_03_USO_IV,   cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.Redox  , min:   Global.SD, avg:  Global.SD, max:   Global.SD, range: [ ] },
        { norma: ST.AWQ.ACUMAR_2009_03_USO_IV,   cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.Cond   , min:   Global.SD, avg:  Global.SD, max:   Global.SD, range: [ ] },

        // --[ACUMAR_2017_46_USO_*]------
        { norma: ST.AWQ.ACUMAR_2017_46_USO_Ia,   cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.Temp   , min:   Global.SD, avg:  Global.SD, max:          35, range: [ ] },
        { norma: ST.AWQ.ACUMAR_2017_46_USO_Ia,   cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.pH     , min:           5, avg:          6, max:           9, range: [ ] },
        { norma: ST.AWQ.ACUMAR_2017_46_USO_Ia,   cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.OD     , min:           5, avg:  Global.SD, max:   Global.SD, range: [ ] },
        { norma: ST.AWQ.ACUMAR_2017_46_USO_Ia,   cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.Redox  , min:   Global.SD, avg:  Global.SD, max:   Global.SD, range: [ ] },
        { norma: ST.AWQ.ACUMAR_2017_46_USO_Ia,   cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.Cond   , min:   Global.SD, avg:  Global.SD, max:   Global.SD, range: [ ] },

        { norma: ST.AWQ.ACUMAR_2017_46_USO_Ib,   cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.Temp   , min:   Global.SD, avg:  Global.SD, max:          35, range: [ ] },
        { norma: ST.AWQ.ACUMAR_2017_46_USO_Ib,   cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.pH     , min:           5, avg:          6, max:           9, range: [ ] },
        { norma: ST.AWQ.ACUMAR_2017_46_USO_Ib,   cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.OD     , min:           5, avg:  Global.SD, max:   Global.SD, range: [ ] },
        { norma: ST.AWQ.ACUMAR_2017_46_USO_Ib,   cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.Redox  , min:   Global.SD, avg:  Global.SD, max:   Global.SD, range: [ ] },
        { norma: ST.AWQ.ACUMAR_2017_46_USO_Ib,   cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.Cond   , min:   Global.SD, avg:  Global.SD, max:   Global.SD, range: [ ] },

        { norma: ST.AWQ.ACUMAR_2017_46_USO_II,   cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.Temp   , min:   Global.SD, avg:  Global.SD, max:          35, range: [ ] },
        { norma: ST.AWQ.ACUMAR_2017_46_USO_II,   cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.pH     , min:           5, avg:          6, max:           9, range: [ ] },
        { norma: ST.AWQ.ACUMAR_2017_46_USO_II,   cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.OD     , min:           5, avg:  Global.SD, max:   Global.SD, range: [ ] },
        { norma: ST.AWQ.ACUMAR_2017_46_USO_II,   cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.Redox  , min:   Global.SD, avg:  Global.SD, max:   Global.SD, range: [ ] },
        { norma: ST.AWQ.ACUMAR_2017_46_USO_II,   cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.Cond   , min:   Global.SD, avg:  Global.SD, max:   Global.SD, range: [ ] },

        { norma: ST.AWQ.ACUMAR_2017_46_USO_III,  cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.Temp   , min:   Global.SD, avg:  Global.SD, max:          35, range: [ ] },
        { norma: ST.AWQ.ACUMAR_2017_46_USO_III,  cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.pH     , min:           5, avg:          6, max:           9, range: [ ] },
        { norma: ST.AWQ.ACUMAR_2017_46_USO_III,  cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.OD     , min:           4, avg:  Global.SD, max:   Global.SD, range: [ ] },
        { norma: ST.AWQ.ACUMAR_2017_46_USO_III,  cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.Redox  , min:   Global.SD, avg:  Global.SD, max:   Global.SD, range: [ ] },
        { norma: ST.AWQ.ACUMAR_2017_46_USO_III,  cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.Cond   , min:   Global.SD, avg:  Global.SD, max:   Global.SD, range: [ ] },

        { norma: ST.AWQ.ACUMAR_2017_46_USO_IV,   cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.Temp   , min:   Global.SD, avg:  Global.SD, max:          35, range: [ ] },
        { norma: ST.AWQ.ACUMAR_2017_46_USO_IV,   cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.pH     , min:           6, avg:  Global.SD, max:           9, range: [ ] },
        { norma: ST.AWQ.ACUMAR_2017_46_USO_IV,   cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.OD     , min:           2, avg:  Global.SD, max:   Global.SD, range: [ ] },
        { norma: ST.AWQ.ACUMAR_2017_46_USO_IV,   cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.Redox  , min:   Global.SD, avg:  Global.SD, max:   Global.SD, range: [ ] },
        { norma: ST.AWQ.ACUMAR_2017_46_USO_IV,   cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.Cond   , min:   Global.SD, avg:  Global.SD, max:   Global.SD, range: [ ] },

        { norma: ST.AWQ.BSAS_ADA_RES_42_2006,    cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.Temp   , min:   Global.SD, avg:  Global.SD, max:   Global.SD, range: [ ] },
        { norma: ST.AWQ.BSAS_ADA_RES_42_2006,    cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.pH     , min:   Global.SD, avg:  Global.SD, max:           9, range: [ ] },
        { norma: ST.AWQ.BSAS_ADA_RES_42_2006,    cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.OD     , min:   Global.SD, avg:  Global.SD, max:   Global.SD, range: [ ] },
        { norma: ST.AWQ.BSAS_ADA_RES_42_2006,    cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.Redox  , min:   Global.SD, avg:  Global.SD, max:   Global.SD, range: [ ] },
        { norma: ST.AWQ.BSAS_ADA_RES_42_2006,    cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.Cond   , min:   Global.SD, avg:  Global.SD, max:   Global.SD, range: [ ] },

        { norma: ST.AWQ.OMS_REDOX_1971_AGUA_POT, cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.Temp   , min:   Global.SD, avg:  Global.SD, max:   Global.SD, range: [ ] },
        { norma: ST.AWQ.OMS_REDOX_1971_AGUA_POT, cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.pH     , min:   Global.SD, avg:  Global.SD, max:   Global.SD, range: [ ] },
        { norma: ST.AWQ.OMS_REDOX_1971_AGUA_POT, cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.OD     , min:   Global.SD, avg:  Global.SD, max:   Global.SD, range: [ ] },
        { norma: ST.AWQ.OMS_REDOX_1971_AGUA_POT, cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.Redox  , min:         650, avg:  Global.SD, max:   Global.SD, range: [ ] },
        { norma: ST.AWQ.OMS_REDOX_1971_AGUA_POT, cat: Global.QUALITY_TAB.WATERQ, code: Global.VAR.Cond   , min:   Global.SD, avg:  Global.SD, max:   Global.SD, range: [ ] },


        

      ]

    let rta = data.filter(e => e.norma === norma)

    const p = (code === undefined) ?  rta 
            : (code === Global.QUALITY_TAB.AIRQ || code === Global.QUALITY_TAB.WATERQ) ? rta.filter(e => e.cat === code) 
            :  rta.filter(e => e.code === code)

    console.debug(`DataService.getUmbrales(code=${code}, norma=${norma}): ` + JSON.stringify(p))

    return p

  }

  public getAWQ_Systems(quality: string): Array<ST.AWS_SYSTEM> {

    const awq_systems_air: Array<ST.AWS_SYSTEM> = [
      { 
        code:   ST.AWQ.REF_BIB_AIRQ,
        combo: 'Condiciones estándares',
        desc:  'Condiciones estándares, según bibliografía de referencia',
        link:  '',
      },
      // { 
      //   code:   ST.AWQ.GCBA_LEY_1356,
      //   combo: 'GCBA Ley 1356',
      //   desc:  'GCBA Ley 1356 - Calidad Atmosférica Ciudad Autónoma de Buenos Aires',
      //   link:  'https://www.buenosaires.gob.ar/sites/gcaba/files/documents/ley_1356.pdf',
      //   // http://www2.cedom.gob.ar/es/legislacion/normas/leyes/ley1356.html
      //   // http://www2.cedom.gob.ar/es/legislacion/normas/leyes/anexos/al1356.html#a
      //   // Buenos Aires, 10 de junio de 2004
      // },
      { 
        code:   ST.AWQ.GCBA_LEY_1356_DEC_198_006,
        combo: 'GCBA Decreto 198/006 ',
        desc:  'GCBA Decreto 198/006 Reglamentario de Ley 1356',
        link:  'https://www.buenosaires.gob.ar/areas/med_ambiente/pol_ambiental/archivos/relada/decreto_198GCBA2006.pdf',
        // [OK] https://www.buenosaires.gob.ar/areas/med_ambiente/pol_ambiental/archivos/relada/decreto_198GCBA2006.pdf
        // https://www.buenosaires.gob.ar/areas/leg_tecnica/sin/normapop09.php?id=83624&qu=h&ft=0&cp=&rl=1&rf=&im=1&ui=0&printi=1&pelikan=1&sezion=1094340&primera=0&mot_toda=&mot_frase=&mot_alguna=
        // http://www2.cedom.gob.ar/es/legislacion/normas/leyes/ley1356.html
        // http://www2.cedom.gob.ar/es/legislacion/normas/leyes/anexos/drl1356.html
        // http://www2.cedom.gob.ar/es/legislacion/normas/leyes/anexos/al1356.html#a
        // Buenos Aires, 22 de febrero de 2006
        // ---> REGLAMENTACIÓN de la LEY Nº 1.356
        // ---> DECRETO Nº 198/006 
        // 0,200 PPM (200 PPB) 
        // NOTA: Obsrvar que el reporte habla de Concentración (PPB) Partes por Billon ... 
      },

      { 
        code:   ST.AWQ.BSAS_DEC_3395_LEY_5965,
        combo: 'Provincia de Buenos Aires. Decreto 3395/96',
        desc:  'Provincia de Buenos Aires. Decreto 3395/96 Reglamentario de Ley 5965',
        link:  'http://www.opds.gba.gov.ar/sites/default/files/Decreto%203395%2096.pdf',
      },
      { 
        code:   ST.AWQ.EPA_AIRQ_INDEX,
        combo: 'AIR Quality Index',
        desc:  'US EPA – Air Quality Index (AQI). Valores descompuestos',
        link:  'https://www.govinfo.gov/content/pkg/CFR-2016-title40-vol6/pdf/CFR-2016-title40-vol6-part58-appG.pdf',
      },
      { 
        code:   ST.AWQ.OMS_GUIA_CALIDAD_AIRE,
        combo: 'OMS - Guías de calidad del aire',
        desc:  'OMS - Guías de calidad del aire de la OMS (2005) - media de 1 hora',
        link:  'https://apps.who.int/iris/bitstream/handle/10665/69478/WHO_SDE_PHE_OEH_06.02_spa.pdf',
        info:  'La OMS expresa su sistema de calidad del 2005 en <b>microgramos por metro cubico (µg/m3)</b>.  '
             + 'El valor de 200 µg/m3 equivale aproximadademnte a 0.11 ppm y 111 ppb. '
             + '<br> ver <a class="black" target="oms" href="http://www.inchem.org/documents/ehc/ehc/ehc188.htm">OMS - Environmental Health Criteria 188 (NO2) 1997</a> y ' 
             + '<br> ver <a class="black" target="oms" href="https://cfpub.epa.gov/ncer_abstracts/index.cfm/fuseaction/display.files/fileID/14285">equivalencias entre ppm y ppb</a>'
      },
      { 
        code:   ST.AWQ.OMS_ENVIRONMENTAL_EHC_CO,
        combo: 'OMS - Environmental Health Criteria 213 - (CO)',
        desc:  'OMS - Environmental Health Criteria 213 - Carbon Monoxide (CO) para 8 horas.',
        link:  'http://www.inchem.org/documents/ehc/ehc/ehc213.htm',
      }, 

      // Bahia Blanca --> 
      // 1) Se rige por Buenos Aires, segun el link: https://www.bahia.gob.ar/cte/calidadaire/estacionmonitoreo/
      // 2)                    https://www.bahia.gob.ar/cte/calidadaire/  
      // 2) BUENOS AIRES:
      //    Ley 5965 http://www.opds.gba.gov.ar/sites/default/files/LEY%205965.pdf
      //    Regulada por el decreto: 3395/96.  http://www.opds.gba.gov.ar/sites/default/files/Decreto%203395%2096.pdf


      // Contaminante
      // Símbolo
      // mg/m3
      // ppm
      // Período de Tiempo 

      // Monóxido de carbono 
      // CO
      //   10,000 (1)
      //   g(1)       ---> Esto es  9 
      //   8 horas

      //   40,082 (1)
      //   35 (1)
      //   1 hora



      // Oxidos de nitrógeno (expresado como dióxido de nitrógeno)   NOTA PI: El dióxido de nitrógeno u óxido de nitrógeno (IV)​ (NO2), 
      // NOx
      
        // 0,400
        // 0,2
        // 1 hora

        // 0,100 (4)
        // 0,053 (4)
        // 1 año 


        // NOTA: Para Ajustar:
          // https://www.epa.ie/pubs/advice/water/quality/Water_Quality.pdf
    ]


    const awq_systems_water: Array<ST.AWS_SYSTEM> = [
      { 
        code:   ST.AWQ.REF_BIB,
        combo: 'Condiciones estándares',
        desc:  'Condiciones estándares, según bibliografía de referencia',
        link:  '',
      },
      { 
        code:   ST.AWQ.ACUMAR_2009_03_USO_IV,
        combo: 'ACUMAR Res. 3/2009 - Uso IV',
        desc:  'ACUMAR Res. 3/2009 - Uso IV - Apta para actividades recreativas pasivas',
        link:  'http://servicios.infoleg.gob.ar/infolegInternet/anexos/150000-154999/153768/norma.htm',
      },
      { 
        code:   ST.AWQ.ACUMAR_2017_46_USO_Ia,
        combo: 'ACUMAR Res. 46-E/2017 - USO I a',
        desc:  'ACUMAR Res. 46-E/2017 - USO I a. Apta para protección de biota y uso recreativo c/contacto directo',
        link:  'http://servicios.infoleg.gob.ar/infolegInternet/anexos/270000-274999/273042/norma.htm',
      },
      { 
        code:   ST.AWQ.ACUMAR_2017_46_USO_Ib,
        combo: 'ACUMAR Res. 46-E/2017 - USO I b',
        desc:  'ACUMAR Res. 46-E/2017 - USO I b. Apta para protección de biota',
        link:  'http://servicios.infoleg.gob.ar/infolegInternet/anexos/270000-274999/273042/norma.htm',
      },
      { 
        code:   ST.AWQ.ACUMAR_2017_46_USO_II,
        combo: 'ACUMAR Res. 46-E/2017 - USO II',
        desc:  'ACUMAR Res. 46-E/2017 - USO II. Apta para actividades recreativas c/contacto directo',
        link:  'http://servicios.infoleg.gob.ar/infolegInternet/anexos/270000-274999/273042/norma.htm',
      },
      { 
        code:   ST.AWQ.ACUMAR_2017_46_USO_III,
        combo: 'ACUMAR Res. 46-E/2017 - USO III',
        desc:  'ACUMAR Res. 46-E/2017 - USO III. Apta para actividades recreativas s/contacto directo',
        link:  'http://servicios.infoleg.gob.ar/infolegInternet/anexos/270000-274999/273042/norma.htm',
      },
      { 
        code:   ST.AWQ.ACUMAR_2017_46_USO_IV,
        combo: 'ACUMAR Res. 46-E/2017 - USO IV',
        desc:  'ACUMAR Res. 46-E/2017 - USO IV. Apta para actividades recreativas pasivas',
        link:  'http://servicios.infoleg.gob.ar/infolegInternet/anexos/270000-274999/273042/norma.htm',
      },
      { 
        code:   ST.AWQ.BSAS_ADA_RES_42_2006,
        combo: 'ADA Res. 42/06',
        desc:  'Autoridad del Agua (ADA), Provincia Buenos Aires, Argentina. Resolución (ADA) 42/06.',
        link:  'http://www.ecofield.net/Legales/BsAs/res42-06_ADA.htm',
      },
      { 
        code:   ST.AWQ.OMS_REDOX_1971_AGUA_POT,
        combo: 'WHO 1971',
        desc:  'WHO. World Health Organization, International standards for drinking water. 1971.',
        link:  'http://apps.who.int/iris/bitstream/10665/39989/1/9241540249_eng.pdf',
      },
    ]

    return (quality === Global.QUALITY_TAB.AIRQ) ? awq_systems_air 
          :(quality === Global.QUALITY_TAB.WATERQ) ? awq_systems_water
          : awq_systems_air.concat(awq_systems_water)
  }


  public getAWQ_System(code: ST.AWQ): ST.AWS_SYSTEM {

    return this.getAWQ_Systems('all').filter(s => s.code === code)[0]
  }


}



// REF_BIB                = 'Condiciones estándares, según bibliografía de referencia',

// ACUMAR_2009_03_USO_IV  = 'ACUMAR Res. 3/2009 - Uso IV - Apta para actividades recreativas pasivas',
// ACUMAR_2017_46_USO_Ia  = 'ACUMAR Res. 46-E/2017 - USO I a. Apta para protección de biota y uso recreativo c/contacto directo',
// ACUMAR_2017_46_USO_Ib  = 'ACUMAR Res. 46-E/2017 - USO I b. Apta para protección de biota',
// ACUMAR_2017_46_USO_II  = 'ACUMAR Res. 46-E/2017 - USO II. Apta para actividades recreativas c/contacto directo',
// ACUMAR_2017_46_USO_III = 'ACUMAR Res. 46-E/2017 - USO III. Apta para actividades recreativas s/contacto directo',
// ACUMAR_2017_46_USO_IV  = 'ACUMAR Res. 46-E/2017 - USO IV. Apta para actividades recreativas pasivas',
