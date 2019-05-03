import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { DebugComponent, Padre } from './debug.component'
import { TextTransfPipe } from '../../pipe/text-transf-pipe'
import {  NumTransfPipe } from '../../pipe/num-transf-pipe'
import { DateFormatPipe } from '../../pipe/date-format-pipe'
import { DomainModel, KEY } from '../../../model/domainmodel'
import * as Global from '../../../model/global'

/**
 * http://localhost:9876/debug.html?spec=DebugPipes
 */
describe('DebugPipes', () => {
  let textTransfPipe : TextTransfPipe
  let  numTransfPipe :  NumTransfPipe
  let dateTransfPipe : DateFormatPipe

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextTransfPipe, DateFormatPipe, NumTransfPipe ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    textTransfPipe = new TextTransfPipe()
     numTransfPipe = new  NumTransfPipe()
    dateTransfPipe = new DateFormatPipe()
  })

  it('should test TextTransfPipe', () => {
    expect(textTransfPipe.transform('hello', 'test')).toBe('textTransfPipe alive!')
    expect(textTransfPipe.transform(Global.AIRQ.NO2, 'pq')).toBe('NO2')
    expect(textTransfPipe.transform(Global.QUALITY_TAB.AIRQ, 'qq')).toBe('Calidad del Aire')
    expect(textTransfPipe.transform(Global.VAR.NO2, 'paramDesc')).toBe('Dióxido de Nitrógeno (NO2)')
    expect(textTransfPipe.transform('mes', 'frecuencia')).toBe('mensual')
    expect(textTransfPipe.transform(Global.VAR.Redox, 'unidad')).toBe('Milivoltios (mV)' )
    expect(textTransfPipe.transform('Redox', 'unidad')).toBe('Milivoltios (mV)' )
  })

  it('should test NumTransfPipe', () => {
    expect(numTransfPipe.transform(11, 'test')).toBe('numTransfPipe alive!')
    expect(numTransfPipe.transform(Number.NEGATIVE_INFINITY, 'numfmt')).toBe('-' )
    expect(numTransfPipe.transform(Number.POSITIVE_INFINITY, 'numfmt')).toBe('-' )
    expect(numTransfPipe.transform((16.22), 'numfmt')).toBe('16.22' )
  })

  it('should test DateFormatPipe ', () => {
    expect(dateTransfPipe.transform('hello', 'test')).toBe('dateFormatPipe alive!')
    expect(dateTransfPipe.transform(new Date('2009-10-01T13:00:00.000Z'), 'ff1_Date')).toBe('01-10-2009')
    expect(dateTransfPipe.transform(new Date('2009-01-01T00:00:00.000Z'), 'ff1_Date')).toBe('01-01-2009')
  })
  
})


/**
 * http://localhost:9876/debug.html?spec=DebugComponent
 */
describe('DebugComponent', () => {
  let component: DebugComponent
  let fixture: ComponentFixture<DebugComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebugComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DebugComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should test Global Component implementation', () => {

    console.debug(`Environment:: ${window.top.location}` )

    if (Global.isHost_Local()) {

        expect(Global.isHost_Prod()).toBeFalsy()
        expect(Global.isHost_Dev()).toBeFalsy()

        expect(Global.getValue(Global.HOST_BACKEND.UPSALA)).toBe(Global.HOST_BACKEND.UPSALA_LOCALHIP)
        
    }
  })

  it('should test the h6 context', () => {
    const compiled = fixture.nativeElement
    // expect(compiled.innerHTML).toContain('DEBUG COMPONENTE')
  })

  it('should test Global.getQueryString()', () => {

    let filters = new DomainModel.DateFilter()
    filters.from = new Date('2012-02-01T13:00:00.000Z')
    filters.to   = new Date('2013-03-04T23:00:00.000Z') 
    
    expect(Global.getQueryString(Global.DS.DS01, Global.QUALITY_TAB.AIRQ, Global.VAR.CO, filters))
                 .toContain('dataset/MGSET_01_2009_2018/p/AIRQ_CO?from=2012-02-01&to=2013-03-04')

    expect(Global.getQueryString(Global.DS.DS02, Global.QUALITY_TAB.AIRQ, Global.VAR.CO2, filters))
                 .toContain('dataset/MGSET_02_2010_2015/p/AIRQ_CO2?from=2012-02-01&to=2013-03-04')

    expect(Global.getQueryString(Global.DS.DS03, Global.QUALITY_TAB.WATERQ, Global.VAR.pH, filters))
                 .toContain('dataset/MGSET_03_2015_2017/p/WATERQ_pH?from=2012-02-01&to=2013-03-04')

    expect(Global.getQueryString(Global.DS.DS04, Global.QUALITY_TAB.WATERQ, Global.VAR.pH, filters))
                 .toContain('dataset/MGSET_04_2010_2015-PRN/p/WATERQ_pH?from=2012-02-01&to=2013-03-04')

    expect(Global.getQueryString(Global.DS.DS05a, Global.QUALITY_TAB.AIRQ, Global.VAR.CO2, filters))
                .toContain('dataset/MGSET_05_WRI_CAIT_EESS_CO2/p/AIRQ_CO2?from=2012-02-01&to=2013-03-04')

  })

  it('should test Global.getQueryString() with customParams', () => {

    let filters = new DomainModel.DateFilter()
    filters.from = new Date('1980-02-01T13:00:00.000Z')
    filters.to   = new Date('1990-03-04T23:00:00.000Z') 

    let acp = new DomainModel.CustomParams()
    acp.sector  = KEY.PARAM_DS05.SECTOR_Electricity
    acp.country = KEY.PARAM_DS05.COUNTRY_Argentina

    expect(Global.getQueryString(Global.DS.DS05a, Global.QUALITY_TAB.AIRQ, Global.VAR.CO2, filters, acp))
                 .toContain('dataset/MGSET_05_WRI_CAIT_EESS_CO2/p/AIRQ_CO2'
                                   + '/s/Electricity'
                                   + '/c/Argentina'
                                   + '?from=1980-02-01&to=1990-03-04')

    let bcp = new DomainModel.CustomParams()
    bcp.sector  = KEY.PARAM_DS05.SECTOR_Electricity

    expect(Global.getQueryString(Global.DS.DS05a, Global.QUALITY_TAB.AIRQ, Global.VAR.CO2, filters, bcp))
                .toContain('dataset/MGSET_05_WRI_CAIT_EESS_CO2/p/AIRQ_CO2'
                                  + '/s/Electricity'
                                  + '?from=1980-02-01&to=1990-03-04')

    let ccp = new DomainModel.CustomParams()
    ccp.country = KEY.PARAM_DS05.COUNTRY_Argentina

    expect(Global.getQueryString(Global.DS.DS05a, Global.QUALITY_TAB.AIRQ, Global.VAR.CO2, filters, ccp))
                .toContain('dataset/MGSET_05_WRI_CAIT_EESS_CO2/p/AIRQ_CO2'
                                  + '/c/Argentina'
                                  + '?from=1980-02-01&to=1990-03-04')

  })

  it('should have differente HTML Content', () => {
    const compiled = fixture.nativeElement

    // console.log(compiled)
    // console.log(compiled)
    // component.fatherName = Padre.amChart4_LabMode
    // expect(compiled.querySelector('.ww').innerHTML).    toContain('contenido de amChart4_LabMode')
    // expect(compiled.querySelector('.ww').innerHTML).not.toContain('contenido de setup.component')

    // component.fatherName = Padre.setup_component
    // expect(compiled.querySelector('.ww').innerHTML).    toContain('contenido de setup.component')
    // expect(compiled.querySelector('.ww').innerHTML).not.toContain('contenido de amChart4_LabMode')

  })



  // it('should create a `FormGroup` comprised of `FormControl`s', () => {
  //   component.ngOnInit()
  //   expect(component.formGroup instanceof FormGroup).toBe(true)
  // })

})

//-------------

// NEXT:
// https://dzone.com/articles/unit-testing-in-angular-4-using-jasmine-and-karma
// Testing the @Input() Decorator
// Testing the @Output() Decorator
///////////



// TESTING CLASS AND PIPES ... 
// https://codecraft.tv/courses/angular/unit-testing/classes-and-pipes/

// Checkbox .... 
// var raisingExceptionsUI = container.getElementsByClassName("raise")[0]
// var raisingExceptionsUI = container.querySelector(".raise")
// expect(raisingExceptionsUI.checked).toBe(true)

// DEMO DE querySelector


// <div id="foo\bar"></div>
// <div id="foo:bar"></div>

// <script>
//   console.log('#foo\bar')               // "#fooar" (\b is the backspace control character)
//   document.querySelector('#foo\bar')    // Does not match anything

//   console.log('#foo\\bar')              // "#foo\bar"
//   console.log('#foo\\\\bar')            // "#foo\\bar"
//   document.querySelector('#foo\\bar') // Match the first div

//   document.querySelector('#foo:bar')    // Does not match anything
//   document.querySelector('#foo\\:bar')  // Match the second div
// </script>