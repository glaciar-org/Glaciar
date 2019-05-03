import { TestBed, inject } from '@angular/core/testing'
import { MessageService } from './message.service'

/**
 * Conneted como: 
 * ng test --watch --source-map=false
 * http://localhost:9876/debug.html?spec=MessageService
 */
describe('MessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService],
    })
  })

  it('should be created', inject([MessageService], (service: MessageService) => {
    expect(service).toBeTruthy()
  }))

  it('should be suscribe and publish', inject([MessageService], (service: MessageService) => {

    const TXT_MESSAGE = 'Menssage of Pablo Eze'
    
    this.subObjects = service.getObject().subscribe(
      (obj) => {
        console.debug(`MessageServiceTest:: Message RECIVED : ${obj}`)
        expect(obj).toBe(TXT_MESSAGE)
      }
    )

    console.debug(`MessageServiceTest:: Message SENT    : ${TXT_MESSAGE}`)
    service.sendObject(TXT_MESSAGE)

  }))

})
