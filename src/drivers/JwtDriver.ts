import { inject, injectable } from "inversify";
import AuthDriverInterface from "./AuthDriverInterface";
import JwtTokenInterface from "../interfaces/JwtTokenInterface";
import StateServiceInterface from "varie/lib/state/StateServiceInterface";
import StorageServiceInterface from "varie/lib/storage/StorageServiceInterface";
import HttpResponseInterface from "varie/lib/http/interfaces/HttpResponseInterface";
import HttpRequestConfigInterface from "./../interfaces/HttpRequestConfigInterface";
import HttpErrorInterface from "varie/lib/http/interfaces/HttpErrorInterface";

@injectable()
export default class JwtDriver implements AuthDriverInterface {
  protected $store;
  protected authService;
  protected storageService;

  constructor(
    @inject("AuthService") authService,
    @inject("StateService") stateService: StateServiceInterface,
    @inject("StorageService") storageService: StorageServiceInterface,
  ) {
    this.authService = authService;
    this.storageService = storageService;
    this.$store = stateService.getStore();
  }

  public async loginResponse(response: HttpResponseInterface) {
    this.setAuthToken(response);
    return await this.$store.dispatch("auth/getUser");
  }

  public async logoutResponse(response: HttpResponseInterface) {
    this.clearStorage(this.authService.getGuardFromResponse(response));
  }

  public async refreshResponse(response: HttpResponseInterface): Promise<void> {
    this.setAuthToken(response);
  }

  public async registerResponse(response: HttpResponseInterface) {
    if (
      this.authService.getGuardConfig(
        "loginAfterRegister",
        this.authService.getGuardFromResponse(response),
      )
    ) {
      this.setAuthToken(response);
      return await this.$store.dispatch("auth/getUser");
    }
  }

  public async resetPasswordResponse(response: HttpResponseInterface) {
    if (
      this.authService.getGuardConfig(
        "loginAfterReset",
        this.authService.getGuardFromResponse(response),
      )
    ) {
      this.setAuthToken(response);
      return await this.$store.dispatch("auth/getUser");
    }
  }

  public refreshData(guard: string) {
    let token = this.getAuthToken(guard);
    if (token && token.refresh_token) {
      return {
        refresh_token: token.refresh_token,
      };
    }
    return {};
  }

  public async isLoggedIn(guard: string) {
    if (this.$store.getters["auth/user"](guard)) {
      return true;
    }

    if (this.getAuthToken(guard)) {
      return await this.$store.dispatch("auth/getUser").then(
        () => {
          return true;
        },
        (error: HttpErrorInterface) => {
          return false;
        },
      );
    }
    return false;
  }

  public async middlewareRequest(config: HttpRequestConfigInterface) {
    let guard = config.guard || this.authService.getDefaultGuard();
    let token = this.getAuthToken(guard);
    if (token) {
      this.setTokenInHeader(token, config);
      if (
        config.url &&
        !config.url.includes(
          this.authService.getGuardConfig("endpoints.refresh", guard),
        ) &&
        token.expires_at <= new Date().getTime()
      ) {
        await this.authService.refresh(guard).then(
          () => {
            token = this.getAuthToken(guard);
            if (token) {
              this.setTokenInHeader(token, config);
            }
          },
          () => {
            if (
              config.headers &&
              config.headers.common &&
              config.headers.common.Authorization
            ) {
              delete config.headers.common.Authorization;
            }
            this.clearStorage(guard);
          },
        );
      }
    }
    return config;
  }

  public async middlewareResponse(response: HttpResponseInterface) {
    return response;
  }

  public clearStorage(guard: string): void {
    this.storageService.remove(this.getStoragePath(guard));
  }

  protected setTokenInHeader(
    token: JwtTokenInterface,
    config: HttpRequestConfigInterface,
  ) {
    config.headers.common.Authorization = `${token.token_type} ${token.access_token}`;
    return config;
  }

  protected getAuthToken(guard: string): JwtTokenInterface | null {
    let token = this.storageService.get(this.getStoragePath(guard));
    try {
      return JSON.parse(token);
    } catch (e) {
      this.clearStorage(guard);
      return null;
    }
  }

  protected setAuthToken(response: HttpResponseInterface): void {
    let guard = this.authService.getGuardFromResponse(response);
    let token = this.authService.getGuardConfig("token", guard);
    this.storageService.set(
      this.getStoragePath(guard),
      JSON.stringify({
        access_token: response.data[token.accessToken],
        token_type: response.data[token.tokenTypeName],
        expires_at:
          new Date().getTime() + 1000 * response.data[token.expiresIn],
      }),
    );
  }

  protected getStoragePath(guard?: string) {
    return this.authService.getGuardConfig("token.storagePath", guard);
  }
}
