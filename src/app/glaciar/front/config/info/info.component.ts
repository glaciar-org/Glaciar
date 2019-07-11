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

  zoom: number = 2
  
  // Google Center map lat-long
  lat: number = 8.00
  lng: number = 8.00

  markers: DomainModel.Marker[] = []

  frecuencia: '15m' | 'hora' | 'dia' | 'mes' | 'anual'
  dateRange: DomainModel.DateRange

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

    this.dateRange  = this.dataService.getDataset_dates(this.dataset_id)
    this.frecuencia = this.dataService.getDataset_frecuencia(this.dataset_id)

    this.getMarkers()
  }

  getMarkers() {

    this.dataService.getDatasets(this.dataset_id).forEach(d => {

      const marker: DomainModel.Marker = d.location

      if (!Global.isDS_Multiple(d.code)) {
        marker.name  = d.name
        marker.label = d.code
        marker.draggable = false
        marker.link  = '/#' + Global.getDatasetHome(d.code)

        this.markers.push(marker)
      }
    })

    if (Global.isDS01(this.dataset_id)) {

      console.debug(`InfoComponent::isDS01(${this.dataset_id}): `)

      Global.DS01_ESTACIONES.forEach(d => {
        let markerPaises: DomainModel.Marker = new DomainModel.Marker() 

        markerPaises.latitude = d.latitude
        markerPaises.longitude = d.longitude
        markerPaises.name  = 'Estaciones Ambientales BS. AS.'
        markerPaises.label = Global.DS.DS01
        markerPaises.draggable = false
        markerPaises.link  = '/#' + Global.getDatasetHome(Global.DS.DS01)

        this.markers.push(markerPaises)
      })
    }

    if (Global.isDS05(this.dataset_id)) {

      console.debug(`InfoComponent::isDS05(${this.dataset_id}): `)

      Global.PAISES_EMISORES_CO2.forEach(d => {
        let markerPaises: DomainModel.Marker = new DomainModel.Marker() 

        markerPaises.latitude = d.latitude
        markerPaises.longitude = d.longitude
        markerPaises.name  = 'Emisiones CO2 por Paises'
        markerPaises.label = Global.DS.DS05a
        markerPaises.draggable = false
        markerPaises.link  = '/#' + Global.getDatasetHome(Global.DS.DS05a)

        this.markers.push(markerPaises)
      })
    }

    console.log(`getMarkers() = ${JSON.stringify(this.markers)}`)
  }
}
