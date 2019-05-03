import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { UiSwitchModule } from 'ngx-ui-switch'

import { SwitchTextPipe } from '../setup/setup.component'
import { DebugComponent } from '../../../components/util/debug/debug.component'
import { TextTransfPipe } from '../../../components/pipe/text-transf-pipe'
import { NumTransfPipe } from '../../../components/pipe/num-transf-pipe'
import { DateFormatPipe } from '../../../components/pipe/date-format-pipe'
import { UmbralService } from '../../../services/umbral.service'
import { MessageService } from '../../../services/message.service'
import { DataService } from '../../../services/data.service'
import { UmbralComponent } from './umbral.component'
import * as Global from '../../../model/global'  
import { ConfigRoutingModule } from '../config-routing.module'
import { ST }  from '../../../model/domainmodel'
import { NGXToastrService } from '../../../components/extra/toastr/toastr.service';

/**
 * Conneted como: 
 * ng test --watch --source-map=false
 * http://localhost:9876/debug.html?spec=UmbralComponent
 */
describe('UmbralComponent', () => {
  let component: UmbralComponent
  let fixture: ComponentFixture<UmbralComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgbModule.forRoot(),

        UiSwitchModule,
        ReactiveFormsModule,
	ConfigRoutingModule

      ],
      declarations: [ 
      	UmbralComponent, 
	DebugComponent, 
	NumTransfPipe, 
	TextTransfPipe, 
	NumTransfPipe 
      ],
      providers: [
        DataService, 
        UmbralService, 
        NGXToastrService,
        MessageService
      ]
    })
    .compileComponents()
  }))


  beforeEach(() => {
    fixture = TestBed.createComponent(UmbralComponent)
    component = fixture.componentInstance

    // // DS01 - EMULO INPUT
    // component.dataset_id =  Global.DS.DS01
    // component.quality_id =  Global.QUALITY_TAB.AIRQ
    // component.param_id   =  Global.VAR.NO2

    component.dataset_id =  Global.DS.DS03
    component.quality_id =  Global.QUALITY_TAB.WATERQ
    component.param_id   =  Global.VAR.Temp


    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
