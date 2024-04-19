import express from 'express';
import mainRouter from '../Web/Routes';

interface RouteInfo {
    Path: string;
    Method: string;
    Handler: string;
}

function cleanPath(regex: RegExp): string {
    const path = regex.toString().slice(1, -1);
    return '/' + path.replace(/^\/|\\|\$|\?|\(.*\)|\//g, "").replace(/^\/\^\//g, '/');
}

function listRoutes(router: express.Router, parentPath = '') {
    const routes: express.Router['stack'] = router.stack;
    let routeDetails: RouteInfo[] = [];

    for (let layer of routes) {
        if (layer.route) {
            const path = parentPath + (layer.route?.path || '');
            const methods = layer.route?.methods;
            const method = methods ? Object.keys(methods).filter(m => methods[m]).join(', ').toUpperCase() : 'N/A';
            const handler = layer.route.stack[0].handle.name;
            routeDetails.push({ Path: path, Method: method, Handler: handler});
        } else if (layer.name === 'router' && layer.handle.stack) {
            const subRouterPath = parentPath + cleanPath(layer.regexp);
            const subRoutes = listRoutes(layer.handle, subRouterPath);
            routeDetails = routeDetails.concat(subRoutes);
        }
    }

    if (parentPath === '') {
        console.table(routeDetails);
    }

    return routeDetails;
}

listRoutes(mainRouter);
