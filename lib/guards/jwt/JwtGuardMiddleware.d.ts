import StorageServiceInterface from 'varie/lib/storage/StorageServiceInterface';
import AxiosHttpMiddlewareInterface from "varie/lib/http/AxiosHttpMiddlewareInterface";
export default class JwtGuardMiddleware implements AxiosHttpMiddlewareInterface {
    private authService;
    private storageService;
    constructor(authService: any, storageService: StorageServiceInterface);
    request(config: any): Promise<{}>;
    response(response: any): any;
    responseError(error: any): any;
}
