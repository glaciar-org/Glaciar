import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { DataDashboardComponent } from './data-dashboard.component'
import * as Global from '../../model/global'

/**
 * Conneted como: 
 * ng test --watch --source-map=false
 * http://localhost:9876/debug.html?spec=DataDashboardComponent
 */
describe('DataDashboardComponent', () => {
  let component: DataDashboardComponent
  let fixture: ComponentFixture<DataDashboardComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataDashboardComponent ],
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DataDashboardComponent)
    component = fixture.componentInstance

    component.dataset_id = Global.DS.DS01
    component.quality_id = Global.QUALITY_TAB.AIRQ
    component.param_id   = Global.VAR.CO
    
    component.dateFilter = new DomainModel.DateFilter()
    component.dateFilter.from = new Date('2015-12-15T00:00:00.000Z')
    component.dateFilter.to   = new Date('2015-12-20T00:00:00.000Z')

    component.contextTDD = {
        mode       : Global.IAM_DOING_TDD,
        dataset_id : Global.DS.DS01,
        quality_id : Global.QUALITY_TAB.AIRQ,
        param_id   : Global.VAR.CO,
        selector   : KEY.PARAM_DS05.SELECT_xPaises,
        envChartLib: Global.GlaciaR_CHARTLIB.CHARTJS
    }

    // component.dataset_id = component.contextTDD.dataset_id
    // component.quality_id = component.contextTDD.quality_id
    // component.param_id   = component.contextTDD.param_id

    fixture.detectChanges()
  })


  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should say :: chartConfig values ', () => {
    console.debug('component.chartConfig ' + JSON.stringify(component.chartConfig))

    // expect(component.chartConfig.zoom_tipo).toBe(ChartConfig.ZOOM_Command.zoomX)
  })

  it('should check backend info', inject([DataService], (service: DataService) => {
    
    let param_id_defautl = component.getParamIdDefault()

    console.debug(`param_id_defautl : ${param_id_defautl} `)
    
    if (component.contextTDD.dataset_id === Global.DS.DS01 && 
        component.contextTDD.quality_id === Global.QUALITY_TAB.AIRQ) {
    
        expect(param_id_defautl).toBe(Global.VAR.CO)
    }

  }))


})
