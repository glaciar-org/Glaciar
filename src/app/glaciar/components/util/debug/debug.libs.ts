import { ST }  from '../../../model/domainmodel'
import * as Global from '../../../model/global'

export const TDD_Context_DS01 = {
    dataset_id: Global.DS.DS01,
    quality_id: Global.QUALITY_TAB.AIRQ,
    param_id  : Global.VAR.NO2,
    norma     : ST.AWQ.REF_BIB_AIRQ,
}

export const TDD_Context_DS02 = {
    dataset_id: Global.DS.DS02,
    quality_id: Global.QUALITY_TAB.AIRQ,
    param_id  : Global.VAR.CO,
    norma     : ST.AWQ.REF_BIB_AIRQ,
}

export const TDD_Context_DS03 = {
    dataset_id: Global.DS.DS03,
    quality_id: Global.QUALITY_TAB.WATERQ,
    param_id  : Global.VAR.Temp,
    norma     : ST.AWQ.REF_BIB,
}

export const TDD_Context_DS04 = {
    dataset_id: Global.DS.DS04,
    quality_id: Global.QUALITY_TAB.WATERQ,
    param_id  : Global.VAR.Temp,
    norma     : ST.AWQ.REF_BIB,
}

export const TDD_Context_DS05 = {
    dataset_id: Global.DS.DS05a,
    quality_id: Global.QUALITY_TAB.AIRQ,
    param_id  : Global.VAR.CO2,
    norma     : ST.AWQ.REF_BIB_AIRQ,
}
