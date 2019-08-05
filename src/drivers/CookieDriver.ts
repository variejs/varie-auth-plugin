import { inject, injectable } from "inversify";
import AuthDriverInterface from "./AuthDriverInterface";
import ConfigInterface from "varie/lib/config/ConfigInterface";
import CookieInterface from 'varie/lib/cookies/CookieInterface';
import HttpServiceInterface from "varie/lib/http/HttpServiceInterface";
import StateServiceInterface from "varie/lib/state/StateServiceInterface";
import HttpResponseInterface from "varie/lib/http/interfaces/HttpResponseInterface";
import HttpRequestConfigInterface from "./../interfaces/HttpRequestConfigInterface";
import JwtTokenInterface from '../interfaces/JwtTokenInterface'

@injectable()
export default class CookieDriver implements AuthDriverInterface {
  protected $store;
  protected authService;
  protected httpService;
  protected storagePath;
  protected configService;
  protected cookieService;

  constructor(
    @inject("AuthService") authService,
    @inject("ConfigService") configService: ConfigInterface,
    @inject("HttpService") httpService: HttpServiceInterface,
    @inject("StateService") stateService: StateServiceInterface,
    @inject('CookieService') cookieService : CookieInterface
  ) {
    this.httpService = httpService;
    this.authService = authService;
    this.configService = configService;
    this.cookieService = cookieService;
    this.$store = stateService.getStore();
    this.storagePath = this.authService.getGuardConfig("storagePath");
  }

  public async loginResponse(response: HttpResponseInterface) {
    return await this.$store.dispatch("auth/getUser");
  }

  public async logoutResponse(response: HttpResponseInterface) {
    return;
  }

  public async registerResponse(response: HttpResponseInterface) {
    if (this.authService.getGuardConfig("loginAfterRegister")) {
      return await this.$store.dispatch("auth/getUser");
    }
  }

  public async resetPasswordResponse(response: HttpResponseInterface) {
    if (this.authService.getGuardConfig("loginAfterReset")) {
      return await this.$store.dispatch("auth/getUser");
    }
  }

  public async isLoggedIn() {
    if (this.$store.state.auth.user) {
      return true;
    }

    return await this.$store.dispatch("auth/getUser").then(
      () => {
        return true;
      },
      () => {
        return false;
      },
    );
  }

  public async middlewareRequest(config: HttpRequestConfigInterface) {
    return this.setTokenInHeader(this.cookieService.get('JWT'), config)
  }

  protected setTokenInHeader(
    token: JwtTokenInterface,
    config: HttpRequestConfigInterface,
  ) {
    console.info('WOO set it...', token)
    config.headers.common.Authorization = `Bearer ${token}`;
    return config;
  }

  public async middlewareResponse(response: HttpResponseInterface) {
    return response;
  }
}
