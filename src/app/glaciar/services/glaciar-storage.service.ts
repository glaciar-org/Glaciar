import { Injectable } from '@angular/core'
import { UmbralService } from './umbral.service'
import { ST, Umbral, Outlier, KEY } from '../model/domainmodel'
import * as Global from '../model/global'

@Injectable({
  providedIn: 'root'
})
export class GlaciarStorageService {

  glaciarStorage = sessionStorage
  // glaciarStorage = localStorage

  constructor(private umbralService: UmbralService) { }

  public getUmbral(param_id: Global.VAR, norma: ST.AWQ): Umbral {

    let umbrales = this.getUmbrales(Global.getQuality(param_id), norma)
    let u = new Umbral()
    u.norma   = norma
    u.quality = Global.getQuality(param_id)
    u.var     = param_id 
    let idx = this.indexOfUmbral(u, umbrales)
    let umbral = umbrales[idx]

    console.debug(`GlaciarStorageService.getUmbral(param_id=${param_id}, norma=${norma}) = ${JSON.stringify(umbral)}`)

    return umbral
  }


  public getUmbrales(quality: Global.QUALITY_TAB, norma: ST.AWQ): Array<Umbral> {

    console.debug(`GlaciarStorageService.getUmbrales(quality=${quality}, norma=${norma})`)
    let umbrales: Array<Umbral>

    if (!this.existUmbral()) {
        let umbrales_all: Array<Umbral>
            umbrales_all = this.umbralService.getUmbralArray(quality, norma)
        this.setUmbrales(umbrales_all)
    } 

    umbrales = this.getUmbralesRaw_FromStorage()

    console.debug(`GlaciarStorageService.getUmbrales(quality=${quality}, norma=${norma}) = ${umbrales}`)
    return umbrales
  }

  public getUmbralesRaw_FromStorage(): Array<Umbral> {
    return JSON.parse(this.glaciarStorage.getItem(KEY.GLACIAR.UMBRAL))
  }

  /**
   * Observar que los que hace es:
   * a) Aunque recube un solo umbral, recupera todos los umbrales del storage
   * b) Actualiza el umbrlar que corresponde de los recuperados
   * c) vuelve a persistir a TODOS los umbrales
   * @param umbral 
   */
  public setUmbral(umbral: Umbral) {
    let umbrales = this.getUmbrales(Global.getQuality(umbral.var), umbral.norma)
    let idx = this.indexOfUmbral(umbral, umbrales)
    umbrales[idx] = umbral
    this.setUmbrales(umbrales)
  }

  public setUmbrales(umbrales: Array<Umbral>) {
    this.glaciarStorage.setItem(KEY.GLACIAR.UMBRAL, JSON.stringify(umbrales))
  }

  public removeUmbrales() {
    this.glaciarStorage.removeItem(KEY.GLACIAR.UMBRAL)
  }

  //--[Outliers]------


  public getOutlier(param_id: Global.VAR): Outlier {

    let outliers = this.getOutliers(Global.getQuality(param_id))
    let ooll = new Outlier()
    ooll.quality = Global.getQuality(param_id)
    ooll.var     = param_id 
    let idx = this.indexOfOutliers(ooll, outliers)
    let outlier = outliers[idx]

    console.debug(`GlaciarStorageService.getOutlier(param_id=${param_id}) = ${JSON.stringify(outlier)}`)

    return outlier
  }

  public getOutliers(quality: Global.QUALITY_TAB): Array<Outlier> {

    console.debug(`GlaciarStorageService.getOutliers(quality=${quality})`)
    let outliers: Array<Outlier>

    if (!this.exisOutlier()) {
        outliers = this.umbralService.getOutliers(quality)
        this.setOutliers(outliers)
    } 

    outliers = this.getOutliersRaw_FromStorage()
    console.debug(`GlaciarStorageService.getOutliers(quality=${quality}) = ${outliers}`)
    return outliers
  }
  
  public getOutliersRaw_FromStorage(): Array<Outlier> {
    return JSON.parse(this.glaciarStorage.getItem(KEY.GLACIAR.OUTLIERS))
  }

  public setOutlier(ooll: Outlier) {
    let outliers = this.getOutliers(ooll.quality)
    let idx = this.indexOfOutliers(ooll, outliers)
    outliers[idx] = ooll
    this.setOutliers(outliers)
  }

  public setOutliers(outliers: Array<Outlier>) {
    this.glaciarStorage.setItem(KEY.GLACIAR.OUTLIERS, JSON.stringify(outliers))
  }

  public removeOutliers() {
    this.glaciarStorage.removeItem(KEY.GLACIAR.OUTLIERS)
  }
  
  
  
  //--[Utilieria]----
  public  clear = () => this.glaciarStorage.clear()

  private existe = (key: KEY.GLACIAR): boolean => (typeof this.glaciarStorage.getItem(key) !== 'undefined'
                                                       && this.glaciarStorage.getItem(key) !== null)

  private existUmbral = (): boolean => this.existe(KEY.GLACIAR.UMBRAL)
  private exisOutlier = (): boolean => this.existe(KEY.GLACIAR.OUTLIERS)
  
  private sameUmbral  = (v1: Umbral,  v2: Umbral)  => (v1.quality === v2.quality && v1.var === v2.var && v1.norma === v2.norma)
  private sameOutlier = (v1: Outlier, v2: Outlier) => (v1.quality === v2.quality && v1.var === v2.var)

  private indexOfUmbral = (u: Umbral, umbrales: Array<Umbral>) => {
    for(let i = 0; i < umbrales.length; i++) {
      if (this.sameUmbral(u, umbrales[i])) {
          return i
      }
    }
    return -1
  }

  private indexOfOutliers = (u: Outlier, outliers: Array<Outlier>) => {
    for(let i = 0; i < outliers.length; i++) {
      if (this.sameOutlier(u, outliers[i])) {
          return i
      }
    }
    return -1
  }

}
