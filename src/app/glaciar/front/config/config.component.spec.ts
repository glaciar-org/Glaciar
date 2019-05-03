import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { ConfigRoutingModule } from './config-routing.module'
import { ConfigComponent } from './config.component'
import { SwitchTextPipe, SetupComponent } from './setup/setup.component'
import { DebugComponent } from '../../components/util/debug/debug.component'
import { TextTransfPipe } from '../../components/pipe/text-transf-pipe'
import { DateFormatPipe } from '../../components/pipe/date-format-pipe'
import { InfoComponent } from './info/info.component'
import { ConfigTabComponent } from './config-tab/config-tab.component'
import { DispersionComponent } from './dispersion/dispersion.component'
import { OutlierComponent } from './outlier/outlier.component'
import { UmbralComponent } from './umbral/umbral.component'
import { CommonModule } from '@angular/common'
import { ThemeModule } from '../../../@theme/theme.module'
import { ComponentsModule } from '../../components/components.module'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterModule } from '@angular/router'
/**
 * Conneted como: 
 * ng test --watch --source-map=false
 * http://localhost:9876/debug.html?spec=ConfigComponent
 */
describe('ConfigComponent', () => {
  let component: ConfigComponent
  let fixture: ComponentFixture<ConfigComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // declarations: [ ConfigComponent, DebugComponent, TextTransfPipe, DateFormatPipe ],
      // imports: [
      //   ConfigRoutingModule
      // ]
      declarations: [
        ConfigComponent, 
        InfoComponent, 
        UmbralComponent, 
        SetupComponent, 
        OutlierComponent, 
        DispersionComponent, 
        ConfigTabComponent],
      imports: [
        ThemeModule,
        CommonModule,
        HttpClientTestingModule,
        ConfigRoutingModule,
        ComponentsModule,
        RouterModule.forRoot([])
      ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
