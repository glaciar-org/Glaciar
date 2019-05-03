import { TestBed, inject } from '@angular/core/testing'
import { LabsService } from './labs.service'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { HttpEvent, HttpEventType } from '@angular/common/http'
import * as Global from '../model/global'


const URL_LABS_SERVICE = 'http://localhost:5000/info/heroku'


/**
 * http://localhost:9876/debug.html?spec=LabService
 */
describe('LabService: Pattern AAA', () => {

  // Basado en:
  //  https://blog.ng-classroom.com/blog/ionic2/unit-test-http-client/
  it('should return 25', () => {
    // Arrange
    const base = 5, exponent = 2
    // Act
    const response = Math.pow(base, exponent)
    // Assert
    expect(response).toEqual(25)
  })

})

describe('LabsService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LabsService],
    })
  })

  it('should be created', inject([LabsService], (service: LabsService) => {
    expect(service).toBeTruthy()
  }))

  // We use the inject utility to inject the needed services into our test.
  // Observar la secuencia Steps 01, 02 y 03

  it('should GET ' + URL_LABS_SERVICE,
      inject([LabsService, HttpTestingController],
             (service: LabsService,
              httpMock: HttpTestingController) => {

                const mockInfoHeroku = [
                  { envHerokuRuntime: 'Mock TDD',
                    envHerokuChartLib: 'CHARTJS'
                  }
                ]

                service.getInfoHeroku().subscribe((event: HttpEvent<any>) => {
                  switch (event.type) {
                    case HttpEventType.Response: {

                      console.debug('LabService # Step 01')

                      expect(event.body).toEqual(mockInfoHeroku)
                      console.debug('event.body: ' + JSON.stringify(event.body))
                    }
                  }
                })

                const mockReq = httpMock.expectOne(URL_LABS_SERVICE)

                expect(mockReq.cancelled).toBeFalsy()
                expect(mockReq.request.responseType).toEqual('json')

                console.debug('LabService # Step 00')

                // Aquí se apllica el Mock a la respuesta
                mockReq.flush(mockInfoHeroku)

                console.debug('LabService # Step 02')

                httpMock.verify()

              }
        )
    )


})





// => Estoy siguiendo a:
//      - https://alligator.io/angular/testing-httpclient/

// https://blog.ng-classroom.com/blog/ionic2/unit-test-http-client/
//      - Consideraciones a la hora de probar Http
//      - Nunca se va a ser una petición real hacia un endpoint,
//      - ya que se trabaja con un mock de HttpClient que emula una petición real a un endpoint