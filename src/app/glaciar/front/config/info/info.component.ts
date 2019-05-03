import { Component, Input, OnInit } from '@angular/core'
import { DomainModel } from '../../../model/domainmodel'
import { DataService } from '../../../services/data.service'
import { DateFormatPipe } from '../../../components/pipe/date-format-pipe'
import { TextTransfPipe } from '../../../components/pipe/text-transf-pipe'
import * as Global from '../../../model/global'

@Component({
  selector: 'gcr-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  @Input() dataset_id: Global.DS

  lat: number
  lng: number

  frecuencia: '15m' | 'hora' | 'dia' | 'mes' | 'anual'
  dateRange: DomainModel.DateRange

  isCollapsed_Tab: Array<boolean> = [ false, false, false, false, false ]
  viewHelper = {
    icon_Tab: [ '', '', '', '', '' ],
  }

  constructor(private dataService: DataService) {

    if (Global.isLabMode()) {

      // --[ Bahia Blanca ]----
      this.dataset_id = Global.DS.DS05
      // this.quality_id = Global.QUALITY_TAB.AIRQ
      // this.param_id   = Global.VAR.CO
      
      // // --[ Charles river ]----
      // this.dataset_id = Global.DS.DS03
      // this.quality_id = Global.QUALITY_TAB.WATERQ
      // this.param_id   = Global.VAR.Temp
    }
   }

  ngOnInit() {
    console.debug(`InfoComponent::ngOnInit() . `)
    console.debug(`InfoComponent::ngOnInit() -> d/${this.dataset_id}/ ...  `)

    this.viewHelper.icon_Tab.forEach((e,i) => this.viewHelper.icon_Tab[i] = this.getIcon(i))


    this.dateRange = this.dataService.getDataset_dates(this.dataset_id)
    this.frecuencia = this.dataService.getDataset_frecuencia(this.dataset_id)

    const loc = this.dataService.getDataset_location(this.dataset_id)
    this.lat = loc.latitude
    this.lng = loc.longitude
  }

  getIcon = (i: number) => ((this.isCollapsed_Tab[i]) ? 'ft-plus-square' : 'ft-minus-square' )

  iconClicked = (i: number) => {
    this.toggle(this.isCollapsed_Tab, i)
  }

  toggle = (e, i) => e[i]=!e[i]

}
