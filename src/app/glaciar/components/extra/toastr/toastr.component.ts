import { Component, Input, OnInit } from '@angular/core'
import { NGXToastrService } from './toastr.service'
import { DataService } from '../../../services/data.service'
import { DomainModel } from '../../../model/domainmodel'
import * as Global from '../../../model/global'
import * as moment from 'moment'

@Component({
  selector: 'gcr-toastr',
  templateUrl: './toastr.component.html',
    styleUrls: ['./toastr.component.scss'],
    providers: [NGXToastrService]
})

export class ToastrComponent implements OnInit {

  @Input() dataset_id: Global.DS
  @Input() quality_id: Global.QUALITY_TAB
  @Input() param_id: Global.VAR

  dateRange: DomainModel.DateRange
  dateFilter: DomainModel.DateFilter

  constructor(
    private service: NGXToastrService, 
    private dataService: DataService) { 

      // --[Buenos Aires]-------------------
      // this.dataset_id =  Global.DS.DS01
      // this.quality_id =  Global.QUALITY_TAB.AIRQ
      // this.param_id   =  Global.VAR.NO2

      // --[Charles River]------------------
      this.dataset_id =  Global.DS.DS03
      this.quality_id =  Global.QUALITY_TAB.WATERQ
      this.param_id   =  Global.VAR.Temp

      // Rangos Dinamicos
      const minDate = this.dataService.getDataset_dates(this.dataset_id).minDate
      const maxDate = this.dataService.getDataset_dates(this.dataset_id).maxDate

      // Solo un mes atrás
      this.dateFilter = new DomainModel.DateFilter()
      this.dateFilter.to = maxDate
      this.dateFilter.from = moment(this.dateFilter.to).subtract(3, 'month').toDate()

      // Estáticos:
      // this.dateFilter.from = new Date('2015-12-15T00:00:00.000Z')
      // this.dateFilter.to   = new Date('2015-12-20T00:00:00.000Z')

  }

  ngOnInit() {
    console.debug('ToastrComponent:ngOnInit() ')

    this.dateRange = this.dataService.getDataset_dates(this.dataset_id)
  }

  onDateChange() {
    console.debug('ToastrComponent:onDateChange() ')
  }
  // Success Type
  typeInfo() {
    this.service.typeInfo()
  }

  // Success Type
  typeSuccess() {
    this.service.typeSuccess()
  }

  onClick() {
    console.debug(`ToastrComponent::onClick `)
    this.service.onSuceesClickAction('lljlkjljjkfds')
  }

}
