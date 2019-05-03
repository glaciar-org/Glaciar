import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { NouisliderModule } from 'ng2-nouislider'
import { NouisliderComponent } from './nouislider.component'


/**
 * http://localhost:9876/debug.html?spec=NouisliderComponent
 */
describe('NouisliderComponent', () => {
  let component: NouisliderComponent
  let fixture: ComponentFixture<NouisliderComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule, 
        NgbModule.forRoot(),
        NouisliderModule 
      ],
      declarations: [ NouisliderComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(NouisliderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  // it('should have the value', () => {
  //   expect(component.someMax).toBe(10)
  // })

})
