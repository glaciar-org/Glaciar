import { ChartConfig, Umbral } from '../model/domainmodel'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ST }  from '../model/domainmodel'
import * as Global from '../model/global'

export function didItChanged(formConfig: FormGroup, chartConfig: ChartConfig.Options, props: string) {

    let eq = (p) => formConfig.value[p] == chartConfig[p]

    let intacto  = props.split('||')
                        .map(e=>e.trim())
                        .every(p=>eq(p))
    
    console.debug(`didItChanged:: ${props} = ${!intacto} `)
    return  !intacto
}

export function copyForm2ChartConfig(formConfig: FormGroup, chartConfig: ChartConfig.Options) {
    copy(formConfig, chartConfig, 'labelY')
    copy(formConfig, chartConfig, 'adaptativeY')
    copy(formConfig, chartConfig, 'zoom')
    copy(formConfig, chartConfig, 'zoom_tipo')
    copy(formConfig, chartConfig, 'cursor')

    copy(formConfig, chartConfig, 'scrollbarX')
    copy(formConfig, chartConfig, 'scrollbarY')
    copy(formConfig, chartConfig, 'scrollbarY_abajo')
    copy(formConfig, chartConfig, 'scrollbarY_preview')
    copy(formConfig, chartConfig, 'serie_tipo_area')
    copy(formConfig, chartConfig, 'serie_tooltip')
    copy(formConfig, chartConfig, 'serie_connect')
    copy(formConfig, chartConfig, 'awq_estandar')
    copy(formConfig, chartConfig, 'nil_action')

    copy(formConfig, chartConfig, 'outliers_action')
    copy(formConfig, chartConfig, 'outliers')

    // Este código necesita seteado a:  chartConfig.awq_estandar
    copy(formConfig, chartConfig, 'umbrals_on')
    copy(formConfig, chartConfig, 'umbral_min')
    copy(formConfig, chartConfig, 'umbral_avg')
    copy(formConfig, chartConfig, 'umbral_max')
    copy(formConfig, chartConfig, 'umbrals')  


}

export function copy(formConfig: FormGroup, chartConfig: ChartConfig.Options, p: string) {
    let v = formConfig.value[p]

    if (v == undefined) {
        console.debug(`Frontlibs.copy(${p}) -> ${JSON.stringify(v)} --> skip copy: be careful!`)
        return
    }

    if (p == 'umbrals') {
        chartConfig.umbrals = []
        v.forEach((umbrals,i) => {
            let u = new Umbral()
            u.norma   = umbrals.norma    
            u.quality = umbrals.quality  
            u.var     = umbrals.var
            u.min     = umbrals.min
            u.avg     = umbrals.avg
            u.max     = umbrals.max
            chartConfig.umbrals.push(u)
            if (i == 0) {
                chartConfig.awq_estandar = umbrals.norma
            }
        })
        console.debug(`Frontlibs.copy(${p}) -> ${JSON.stringify(v)}`)
        return
    }
    
    chartConfig[p] = (p === "outliers") ? [ v ] : v

}

export function getNilActions(): Array<any> {
    return [
        { code: ChartConfig.NIL_Command.CONSIDER,          desc: 'Considerar los valores nulos'          },
        { code: ChartConfig.NIL_Command.DISCARD,           desc: 'Descartar los valores nulos'           },
        { code: ChartConfig.NIL_Command.NIL_ONLY,          desc: 'Mostrar solo donde hay un valor nulo'  },
      ]
}

export function getOutliersActions(): Array<any> {
    return [
        { code: ChartConfig.OUTLIER_Command.CONSIDER,      desc: 'Considear los valores atípicos'        },
        { code: ChartConfig.OUTLIER_Command.DISCARD,       desc: 'Descartar los valores atípicos'        },
        { code: ChartConfig.OUTLIER_Command.OUTLIER_ONLY,  desc: 'Mostrar solo los valores atípicos'     },
      ]
}


  /**
   * 
    { var: Global.VAR.CO   , min: 0,  max: 20    },    // Creo que en realidad es 20.000
    { var: Global.VAR.CO2  , min: 0,  max: 50000 },
    { var: Global.VAR.NO   , min: 0,  max: 600   },  
    { var: Global.VAR.NO2  , min: 0,  max: 600   },  
   *
   */

export function getOutlierText(v: Global.VAR) {

    let txt = "WIP txt"

    if (v === Global.VAR.CO) {
        txt = `La legislación Española (vigente desde el 2055) considera el Valor límite para la protección de la salud humana 
        en 10 mg/m3`
        // http://www.isciii.es/ISCIII/es/contenidos/fd-el-instituto/fd-organizacion/fd-estructura-directiva/fd-subdireccion-general-servicios-aplicados-formacion-investigacion/fd-centros-unidades/fd-centro-nacional-sanidad-ambiental/fd-servicios-cientifico-tecnicos_sanidad-ambiental/Analisis_calidad_aire_Espana_2001_2012_tcm7_311112.pdf
        // Pg 165
    }

    /**
     *  50000 pp millones             =>   50 pp miles  => 5%
     *   2000 pp millones             =>    2 pp miles  => 2%
     *   1000 pp millones             =>    1 pp miles  => 1%
     *    700 (parts per million)     =>  0.7 pp miles
     *    200 pp millones             =>  0.2 pp miles
     * 
     * => El outlier lo dejo entre [0, 2]
     */
    if (v === Global.VAR.CO2) {
         txt = ` La concentración de dióxido de carbono al aire libre oscila entre 
         360 ppm (parts per million) en áreas de aire limpio y 700 ppm en las ciudades.
          El valor máximo recomendado para los interiores es de 1.000 ppm 
          y el valor límite para oficinas es de 1.500 ppm.
          El dióxido de carbono sólo es perjudicial a partir de una concentración de un 5 % del volumen (que son 50.000 ppm),
           no obstante a partir de concentraciones mucho menores (a partir de valores entre 800 y 2.000 ppm) 
           se pueden producir molestias diversas.`
    }
    
    if (v === Global.VAR.NO) {
        txt = `Los denominados óxidos de nitrógeno engloban tanto al monóxido (NO) como al dióxido de
        nitrógeno (NO2). De las dos, es ésta última la principal forma química con efectos adversos sobre
        la salud, además, el NO se oxida con facilidad, dando lugar a NO2 rápidamente una vez presente
        en la atmósfera.`
        // http://www.isciii.es/ISCIII/es/contenidos/fd-el-instituto/fd-organizacion/fd-estructura-directiva/fd-subdireccion-general-servicios-aplicados-formacion-investigacion/fd-centros-unidades/fd-centro-nacional-sanidad-ambiental/fd-servicios-cientifico-tecnicos_sanidad-ambiental/Analisis_calidad_aire_Espana_2001_2012_tcm7_311112.pdf
        // Cap 4 -19
      
    }

    if (v === Global.VAR.NO2) {
      txt = `Las indices de calidad del aire utilizan el valor limite de NO2 en 200 µg/m3, 
      y consideran los valores de 400 µg/m3 como umbrals_on de alerta`
    }


    if (v === Global.VAR.Temp) {
        txt = `En condiciones normales, el agua tiene su punto de ebullición en los 
        100 grados centígrados, y su punto de unto de congelación en los 0 (cero) grados centrigrados.`
    }

    if (v === Global.VAR.pH) {
        txt = `La escala de pH mide el grado de acidez de un objeto y tiene valores que van
        del cero (el valor más ácido) al 14 (el más básico).`
    }

    if (v === Global.VAR.OD) {
        txt = `El OD se puede expresar en miligramos por litro (mg/L) o en porcentaje de saturación (%).
        La escala en mg/L comienza en 0 (Anoxia) y entre 8 y 12 son condiciones adecuadas. 
        En porcentaje de saturación entre 80% y 120% es execelnte y fuera de ese rango es pobre.`
    }

    if (v === Global.VAR.Redox) {
        txt = `En la naturaleza el potencial Redox se puede encontrar entre +600 mV (oxidación) y -300 mV (reducción),
        Cuanto mayor sea el potencial Redox mayor y más rápido será la muerte de bacterias, virus. 
        La OMS adoptó en 1971 un valor de 650 mV como el valor adecuado para el agua potable (desinfectada).
        Entre +850 y +1000 mV (con un pH de alrededor de 7) todos los microbios están muertos.`
   }

   if (v === Global.VAR.Cond) {
        txt = `La conductividad es la capacidad de una sutancia de conducir la corriente eléctrica y es lo contrario de la resistencia.
        Se suele medir en microSiemens/cm (µS/cm), y en los valores de referencia, encontramos: Agua pura: 0.055 µS/cm, 
        Agua para uso doméstico: 500 a 800 µS/cm y el máximo para agua potable es: 10055 µS/cm`
    }

    return txt
}

