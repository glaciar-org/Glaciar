import { inject, TestBed } from '@angular/core/testing'
import { UmbralService } from './umbral.service'
import * as Global from '../model/global'
import { KEY, ST, Outlier, Umbral }  from '../model/domainmodel'
import { GlaciarStorageService } from './glaciar-storage.service'
import * as DEBUG from '../components/util/debug/debug.libs'

const TDD_Context_SELECTED = DEBUG.TDD_Context_DS03

function glaciarStorage(): Storage {
  return sessionStorage
  // return localStorage
} 

/**
 * http://localhost:9876/debug.html?spec=GlaciarStorageService
 */
describe('GlaciarStorageService', () => {


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UmbralService]
    })

    // Reset Test Possible Influence
    glaciarStorage().clear()

  })

  it('should be created', () => {
    const service: GlaciarStorageService = TestBed.get(GlaciarStorageService)
    expect(service).toBeTruthy()
  })

  it('should be created with umbralService', inject([UmbralService], (umbralService: UmbralService) => {
    expect(umbralService).toBeTruthy()
  }))

  it('should persist Umbrales in sesion', inject([UmbralService], (umbralService: UmbralService) => {
    
    let MY_TEST_KEY = 'myTestKey'
    let obj = { a: 3 }

    let session_put    = (obj)   => glaciarStorage().setItem(MY_TEST_KEY, JSON.stringify(obj))
    let session_get    = (): any => JSON.parse(glaciarStorage().getItem(MY_TEST_KEY))
    let session_remove = ()      => glaciarStorage().removeItem(MY_TEST_KEY)
    let session_exist  = (): boolean => {
        let so = glaciarStorage().getItem(MY_TEST_KEY)
        return (typeof so !== 'undefined' && so !== null)
    }
    
    // Ciclo #1
    expect(session_exist()).toBe(false)
    session_put(obj)
    expect(session_exist()).toBe(true)
    session_remove()
    expect(session_exist()).toBe(false)

    // Ciclo #2
    session_put(obj)
    expect(session_exist()).toBe(true)
    expect(JSON.parse(glaciarStorage().getItem(MY_TEST_KEY))).toEqual(session_get())

    // Reset Test Possible Influence
    glaciarStorage().clear()
  }))

  it('should persist Umbrales in sesion', inject([UmbralService], (umbralService: UmbralService) => {
    
    const service: GlaciarStorageService = TestBed.get(GlaciarStorageService)
    expect(service).toBeTruthy()

    let u: Array<Umbral>
    let v: Array<Umbral>
    let w: Array<Umbral>
    
    // It not exist in session, so, first time, it save it
    u = service.getUmbrales(Global.getQuality(TDD_Context_SELECTED.param_id), TDD_Context_SELECTED.norma)
    
         expect(u[0].max).toBe(35)
         expect(u[0].avg).toBe(25)
         expect(u[0].min).toBe(15)

    // When it exist in session, It shoul be updatable
    u[0].max = 32
    u[0].avg = 16
    u[0].min = 12

    service.setUmbral(u[0])
    v = service.getUmbrales(Global.getQuality(TDD_Context_SELECTED.param_id), TDD_Context_SELECTED.norma)
         expect(v[0].max).toBe(u[0].max)
         expect(v[0].avg).toBe(u[0].avg)
         expect(v[0].min).toBe(u[0].min)

         
    // expect(glaciarStorage().getItem(KEY.GLACIAR.UMBRAL)).toBe(null)

    // Reset Test Possible Influence
    glaciarStorage().clear()
  }))


  it('should persist Outliers in sesion', inject([UmbralService], (umbralService: UmbralService) => {
    
    const service: GlaciarStorageService = TestBed.get(GlaciarStorageService)
    expect(service).toBeTruthy()

    let realOutlierValue = (param: Global.VAR): Outlier => umbralService.getOutliers(param)[0]
    
    let u: Array<Outlier>
    let v: Array<Outlier>
    let w: Array<Outlier>
    
    // It not exist in session, so, first time, it save it
    u  = service.getOutliers(TDD_Context_SELECTED.quality_id)
         expect(u[0].max).toBe(realOutlierValue(TDD_Context_SELECTED.param_id).max)
         expect(u[0].min).toBe(realOutlierValue(TDD_Context_SELECTED.param_id).min)

    // When it exist in session, It shoul be updatable
    u[0].max = 32
    u[0].min = 12

    service.setOutlier(u[0])
    v = service.getOutliers(TDD_Context_SELECTED.quality_id)
         expect(v[0].max).toBe(u[0].max)
         expect(v[0].min).toBe(u[0].min)

         
    // expect(glaciarStorage().getItem(KEY.GLACIAR.UMBRAL)).toBe(null)

    // Reset Test Possible Influence
    glaciarStorage().clear()
  }))





  it('should filter:: ACUMAR_2009_03_USO_IV', 
      inject([GlaciarStorageService, UmbralService], 
             (glaciarStorageS: GlaciarStorageService,
                umbralService: UmbralService) => {
    
      console.debug(`[TEST] UmbralService:: ACUMAR_2009_03_USO_IV `)

      // Size Quality: AIRQ 0 - WATERQ 5
    let sizeQuality_Vars_xNorma = (ST, Q, s) => {
      let ggllUmbral = glaciarStorageS.getUmbrales(Q, ST)
      let realUmbral =   umbralService.getUmbralArray(Q, ST)  
      expect(ggllUmbral.length).toBe(realUmbral.length)
    }

    let existe = (e): boolean => (typeof e !== 'undefined' && e !== null)
    let s      = (v): any     => (existe(v)) ? v : Global.SD

    let checkVar = (ST, VAR) => {
      let ggllUmbral = glaciarStorageS.getUmbrales   (VAR, ST)[0]
      let realUmbral =   umbralService.getUmbralArray(VAR, ST)[0]
      expect(s(ggllUmbral.var)).toBe(VAR)
      expect(s(realUmbral.var)).toBe(VAR)
      expect(s(ggllUmbral.min)).toBe(s(realUmbral.min))
      expect(s(ggllUmbral.avg)).toBe(s(realUmbral.avg))
      expect(s(ggllUmbral.max)).toBe(s(realUmbral.max))
    }

    let rs: Array<Umbral>
    let norma 
    
    // sizeQuality_Vars_xNorma(ST.AWQ.ACUMAR_2009_03_USO_IV, Global.QUALITY_TAB.AIRQ,   0)
    // sizeQuality_Vars_xNorma(ST.AWQ.ACUMAR_2009_03_USO_IV, Global.QUALITY_TAB.WATERQ, 5)
    
    checkVar(ST.AWQ.ACUMAR_2009_03_USO_IV, Global.VAR.Temp)
    glaciarStorage().clear()

    checkVar(ST.AWQ.ACUMAR_2009_03_USO_IV, Global.VAR.OD)
    glaciarStorage().clear()

    checkVar(ST.AWQ.ACUMAR_2009_03_USO_IV, Global.VAR.pH)
    glaciarStorage().clear()

    checkVar(ST.AWQ.ACUMAR_2009_03_USO_IV, Global.VAR.Redox)
    glaciarStorage().clear()

    checkVar(ST.AWQ.ACUMAR_2009_03_USO_IV, Global.VAR.Cond)
    glaciarStorage().clear()

    console.debug(`[TEST] UmbralService:: ACUMAR_2009_03_USO_IV Paso los test [Ok] `)

    // Reset Test Possible Influence
    glaciarStorage().clear()

  }))
})
