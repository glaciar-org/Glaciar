import { Pipe, PipeTransform } from '@angular/core'
import * as Global from '../../model/global'

export const TYPE_TRANSF_00 = 'test'
export const TYPE_TRANSF_01 = 'numfmt'

@Pipe({
    name: 'numTransfPipe'
  })
export class NumTransfPipe implements PipeTransform {

    transform(num: Number, tag: string): string {

        if (tag === TYPE_TRANSF_00) { return 'numTransfPipe alive!' }
        if (tag === TYPE_TRANSF_01) { return Global.numfmt(num) }

        return num.toString()
    }

}

