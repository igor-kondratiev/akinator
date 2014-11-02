angular.module('services')
    .service('ChartService', [function () {
        function removeLabel() {
            var amChartLabel = $('a:contains("JS chart by amCharts")');
            amChartLabel.remove();
        }
        var chartConfig = {
            "type": "pie",
            "theme": "none",
            "dataProvider": [{
                "country": "Lithuania",
                "value": 260
            }, {
                "country": "Ireland",
                "value": 201
            }, {
                "country": "Germany",
                "value": 65
            }, {
                "country": "Australia",
                "value": 39
            }, {
                "country": "UK",
                "value": 19
            }, {
                "country": "Latvia",
                "value": 10
            }],

            "marginTop" : -180,
            "valueField": "score",
            "titleField": "name",
            "outlineAlpha": 0.4,
            "depth3D": 15,
            "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
            "angle": 30,
            "startEffect": 'easeOutSine',
            "startDuration" : 0.6
        };
        function drawChart(entities) {
            chartConfig.dataProvider = entities;
            var chart = AmCharts.makeChart("chartdiv",chartConfig ,0);
            chart.addListener('drawn', function(event) {
                removeLabel();
            });
        }
        return {
            drawChart: drawChart
        }
    }]);