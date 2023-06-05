export default interface RouteDefinition {
    path: string;
    method: 'get' | 'post' | 'put' | 'patch' | 'delete';
    methodName: string;
}
