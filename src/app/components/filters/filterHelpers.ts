
    'use strict';

    export function FilterHelper() {
        return {
            isInt: function (value: any) {
                if (isNaN(value)) {
                    return false;
                }
                var x = parseFloat(value);
                return (x | 0) === x;
            },
            isFloat: function (value: any) {
                return !isNaN(value) && value.toString().indexOf('.') !== -1;
            },
            cleanupFloat: function (value?: any, decimal?: any, round?: any, keepDigits?: any) {
                // console.log('called removeDigits',typeof value, decimal, round, keepDigits)
                if (value === undefined) {
                    return '';
                }
                if (typeof value !== 'string' && typeof value !== 'number') {
                    return '';
                }
                if (decimal === undefined) {
                    decimal = 2;
                }
                if (round === undefined) {
                    round = false;
                }

                if (round === true) {
                    var coef = Math.pow(10, decimal);
                    return Math.round(value * coef) / coef;
                } else {
                    try {
                        // get more decimal to avoid rounding:
                        value = parseFloat(value).toFixed(2);
                    } catch (e) {
                        console.log('toFixed didnt pass...', value, typeof value);
                    }
                    try {
                        value = value.toString().replace(/\.(\d\d)\d?$/, '.$1');
                    } catch (e) {
                        console.log('replace didnt pass...', value, typeof value);
                    }

                    // return value;
                    if (!keepDigits) {
                        var nParts = value.split('.');

                        if (parseInt(nParts[1], 10) === 0) {
                            return nParts[0];
                        }
                    }
                    return value;
                }
            }
        };
    }


