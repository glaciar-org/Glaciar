import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { NouisliderModule } from 'ng2-nouislider'
import { ToastrModule } from 'ngx-toastr'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { UiSwitchModule } from 'ngx-ui-switch'
import { TextTransfPipe } from '../../../components/pipe/text-transf-pipe'
import { SwitchTextPipe } from '../setup/setup.component'
import { DateFormatPipe } from '../../../components/pipe/date-format-pipe'
import { ChartConfig } from '../../../model/domainmodel'
import { OutlierComponent } from './outlier.component'
import { UmbralService } from '../../../services/umbral.service'
import { DataService } from '../../../services/data.service'
import { NGXToastrService } from '../../../components/extra/toastr/toastr.service'
import { DebugComponent } from '../../../components/util/debug/debug.component'
import { GlaciarStorageService } from '../../../services/glaciar-storage.service'

import * as Global from '../../../model/global'
import { ST }  from '../../../model/domainmodel'
import * as DEBUG from '../../../components/util/debug/debug.libs'

const TDD_Context_SELECTED = DEBUG.TDD_Context_DS03

/**
 * Conneted como: 
 * ng test --watch --source-map=false
 * http://localhost:9876/debug.html?spec=OutlierComponent
 */
describe('OutlierComponent', () => {
  let component: OutlierComponent
  let fixture: ComponentFixture<OutlierComponent>

  let glaciarStorage: GlaciarStorageService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        UiSwitchModule,
        NgbModule.forRoot(),
        ToastrModule.forRoot(),
        ReactiveFormsModule,
        NouisliderModule,
      ],
      declarations: [ OutlierComponent, DebugComponent, TextTransfPipe, SwitchTextPipe, DateFormatPipe ],
      providers: [UmbralService, DataService, NGXToastrService, GlaciarStorageService]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(OutlierComponent)
    component = fixture.componentInstance

    component.dataset_id = TDD_Context_SELECTED.dataset_id
    component.quality_id = TDD_Context_SELECTED.quality_id
    component.param_id   = TDD_Context_SELECTED.param_id  

    // I need to nitialize the sessionStorage
    glaciarStorage = TestBed.get(GlaciarStorageService)
    glaciarStorage.clear()
    this.OUTLIERS = glaciarStorage.getUmbral(component.param_id, TDD_Context_SELECTED.norma)
    this.UMBRALES = glaciarStorage.getOutliers(component.quality_id)
    
    // get test component from the fixture
    component.ngOnInit()  // Invoco al ngOnInit manualmente : angular no lo va a hacer por nosotros en el TDD

    // Related to the Issue: https://github.com/PabloEzequiel/GlaciaR-Viedma/issues/76
    // fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
    glaciarStorage.clear()
  })

  // it('form invalid when empty', () => {
  //   expect(component.formConfig.value.serie_connect).toBeFalsy()
  // })

  // it('should check chartConfig and FormConfig', () => {

  //   console.debug('ValoresComponent.spec.ts::this.chartConfig       = ' + JSON.stringify(component.chartConfig) + ') ')
  //   console.debug('ValoresComponent.spec.ts::this.formConfig.value  = ' + JSON.stringify(component.formConfig.value) + ')')

  //   expect(component.chartConfig.zoom_tipo).toBe(ChartConfig.ZOOM_Command.zoomX)

  //   // expect(component.chartConfig.nil_action).toEqual(component.formConfig.value.nil_action)
  //   // expect(component.chartConfig.outliers_action).toEqual(component.formConfig.value.outliers_action)

  // })

})



// RESPECTO A:
// ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
// Es tomado de:
// https://angular.io/api/forms/FormControlName