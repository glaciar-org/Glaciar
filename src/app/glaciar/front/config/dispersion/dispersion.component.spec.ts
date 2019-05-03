import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { DispersionComponent } from './dispersion.component'
import { DebugComponent } from '../../../components/util/debug/debug.component'
import * as moment from 'moment'
import * as Global from '../../../model/global'

/**
 * Conneted como: 
 * ng test --watch --source-map=false
 * http://localhost:9876/debug.html?spec=DispersionComponent
 */
describe('DispersionComponent', () => {
  let component: DispersionComponent
  let fixture: ComponentFixture<DispersionComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NgbModule.forRoot(), HttpClientTestingModule ],
      declarations: [ DispersionComponent, DebugComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DispersionComponent)
    component = fixture.componentInstance

    component.dataset_id =  Global.DS.DS01
    component.seed       = '3333'

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should test the HTML Component with zoom', () => {
    const compiled = fixture.nativeElement
    // expect(compiled.querySelector('label').textContent).toContain('Zoom:')
  })
})
