import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { PabloComponent } from './pablo.component'


/**
 * Conneted como: 
 * ng test --watch --source-map=false
 * http://localhost:9876/debug.html?spec=PabloComponent
 */
describe('PabloComponent', () => {
  let component: PabloComponent
  let fixture: ComponentFixture<PabloComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PabloComponent ],
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(PabloComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
