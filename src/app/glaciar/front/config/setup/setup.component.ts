import { Component, OnInit } from '@angular/core'
import { Pipe, PipeTransform } from '@angular/core'
import { FormBuilder, FormGroup, FormArray } from '@angular/forms'
import { DomainModel, Outlier } from '../../../model/domainmodel'
import { ChartConfig, Umbral } from '../../../model/domainmodel'
import { DataService } from '../../../services/data.service'
import { MessageService } from '../../../services/message.service'
import { GlaciarStorageService } from '../../../services/glaciar-storage.service'
import * as Global from '../../../model/global'
import * as Frontlibs from '../../front.libs'

@Component({
  selector: 'gcr-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  chartConfig : ChartConfig.Options
  formConfig  : FormGroup

  UMBRALES: Array<Umbral>

  isCollapsed_Tab: Array<boolean> = [ false, false, false, false, false ]
  viewHelper = {
    icon_Tab: [ '', '', '', '', '' ],
  }

  constructor(private fb: FormBuilder,
              private dataService: DataService,
              private glaciarStorage: GlaciarStorageService,
              private messageService: MessageService) {

  }

  ngOnInit() {

    console.info(`SetupComponent::ngOnInit() `)

    this.UMBRALES = this.glaciarStorage.getUmbralesRaw_FromStorage()
    let AWQ_SELECTED = this.UMBRALES[0].norma

    this.viewHelper.icon_Tab.forEach((e,i) => this.viewHelper.icon_Tab[i] = this.getIcon(i))

    this.chartConfig = this.dataService.getChartConfigDefautl(AWQ_SELECTED)
    this.chartConfig.umbrals = this.UMBRALES

    this.formConfig = this.fb.group(this.chartConfig)

    this.formConfig.valueChanges.subscribe((epa) => {

      let isAnAction = Frontlibs.didItChanged(this.formConfig, this.chartConfig, 
            ' labelY     || scrollbarY || ' 
          + ' umbrals_on || umbral_min ||  umbral_avg || umbral_max ' )

          // serie_tipo_area || 
    //       // cursor || 
    //       vendor.js:123598 ERROR TypeError: Cannot read property 'cursor' of undefined
    // at Amcharts4Component.doActionSetup_cursor (main.js:2369)

      Frontlibs.copyForm2ChartConfig(this.formConfig, this.chartConfig)

      console.info(`SetupComponent:ss:this.chartConfig      = ${JSON.stringify(this.chartConfig) }      `)
      console.info(`SetupComponent:ss:this.formConfig.value = ${JSON.stringify(this.formConfig.value) } `)
  
      if (isAnAction) {
        this.messageService.sendAction(this.chartConfig)
      } else {
        this.messageService.sendObject(this.chartConfig)
      }

    })

    this.doFormConfig()
  }


  doFormConfig() {

    this.formConfig.controls.umbrals = this.fb.array([])
    
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

  onChange_range(event) {
    console.debug(`SetupComponent:[IWR]:onChange_range(${event})`)
  }

  sendObject(obj): void {
     console.debug(`SetupComponent:[IWR]:sendObject(${obj})`)
     this.messageService.sendObject(obj)
  }

  clearObject(): void {
    this.messageService.clearObject()
  }

  getIcon = (i: number) => ((this.isCollapsed_Tab[i]) ? 'ft-plus-square' : 'ft-minus-square' )

  iconClicked = (i: number) => {
    this.toggle(this.isCollapsed_Tab, i)
  }

  toggle = (e, i) => e[i]=!e[i]


}


@Pipe({
  name: 'switchText'
})
export class SwitchTextPipe implements PipeTransform {

  transform(bool: boolean, tag: string): string {
      if (tag === 'Umbral'   ) { return this.txtUmbral (bool) }
      if (tag === 'Cursor'   ) { return this.txtCursor (bool) }
      if (tag === 'Line'     ) { return this.txtLine   (bool) }
      if (tag === 'Conn'     ) { return this.txtConn   (bool) }
      if (tag === 'TimeUnit' ) { return this.txtTimeUnit(bool) }
      if (tag === 'ScrollX'  ) { return this.txtScrollX(bool) }
      if (tag === 'ScrollY'  ) { return this.txtScrollY(bool) }
      if (tag === 'LabelY'   ) { return this.txtLabelY (bool) }
      if (tag === 'Tooltip'  ) { return this.txtTooltip(bool) }
      return 'WIP'
  }

  txtUmbral   = (mostrar : boolean) => (mostrar ) ? 'Mostrar Umbrales:'     : 'No Mostrar Umbrales'
  txtCursor   = (mostrar : boolean) => (mostrar ) ? 'Cursor ejes X, Y'      : 'Sin Cursor ejes X, Y'
  txtLine     = (area    : boolean) => (area    ) ? 'Linea con área'        : 'Linea sin área'
  txtConn     = (connect : boolean) => (connect ) ? 'Conectar los puntos'   : 'Mostrar Gaps'
  txtTimeUnit = (fixed   : boolean) => (fixed   ) ? 'Escala de Tiempo Fija' : 'Escala de Tiempo Adaptable'
  txtScrollX  = (mostrar : boolean) => (mostrar ) ? 'Barra de Scroll'       : 'Sin Barra de Scroll'
  txtScrollY  = (mostrar : boolean) => (mostrar ) ? 'Barra de Scroll:'      : 'Sin Barra de Scroll'
  txtLabelY   = (mostrar : boolean) => (mostrar ) ? 'Etiqueta en eje Y'     : 'Sin Etiqueta en eje Y'
  txtTooltip  = (mostrar : boolean) => (mostrar ) ? 'Cuadro de Información' : 'Sin Cuadro de Información'
}

