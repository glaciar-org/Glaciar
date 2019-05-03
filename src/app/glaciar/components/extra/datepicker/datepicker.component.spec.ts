import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { CustomDatepickerI18n, I18n } from './datepicker-i18n'
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { DomainModel } from '../../../model/domainmodel'
import { DatepickerComponent } from './datepicker.component'
import { DateFormatPipe } from '../../../components/pipe/date-format-pipe'
import * as moment from 'moment'

/**
 * http://localhost:9876/debug.html?spec=DatepickerComponent
 */
describe('DatepickerComponent', () => {
  let component: DatepickerComponent
  let fixture: ComponentFixture<DatepickerComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule.forRoot()
      ],
      declarations: [ DatepickerComponent, DateFormatPipe ],
      providers: [I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerComponent)
    component = fixture.componentInstance

    component.dateRange  = new DomainModel.DateRange()
    component.dateFilter = new DomainModel.DateFilter()

    component.dateRange.minDate = new Date('2012-10-01T13:00:00.000Z')
    component.dateRange.maxDate = new Date('2014-03-31T23:00:00.000Z')

    component.dateFilter.to = component.dateRange.maxDate
    component.dateFilter.from = moment(component.dateFilter.to).subtract(2, 'month').toDate()

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should test the HTML Component with last two months', () => {
    const compiled = fixture.nativeElement
    expect(compiled.querySelector('span').textContent).toContain('31-1-2014')
    expect(compiled.querySelector('span').textContent).toContain('31-3-2014')
  })
})



