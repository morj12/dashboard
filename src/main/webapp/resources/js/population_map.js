/**
 * This script is used to draw a map using external data.
 */

document.addEventListener('DOMContentLoaded', function () {

    /**
     * Chart variable
     */
    let chart;

    /**
     * Countries we want to analyze
     */
    let countries = ['Austria', 'Belgium', 'Denmark', 'Croatia', 'Estonia', 'Finland', 'France',
        'Germany', 'Slovenia', 'Iceland', 'Spain', 'Switzerland']

    /**
     * Tuple array needed for the chart
     */
    var country_data = [
        {
            "hc-key": "at",
            "value": 0,
        }, {
            "hc-key": "be",
            "value": 0,
        }, {
            "hc-key": "dk",
            "value": 0,
        }, {
            "hc-key": "hr",
            "value": 0,
        }, {
            "hc-key": "ee",
            "value": 0,
        }, {
            "hc-key": "fi",
            "value": 0,
        }, {
            "hc-key": "fr",
            "value": 0,
        }, {
            "hc-key": "de",
            "value": 0,
        }, {
            "hc-key": "si",
            "value": 0,
        }, {
            "hc-key": "is",
            "value": 0,
        }, {
            "hc-key": "es",
            "value": 0,
        }, {
            "hc-key": "ch",
            "value": 0,
        }]

    /**
     * Fetches a JSON  and fills a field of the tuple array.
     * @param item country name
     * @param i array index
     */
    function getJson(item, i) {
        $.getJSON('https://restcountries.com/v3.1/name/' + item, function (result) {
            country_data[i].value = result[0]["population"]
        })
    }

    /**
     * Asynchronous method which prepares all data and then calls the next method.
     */
    (async () => {
        await countries.forEach(function (item, i) {
            getJson(item, i)
        })
    })().then(drawChartAfterTimeout)

    /**
     * Calls drawChart method and loads its data after some time
     */
    function drawChartAfterTimeout() {
        setTimeout(() => {
            drawChart()
            chart.series[0].setData(country_data)
        }, 300)

    }

    /**
     * Draws a map using Highcharts API
     */
    function drawChart() {
        chart = Highcharts.mapChart('container', {
            chart: {
                map: 'custom/europe',
                borderWidth: 1,
                height: '70%'
            },
            title: {
                text: 'European countries population'
            },
            subtitle: {
                text: 'Source map: <a href="https://code.highcharts.com/mapdata/custom/europe.js">Europe</a>'
            },
            mapNavigation: {
                enabled: true,
                buttonOptions: {
                    verticalAlign: 'top'
                }
            },
            colorAxis: {
                min: 0
            },
            series: [{
                data: country_data,
                name: 'Population',
                states: {
                    hover: {
                        color: '#FFFFFF'
                    }
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                },
            }]
        });
    }


})
