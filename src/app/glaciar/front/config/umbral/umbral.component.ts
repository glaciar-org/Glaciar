import { Component, EventEmitter, Input, Output, SimpleChanges, OnInit, OnChanges, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms'
import { Subscription } from 'rxjs/Subscription'
import { DataService } from '../../../services/data.service'
import { MessageService } from '../../../services/message.service'
import { UmbralService } from '../../../services/umbral.service'
import { GlaciarStorageService } from '../../../services/glaciar-storage.service'
import { ChartConfig, Umbral, ST } from '../../../model/domainmodel'
import { TextTransfPipe } from '../../../components/pipe/text-transf-pipe'
import { NumTransfPipe } from '../../../components/pipe/num-transf-pipe'
import { NGXToastrService } from '../../../components/extra/toastr/toastr.service'
import * as Global from '../../../model/global'
import * as Frontlibs from '../../front.libs'

@Component({
  selector: 'gcr-umbral',
  templateUrl: './umbral.component.html',
  styleUrls: ['./umbral.component.scss'],
  providers: [
    NGXToastrService, 
  ]
})
export class UmbralComponent implements OnInit, OnChanges, OnDestroy {

  @Input() dataset_id: Global.DS
  @Input() quality_id: Global.QUALITY_TAB
  @Input() param_id: Global.VAR


  FORM_SYSTEM_CONTROLS: any

  UMBRALES: Array<Umbral>


  formConfig: FormGroup
  formSistema: FormGroup

  chartConfig: ChartConfig.Options

  awq_system: ST.AWS_SYSTEM
  awq_system_all: Array<ST.AWS_SYSTEM>


  isCollapsed_ROW: Array<boolean> = [ false, false, false, false, false,
                                      false, false, false, false, false ]

  isCollapsed_Tab: Array<boolean> = [ false, false, false, false, false ]
  viewHelper = {
    icon_Tab: [ '', '', '', '', '' ],
    icon_Row: [ '', '', '', '', '', '', '', '', '', '' ],
    param_id_idx: 0
  }

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private umbralService: UmbralService,
    private glaciarStorage: GlaciarStorageService,
    private toastrService: NGXToastrService,
    private messageService: MessageService) {

    if (Global.isLabMode()) {

      // // --[ Bahia Blanca ]----
      this.dataset_id = Global.DS.DS02
      this.quality_id = Global.QUALITY_TAB.AIRQ
      this.param_id   = Global.VAR.CO

      // --[ Charles river ]----
      // this.dataset_id = Global.DS.DS03
      // this.quality_id = Global.QUALITY_TAB.WATERQ
      // this.param_id   = Global.VAR.Temp
    }
  }


  resetViewHelper() {
    this.isCollapsed_ROW    .forEach((e,i) => this.isCollapsed_ROW[i]     = false)
    this.viewHelper.icon_Row.forEach((e,i) => this.viewHelper.icon_Row[i] = this.getIconRow(i))
    this.viewHelper.param_id_idx = this.getParamIDX(this.param_id, this.UMBRALES)
  }

  ngOnInit() {
    
    console.debug(`UmbralComponent::ngOnInit() -> d/${this.dataset_id}/q/${this.quality_id}/p/${this.param_id}/ `)

    this.chartConfig    = this.dataService.getChartConfigDefautl(this.quality_id)

    let AWQ_SELECTED    = this.chartConfig.awq_estandar

    this.awq_system     = this.umbralService.getAWQ_System(AWQ_SELECTED)
    this.awq_system_all = this.umbralService.getAWQ_Systems(this.quality_id)

    this.UMBRALES = this.glaciarStorage.getUmbrales(this.quality_id, AWQ_SELECTED)
    this.resetViewHelper()


    // this.formConfig = this.fb.group(this.chartConfig)
    this.formConfig = this.fb.group({
      umbrals: this.fb.array([]),
    })


    this.formSistema = this.fb.group({
      awq_estandar: this.awq_system.code,
    })

    this.doFormConfig()

    this.FORM_SYSTEM_CONTROLS = (<FormGroup>this.formConfig.get('umbrals')).controls

    this.formConfig.valueChanges.subscribe(() => {

      Frontlibs.copyForm2ChartConfig(this.formConfig, this.chartConfig)

      console.debug('[2]UmbralComponent::this.chartConfig = ' + JSON.stringify(this.chartConfig) + ') ')
      console.debug('[2]UmbralComponent::this.formConfig  = ' + JSON.stringify(this.formConfig.value) + ')')

      // CADA VEZ QUE CAMBIA EL FROM, ACTUALIZO LOS VALORES DE LOS UMBRALES DEL STORAGE
      this.glaciarStorage.setUmbrales(this.chartConfig.umbrals)

      // Emite, pero sin reload el Sistema
      this.sendAction(this.chartConfig)
    })

    /**
     * Cuando cambia el sistema, lo único que debería hacer es resetear todo:
     * - Es decir:
     *   - el storage
     *   - el form config
     *   - elChart config tambien (aunque esto cambiar por suscripcion ... )
     *   - hacer un reload del chart
     */
    this.formSistema.valueChanges.subscribe(() => {

      // Esto es too much... deberìan haber sido solo los umbrales que están asociados al cambio de estandar
      // this.glaciarStorage.clear()  // x -> AWQ_SELECTED
      this.glaciarStorage.removeUmbrales()  // x -> AWQ_SELECTED

      let AWQ_SELECTED = this.formSistema.value.awq_estandar
      this.awq_system = this.umbralService.getAWQ_System(AWQ_SELECTED)
      this.UMBRALES = this.glaciarStorage.getUmbrales(this.quality_id, AWQ_SELECTED)
      this.resetViewHelper()

      this.doFormUpdate(AWQ_SELECTED)

      // Reload el Sistema
      this.sendObject(this.chartConfig)

    })

  }


  ngOnChanges(changes: SimpleChanges) {
    console.debug('UmbralComponent::changes(changes=' + JSON.stringify(changes) + ')')

    if (!changes.param_id.firstChange) {
        this.viewHelper.param_id_idx = this.getParamIDX(this.param_id, this.UMBRALES)
    }
  }

  ngOnDestroy() {

  }

  getParamIDX(param: Global.VAR, UMBRALES: Array<Umbral>): number {
    for (let i = 0; i< UMBRALES.length; i++) {
      if (UMBRALES[i].var === param)
        return i
    }
    return -1
  }

  showInfo_QualitySystem(wqs: ST.AWS_SYSTEM) {
    console.log(`showInfo_QualitySystem(${wqs})`)

    let tit = 'Información'
    let txt = wqs.info

    this.toastrService.info(txt, tit,  {
      closeButton: true,
      enableHtml: true,
      messageClass: 'font-small-2',
      timeOut: 8000,
    })
  }

  doFormConfig() {

    let umbrals = <FormArray>this.formConfig.controls.umbrals

    console.debug(`UMBRALES =>  ${ JSON.stringify(this.UMBRALES)}`)
    this.UMBRALES.forEach(x => {
      umbrals.push(this.fb.group({
        norma   : x.norma,
        quality : x.quality,
        var     : x.var,
        min     : x.min,
        avg     : x.avg,
        max     : x.max,
      }))
    })
  }

  doFormUpdate(awq_selected: ST.AWQ) {

    let fffSystem = []

    this.UMBRALES.forEach((r,i) => {
      console.debug(`UMBRALES:: ${awq_selected} ${JSON.stringify(r)}`)
      fffSystem.push({
        norma   : r.norma,
        quality : r.quality,
        var     : r.var,
        min     : r.min,
        avg     : r.avg,
        max     : r.max,
      })
    })

    this.formConfig.setValue({
        umbrals: fffSystem
    })

  }

  onClick_RowEdit(i: number) {
    // Logica de UI:
    console.debug(`[A] onClick_RowEdit:: [ i=${i}, ${this.isCollapsed_ROW} ]`)
    this.toggle(this.isCollapsed_ROW, i)
    this.viewHelper.icon_Row[i] = this.getIconRow(i)
  }


  sendObject(obj): void {
     console.debug(`UmbralComponent:[IWR]:sendObject(${obj})`)
     this.messageService.sendObject(obj)
  }

  sendAction(obj): void {
     console.debug(`UmbralComponent:[IWR]:sendAction(${obj})`)
     this.messageService.sendAction(obj)
  }

  getIconRow = (n: number) => ((this.isCollapsed_ROW[n]) ? 'far fa-edit' : 'fas fa-pencil-alt' )  // iconos: 0 ... 5



  toggle = (e, i) => e[i]=!e[i]
}


