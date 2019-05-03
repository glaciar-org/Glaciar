import { TestBed, inject } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { ChartConfig, Outlier, DomainModel, KEY } from '../model/domainmodel'
import { DataService } from './data.service'
import { UmbralService } from './umbral.service'
import { ST }  from '../model/domainmodel'
import * as Global from '../model/global'
import * as DEBUG from '../components/util/debug/debug.libs'

/**
 * Conneted como: 
 * ng test --watch --source-map=false
 * http://localhost:9876/debug.html?spec=DataService
 */
describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService, UmbralService]
    })
  })

  it('should be created', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy()
  }))

  it('should test getBackendUrl without CustomParams', inject([DataService], (service: DataService) => {
    
    let TDD_Context_SELECTED = DEBUG.TDD_Context_DS03

    let filters = new DomainModel.DateFilter()
    filters.from = new Date('2015-02-01T13:00:00.000Z')
    filters.to   = new Date('2016-03-04T23:00:00.000Z') 

    expect(service.getBackendUrl(
      TDD_Context_SELECTED.dataset_id,
      TDD_Context_SELECTED.quality_id,
      TDD_Context_SELECTED.param_id,
      filters, 
      Global.RES_TYPE.JSON_for_AMCHARTS4_MULTI_SERIES_V3
      )
    ).toContain('dataset/MGSET_03_2015_2017/p/WATERQ_Temp?from=2015-02-01&to=2016-03-04')
  }))

  it('should test getBackendUrl with CustomParams', inject([DataService], (service: DataService) => {
    
    let TDD_Context_SELECTED = DEBUG.TDD_Context_DS05

    let filters = new DomainModel.DateFilter()
    filters.from = new Date('1980-02-01T13:00:00.000Z')
    filters.to   = new Date('1990-03-04T23:00:00.000Z') 

    let acp = new DomainModel.CustomParams()
    acp.sector   = KEY.PARAM_DS05.SECTOR_Electricity
    acp.country  = KEY.PARAM_DS05.COUNTRY_Argentina

    expect(service.getBackendUrl(
      TDD_Context_SELECTED.dataset_id,
      TDD_Context_SELECTED.quality_id,
      TDD_Context_SELECTED.param_id,
      filters, 
      Global.RES_TYPE.JSON_for_AMCHARTS4_MULTI_SERIES_V3, 
      acp
      )
    ).toContain('dataset/MGSET_05_WRI_CAIT_EESS_CO2/p/AIRQ_CO2'
                                   + '/s/Electricity'
                                   + '/c/Argentina'
                                   + '?from=1980-02-01&to=1990-03-04')
  }))

  it('should have the ChartConfig', inject([DataService], (service: DataService) => {
    
    let chk: ChartConfig.Options

    this.chk = service.getChartConfigDefautl_lab1(this.quality_id)

    expect(this.chk.awq_estandar).toBe(ST.AWQ.REF_BIB)

  }))

  it('should test umbrales', inject([DataService], (service: DataService) => {
  
    let testUmbralResponse = (quality: string, expectedLength: number) => {
      let o: Array<Outlier>
      o = service.getUmbralesDefault(quality)
      expect(o.length).toBe(expectedLength)      
    }

    testUmbralResponse(Global.QUALITY_TAB.AIRQ,     4)
    testUmbralResponse(Global.QUALITY_TAB.WATERQ,   5)
    
    // testUmbralResponse(Global.VAR.CO,    1)   // TBD .... 
    // testUmbralResponse(Global.VAR.CO2,   1)
    // testUmbralResponse(Global.VAR.NO,    1)
    // testUmbralResponse(Global.VAR.NO2,   1)

    testUmbralResponse(Global.VAR.Temp,  1)
    testUmbralResponse(Global.VAR.pH,    1)
    testUmbralResponse(Global.VAR.OD,    1)
    testUmbralResponse(Global.VAR.Redox, 1)
    testUmbralResponse(Global.VAR.Cond,  1)

    testUmbralResponse(Global.VAR.WorkInProgress,  0)

  }))

  it('should test outliers', inject([DataService], (service: DataService) => {
    
    
    let testOutlilierResponse = (quality: string, expectedLength: number) => {
      let o: Array<Outlier>
      o = service.getOutlierDefault(quality)
      expect(o.length).toBe(expectedLength)      
    }

    // testOutlilierResponse(undefined,                 9)  <--- Este caso se da ... Esta OK ??
    testOutlilierResponse(Global.QUALITY_TAB.AIRQ,   4)
    testOutlilierResponse(Global.QUALITY_TAB.WATERQ, 5)

    testOutlilierResponse(Global.VAR.CO,    1)
    testOutlilierResponse(Global.VAR.CO2,   1)
    testOutlilierResponse(Global.VAR.NO,    1)
    testOutlilierResponse(Global.VAR.NO2,   1)

    testOutlilierResponse(Global.VAR.Temp,  1)
    testOutlilierResponse(Global.VAR.pH,    1)
    testOutlilierResponse(Global.VAR.OD,    1)
    testOutlilierResponse(Global.VAR.Redox, 1)
    testOutlilierResponse(Global.VAR.Cond,  1)

    testOutlilierResponse(Global.VAR.WorkInProgress,  0)


  }))

  it('should have a Populated Dataset', inject([DataService], (service: DataService) => {

    let ds01  = service.getDatasets(Global.DS.DS01)
    let dsAll = service.getDatasets(undefined)

    // Estructura
    expect(ds01[0].name).toBe('Buenos Aires')
    expect(ds01[0].series.length).toBe(4)

    expect(dsAll.length).toBe(5)
    expect(dsAll[0].name).toBe('Buenos Aires')
    expect(dsAll[0].series.length).toBe(4)

    // Funciones
    expect(service.getDataset_name(Global.DS.DS01)).toBe('Buenos Aires')
    expect(service.getDataset_location(Global.DS.DS01).latitude).toBe(-34.599722)
    expect(service.getDataset_frecuencia(Global.DS.DS01)).toBe('dia')
    expect(service.getDataset_dates(Global.DS.DS01).minDate.getTime()).toBe(new Date('2009-10-01T13:00:00.000Z').getTime())

  }))

  it('should have good Default Parameters', inject([DataService], (service: DataService) => {
  
    let chkParam = (code, quality, defaultValue) => {
        let df = service.getDatasetDefaultParam(code, quality)
        expect(df).toBe(defaultValue)
    }

    chkParam(Global.DS.DS01, Global.QUALITY_TAB.AIRQ,   Global.VAR.CO)
    chkParam(Global.DS.DS01, Global.QUALITY_TAB.WATERQ, 'WIP')

    chkParam(Global.DS.DS02, Global.QUALITY_TAB.AIRQ,   Global.VAR.CO)
    chkParam(Global.DS.DS02, Global.QUALITY_TAB.WATERQ, 'WIP')

    chkParam(Global.DS.DS03, Global.QUALITY_TAB.AIRQ,   'WIP')
    chkParam(Global.DS.DS03, Global.QUALITY_TAB.WATERQ, Global.VAR.Temp)
    
    chkParam(Global.DS.DS04, Global.QUALITY_TAB.AIRQ,   Global.VAR.NO)
    chkParam(Global.DS.DS04, Global.QUALITY_TAB.WATERQ, Global.VAR.Temp)

    chkParam(Global.DS.DS05, Global.QUALITY_TAB.AIRQ,   Global.VAR.CO2)
    chkParam(Global.DS.DS05, Global.QUALITY_TAB.WATERQ, 'WIP')

  }))

  it('should know what to enable/disable', inject([DataService], (service: DataService) => {
  
    let whatQ = (code, stQuality_AIRQ, stQuality_WATERQ) => {
      let e = service.areEnabledQualityTab(code)
      expect(e.QUALITY_TAB_ENABLED_AIRQ  ).toBe(stQuality_AIRQ)
      expect(e.QUALITY_TAB_ENABLED_WATERQ).toBe(stQuality_WATERQ)
    }

    whatQ(Global.DS.DS01, true,  false)
    whatQ(Global.DS.DS02, true,  false)
    whatQ(Global.DS.DS03, false,  true)
    whatQ(Global.DS.DS04, true,   true)
    whatQ(Global.DS.DS05, true,  false)

  }))

  it(
    'should get URL Data Distribution',
    inject(
      [DataService, HttpTestingController],
      (service: DataService, backend: HttpTestingController) => {

        //        ${getValue(Global.HOST_BACKEND.UPSALA_LOCALHIP)}v2/densidad/MGSET_01_2009_2018/p/YYYY
        //       ${getValue(Global.HOST_BACKEND.UPSALA_LOCALHOST)}v2/densidad/MGSET_01_2009_2018/p/YYYY
        //                                  http://localhost:5000/v2/densidad/MGSET_01_2009_2018/p/YYYY
        //                              http://192.168.1.112:5000/v2/densidad/MGSET_01_2009_2018/p/YYYY
        //      [ {"_id":{"year":2009},"count":7292, "FECHA_HORA":"2009-01-10T16:00:00.000Z"}, 
        //        {"_id":{"year":2010},"count":33700,"FECHA_HORA":"2010-01-01T00:00:00.000Z"},
        //         .... ]

        service.getBackendDataDistribution(Global.DS.DS01, 'YYYY')
        .subscribe(
          (ndata: any) => {
            console.debug(`DataServiceTDD::getBackendDataDistribution: ${ JSON.stringify(ndata)}`)
            expect(ndata[0]._id.year).toBe(2009)
            expect(ndata[0].SOY_FAKE).toBe("SI")
          },
          (error: any) => {}
        )

        // Intecepta al Backend, para retornar una FAKE response
        // Lo bueno: No dependo del backend levantado
        // Lo malo : Pierdo el OnLine
        // NOTA: Así puedo hacer el TDD: No me queda claro somo como se invoca al OnLine
        backend
          .expectOne({
               url: `${Global.getValue(Global.HOST_BACKEND.UPSALA)}v2/densidad/MGSET_01_2009_2018/p/YYYY`
            // url:                     'http://192.168.1.112:5000/v2/densidad/MGSET_01_2009_2018/p/YYYY'
          })
          .flush(

            [
              {'_id': {'year': 2009}, 'count': 17292, 'FECHA_HORA': '2009-01-10T16:00:00.000Z', 'SOY_FAKE': 'SI'},
              {'_id': {'year': 2010}, 'count': 33700, 'FECHA_HORA': '2010-01-01T00:00:00.000Z', 'SOY_FAKE': 'SI'},
              {'_id': {'year': 2011}, 'count': 35040, 'FECHA_HORA': '2011-01-01T00:00:00.000Z', 'SOY_FAKE': 'SI'},
              {'_id': {'year': 2012}, 'count': 34944, 'FECHA_HORA': '2012-01-01T00:00:00.000Z', 'SOY_FAKE': 'SI'},
              {'_id': {'year': 2013}, 'count': 35040, 'FECHA_HORA': '2013-01-01T00:00:00.000Z', 'SOY_FAKE': 'SI'},
              {'_id': {'year': 2014}, 'count': 34944, 'FECHA_HORA': '2014-01-01T00:00:00.000Z', 'SOY_FAKE': 'SI'},
              {'_id': {'year': 2015}, 'count': 27696, 'FECHA_HORA': '2015-01-01T00:00:00.000Z', 'SOY_FAKE': 'SI'},
              {'_id': {'year': 2016}, 'count': 33848, 'FECHA_HORA': '2016-01-01T00:00:00.000Z', 'SOY_FAKE': 'SI'},
              {'_id': {'year': 2017}, 'count': 34608, 'FECHA_HORA': '2017-01-01T00:00:00.000Z', 'SOY_FAKE': 'SI'},
              {'_id': {'year': 2018}, 'count': 25776, 'FECHA_HORA': '2018-01-01T00:00:00.000Z', 'SOY_FAKE': 'SI'}
            ]
          )


      }
    )
  )
})
