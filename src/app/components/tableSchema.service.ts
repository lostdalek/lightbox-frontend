
/**
 * Configuration Service Provider
 */
module App.Components {
    'use strict';



    /**
     * return schema table specification
     */
    interface ISchemaTable {
        head: any;
        body: any;
        raw: any;
    }
    interface ISchemaConfig {
        displayableRows: any;
        schema: any;
        collection: any;
    }

    interface ITableSchemaService {
        setSchema(): any;
    }


    /*class InceptionRow{
        protected parent: any;

        setParent(obj){
            this.parent = obj;
        }
        getParent() {
            return this.parent;
        }
    }*/
    var InceptionRow = function() {
        var that = this;
        this.setParent = function(obj: any) {
            that.parent = obj;
        };
        this.getParent = function() {
            return that.parent;
        };
    };
    (<any>InceptionRow).prototype = Array.prototype;

    export class TableSchemaService implements ng.IServiceProvider {
        public collection = [];
        public sortState = {};
        public rowOrder = {};
        public tableSchema = {};
        public config = {
             sortable: false
        };
        public rowBlueprint = {
            sortable: true,
            options: {
                head: {
                    title: ''
                }
            }
        };

        /**
         * Set Table Schema
         * note: accessible in angular config phase
         *
         * @param schemaConfig
         * @returns {IConfig}
         */
        public setSchema(schemaConfig?: ISchemaConfig): ISchemaTable {

            this.rowOrder = schemaConfig.displayableRows;
            this.tableSchema = schemaConfig.schema;
            this.collection = schemaConfig.collection;

            return this._compileTableSchema(this.collection);
        }

        /**
         * Sort by Date an array of object
         * Key should represent a valid date
         * @param collection
         * @param key
         * @param order
         * @returns {any|LoDashArrayWrapper<any>|any[]}
         */
        public sortCollectionByDate(collection: any, key: string, order: number) {

            return collection.sort((a: any, b: any) => {
                // convert into timestamp
                var c = <number>parseInt( moment(a[key]).format('x'), 10);
                var d = <number>parseInt( moment(b[key]).format('x'), 10);

                if ( order === 1 ) {
                    return c - d;
                }
                return c + d;
            });
        }


        /**
         * Provider Factory function
         * Accessible once angular's config phase is complete
         * @returns {{getConfig: (function(any=): App.IConfig)}}
         */
        public $get(): ITableSchemaService {
            return {
                setSchema: (schemaConfig?: ISchemaConfig) => { return this.setSchema(schemaConfig); },
                sortCollectionByDate: (collection: any, key: string, order: number) => this.sortCollectionByDate(collection, key, order)
            };
        }

        private _compileTableSchema(collection: any): ISchemaTable {

            var compiledCol = this._compileCollection(collection);

            return {
                head: this._compileHeader(),
                body: compiledCol.body,
                raw: compiledCol.raw
            };
        }

        private _compileCollection(collection: any) {
            var tableBody = [], rawCollection = [];
            /**
             * Generate body informations
             */
            _.forEach(collection, (model: any, i: any) => {
                var tableSchema = _.assign({}, this.rowBlueprint, this.tableSchema);
                var sortedRow = new InceptionRow();
                var parentModel = {};
                var rowModels = {};

                /**
                 * Fetch value from matching model
                 */
                _.forEach(this.tableSchema, (schemaOptions: any, schemaName: string) => {
                    var matchedValue = null;
                    // if schema name match a key in the collection:
                    if ( model[schemaName] !== undefined ) {
                        matchedValue = model[schemaName];
                    } else {
                        // schema does not match any model key,
                        // if schema is composite:
                        if ( schemaOptions.type === 'composite') {
                            // init matched value as object:
                            matchedValue = {};
                            // then gather keys value pairs:
                            _.forEach(schemaOptions.matchKeys, (name: string) => {
                                // get model value:
                                matchedValue[name] = model[name];
                            });
                        }
                    }

                    tableSchema[schemaName].value = matchedValue;
                    rowModels[schemaName] =  parentModel[schemaName] = matchedValue;
                });

                // populate rawCollection:
                rawCollection.push(rowModels);


                /**
                 * Sort current row
                 */

                _.forEach(this.rowOrder, function(keyName: string){
                    (<any>sortedRow).push(tableSchema[keyName]);
                    sortedRow.setParent(parentModel);
                });
                tableBody.push(angular.copy(sortedRow));
            });

            return {
                body: tableBody,
                raw: rawCollection
            };
        }

        private _compileHeader() {
            var tableHead = [];
            /**
             * Generate header informations
             */
            _.forEach(this.rowOrder, (keyName: string) => {
                if (<any>this.tableSchema[keyName] !== undefined) {
                    var col = <any>_.merge({}, this.rowBlueprint, this.tableSchema[keyName]);

                    tableHead.push({
                        title: col.options.head.title,
                        key: keyName,
                        sortable: col.sortable,
                        sortKey: (col.sortKey !== undefined ? col.sortKey : keyName)
                    });
                } else {
                    tableHead.push(angular.copy(this.rowBlueprint));
                }
            });

            return tableHead;
        }
    }
    App.getModule()
    .provider('TableSchemaService', TableSchemaService);
}
