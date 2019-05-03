import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { FaqComponent } from './faq.component'
import { ThemeModule } from '../../../@theme/theme.module'

import { CommonModule } from '@angular/common'
import { FrontRoutingModule } from '../front-routing.module'
import { DataDashboardModule } from '../data-dashboard/data-dashboard.module'


/**
 * Conneted como: 
 * ng test --watch --source-map=false
 * http://localhost:9876/debug.html?spec=FaqComponent
 */
describe('FaqComponent', () => {
  let component: FaqComponent
  let fixture: ComponentFixture<FaqComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqComponent ],
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
    fixture = TestBed.createComponent(FaqComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
