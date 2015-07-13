import {FilterHelper} from './filterHelpers';
    'use strict';

    /*export interface IFilter {
     filter (input: any, ...args: any[]): any;
     }*/
    export class ByCastKey {
        /** @ngInject */
        public static Factory(moment: moment.MomentStatic) {
            /**
             * datatypes: string, integer
             */
            return function (value: any, dataType: any): string {

                // while data is loading, the value can be a promise:
                if (typeof value === 'object' || value === undefined) {
                    return '';
                }
                if ( dataType === 'date') {
                    return moment(value).format('DD-MM-YYYY');
                }
                if ( dataType === 'datetime') {
                    return moment(value).format('DD-MM-YYYY HH:mm:ss');
                }

                if (dataType === 'string') {
                    // try to see if there is decimals:
                    if (FilterHelper().isFloat(value)) {
                        value = FilterHelper().cleanupFloat(value, 2);
                        value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                    }
                    if (FilterHelper().isInt(value)) {
                        value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                    }
                    return value;
                }

                value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

                if (dataType === 'percent') {
                    return value + '%';
                }
                return value;

            };
        }
    }

    import {getModule} from '../../app.module';      getModule()
        .filter('byCastKey', ByCastKey.Factory);

