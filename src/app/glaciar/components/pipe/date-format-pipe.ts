import { Pipe, PipeTransform } from '@angular/core'
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap'
import * as moment from 'moment'
import * as Global from '../../model/global'

export const TYPE_FORMAT_00 = 'test'
export const TYPE_FORMAT_01 = 'fmtNgb'
export const TYPE_FORMAT_02 = 'ff1_Date'

@Pipe({
    name: 'dateFormatPipe'
  })
export class DateFormatPipe implements PipeTransform {

    transform(date: any, tag: string): string {

        // console.debug('DateFormatPipe::transform(' + JSON.stringify(date) + ', tag=' + tag + ')')

        if (tag === TYPE_FORMAT_00) { return 'dateFormatPipe alive!' }
        if (tag === TYPE_FORMAT_01) { return this.formatDate2Front(date) }
        if (tag === TYPE_FORMAT_02) { return Global.ff1_Date(date) }

        return date
    }


    formatDate2Front = (date: NgbDateStruct) => date.day + '-' + date.month + '-' +  date.year

    // ff1_Date_Ngb = (date: NgbDateStruct) =>  moment.utc(date).format('DD-MM-YYYY')

    
}

