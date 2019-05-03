import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { UiSwitchModule } from 'ngx-ui-switch'
import { GlaciarStorageService } from '../../../services/glaciar-storage.service'
import { SetupComponent, SwitchTextPipe } from './setup.component'
import { DebugComponent } from '../../../components/util/debug/debug.component'
import { TextTransfPipe } from '../../../components/pipe/text-transf-pipe'
import { ChartConfig } from '../../../model/domainmodel'
import { DateFormatPipe } from '../../../components/pipe/date-format-pipe'
import { ST }  from '../../../model/domainmodel'
import * as Global from '../../../model/global'
import * as DEBUG from '../../../components/util/debug/debug.libs'

const TDD_Context_SELECTED = DEBUG.TDD_Context_DS03

/**
 * Conneted como: 
 * ng test --watch --source-map=false
 * http://localhost:9876/debug.html?spec=SetupComponent
 */
describe('SetupComponent', () => {
  let component: SetupComponent
  let fixture: ComponentFixture<SetupComponent>

  let glaciarStorage: GlaciarStorageService

  let propCompare          = (p)    => expect(component.formConfig.value[p]).toEqual(component.chartConfig[p])
  let propCompareWithValue = (p, v) => expect(component.formConfig.value[p]).toEqual(v) && 
                                       expect(component.chartConfig     [p]).toEqual(v) && propCompare(p)
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        UiSwitchModule,
        NgbModule.forRoot(),
        ReactiveFormsModule,
      ],
      declarations: [ 
        SetupComponent, SwitchTextPipe, DebugComponent, TextTransfPipe
      ], 
      providers: [
        GlaciarStorageService
      ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupComponent)
    component = fixture.componentInstance

    // I need to nitialize the sessionStorage
    glaciarStorage = TestBed.get(GlaciarStorageService)
    glaciarStorage.clear()
    this.UMBRALES = glaciarStorage.getUmbrales(TDD_Context_SELECTED.quality_id, TDD_Context_SELECTED.norma)

    component.ngOnInit() // MUY IMPORTANTE ESTO! ANGULAR NO LO VA A HACER POR NOSOTROS

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
    glaciarStorage.clear()
  })

  it('should check chartConfig and FormConfig', () => {

    console.debug('SetupComponent.spec.ts:?:this.chartConfig       = ' + JSON.stringify(component.chartConfig) + ') ')
    console.debug('SetupComponent.spec.ts:?:this.formConfig.value  = ' + JSON.stringify(component.formConfig.value) + ')')

    expect(component.chartConfig.zoom_tipo).toBe(ChartConfig.ZOOM_Command.zoomX)

    propCompare('labelY')
    propCompare('adaptativeY')
    propCompare('cursor')
    propCompare('zoom')
    propCompare('zoom_tipo')
    propCompare('umbrals_on')
    propCompare('umbral_min')
    propCompare('umbral_avg')
    propCompare('umbral_max')
    propCompare('scrollbarX')
    propCompare('scrollbarY')
    propCompare('scrollbarY_abajo')
    propCompare('scrollbarY_preview')
    propCompare('serie_tipo_area')
    propCompare('serie_tooltip')
    propCompare('serie_connect')
    propCompare('awq_estandar')
    propCompare('nil_action')
    propCompare('outliers_action')
    // propCompare('outliers')  // KO

    glaciarStorage.clear()
  })
  
  // it('Setting value to input properties on button click', () => {
    
  //   let rangos_valor_actual = component.chartConfig.umbrals_on

  //   fixture.detectChanges()
  //   // expect(submitEl.nativeElement.disabled).toBeTruthy()

  //   })


  /**
   * Quiero que: 
   * - Cuando emule el componente de switch on/off, por ejemplo en "ETIQUETA EN EJE Y"
   * - El valor de "chartConfig" este sincronizado
   */
  it('should verfy correlation between FormConfig and ChartConfig', () => {

    /**
     * chartConfig esta suscripto a formConfig => Si solo seteo uno, debería mantener la igualdad
     * @param p 
     * @param v 
     */
    let monkeyForm = (p, v) => {
      console.debug(`monkeyForm:[A]: component.formConfig.value['${p}']   = ${component.formConfig.value[p] } `)
      console.debug(`monkeyForm:[A]: component.chartConfig     ['${p}']   = ${component.chartConfig[p] } `)
      component.formConfig.value[p] = v
      propCompareWithValue(p, v)
    }

 
    monkeyForm('labelY', false)
    monkeyForm('adaptativeY', false)
    monkeyForm('cursor', false)
    monkeyForm('zoom', false)
    monkeyForm('zoom_tipo', ChartConfig.ZOOM_Command.selectX)
    monkeyForm('zoom_tipo', ChartConfig.ZOOM_Command.selectY)
    monkeyForm('umbrals_on', false)
    monkeyForm('umbral_min', false)
    monkeyForm('umbral_avg', false)
    monkeyForm('umbral_max', false)
    monkeyForm('scrollbarX', false)
    monkeyForm('scrollbarY', false)
    monkeyForm('scrollbarY_abajo', false)
    monkeyForm('scrollbarY_preview', false)
    monkeyForm('serie_tipo_area', false)
    monkeyForm('serie_tooltip', false)
    monkeyForm('serie_connect', false)
    monkeyForm('awq_estandar', ST.AWQ.ACUMAR_2017_46_USO_III)
    monkeyForm('awq_estandar', ST.AWQ.ACUMAR_2017_46_USO_Ia)
    monkeyForm('nil_action', false)
    monkeyForm('outliers_action', false)

    glaciarStorage.clear()
  })

})



// 6. Does a DOM element get rendered correctly?

// The DebugElement makes it possible to query DOM elements in the component tempate to ensure they are rendered properly.

// it('should have an h1 tag of `Alert Button`', () => {
//   expect(de.query(By.css('h1')).nativeElement.innerText).toBe('Alert Button')
// })
