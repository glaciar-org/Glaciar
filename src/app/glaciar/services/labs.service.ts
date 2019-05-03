import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError, retry } from 'rxjs/operators'
import { HttpClient, HttpRequest, HttpErrorResponse } from '@angular/common/http'
import * as Global from '../model/global'

@Injectable({
  providedIn: 'root'
})
export class LabsService {


  URL_LABS_SERVICE    = 'http://localhost:5000/info/heroku'
  URL_CHARLES_RIVER   = 'https://www.epa.gov//sites/production/files/buckeye_symlinks/region1-buoys/charles/crbuoy2015.csv?0.7245153324796312'


  url                 = 'http://localhost:5000'
  URL_GlaciaR_BACKEND = 'http://localhost:5000/dataset/MGSET_02_2010_2015/p/AIRQ_CO?from=2014-10-01&to=2015-10-01'
  URL_JSON_SERVER     = 'http://localhost:4001'


  urlBackend: string
  urlBackendMsg: ''
  envChartLib: string

  constructor(private http: HttpClient) {
    console.debug('LabsService#constructor()')

    this.urlBackend  = Global.getValue(Global.HOST_BACKEND.UPSALA)
    this.envChartLib = Global.getValue(Global.GlaciaR_Viedma__CHARTLIB)

  }

  getBooks() {
    return this.http.get(`${this.url}/books`)
  }

  getBackend() {
    return this.http.get('/info/heroku').pipe(
      catchError(this.handleError)
    )
  }

  getInfoHeroku() {
    const req = new HttpRequest('GET', this.URL_LABS_SERVICE, {
      reportProgress: true
    })

    return this.http.request(req)
  }

  // Nota: ¿Podría bajarme todo el csv de aca?
  getCharlesRiverDate() {
    const req = new HttpRequest('GET', this.URL_CHARLES_RIVER, {
      reportProgress: true
    })

    return this.http.request(req)
  }

  getLabBackendData() {

    console.debug(`GET ${this.URL_GlaciaR_BACKEND}`)

    return this.http.get(`${this.URL_GlaciaR_BACKEND}`)
  }


  getJsonServerData(queryString: string) {

    console.debug(`GET ${this.URL_JSON_SERVER}/${queryString}`)

    return this.http.get(`${this.URL_JSON_SERVER}/${queryString}`)
  }


  private handleError(error: HttpErrorResponse) {

    console.debug('handleError(' + error.url + ')')

    const isUrl_books           = error.url.includes('/books')
    const isUrl_backend         = error.url.includes('/info/heroku')
    const isUrl_JsonServer      = error.url.includes(this.URL_JSON_SERVER)
    const isUrl_GlaciaR_Bckend  = error.url.includes(this.URL_GlaciaR_BACKEND)

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message)
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`)
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened, please try again later.')
  }

}


