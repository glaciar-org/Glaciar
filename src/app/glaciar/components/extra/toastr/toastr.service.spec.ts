import { TestBed, inject } from '@angular/core/testing'
import { NGXToastrService } from './toastr.service'
// import { ToastrService } from 'ngx-toastr'
import { ToastrModule } from 'ngx-toastr'

/**
 * http://localhost:9876/debug.html?spec=NGXToastrService
 */
describe('NGXToastrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot()],
      providers: [NGXToastrService]
    })
  })


  it('should be created', inject([NGXToastrService], (service: NGXToastrService) => {
    expect(service).toBeTruthy()
  }))
  
  // it('should invoke to Toastr', inject([NGXToastrService], (service: NGXToastrService) => {
  //   expect(service.typeSuccess()).toBeTruthy()
  // }))
})
