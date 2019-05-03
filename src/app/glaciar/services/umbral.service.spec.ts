import { TestBed, inject } from '@angular/core/testing'

import { UmbralService } from './umbral.service'
import { ST, Umbral }  from '../model/domainmodel'
import * as Global from '../model/global'

/**
 * Conneted como: 
 * ng test --watch --source-map=false
 * http://localhost:9876/debug.html?spec=UmbralService
 */
describe('UmbralService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UmbralService]
    })
  })

  it('should be created', inject([UmbralService], (service: UmbralService) => {
    expect(service).toBeTruthy()
  }))

  it('should filter params and categories', inject([UmbralService], (service: UmbralService) => {

    console.debug(`[TEST] UmbralService::  `)

    let rs

    rs = service.getUmbrales(Global.QUALITY_TAB.AIRQ,   ST.AWQ.REF_BIB_AIRQ)
    expect(rs.length).toBe(4)
    
    rs = service.getUmbrales(Global.QUALITY_TAB.WATERQ, ST.AWQ.REF_BIB)
    expect(rs.length).toBe(5)

    console.debug(`[TEST] UmbralService:: Paso los test [Ok] `)

  }))

  
  it('should test collection of umbral services', inject([UmbralService], (service: UmbralService) => {
    
    console.debug(`[TEST] UmbralService::  `)

    let rs: Array<Umbral>

    rs = service.getUmbralArray(Global.QUALITY_TAB.AIRQ, ST.AWQ.REF_BIB_AIRQ)
    expect(rs.length).toBe(4)
    expect(rs[0].norma).toBe(ST.AWQ.REF_BIB_AIRQ)
    expect(rs[0].quality).toBe(Global.QUALITY_TAB.AIRQ)

    rs = service.getUmbralArray(Global.QUALITY_TAB.WATERQ, ST.AWQ.REF_BIB)
    expect(rs.length).toBe(5)
    expect(rs[0].norma).toBe(ST.AWQ.REF_BIB)
    expect(rs[0].quality).toBe(Global.QUALITY_TAB.WATERQ)

  }))


  it('should filter:: ACUMAR_2009_03_USO_IV', inject([UmbralService], (service: UmbralService) => {

    console.debug(`[TEST] UmbralService:: ACUMAR_2009_03_USO_IV `)


    // Size Quality: AIRQ 0 - WATERQ 5
    let sizeQuality_Vars_xNorma = (ST, Q, s) => {
      let rr = service.getUmbralArray(Q, ST)  
      expect(rr.length).toBe(s)
    }

    // min, avg, max
    let checkVar = (ST, VAR, min, avg, max) => {
      let rr = service.getUmbralArray(VAR, ST)
      expect(rr.length).toBe(1)
      expect(rr[0].min).toBe(min)
      expect(rr[0].avg).toBe(avg)
      expect(rr[0].max).toBe(max)
    }

    let rs: Array<Umbral>
    let norma 
    
    sizeQuality_Vars_xNorma(ST.AWQ.ACUMAR_2009_03_USO_IV, Global.QUALITY_TAB.AIRQ,   0)
    sizeQuality_Vars_xNorma(ST.AWQ.ACUMAR_2009_03_USO_IV, Global.QUALITY_TAB.WATERQ, 5)
    
    checkVar(ST.AWQ.ACUMAR_2009_03_USO_IV, Global.VAR.Temp,  Global.SD, Global.SD, 35)
    checkVar(ST.AWQ.ACUMAR_2009_03_USO_IV, Global.VAR.OD,     2, Global.SD, Global.SD)
    checkVar(ST.AWQ.ACUMAR_2009_03_USO_IV, Global.VAR.pH,     6, Global.SD,  9)
    checkVar(ST.AWQ.ACUMAR_2009_03_USO_IV, Global.VAR.Redox, Global.SD, Global.SD, Global.SD)
    checkVar(ST.AWQ.ACUMAR_2009_03_USO_IV, Global.VAR.Cond,  Global.SD, Global.SD, Global.SD)

    console.debug(`[TEST] UmbralService:: ACUMAR_2009_03_USO_IV Paso los test [Ok] `)

  }))


  it('should filter:: ACUMAR_2017_46_USO_*', inject([UmbralService], (service: UmbralService) => {
  
    console.debug(`[TEST] UmbralService:: ACUMAR_2017_46_USO_* `)

    let rs: Array<Umbral>
    let norma 

    // Size Quality: AIRQ 0 - WATERQ 5
    let sizeQuality_Vars_xNorma = (ST, Q, s) => {
      rs = service.getUmbralArray(Q, ST)
      expect(rs.length).toBe(s)
    }

    // checck min, avg, max
    let checkVar = (ST, VAR, min, avg, max) => {
      rs = service.getUmbralArray(VAR, ST)
      expect(rs.length).toBe(1)
      expect(rs[0].min).toBe(min)
      expect(rs[0].avg).toBe(avg)
      expect(rs[0].max).toBe(max)
    }

    sizeQuality_Vars_xNorma(ST.AWQ.REF_BIB_AIRQ, Global.QUALITY_TAB.AIRQ, 4)

    checkVar(ST.AWQ.REF_BIB_AIRQ, Global.VAR.CO,  0,  4.5,  9.4)
    checkVar(ST.AWQ.REF_BIB_AIRQ, Global.VAR.CO2, Global.SD, Global.SD, Global.SD)
    checkVar(ST.AWQ.REF_BIB_AIRQ, Global.VAR.NO,  Global.SD, Global.SD, Global.SD)
    checkVar(ST.AWQ.REF_BIB_AIRQ, Global.VAR.NO2, 0,   54,  101)

    sizeQuality_Vars_xNorma(ST.AWQ.ACUMAR_2017_46_USO_Ia,  Global.QUALITY_TAB.AIRQ,   0)
    sizeQuality_Vars_xNorma(ST.AWQ.ACUMAR_2017_46_USO_Ib,  Global.QUALITY_TAB.AIRQ,   0)
    sizeQuality_Vars_xNorma(ST.AWQ.ACUMAR_2017_46_USO_II,  Global.QUALITY_TAB.AIRQ,   0)
    sizeQuality_Vars_xNorma(ST.AWQ.ACUMAR_2017_46_USO_III, Global.QUALITY_TAB.AIRQ,   0)
    sizeQuality_Vars_xNorma(ST.AWQ.ACUMAR_2017_46_USO_IV,  Global.QUALITY_TAB.AIRQ,   0)

    sizeQuality_Vars_xNorma(ST.AWQ.ACUMAR_2017_46_USO_Ia,  Global.QUALITY_TAB.WATERQ, 5)
    sizeQuality_Vars_xNorma(ST.AWQ.ACUMAR_2017_46_USO_Ib,  Global.QUALITY_TAB.WATERQ, 5)
    sizeQuality_Vars_xNorma(ST.AWQ.ACUMAR_2017_46_USO_II,  Global.QUALITY_TAB.WATERQ, 5)
    sizeQuality_Vars_xNorma(ST.AWQ.ACUMAR_2017_46_USO_III, Global.QUALITY_TAB.WATERQ, 5)
    sizeQuality_Vars_xNorma(ST.AWQ.ACUMAR_2017_46_USO_IV,  Global.QUALITY_TAB.WATERQ, 5)
    
    checkVar(ST.AWQ.ACUMAR_2017_46_USO_Ia,  Global.VAR.Temp,  Global.SD, Global.SD, 35)
    checkVar(ST.AWQ.ACUMAR_2017_46_USO_Ib,  Global.VAR.Temp,  Global.SD, Global.SD, 35)
    checkVar(ST.AWQ.ACUMAR_2017_46_USO_II,  Global.VAR.Temp,  Global.SD, Global.SD, 35)
    checkVar(ST.AWQ.ACUMAR_2017_46_USO_III, Global.VAR.Temp,  Global.SD, Global.SD, 35)
    checkVar(ST.AWQ.ACUMAR_2017_46_USO_IV,  Global.VAR.Temp,  Global.SD, Global.SD, 35)

    checkVar(ST.AWQ.ACUMAR_2017_46_USO_Ia,  Global.VAR.pH,     5,  6,  9)
    checkVar(ST.AWQ.ACUMAR_2017_46_USO_Ib,  Global.VAR.pH,     5,  6,  9)
    checkVar(ST.AWQ.ACUMAR_2017_46_USO_II,  Global.VAR.pH,     5,  6,  9)
    checkVar(ST.AWQ.ACUMAR_2017_46_USO_III, Global.VAR.pH,     5,  6,  9)
    checkVar(ST.AWQ.ACUMAR_2017_46_USO_IV,  Global.VAR.pH,     6, Global.SD,  9)

    checkVar(ST.AWQ.ACUMAR_2017_46_USO_Ia,  Global.VAR.OD,     5, Global.SD, Global.SD)
    checkVar(ST.AWQ.ACUMAR_2017_46_USO_Ib,  Global.VAR.OD,     5, Global.SD, Global.SD)
    checkVar(ST.AWQ.ACUMAR_2017_46_USO_II,  Global.VAR.OD,     5, Global.SD, Global.SD)
    checkVar(ST.AWQ.ACUMAR_2017_46_USO_III, Global.VAR.OD,     4, Global.SD, Global.SD)
    checkVar(ST.AWQ.ACUMAR_2017_46_USO_IV,  Global.VAR.OD,     2, Global.SD, Global.SD)

    checkVar(ST.AWQ.ACUMAR_2017_46_USO_Ia,  Global.VAR.Redox, Global.SD, Global.SD, Global.SD)
    checkVar(ST.AWQ.ACUMAR_2017_46_USO_Ib,  Global.VAR.Redox, Global.SD, Global.SD, Global.SD)
    checkVar(ST.AWQ.ACUMAR_2017_46_USO_II,  Global.VAR.Redox, Global.SD, Global.SD, Global.SD)
    checkVar(ST.AWQ.ACUMAR_2017_46_USO_III, Global.VAR.Redox, Global.SD, Global.SD, Global.SD)
    checkVar(ST.AWQ.ACUMAR_2017_46_USO_IV,  Global.VAR.Redox, Global.SD, Global.SD, Global.SD)

    checkVar(ST.AWQ.ACUMAR_2017_46_USO_Ia,  Global.VAR.Cond,  Global.SD, Global.SD, Global.SD)
    checkVar(ST.AWQ.ACUMAR_2017_46_USO_Ib,  Global.VAR.Cond,  Global.SD, Global.SD, Global.SD)
    checkVar(ST.AWQ.ACUMAR_2017_46_USO_II,  Global.VAR.Cond,  Global.SD, Global.SD, Global.SD)
    checkVar(ST.AWQ.ACUMAR_2017_46_USO_III, Global.VAR.Cond,  Global.SD, Global.SD, Global.SD)
    checkVar(ST.AWQ.ACUMAR_2017_46_USO_IV,  Global.VAR.Cond,  Global.SD, Global.SD, Global.SD)


    console.debug(`[TEST] UmbralService:: ACUMAR_2017_46_USO_* Paso los test [Ok] `)

  }))


  it('should filter:: factory awq_systems', inject([UmbralService], (service: UmbralService) => {
  
    console.debug(`[TEST] UmbralService:: factory awq_systems `)

    let rs

    rs = service.getAWQ_System(ST.AWQ.ACUMAR_2017_46_USO_III)

    expect(rs.code).toBe(ST.AWQ.ACUMAR_2017_46_USO_III)

    // endeble .... 
    expect(rs.combo).toBe('ACUMAR Res. 46-E/2017 - USO III')
    expect(rs.desc).toBe('ACUMAR Res. 46-E/2017 - USO III. Apta para actividades recreativas s/contacto directo')

    console.debug(`[TEST] UmbralService:: factory awq_systems  [OK]`)

  }))

  it('should filter:: and join', inject([UmbralService], (service: UmbralService) => {

    expect(service.getAWQ_Systems('all').length).toBe(15)
    expect(service.getAWQ_Systems(Global.QUALITY_TAB.AIRQ).length).toBe(6)
    expect(service.getAWQ_Systems(Global.QUALITY_TAB.WATERQ).length).toBe(9)

  }))

  it('should filter:: Outliers', inject([UmbralService], (service: UmbralService) => {

    expect(service.getOutliers(Global.QUALITY_TAB.AIRQ).length).toBe(4)
    expect(service.getOutliers(Global.QUALITY_TAB.WATERQ).length).toBe(5)

    expect(service.getOutliers(Global.VAR.CO   ).length).toBe(1)
    expect(service.getOutliers(Global.VAR.CO2  ).length).toBe(1)
    expect(service.getOutliers(Global.VAR.NO   ).length).toBe(1)
    expect(service.getOutliers(Global.VAR.NO2  ).length).toBe(1)

    expect(service.getOutliers(Global.VAR.Temp ).length).toBe(1)
    expect(service.getOutliers(Global.VAR.pH   ).length).toBe(1)
    expect(service.getOutliers(Global.VAR.OD   ).length).toBe(1)
    expect(service.getOutliers(Global.VAR.Redox).length).toBe(1)
    expect(service.getOutliers(Global.VAR.Cond ).length).toBe(1)

  }))

})



// ACUMAR_2017_46_USO_Ia  = 'ACUMAR Res. 46-E/2017 - USO I a. Apta para protección de biota y uso recreativo c/contacto directo',
// ACUMAR_2017_46_USO_Ib  = 'ACUMAR Res. 46-E/2017 - USO I b. Apta para protección de biota',
// ACUMAR_2017_46_USO_II  = 'ACUMAR Res. 46-E/2017 - USO II. Apta para actividades recreativas c/contacto directo',
// ACUMAR_2017_46_USO_III = 'ACUMAR Res. 46-E/2017 - USO III. Apta para actividades recreativas s/contacto directo',
// ACUMAR_2017_46_USO_IV  = 'ACUMAR Res. 46-E/2017 - USO IV. Apta para actividades recreativas pasivas',


/**
 * 
 * NOTA: LA api de "expect( )" esta basada en Jasemine
 * https://jasmine.github.io/index.html
 * https://jasmine.github.io/api/edge/matchers.html
 */


 
// ACUMAR 2009 ---------------
// Res. 3/09
// https://www.buenosaires.gob.ar/sites/gcaba/files/documents/usos_cmr_gorybc_ante_mev.pdf
// http://servicios.infoleg.gob.ar/infolegInternet/anexos/150000-154999/153768/norma.htm
// http://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=153768
// Usos definidos por ACUMAR
// Uso I - Apta para consumo humano con tratamiento convencional 
// Uso II - Apta para actividades recreativas con contacto directo 
// Uso III - Apta para actividades recreativas sin contacto directo
// Uso IV - Apta para actividades recreativas pasivas   <---
// Uso V - Apta para preservación de vida acuática con exposición prolongada
// Uso VI - Apta para preservación de vida acuática sin exposición prolongada.


// ACUMAR 2017 ---------------
// 46-E/2017
// http://servicios.infoleg.gob.ar/infolegInternet/anexos/270000-274999/273042/norma.htm
// http://servicios.infoleg.gob.ar/infolegInternet/anexos/270000-274999/273042/res46.pdf
// ACUMAR_2017_46_USO_Ia  = 'ACUMAR Res. 46-E/2017 I a. Apta para protección de biota y uso recreativo c/contacto directo'
// ACUMAR_2017_46_USO_Ib  = 'ACUMAR Res. 46-E/2017 I b. Apta para protección de biota'
// ACUMAR_2017_46_USO_II  = 'ACUMAR Res. 46-E/2017 II. Apta para actividades recreativas c/contacto directo'
// ACUMAR_2017_46_USO_III = 'ACUMAR Res. 46-E/2017 III. Apta para actividades recreativas s/contacto directo'
// ACUMAR_2017_46_USO_IV  = 'ACUMAR Res. 46-E/2017 IV. Apta para actividades recreativas pasivas.'


// ACUMAR RES. 03/2009. USO IV



// ADA _ AUTORIDAD DEL AGUA
// http://www.gob.gba.gov.ar/legislacion/legislacion/ada-06-42.html
// http://www.gob.gba.gov.ar/legislacion/legislacion/ada-06-42.html  (NO SE ENTIOENDE, LEE, NADA)
// http://www.ecofield.net/Legales/BsAs/res42-06_ADA.htm  <-- Esta ok, pero creo que no se puede referenciar ... 
  
// Estos son los links oficailes y referenciados, pero ya están caídos:

// http://www.ada.gba.gov.ar/tramites/RESOL042-2006/RESOL042-2006.pdf
// http://www.ada.gba.gov.ar/tramites/RESOL042-2006/RESOL042-2006-ANEXOI.pdf
// http://www.ada.gba.gov.ar/tramites/RESOL042-2006/RESOL042-2006-ANEXOII.pdf
// http://www.ada.gba.gov.ar/tramites/RESOL042-2006/RESOL042-2006-ANEXOIII.pdf
// http://www.acumar.gob.ar/informacionPublica_normativa_texto.php?id=27&bu=true
// http://www.ambiente.gob.ar/?aplicacion=normativa&IdNorma=538&IdSeccion=0




// RIIGLO - Niveles guia - Uso recreativo
// ADA - Resolución 42 - Agua dulce - Uso recreativo - Valores de referencia
// ADA - Resolución 42 - Agua marina - Uso recreativo - Valores de referencia
// ADA - Resolución 42 - Protección de la Biota - Agua Dulce - Valores de referencia
// ADA - Resolución 42 - Protección de la Biota - Agua Marina - Valores de referencia
// CARU - Estandares de calidad de las aguas
// Freplata - Niveles Guía Provisorios - Agua Dulce
// Freplata - Niveles Guía Provisorios - Agua Marina




// Índice de Calidad del Agua de la National Sanitation Foundation (INSF) de USA


// 19 OBJETIVOS DE CALIDAD DE AGUA Y SEDIMENTOS PARA EL ÁREA COMÚN DEL RIO DE LA PLATA Y SU FRENTE MARITIMO. Carsen, A.E. Gomez, C. y A. Perdomo. Informe Proyecto FREPLATA. 2006.
// 20 El objetivo de calidad es una expresión cuantitativa o narrativa inherente a un parámetro de calidad en un programa de manejo del agua ambiente respecto a un destino específico asignado a la misma que resulta de considerar, además del requerimiento científico antes mencionado, su calidad actual y las restricciones tecnológicas y socioeconómicas.
// 21 El nivel guía de calidad es una expresión cuantitativa o narrativa emergente de un requerimiento científico inherente a un parámetro de calidad respecto a un destino específico asignado al agua ambiente.
// 22




// Parámetro	Valores adoptados Bs.As. Agua Dulce (microgramos/litro)	Valores adoptados Bs.As. Agua Marina (microgramos/litro)
// Parámetros Fisico-Químicos	 	 
// Parámetros Fisico-Químicos Generales		
// pH	8,5 - 9,0	7,0 - 8,7 narrativo

// Parámetros Fisico-Químicos Inorgánicos		
// Amonio	0,5596 / ( 1+10	0,5596 / 1+10
// Arsénico



// --------------
// Segun ACUMAR 2017
// Físico Químico    ::   pH, Temp, OD 

// Inorgánicos  (nada del mio)
// Orgánicos, biocidas y microbiológicos


