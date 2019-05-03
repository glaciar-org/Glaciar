import { Pipe, PipeTransform } from '@angular/core'
import * as Global from '../../model/global'

export const TYPE_TRANSF_00 = 'test'
export const TYPE_TRANSF_01 = 'pq'
export const TYPE_TRANSF_02 = 'qq'
export const TYPE_TRANSF_03 = 'paramDesc'
export const TYPE_TRANSF_04 = 'frecuencia'
export const TYPE_TRANSF_05 = 'unidad'
export const TYPE_TRANSF_06 = 'unidad_small'
export const TYPE_TRANSF_07 = 'spanish'

@Pipe({
    name: 'textTransfPipe'
  })
export class TextTransfPipe implements PipeTransform {

    transform(text: string, tag: string): string {

        // console.debug('TextTransfPipe::transform(' + text + ', tag=' + tag + ')')

        if (tag === TYPE_TRANSF_00) { return 'textTransfPipe alive!' }
        if (tag === TYPE_TRANSF_01) { return Global.pq(text) }
        if (tag === TYPE_TRANSF_02) { return Global.qq(text) }
        if (tag === TYPE_TRANSF_03) { return Global.getParamIdDescription(text) }
        if (tag === TYPE_TRANSF_04) { return Global.getDatosFrecuencia(text) }
        if (tag === TYPE_TRANSF_05) { return Global.getLabelUnits(Global.parseVar(text)) }
        if (tag === TYPE_TRANSF_06) { return Global.getLabelUnits(Global.parseVar(text), true) }
        if (tag === TYPE_TRANSF_07) { return Global.toSpanish(text) }

        return text
    }

}

