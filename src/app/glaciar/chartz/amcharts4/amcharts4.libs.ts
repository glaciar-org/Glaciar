import * as Global from '../../model/global'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4lang_en_US from '@amcharts/amcharts4/lang/en_US'
import am4lang_es_ES from '@amcharts/amcharts4/lang/es_ES'
import { DataService } from '../../services/data.service'

export const SETUP4 = 'AMCHART_SETUP_04'
export const SETUP5 = 'AMCHART_SETUP_05'

export function getTypeDataResponse(setup) {

    if (setup === SETUP4) { return Global.RES_TYPE.JSON_for_AMCHARTS4_MULTI_SERIES_V3 }
    if (setup === SETUP5) { return Global.RES_TYPE.JSON_for_AMCHARTS4_MULTI_SERIES_V3 }

}



/**
 * @param chart
 * @param ndata
 *
 * SETUP4 para amChart4
 */
export function doChart_SETUP4(chart, ndata: any) {

    chart.language.locale = am4lang_es_ES

    chart.data = ndata.data

    chart.dateFormatter.inputDateFormat = 'yyyy-MM-ddTHH:mm:ss'
    chart.dateFormatter.dateFormat      = 'yyyy-MM-dd HH:mm'

    const dateAxis = chart.xAxes.push(new am4charts.DateAxis())
    dateAxis.renderer.minGridDistance = 50
    dateAxis.renderer.grid.template.location = 0.5
    dateAxis.startLocation = 0.5
    dateAxis.endLocation = 0.5

    dateAxis.renderer.minGridDistance = 50

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())

    for (let i = 0; i < ndata.series.length; i++) {

      addSerieToChart_SETUP4(chart, i, ndata)

    }

    chart.legend = new am4charts.Legend()

    chart.cursor = new am4charts.XYCursor()
    chart.cursor.xAxis = dateAxis


}

function addSerieToChart_SETUP4(chart, i: number, nseries) {

    const seriesId = i

    console.debug(chart.data)

    // Create series
    const series = chart.series.push(new am4charts.LineSeries())
    series.dataFields.valueY = 'value' + seriesId
    series.dataFields.dateX = 'date'
    series.name = 'Serie #' + seriesId
    series.strokeWidth = 3
    series.tensionX = 0.9
    series.fillOpacity = 0.2
    series.stacked = true
    series.connect = false

    const bullet = series.bullets.push(new am4charts.CircleBullet())
    bullet.circle.strokeWidth = 2
    bullet.circle.radius = 4
    bullet.circle.fill = am4core.color('#fff')

    const esMultiples = nseries.length > 1

    if (i === nseries.length - 1 ) {

        bullet.tooltipText = (esMultiples) ?
        `[font-size: 12px] {dateX.formatDate("yyyy-MM-dd   HH:mm ")} [/]
        [font-size: 12px] Monóxido de Carbono (CO)[/]
        [font-size: 13px font-family: 'Archivo Narrow'] - Series 0: {value0}[/]
        [font-size: 13px font-family: 'Archivo Narrow'] - Series 1: {value1}[/]
        [font-size: 13px font-family: 'Archivo Narrow'] - Series 2: {value2}[/]
        [font-size: 13px font-family: 'Archivo Narrow'] - Series 3: {value3}[/]
        `
        :
        `[font-size: 12px] {dateX.formatDate("yyyy-MM-dd   HH:mm ")} [/]
        [font-size: 12px] Monóxido de Carbono (CO)[/]
        [font-size: 13px font-family: 'Archivo Narrow'] - Series 0: {value0}[/]
        `
    }


    const bullethover = bullet.states.create('hover')
    bullethover.properties.scale = 1.8

    chart.invalidateData()

    if (i === 0) {
        const scrollbarX = new am4charts.XYChartScrollbar()
        scrollbarX.series.push(series)
        chart.scrollbarX = scrollbarX
        chart.scrollbarX.parent = chart.bottomAxesContainer
        chart.scrollbarX.thumb.minWidth = 50
    }

}

