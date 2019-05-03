import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { NGXToastrService } from './toastr.service'
import { ToastrComponent } from './toastr.component'
import { ToastrModule } from 'ngx-toastr'

/**
 * http://localhost:9876/debug.html?spec=ToastrComponent
 */
describe('ToastrComponent', () => {
  let component: ToastrComponent
  let fixture: ComponentFixture<ToastrComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot()],
      declarations: [ ToastrComponent ],
      providers: [NGXToastrService]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastrComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
