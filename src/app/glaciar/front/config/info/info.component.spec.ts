import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { AgmCoreModule } from '@agm/core'
import { InfoComponent } from './info.component'
import { SwitchTextPipe } from '../setup/setup.component'
import { DebugComponent } from '../../../components/util/debug/debug.component'
import { TextTransfPipe } from '../../../components/pipe/text-transf-pipe'
import { DateFormatPipe } from '../../../components/pipe/date-format-pipe'
import { DataService } from '../../../services/data.service'
import { DispersionComponent } from '../dispersion/dispersion.component'
import * as Global from '../../../model/global'

/**
 * Conneted como: 
 * ng test --watch --source-map=false
 * http://localhost:9876/debug.html?spec=InfoComponent
 */
describe('InfoComponent', () => {
  let component: InfoComponent
  let fixture: ComponentFixture<InfoComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgbModule.forRoot(),
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyA77V7bNjGDIIFvTWghwl1BhQro1I2zv_w'
         }),
      ],
      declarations: [ InfoComponent, DebugComponent, TextTransfPipe, DateFormatPipe, DispersionComponent ],
      providers: [DataService]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoComponent)
    component = fixture.componentInstance

    component.dataset_id =  Global.DS.DS03

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should have dataService Injected', inject([DataService], (service: DataService) => {
    expect(component).toBeTruthy()
    expect(service.getDatasets(Global.DS.DS01)[0].name).toBe('Buenos Aires')
  }))

  it('should check backend info', inject([DataService], (service: DataService) => {

    if (component.dataset_id ===  Global.DS.DS01) {
      expect(component.frecuencia).toBe('dia')
      expect(component.dateRange.minDate.getTime()).toBe(new Date('2009-10-01T13:00:00.000Z').getTime())
      expect(component.dateRange.maxDate.getTime()).toBe(new Date('2019-01-31T23:00:00.000Z').getTime())
    }
    
    if (component.dataset_id ===  Global.DS.DS02) {
      expect(component.frecuencia).toBe('hora')
      expect(component.dateRange.minDate.getTime()).toBe(new Date('2010-01-01T00:00:00.000Z').getTime())
      expect(component.dateRange.maxDate.getTime()).toBe(new Date('2015-12-31T23:00:00.000Z').getTime())
    }
    
    if (component.dataset_id ===  Global.DS.DS03) {
      expect(component.frecuencia).toBe('15m')
      expect(component.dateRange.minDate.getTime()).toBe(new Date('2015-05-13T12:00:00.000Z').getTime())
      expect(component.dateRange.maxDate.getTime()).toBe(new Date('2018-10-30T22:15:00.000Z').getTime())
    }

    if (component.dataset_id ===  Global.DS.DS04) {
      expect(component.frecuencia).toBe('anual')
      expect(component.dateRange.minDate.getTime()).toBe(new Date('2011-02-22T01:01:00.000Z').getTime())
      expect(component.dateRange.maxDate.getTime()).toBe(new Date('2017-03-03T09:41:00.000Z').getTime())
    }

    if (component.dataset_id ===  Global.DS.DS05) {
      expect(component.frecuencia).toBe('anual')
      expect(component.dateRange.minDate.getTime()).toBe(new Date('1850-01-01T00:00:00.000Z').getTime())
      expect(component.dateRange.maxDate.getTime()).toBe(new Date('2012-01-01T00:00:00.000Z').getTime())
    }



  }))
  
})

