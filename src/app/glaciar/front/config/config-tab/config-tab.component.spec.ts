import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { Routes, RouterModule } from '@angular/router'
import { ConfigTabComponent } from './config-tab.component'
import { ThemeModule } from '../../../../@theme/theme.module'
import { InfoComponent } from '../info/info.component'
import { SwitchTextPipe, SetupComponent } from '../setup/setup.component'
import { DebugComponent } from '../../../components/util/debug/debug.component'
import { TextTransfPipe } from '../../../components/pipe/text-transf-pipe'
import { DateFormatPipe } from '../../../components/pipe/date-format-pipe'
import { ConfigModule } from '../config.module'
import { ConfigComponent } from '../config.component'
import { UmbralComponent } from '../umbral/umbral.component'
import { OutlierComponent } from '../outlier/outlier.component'
import { DispersionComponent } from '../dispersion/dispersion.component'
import { CommonModule } from '@angular/common'
import { ConfigRoutingModule } from '../config-routing.module'
import { ComponentsModule } from '../../../components/components.module'
import { DataService } from '../../../services/data.service'
import { APP_BASE_HREF } from '@angular/common'

/**
 * Conneted como: 
 * ng test --watch --source-map=false
 * http://localhost:9876/debug.html?spec=ConfigTabComponent
 */
describe('ConfigTabComponent', () => {
  let component: ConfigTabComponent
  let fixture: ComponentFixture<ConfigTabComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // declarations: [ 
      //   // ConfigTabComponent, 
      //   InfoComponent, 
      //   DebugComponent, 
      //   TextTransfPipe, 
      //   DateFormatPipe 
      // ],
      // imports: [
      //   ThemeModule,
      //   ConfigModule
      // ]


      declarations: [
        ConfigComponent, 
        InfoComponent, 
        UmbralComponent, 
        SetupComponent, 
        OutlierComponent, 
        DispersionComponent, 
        ConfigTabComponent
      ],
      imports: [
        NgbModule.forRoot(), 
        HttpClientTestingModule,
        ThemeModule,
        CommonModule,
        ConfigRoutingModule,
        ComponentsModule,
        RouterModule.forRoot([])
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
      ],
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigTabComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  // it('should create', () => {
  //   expect(component).toBeTruthy()
  // })
})
