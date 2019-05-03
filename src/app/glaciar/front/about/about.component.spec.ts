import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { AboutComponent } from './about.component'
import { ThemeModule } from '../../../@theme/theme.module'


import { CommonModule } from '@angular/common'
import { FrontRoutingModule } from '../front-routing.module'
import { DataDashboardModule } from '../data-dashboard/data-dashboard.module'


/**
 * Conneted como: 
 * ng test --watch --source-map=false
 * http://localhost:9876/debug.html?spec=AboutComponent
 */
describe('AboutComponent', () => {
  let component: AboutComponent
  let fixture: ComponentFixture<AboutComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutComponent ],
      imports: [
        CommonModule,
        FrontRoutingModule,
        DataDashboardModule,
        ThemeModule
      ],
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
