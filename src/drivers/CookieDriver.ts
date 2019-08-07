import { inject, injectable } from "inversify";
import AuthDriverInterface from "./AuthDriverInterface";
import CookieInterface from "varie/lib/cookies/CookieInterface";
import StateServiceInterface from "varie/lib/state/StateServiceInterface";
import HttpResponseInterface from "varie/lib/http/interfaces/HttpResponseInterface";
import HttpRequestConfigInterface from "./../interfaces/HttpRequestConfigInterface";

@injectable()
export default class CookieDriver implements AuthDriverInterface {
  protected $store;
  protected authService;
  protected cookieService;

  constructor(
    @inject("AuthService") authService,
    @inject("StateService") stateService: StateServiceInterface,
    @inject("CookieService") cookieService: CookieInterface
  ) {
    this.authService = authService;
    this.cookieService = cookieService;
    this.$store = stateService.getStore();
  }

  public async loginResponse(response: HttpResponseInterface) {
    return await this.$store.dispatch("auth/getUser");
  }

  public async logoutResponse(response: HttpResponseInterface) {
    return;
  }

  public async registerResponse(response: HttpResponseInterface) {
    if (
      this.authService.getGuardConfig(
        "loginAfterRegister",
        this.authService.getGuardFromResponse(response)
      )
    ) {
      return await this.$store.dispatch("auth/getUser");
    }
  }

  public async resetPasswordResponse(response: HttpResponseInterface) {
    if (
      this.authService.getGuardConfig(
        "loginAfterReset",
        this.authService.getGuardFromResponse(response)
      )
    ) {
      return await this.$store.dispatch("auth/getUser");
    }
  }

  public async isLoggedIn(guard: string): Promise<boolean> {
    if (this.$store.getters["auth/user"](guard)) {
      return true;
    }

    let cookieName = this.authService.getGuardConfig("cookie.name", guard);
    if (!cookieName || this.cookieService.get(cookieName)) {
      return this.$store
        .dispatch("auth/getUser")
        .then(() => true)
        .catch(() => false);
    }
    return false;
  }

  public async middlewareRequest(config: HttpRequestConfigInterface) {
    return config;
  }

  public async middlewareResponse(response: HttpResponseInterface) {
    return response;
  }
}
