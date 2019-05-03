import { Component, OnInit } from '@angular/core'
import { DomainModel } from '../../model/domainmodel'
import { DataService } from '../../services/data.service'
import * as Global from '../../model/global'

const PAISES_EMISORES_CO2 = [
  // { name: 'Alemania',  latitude:   52.520008,   longitude:  13.404954  },
  { name: 'Brasil',    latitude:  -23.5475006,  longitude: -46.6361084 },
  { name: 'Bolivia',   latitude:  -16.5000000,  longitude: -68.1500000 },
  { name: 'Chile',     latitude:  -35.675148,   longitude: -71.5429688 },
  { name: 'Argentina', latitude:  -31.4135000,  longitude: -64.1810500 },
]


// Berlin, Germany    --> Latitude and longitude  52.520008, 13.404954.
// São Paulo, Brasil  -->  latitud -23.5475006 y longitud -46.6361084
// Bolivia, La Paz    -->   -16.5, -68.1500015
// Chile              -->  la latitud -35.675148 y longitud -71.5429688
// Argentina          -->  latitud -38.4160957 y longitud -63.6166725.
// Córdoba            -->  Latitud: -31.4135000 Longitud: -64.1810500 


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

    PAISES_EMISORES_CO2.forEach(d => {

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

      marker.name  = d.name
      marker.label = d.code
      marker.draggable = false
      marker.link  = '/#' + Global.getDatasetHome(d.code)

      this.markers.push(marker)

    })

    console.log(`getMarkers() = ${JSON.stringify(this.markers)}`)
  }

}


/**

// https://stackblitz.com/edit/angular-google-maps-demo?file=app%2Fapp.component.html


*/

