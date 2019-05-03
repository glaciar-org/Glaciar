import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { CommonModule } from '@angular/common'
import { AgmCoreModule } from '@agm/core'
import { HomeComponent } from './home.component'
import { ThemeModule } from '../../../@theme/theme.module'

import { FrontRoutingModule } from '../front-routing.module'
import { DataDashboardModule } from '../data-dashboard/data-dashboard.module'

/**
 * Conneted como: 
 * ng test --watch --source-map=false
 * http://localhost:9876/debug.html?spec=HomeComponent
 */
describe('HomeComponent', () => {
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        CommonModule,
        FrontRoutingModule,
        DataDashboardModule,
        ThemeModule,
        AgmCoreModule,
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyA77V7bNjGDIIFvTWghwl1BhQro1I2zv_w'
         }),
      ],
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
