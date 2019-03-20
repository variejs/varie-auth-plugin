import { inject, injectable } from "inversify";
import AuthDriverInterface from "./AuthDriverInterface";
import ConfigInterface from "varie/lib/config/ConfigInterface";
import HttpServiceInterface from "varie/lib/http/HttpServiceInterface";
import StateServiceInterface from "varie/lib/state/StateServiceInterface";

@injectable()
export default class CookieDriver implements AuthDriverInterface {
  protected $store;
  protected authService;
  protected httpService;
  protected configService;

  protected storagePath;

  constructor(
    @inject("AuthService") authService,
    @inject("ConfigService") configService: ConfigInterface,
    @inject("HttpService") httpService: HttpServiceInterface,
    @inject("StateService") stateService: StateServiceInterface,
  ) {
    this.httpService = httpService;
    this.authService = authService;
    this.configService = configService;
    this.$store = stateService.getStore();
    this.storagePath = this.authService.getGuardConfig("storagePath");
  }

  public async loginResponse(response) {
    return await this.$store.dispatch("auth/getUser");
  }

  public async logoutResponse(response) {
    return;
  }

  public async registerResponse(response) {
    if (this.authService.getGuardConfig("loginAfterRegister")) {
      return await this.$store.dispatch("auth/getUser");
    }
  }

  public async resetPasswordResponse(response) {
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

  public async middlewareRequest(config) {
    return config;
  }

  public async middlewareResponse(response) {
    return response;
  }
}
