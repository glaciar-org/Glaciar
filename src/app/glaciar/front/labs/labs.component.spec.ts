import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { LabsComponent } from './labs.component'

/**
 * Conneted como: 
 * ng test --watch --source-map=false
 * http://localhost:9876/debug.html?spec=LabsComponent
 */
describe('LabsComponent', () => {
  let component: LabsComponent
  let fixture: ComponentFixture<LabsComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabsComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(LabsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
