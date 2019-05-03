import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core'
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms'
import { NouisliderModule } from 'ng2-nouislider'
import { DomainModel, Outlier, ChartConfig  } from '../../../model/domainmodel'
import { DataService } from '../../../services/data.service'
import { UmbralService } from '../../../services/umbral.service'
import { GlaciarStorageService } from '../../../services/glaciar-storage.service'
import { MessageService } from '../../../services/message.service'
import { TextTransfPipe } from '../../../components/pipe/text-transf-pipe'
import { SwitchTextPipe } from '../setup/setup.component'
import { NGXToastrService } from '../../../components/extra/toastr/toastr.service'
import * as Frontlibs from '../../front.libs'
import * as Global from '../../../model/global'

@Component({
  selector: 'gcr-outlier',
  templateUrl: './outlier.component.html',
  styleUrls: ['./outlier.component.scss'],
  providers: [
    NGXToastrService, 
  ]
})
export class OutlierComponent implements OnInit, OnChanges, OnDestroy {

  @Input() dataset_id: Global.DS
  @Input() quality_id: Global.QUALITY_TAB
  @Input() param_id: Global.VAR

  chartConfig: ChartConfig.Options
  formConfig: FormGroup

  nil_actions      : Array<{ code: ChartConfig.NIL_Command,     desc: string}>
  outliers_actions : Array<{ code: ChartConfig.OUTLIER_Command, desc: string}>

  OUTLIERS_CONTROLS: any
  MBRALLSS_CONTROLS: any
  slides_config: Array<any> = []


  isCollapsed_Tab: Array<boolean> = [ false, false, false, false, false ]
  viewHelper = {
    icon_Tab: [ '', '', '', '', '' ],
  }

  constructor(private fb: FormBuilder,
              private router: Router,
              private dataService: DataService,
              private umbralService: UmbralService,
              private glaciarStorage: GlaciarStorageService,
              private toastrService: NGXToastrService,
              private messageService: MessageService) { 
    
                
      console.debug(`OutlierComponent::ngOnInit() this.router.url = ${this.router.url } ` )
      console.debug(`OutlierComponent::ngOnInit() Global.isLabMode() 1= ${Global.isLabMode()} ` )

    if (Global.isLabMode()) {

      console.debug(`OutlierComponent::ngOnInit() Global.isLabMode() 2= ${Global.isLabMode()} ` )
      // --[ Bahia Blanca ]----
      this.dataset_id = Global.DS.DS02
      this.quality_id = Global.QUALITY_TAB.AIRQ
      this.param_id   = Global.VAR.CO
      
      // // --[ Charles river ]----
      // this.dataset_id = Global.DS.DS03
      // this.quality_id = Global.QUALITY_TAB.WATERQ
      // this.param_id   = Global.VAR.Temp
    }

  }

  ngOnInit() {

    // console.debug(`OutlierComponent::ngOnInit() Global.isLabMode() 3= ${Global.isLabMode()} ` )

    // if (Global.isLabMode()) {

    //   console.debug(`OutlierComponent::ngOnInit() Global.isLabMode() 4= ${Global.isLabMode()} ` )
    //   // --[ Bahia Blanca ]----
    //   this.dataset_id = Global.DS.DS02
    //   this.quality_id = Global.QUALITY_TAB.AIRQ
    //   this.param_id   = Global.VAR.CO
      
    //   // // --[ Charles river ]----
    //   // this.dataset_id = Global.DS.DS03
    //   // this.quality_id = Global.QUALITY_TAB.WATERQ
    //   // this.param_id   = Global.VAR.Temp
    // }

    console.debug(`OutlierComponent::ngOnInit() this.router.url = ${this.router.url } ` )

    console.debug(`OutlierComponent::ngOnInit() -> d/${this.dataset_id}/q/${this.quality_id}/p/${this.param_id}/ `)

    this.viewHelper.icon_Tab.forEach((e,i) => this.viewHelper.icon_Tab[i] = this.getIcon(i))

    this.chartConfig = this.dataService.getChartConfigDefautl(this.quality_id)

    this.formConfig = this.fb.group({
      nil_action      : this.chartConfig.nil_action,
      outliers_action : this.chartConfig.outliers_action,
      serie_connect   : this.chartConfig.serie_connect,
      mbrallss        : this.fb.array([]),
      outliers        : this.fb.array([]),
    })

    this.setOutliers()

    this.OUTLIERS_CONTROLS = (<FormGroup>this.formConfig.get('outliers')).controls
    this.MBRALLSS_CONTROLS = (<FormGroup>this.formConfig.get('mbrallss')).controls

    this.formConfig.get('mbrallss').valueChanges.subscribe(oollf=> { 
         console.info(`OutlierComponent:[cambio]:mbrallss = ${JSON.stringify(oollf)} `)

         oollf.forEach((outlierForm: Array<any>, i) => {
            this.chartConfig.outliers[i].min = outlierForm[0]
            this.chartConfig.outliers[i].max = outlierForm[1]
         }, this)

         // CADA VEZ QUE CAMBIA EL FROM, PISO LOS VALORES DE LOS OUTLIERS EN EL STORAGE
         this.glaciarStorage.setOutliers(this.chartConfig.outliers)

         this.sendObject(this.chartConfig)
    })

    let syncForm2Chart = (p: string) => {
      this.formConfig.get(p).valueChanges.subscribe(v=> {
        this.chartConfig[p] = v
        this.sendObject(this.chartConfig)
      })
    }
    
    syncForm2Chart('outliers_action')
    syncForm2Chart('nil_action')
    syncForm2Chart('serie_connect')

    this.nil_actions = Frontlibs.getNilActions()

    this.outliers_actions = Frontlibs.getOutliersActions()

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(`OutlierComponent::changes(changes=${JSON.stringify(changes)})`)
  }

  ngOnDestroy() {
    console.log(`OutlierComponent::ngOnDestroy()`)
  }
  
  outlier(v: Global.VAR) {
    console.log(`outlier(` + v + `)`)

    let tit = Global.getParamIdDescription(v)
    let uni = Global.getLabelUnits(v, true)
    let txt = Frontlibs.getOutlierText(v)

    this.toastrService.info(txt, tit)
  }

  getSliderConfig(v: Global.VAR, min: number, max: number): any {

    console.log(`OutlierComponent::getSliderConfig(v=${v}, min=${min}, max=${max})`)
    let ot = this.glaciarStorage.getOutlier(v)

    let isNotLinear = (v === Global.VAR.CO2) // https://refreshless.com/nouislider/slider-values/#section-non-linear

    // let range = (isNotLinear) ? {
    //   'min': ot.min,
    //   '50%': [ 10000,  200],
    //   '70%': [ 20000, 2000],
    //   'max': ot.max
    // } : {
    //   min: ot.min,
    //   max: ot.max,
    // }

    let miStartMax =  (v === Global.VAR.CO2) ? (max+200) : (max+22)

    // let start = (v === Global.VAR.CO2) ?  [ min, 7000] :  [ min, 8000]

    return {
      behaviour: 'drag',
      connect: true,
      margin: 1, 
      start: [min,  max],
      range:  {
          min: ot.min,
          max: ot.max,
      },
      pips: {
        mode: 'steps',
        density: 5
      },
      tooltips: true,
    }
  }

  onChangeRange(e) {
    console.debug(`OutlierComponent::onChangeRange(${e})`)
  }


  _dd_onClick() {
    console.debug(`ToastrComponent::onClick `)
    this.toastrService.onSuceesClickAction('lljlkjljjkfds')
  }

  setOutliers() {

    let control_outliers = <FormArray>this.formConfig.controls.outliers
    let control_mbrallss = <FormArray>this.formConfig.controls.mbrallss

    this.chartConfig.outliers.forEach(x => {

      control_outliers.push(this.fb.group({ 
          quality: x.quality, 
          var: x.var, 
          min: x.min, 
          max: x.max,
      }))

      let arr = new FormArray([])
      arr.push(this.fb.control(x.min))
      arr.push(this.fb.control(x.max))
      control_mbrallss.push(arr)

      this.slides_config.push(this.getSliderConfig(x.var, x.min, x.max))
    })
  }

  sendObject(obj): void {
    console.debug(`OutlierComponent:[IWR]:sendObject(${JSON.stringify(obj)})`)
    this.messageService.sendObject(obj)
  }

  clearObject(): void {
    this.messageService.clearObject()
  }

  ofmt = (n: Number): string => 
       (n === Number.NEGATIVE_INFINITY ||
        n === Number.POSITIVE_INFINITY) ? Global.NOT_DEF : ''+n

  getIcon = (i: number) => ((this.isCollapsed_Tab[i]) ? 'ft-plus-square' : 'ft-minus-square' )
  
  iconClicked = (i: number) => {
    this.toggle(this.isCollapsed_Tab, i)
  }

  toggle = (e, i) => e[i]=!e[i]

}



/**
 * LINKS OD:
 * http://imasd.fcien.edu.uy/difusion/educamb/propuestas/red/curso_2007/cartillas/tematicas/OD.pdf
 * 
 * 
 * OD:
 * http://imasd.fcien.edu.uy/difusion/educamb/propuestas/red/curso_2007/cartillas/tematicas/OD.pdf
 * http://selobu.blogspot.com/2012/08/porcentaje-de-saturacion-de-oxigeno.html
 * http://ciese.org/curriculum/waterproj/saturation/
 * 
 * 
 * REDOX:
 * 
 * http://www.marionkuprat.com/algunos-metodos-para-medir-la-calidad-del-agua/
 * http://panachlor.com/?p=803
 * 
 * 
 * 
 * CONSUCTIVIDAD:
 * http://www.infoagro.com/instrumentos_medida/doc_conductividad_electrica.asp?k=53
 * 
 * 
 * CALIADA DEL AIRE:
 * 
 * http://www.aragonaire.es/assets/documents/IDCA_GobAragon.pdf
 * [0, 10 ] CO
 * [0, 200] NO2 medio
 * [0, 400] NO2 alto
 * 
 * https://www.airqualitynow.eu/es/about_indices_definition.php
 * [    20.000]   Muy alto         CO: media octohoraria móvil 
 * [    10.000]   alto                 / máxima media octohoraria móvil en µg/m3
 * [   7.500]   medio             
 
 * [0, 100] NO2 Medio
 * 
 * 
 * MUY BUENO: Analisis de la calidad del aire España 2001 - 2012
 * http://www.isciii.es/ISCIII/es/contenidos/fd-el-instituto/fd-organizacion/fd-estructura-directiva/fd-subdireccion-general-servicios-aplicados-formacion-investigacion/fd-centros-unidades/fd-centro-nacional-sanidad-ambiental/fd-servicios-cientifico-tecnicos_sanidad-ambiental/Analisis_calidad_aire_Espana_2001_2012_tcm7_311112.pdf
 * 
 * 
 *
 */