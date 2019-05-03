import { Component, Input, OnInit } from '@angular/core'
import * as Global from '../../../model/global'

@Component({
  selector: 'gcr-config-tab',
  templateUrl: './config-tab.component.html',
  styleUrls: ['./config-tab.component.scss']
})
export class ConfigTabComponent implements OnInit {

  @Input() dataset_id: Global.DS
  @Input() quality_id: Global.QUALITY_TAB
  @Input() param_id: Global.VAR

  constructor() {
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

  ngOnInit() {

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
    
    console.debug(`ConfigTabComponent::ngOnInit() -> d/${this.dataset_id}/q/${this.quality_id}/p/${this.param_id}/ `)
  }

}
