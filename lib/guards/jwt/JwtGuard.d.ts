import ConfigInterface from "varie/lib/config/ConfigInterface";
import HttpServiceInterface from "varie/lib/http/HttpServiceInterface";
import StateServiceInterface from "varie/lib/state/StateServiceInterface";
import StorageServiceInterface from "varie/lib/storage/StorageServiceInterface";
export default class JwtGuard {
    private $store;
    private authService;
    private httpService;
    private configService;
    private storageService;
    protected tokenName: string;
    constructor(authService: any, configService: ConfigInterface, httpService: HttpServiceInterface, stateService: StateServiceInterface, storageService: StorageServiceInterface);
    loginResponse(response: any): Promise<any>;
    logoutResponse(response: any): Promise<void>;
    refreshResponse(response: any): Promise<void>;
    registerResponse(response: any): Promise<any>;
    forgotPasswordRequestResponse(response: any): Promise<void>;
    resetPasswordResponse(response: any): Promise<any>;
    isLoggedIn(): Promise<any>;
    private setAuthToken;
}
