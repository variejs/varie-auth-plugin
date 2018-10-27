import AuthServiceInterface from "./AuthServiceInterface";
import ConfigInterface from "varie/lib/config/ConfigInterface";
import HttpServiceInterface from "varie/lib/http/HttpServiceInterface";
export default class AuthService implements AuthServiceInterface {
    private app;
    private configService;
    private httpService;
    constructor(app: any, configService: ConfigInterface, httpService: HttpServiceInterface);
    login(email: any, password: any): any;
    refresh(): any;
    logout(): any;
    register(name: any, email: any, password: any, confirmPassword: any): any;
    forgotPasswordRequest(email: any): any;
    resetPassword(token: any, email: any, password: any, confirmPassword: any): any;
    getUser(): any;
    isLoggedIn(): Promise<any>;
    getGuardConfig(config: any): any;
    private getDriver;
}
