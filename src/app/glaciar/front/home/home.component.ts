import { Component, OnInit } from '@angular/core'
import { DomainModel } from '../../model/domainmodel'
import { DataService } from '../../services/data.service'
import * as Global from '../../model/global'

@Component({
  selector: 'gcr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  zoom: number = 2

  markers: DomainModel.Marker[] = []

  // Google Center map lat-long
  lat: number = 8.00
  lng: number = 8.00

  constructor(private dataService: DataService) {

    // console.debug('HomeComponent::environment: ' + environment.env)
    console.debug('HomeComponent::environment: ')

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

  ngOnInit() {
    this.getMarkers()
  }

  getMarkers() {

    this.dataService.getDatasets(undefined).forEach(d => {

      const marker: DomainModel.Marker = d.location

      if (!Global.isDS_Multiple(d.code)) {
        marker.name  = d.name
        marker.label = d.code
        marker.draggable = false
        marker.link  = '/#' + Global.getDatasetHome(d.code)
  
        this.markers.push(marker)
      }
    })

    console.log(`getMarkers() = ${JSON.stringify(this.markers)}`)
  }

}


/**

// https://stackblitz.com/edit/angular-google-maps-demo?file=app%2Fapp.component.html


*/

