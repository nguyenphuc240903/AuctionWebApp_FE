(function ($) {
    'use strict'; $(function () {
        Chart.defaults.global.legend.labels.usePointStyle = true; if ($("#visit-sale-chart").length) {
            Chart.defaults.global.legend.labels.usePointStyle = true; var ctx = document.getElementById('visit-sale-chart').getContext("2d"); var gradientStrokeViolet = ctx.createLinearGradient(0, 0, 0, 90); gradientStrokeViolet.addColorStop(0, 'rgba(59, 118, 239)'); gradientStrokeViolet.addColorStop(1, 'rgba(59, 118, 239)'); var gradientLegendViolet = 'rgba(59, 118, 239)'; var myChart = new Chart(ctx, {
                type: 'bar', data: { labels: ['2019 Q1', '2019 Q2', '2019 Q3', '2019 Q4', '2019 Q5', '2019 Q6'], datasets: [{ label: "Paid", borderColor: gradientStrokeViolet, backgroundColor: gradientStrokeViolet, hoverBackgroundColor: gradientStrokeViolet, legendColor: gradientLegendViolet, pointRadius: 0, fill: false, borderWidth: 2, fill: 'origin', data: [20, 40, 15, 35, 25, 50, 30, 20, 90, 10, 11, 12] },] }, options: {
                    responsive: true, legend: false, legendCallback: function (chart) {
                        var text = []; text.push('<ul>'); for (var i = 0; i < chart.data.datasets.length; i++) {
                            text.push('<li><span class="legend-dots" style="background:' +
                                chart.data.datasets[i].legendColor +
                                '"></span>'); if (chart.data.datasets[i].label) { text.push(chart.data.datasets[i].label); }
                            text.push('</li>');
                        }
                        text.push('</ul>'); return text.join('');
                    }, scales: { yAxes: [{ ticks: { beginAtZero: true }, gridLines: { drawBorder: false, color: 'rgba(235,237,242,1)', zeroLineColor: 'rgba(235,237,242,1)' } }], xAxes: [{ barPercentage: 0.6 }] }
                }, elements: { point: { radius: 0 } }
            })
            $("#visit-sale-chart-legend").html(myChart.generateLegend());
        }
    }); $(function () {
        Chart.defaults.global.legend.labels.usePointStyle = true; if ($("#visit-sale-chart2").length) {
            Chart.defaults.global.legend.labels.usePointStyle = true; var ctx = document.getElementById('visit-sale-chart2').getContext("2d"); var gradientStrokeViolet = ctx.createLinearGradient(0, 0, 0, 90); gradientStrokeViolet.addColorStop(0, '#A66DD4'); gradientStrokeViolet.addColorStop(1, '#A66DD4'); var gradientLegendViolet = '#A66DD4'; var myChart = new Chart(ctx, {
                type: 'bar', data: { labels: ['2019 Q1', '2019 Q2', '2019 Q3', '2019 Q4', '2019 Q5', '2019 Q6'], datasets: [{ label: "Paid", borderColor: gradientStrokeViolet, backgroundColor: gradientStrokeViolet, hoverBackgroundColor: gradientStrokeViolet, legendColor: gradientLegendViolet, pointRadius: 0, fill: false, borderWidth: 2, fill: 'origin', data: [20, 40, 15, 35, 25, 50, 30, 20, 90, 10, 11, 12] },] }, options: {
                    responsive: true, legend: false, legendCallback: function (chart) {
                        var text = []; text.push('<ul>'); for (var i = 0; i < chart.data.datasets.length; i++) {
                            text.push('<li><span class="legend-dots" style="background:' +
                                chart.data.datasets[i].legendColor +
                                '"></span>'); if (chart.data.datasets[i].label) { text.push(chart.data.datasets[i].label); }
                            text.push('</li>');
                        }
                        text.push('</ul>'); return text.join('');
                    }, scales: { yAxes: [{ ticks: { beginAtZero: true }, gridLines: { drawBorder: false, color: 'rgba(235,237,242,1)', zeroLineColor: 'rgba(235,237,242,1)' } }], xAxes: [{ barPercentage: 0.6 }] }
                }, elements: { point: { radius: 0 } }
            })
            $("#visit-sale-chart2-legend").html(myChart.generateLegend());
        }
    });
})(jQuery);