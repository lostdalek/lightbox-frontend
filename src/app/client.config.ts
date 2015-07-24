
'use strict';

export function getClientConfig() {
    return {
        pagination: {
            defaultPage: 1,
            limit: 25
        },
        chartjs: {
            colours: [{ // grey
                fillColor: 'rgba(96,143,191,0.2)',
                strokeColor: 'rgba(96,143,191,1)',
                pointColor: 'rgba(96,143,191,1)',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(148,159,177,0.8)'
            },
                { // dark grey
                    fillColor: 'rgba(77,83,96,0.2)',
                    strokeColor: 'rgba(77,83,96,1)',
                    pointColor: 'rgba(77,83,96,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(77,83,96,1)'
                }]
        }
    };
}

