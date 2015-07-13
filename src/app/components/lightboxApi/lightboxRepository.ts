import {LightboxApi} from './lightboxApi.service';
    'use strict';

    export interface IApiParams {
        from: string;
        to: string;
        limit?: number;
        offset?: number;
        include?: string;
    }


    export class LightboxRepository {
        protected restangular: LightboxApi;
        protected route: string;

        /** @ngInject */
        constructor(LightboxApi: LightboxApi, route: string) {

            this.restangular = LightboxApi.getApi();
            this.route = route;

        }

        public validateParams( apiParams: any) {
            var params: IApiParams = <any> {};
            return apiParams;
        }

        public getList(params?: any): restangular.ICollectionPromise<any> {
            return (<any>this.restangular).all(this.route).getList(params);
        }

        public get(id?: number): restangular.IPromise<any> {
            return (<any>this.restangular).one(this.route, id).get();
        }

        public put(updatedResource: any): restangular.IPromise<any> {
            return updatedResource.put().$object;
        }

        public update(updatedResource: any): restangular.IPromise<any> {
            return updatedResource.put().$object;
        }

        public create(newResource: any): restangular.IPromise<any> {
            if (newResource.originalElement !== undefined) {
                delete newResource.originalElement;
            }
            return (<any>this.restangular).all(this.route).post(newResource);
        }

        public remove(object: any): restangular.IPromise<any> {
            return (<any>this.restangular).one(this.route, object.id).remove();
        }
    }


