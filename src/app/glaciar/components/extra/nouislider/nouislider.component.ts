import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { FormGroup, FormBuilder, FormControl, FormArray } from "@angular/forms"



@Component({
  selector: 'app-nouislider',
  templateUrl: './nouislider.component.html',
  styleUrls: ['./nouislider.component.scss']
})
export class NouisliderComponent implements OnInit {


  public disabled: boolean = false
  public keyupLabelOn: boolean = false
  public keydownLabelOn: boolean = false

  public someValue: number = 5
  public someMin: number = -10
  public someMax: number = 10
  public someStep: number = 1
  public someRange: number[] = [3, 7]
  public someRange2: number[] = [10, 15]
  public someRange3: number[] = [2, 8]
  public someTime: number = 0
  public someRange2config: any = {
    behaviour: 'drag',
    connect: true,
    margin: 1,
    limit: 5,
    range: {
      min: 0,
      max: 20
    },
    pips: {
      mode: 'steps',
      density: 5
    }
  }

  public someKeyboard: number[] = [1, 3]
  public someKeyboardConfig: any = {
    behaviour: 'drag',
    connect: true,
    start: [0, 5],
    keyboard: true,
    step: 0.1,
    pageSteps: 10,  // number of page steps, defaults to 10
    range: {
      min: 0,
      max: 5
    },
    pips: {
      mode: 'count',
      density: 2,
      values: 6,
      stepped: true
    }
  }

  public someKeyboard2: number[] = [1, 2, 3]
  public someKeyboardConfig2: any = {
      behaviour: 'drag',
      connect: true,
      orientation: 'vertical',
      start: [0, 2, 3],
      step: 0.1,
      range: {
          min: 0,
          max: 5
      },
      pips: {
          mode: 'count',
          density: 2,
          values: 6,
          stepped: true
      },
      keyboard: true,

  }

  public form1: FormGroup
  public form2: FormGroup
  public form3: FormGroup

  F1_SINGLE : any
  F2_RANGE  : any
  F3_SINGLE : any


  public someTimeConfig: any = {
    start: 86400 / 2,
    range: {
      min: 0,
      max: 86399
    },

    step: 1
  }

  constructor (
    private formBuilder: FormBuilder
  ) {}

  public ngOnInit () {

    this.form1 = this.formBuilder.group({
      'single': [ 10 ]
    })

    this.form2 = this.formBuilder.group({
      'range': [ [ 2, 8 ] ] 
    })

    this.form3 = this.formBuilder.group({ 
      'single': [ 3 ] 
    })


    // this.form1 = this.formBuilder.group({
    //   'single': [ 10 ]
    // })

    this.F1_SINGLE  = <FormArray>this.form1.controls.single
    this.F2_RANGE   = <FormArray>this.form2.controls.range 
    this.F3_SINGLE  = <FormArray>this.form3.controls.single 


  }

  public someKeyboard2EventHandler = (e: KeyboardEvent) => {
    console.log("overridden keyboard handler")

    // determine which handle triggered the event
    let index = parseInt((<HTMLElement>e.target).getAttribute('data-handle'))

    let multiplier: number = 0
    let stepSize = 0.1

    switch ( e.which ) {
      case 40:  // ArrowDown
      case 37:  // ArrowLeft
        multiplier = -2
        e.preventDefault()
        break

      case 38:  // ArrowUp
      case 39:  // ArrowRight
        multiplier = 3
        e.preventDefault()
        break

      default:
        break
    }

    let delta = multiplier * stepSize
    let newValue = [].concat(this.someKeyboard2)
    newValue[index] += delta
    this.someKeyboard2 = newValue
  }

  changeSomeValue(value: number) {
    this.someValue = this.someValue + value
  }

  changeSomeMin(value: number) {
    this.someMin = this.someMin + value
  }

  changeSomeMax(value: number) {
    this.someMax = this.someMax + value
  }

  changeSomeStep(value: number) {
    this.someStep = this.someStep + value
  }

  changeSingleFormValue(value: number) {
    const control = <FormControl>this.form1.controls['single']
    control.setValue(control.value + value)
  }

  changeRangeFormValue(index: number, value: number) {
    const control = <FormControl>this.form2.controls['range']
    const newRange = control.value
    newRange[index] = newRange[index] + value
    control.setValue(newRange)
  }

  changeSomeRange(index: number, value: number) {
    let newRange = [this.someRange[0], this.someRange[1]]
    newRange[index] = newRange[index] + value
    this.someRange = newRange
  }

  onChange(value: any) {
    console.log('Value changed to', value)
  }

  blinkKeyupLabel() {
    this.keyupLabelOn = true
    setTimeout(() => {
      this.keyupLabelOn = false
    }, 450)
  }

  blinkKeydownLabel() {
    this.keydownLabelOn = true
    setTimeout(() => {
      this.keydownLabelOn = false
    }, 450)
  }

  toggleDisabled() {
    const control = this.form3.controls.single
    control.enabled ? control.disable() : control.enable()
  }


}


