import { ToastrService } from 'ngx-toastr'
import { Injectable } from '@angular/core'

@Injectable()
export class NGXToastrService {
    constructor(public toastr: ToastrService) { }


  typeInfo() {
    this.toastr.info('We do have the Kapua suite available.', 'Turtle Bay Resort')
  }

  typeSuccess() {
    console.debug(`NGXToastrService::typeSuccess `)
    this.toastr.success('You are awesome!', 'Success!')
  }

  onSuceesClickAction(s: string) {
    console.debug(`NGXToastrService::onSuceesClickAction `)
    this.toastr.success(s, 'titulo ?? ' )
  }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!')
  }

  /**
   * 
   * @param message 
   * @param title 
   * @param options @see https://github.com/scttcper/ngx-toastr
   */
  info(message: string, title: string, options: any = {}) {
    this.toastr.info(message, title, options)
  }
}
