import { RouteDataHolder, RouteHandler } from 'src/common/types/route';

const routes: RouteDataHolder[] = [];

export function Get(routeName: string): RouteHandler {
    return (routeClass) =>
        addRoute({ routeClass, routeName, routeType: 'get' });
}

function addRoute(routeData: RouteDataHolder): void {
    const { routeName } = routeData;
    const doesRouteExist = !!routes.find((r) => r.routeName === routeName);

    !doesRouteExist && routes.push(routeData);
}
