import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing'

import { Amcharts4Component } from './amcharts4.component'
import { GlaciarStorageService } from '../../services/glaciar-storage.service'
import { ChartConfig, DomainModel } from '../../model/domainmodel'
import * as Global from '../../model/global'
import * as moment from 'moment'

/**
 * http://localhost:9876/debug.html?spec=Amcharts4Component
 */
describe('Amcharts4Component', () => {
  let component: Amcharts4Component
  let fixture: ComponentFixture<Amcharts4Component>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Amcharts4Component ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(Amcharts4Component)
    component = fixture.componentInstance

    const minDate = new Date('2009-10-01T13:00:00.000Z')
    const maxDate = new Date('2018-03-31T23:00:00.000Z') 

    // component.isLabMode = true

    component.dataset_id =  Global.DS.DS01
    component.quality_id =  Global.QUALITY_TAB.AIRQ
    component.param_id   =  Global.VAR.NO2
    component.seed       = '3333'

    component.dateFilter = new DomainModel.DateFilter()
    component.dateFilter.to = maxDate
    component.dateFilter.from = moment(component.dateFilter.to).subtract(2, 'month').toDate()

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should test the HTML Component with last two months', () => {
    const compiled = fixture.nativeElement

    console.debug(`from : ${Global.ff1_Date(component.dateFilter.from)}`)
    console.debug(`to   : ${Global.ff1_Date(component.dateFilter.to)}`)

    expect(compiled.querySelector('span').textContent).toContain(Global.ff1_Date(component.dateFilter.from))
    expect(compiled.querySelector('span').textContent).toContain(Global.ff1_Date(component.dateFilter.to))
    expect(compiled.querySelector('h6').textContent).toContain(Global.getParamIdDescription(component.param_id))
  })

  it('should have chartConfig', () => {

    console.debug(`Amcharts4Component_TEST::chartConfig ${ JSON.stringify(component.chartConfig) }`)

    expect(component.chartConfig.zoom_tipo).toBe(ChartConfig.ZOOM_Command.zoomX)
    // expect(component.chartConfig.outliers.length).toBe(4)
  })

  it('should get the Outliers', inject([GlaciarStorageService], (glaciarStorage: GlaciarStorageService) => {

    let OUTLIER_PARAM = component.getOutlierParam(component.param_id)
    expect(OUTLIER_PARAM.var).toBe(component.param_id)
    expect(OUTLIER_PARAM.quality).toBe(component.quality_id)

  }))

})
