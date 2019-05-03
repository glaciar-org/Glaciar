import { Component, OnInit, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ChartConfig } from '../../../model/domainmodel'
import * as Global from '../../../model/global' 

export enum Padre {
  ANY               = "ANY",
  amChart4_LabMode  = "amChart4_LabMode",
  setup_component   = "setup.component",
  umbral_component  = "umbral.component",
  outlier_component = "outlier.component",
}

@Component({
  selector: 'gcr-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.scss']
})
export class DebugComponent implements OnInit {

  @Input() fatherName  : string = Padre.ANY
  @Input() formConfig  : FormGroup
  @Input() chartConfig : ChartConfig.Options
  @Input() form2       : FormGroup
  @Input() show        : boolean = false

  isHost_Local: boolean

  isCollapsed_Tab: Array<boolean> = [ false, false, false, false, false ]
  viewHelper = {
    icon_Tab: [ '', '', '', '', '' ],
  }

  constructor() { 

  }


  ngOnInit() {

    if (this.fatherName != undefined && this.fatherName != Padre.ANY) {

    }
    console.log(`DebugComponent::fatherName ${this.fatherName}`)

    this.isHost_Local = Global.isHost_Local()

    this.viewHelper.icon_Tab.forEach((e,i) => this.viewHelper.icon_Tab[i] = this.getIcon(i))

    if (this.formConfig !== undefined) {
      console.log(`DebugComponent::formConfig = ${JSON.stringify(this.formConfig.value)}`)
    }

    if (this.chartConfig !== undefined) {
      console.log(`DebugComponent::chartConfig = ${JSON.stringify(this.chartConfig)}`)
    }

    if (this.form2 !== undefined) {
      console.log(`DebugComponent::form2 = ${JSON.stringify(this.form2.value)}`)
    }

    this
  }

  /**
   * PARA CERRAR:   ft-minus-square  (nb-arrow-dropup nb-arrow-up nb-close-circled)
   * PARA ABRIR:    ft-plus-square   (nb-plus-circled) 
   * 
   */
  getIcon = (i: number) => ((this.isCollapsed_Tab[i]) ? 'nb-plus-circled' : 'nb-close-circled' )

  iconClicked = (i: number) => {
    this.toggle(this.isCollapsed_Tab, i)
  }

  toggle = (e, i) => e[i]=!e[i]

}


/**
 * icon-target icon-bulb icon-like icon-eyeglasses ft-airplay 
 * 
 * ft-cloud-lightning 
 * ft-cloud-drizzle
 * ft-cloud-snow
 */