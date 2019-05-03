import { Component,  OnInit, OnChanges, OnDestroy, Input, AfterViewInit, Output, EventEmitter, ViewChild } from '@angular/core'
import { NgbDateStruct, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap'
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap'
import { DomainModel } from '../../../model/domainmodel'
import { CustomDatepickerI18n, I18n } from './datepicker-i18n'
import { DateFormatPipe } from '../../pipe/date-format-pipe'
import { DataService } from '../../../services/data.service'
import * as Global from '../../../model/global'
import * as moment from 'moment'

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year


const DISPLAY_MODE_TEXTO = "DISPLAY_MODE_TEXTO"
const DISPLAY_MODE_ICONO = "DISPLAY_MODE_ICONO"

@Component({
  selector: 'gcr-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}]
})
export class DatepickerComponent implements OnInit, AfterViewInit, OnDestroy {

  @Output() onDateChange = new EventEmitter<DomainModel.DateFilter>()
  @Input() dateRange: DomainModel.DateRange
  @Input() dateFilter: DomainModel.DateFilter
  @Input() display_mode: string = DISPLAY_MODE_TEXTO

  minDate
  maxDate

  @ViewChild('myDrop') dropdown: any

  hoveredDate: NgbDateStruct
  fromDate: NgbDateStruct
  toDate: NgbDateStruct

  constructor(calendar: NgbCalendar,
              private dataService: DataService,
              private ngbDateParserFormatter: NgbDateParserFormatter) {

    if (Global.isLabMode()) {

      // --[Global.DS]-------------------
      // let dataset_id =  Global.DS.DS01
      // let dataset_id =  Global.DS.DS02
      let dataset_id =  Global.DS.DS03
      // let dataset_id =  Global.DS.DS04
      // let dataset_id =  Global.DS.DS05

      // Rangos Dinamicos
      this.dateRange = this.dataService.getDataset_dates(dataset_id)

      // Solo un mes atrás
      this.dateFilter = new DomainModel.DateFilter()
      this.dateFilter.to = this.dateRange.maxDate
      this.dateFilter.from = moment(this.dateFilter.to).subtract(3, 'month').toDate()
    }

    console.debug('DatepickerComponent.constructor(' + calendar.getToday() + ')')

    this.fromDate = calendar.getToday()
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 2)

    console.debug('constructor: from ' + JSON.stringify(this.fromDate)
                            + ' to ' + JSON.stringify(this.toDate) )

  }



  ngOnInit(): void {

    console.debug(`DatepickerComponent:&:ngOnInit() :: @Input() this.dateRange
      { minDate: ${Global.ff1_Date(this.dateRange.minDate)},  maxDate: ${Global.ff1_Date(this.dateRange.maxDate)} } `)

    console.debug(`DatepickerComponent:&:ngOnInit() :: @Input() this.dateFilter
      {    from: ${Global.ff1_Date(this.dateFilter.from)  },  to     : ${Global.ff1_Date(this.dateFilter.to)}     } `)

    // console.debug(`DatepickerComponent:&:ngOnInit() - INICIO
    //        DT-PICKE-UI        =[ ${Global.ff1(this.toModel(this.fromDate))}, ${Global.ff1(this.toModel(this.toDate))} ]}
    // `)
            // DT-PICKE-UI minDate=[ ${Global.ff1(this.minDate)          }, ${Global.ff1(this.maxDate)} ]}

        // if (this.dateFilter.from && this.dateFilter.to) {

          this.fromDate = this.ngbDateParserFormatter.parse( Global.ff2_Date(this.dateFilter.from) )
          this.toDate   = this.ngbDateParserFormatter.parse( Global.ff2_Date(this.dateFilter.to  ) )
        // }

        this.minDate = this.getDateLimnit(this.dateRange.minDate)
        this.maxDate = this.getDateLimnit(this.dateRange.maxDate)

        // console.debug(`DatepickerComponent::ngOnInit() - CIERRE
        //     DT-PICKE-UI        =[ ${Global.ff1(this.toModel(this.fromDate))}, ${Global.ff1(this.toModel(this.toDate))} ]}
        //     `)





     // DT-PICKE-UI minDate=[ ${Global.ff1(this.minDate)          }, ${Global.ff1(this.maxDate)} ]}

     console.debug('DatepickerComponent::ngOnInit() fin')
  }

  ngAfterViewInit() {
    console.debug(`DatepickerComponent:&:ngAfterViewInit()`)


    console.debug(`DatepickerComponent:&:ngAfterViewInit() :: @Input() this.dateRange
    { minDate: ${Global.ff1_Date(this.dateRange.minDate)},
      maxDate: ${Global.ff1_Date(this.dateRange.maxDate)} }
  `)

  console.debug(`DatepickerComponent:&:ngAfterViewInit() :: @Input() this.dateFilter
    {    from: ${Global.ff1_Date(this.dateFilter.from)},
           to: ${Global.ff1_Date(this.dateFilter.to)} }
  `)

  }

  ngOnDestroy() {
    console.debug(`DatepickerComponent::ngOnDestroy()`)
  }


  getDateLimnit(date: Date) {
    const YYYY = Number.parseInt(moment(date).format('YYYY'), 10)
    const MM   = Number.parseInt(moment(date).format('MM'), 10)
    const DD   = Number.parseInt(moment(date).format('DD'), 10)
    return { year: YYYY, month: MM, day: DD }
  }

  fromModel(date: Date): NgbDateStruct {
    return (date && date.getFullYear) ? {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()} : null
  }

  toModel(date: NgbDateStruct): Date {
    return date ? new Date(date.year, date.month - 1, date.day) : null
  }

  onDateSelection(date: NgbDateStruct) {
    console.debug('DatepickerComponent::onDateSelection: ' + this.ff1_Date_Ngb(date) )

    if (!this.fromDate && !this.toDate) {
      this.fromDate = date
      console.debug('onDateSelection: fromDate ' + this.ff1_Date_Ngb(date)  )
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date
      console.debug('onDateSelection: toDate ' + this.ff1_Date_Ngb(date)  )
    } else {
      this.toDate = null
      this.fromDate = date
      console.debug('onDateSelection: else ... ')
    }

    this.pushDate()
  }

  private pushDate() {
    if (this.fromDate && this.toDate) {

        console.debug('pushDate(): this.fromDate : ' + this.ff1_Date_Ngb(this.fromDate) )
        console.debug('pushDate(): this.toDate   : ' + this.ff1_Date_Ngb(this.toDate)   )

        this.dateFilter.from = new Date(this.ngbDateParserFormatter.format(this.fromDate))
        this.dateFilter.to   = new Date(this.ngbDateParserFormatter.format(this.toDate))


        const dFromTo = { from: this.dateFilter.from,
                            to: this.dateFilter.to }

        console.debug('dFromTo date = { from: ' + Global.ff1_Date(dFromTo.from)
                                   + ', to: ' + Global.ff1_Date(dFromTo.to) + ' }')

        this.onDateChange.emit(dFromTo)
        this.dropdown.close()
    }
  }

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate)
  isInside = date => after(date, this.fromDate) && before(date, this.toDate)
  isFrom = date => equals(date, this.fromDate)
  isTo = date => equals(date, this.toDate)

  isDisabled = (date: NgbDateStruct, current: {month: number}) => date.day === 13

  /**
   * @param event: 'true' cuando se abre el calendario. 'false' cuando se cierra
   *               Cuando el calendario se cierra, debería emitir para que recargue
   *               aunque luego podrìa optimizar viajes al servidor si son iguales los filtors
   */
  openChange(event) {
    const action = ((event) ? 'OPEN' : 'CLOSED')
    console.debug('DatepickerComponent::openChange(' + event + ') => Calendar ' + action  )

    if (action === 'CLOSED') {
       this.pushDate()
    }
  }



  // -- [Format Dates] ----
  // Recordar utilizar moment.utc para que no me cambie un día ...

  // formatDate2Front = (date: NgbDateStruct) => date.day + '-' + date.month + '-' +  date.year

  ff1_Date_Ngb = (date: NgbDateStruct) =>  moment.utc(date).format('DD-MM-YYYY')


}

