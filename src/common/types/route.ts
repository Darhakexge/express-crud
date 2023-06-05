import { RequestHandler } from 'express';

export interface Route {
    getEndpoints(): Endpoint[];
}

export type Endpoint = {
    url: string;
    callback: RequestHandler;
};

export type RouteClass = { new (): Route };

export type RouteType =
    | 'get'
    | 'post'
    | 'put'
    | 'delete'
    | 'patch'
    | 'options'
    | 'head';

export type RouteDataHolder = {
    routeName: string;
    routeClass: RouteClass;
    routeType: RouteType;
};

export type RouteHandler = (routeClass: RouteClass) => void;
