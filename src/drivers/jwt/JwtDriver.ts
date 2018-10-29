import { inject, injectable } from "inversify";
import StateServiceInterface from "varie/lib/state/StateServiceInterface";
import AuthDriverInterface from "../AuthDriverInterface";
import StorageServiceInterface from "varie/lib/storage/StorageServiceInterface";

@injectable()
export default class JwtDriver implements AuthDriverInterface {
  private $store;
  private authService;
  private configService;
  private storageService;

  // TEMP
  private storagePath;

  constructor(
    @inject("AuthService") authService,
    @inject("StateService") stateService: StateServiceInterface,
    @inject("StorageService") storageService: StorageServiceInterface
  ) {
    this.authService = authService;
    this.storageService = storageService;
    this.$store = stateService.getStore();
    this.storagePath = this.authService.getStoragePath();
  }

  public async loginResponse(response) {
    this.setAuthToken(response);
    return await this.$store.dispatch("auth/getUser");
  }

  public async logoutResponse(response) {
    this.removeAuthToken(this.authService.getGuardFromResponse(response));
  }

  public async refreshResponse(response) {
    this.setAuthToken(response);
  }

  public async registerResponse(response) {
    if (this.authService.getGuardConfig("loginAfterRegister")) {
      this.setAuthToken(response);
      return await this.$store.dispatch("auth/getUser");
    }
  }

  public async resetPasswordResponse(response) {
    if (this.authService.getGuardConfig("loginAfterReset")) {
      this.setAuthToken(response);
      return await this.$store.dispatch("auth/getUser");
    }
  }

  public async isLoggedIn(guard) {
    if (this.$store.getters["auth/user"](guard)) {
      return true;
    }

    if (this.storageService.get(`${this.storagePath}.${guard}`)) {
      return await this.$store.dispatch("auth/getUser").then(
        () => {
          return true;
        },
        () => {
          return false;
        }
      );
    }

    return false;
  }

  public async middlewareRequest(config) {
    let guard = config.guard || this.authService.getDefaultGuard();
    let token = JSON.parse(
      this.storageService.get(`${this.storagePath}.${guard}`)
    );
    if (token) {
      if (
        !config.url.includes(
          this.authService.getGuardConfig("endpoints.refresh")
        ) &&
        token.expires_at < new Date().getTime()
      ) {
        this.authService.refresh().then(
          () => {
            token = JSON.parse(this.storageService.get(this.storagePath));
            config.headers.common.Authorization = `${token.token_type} ${
              token.access_token
            }`;
            return config;
          },
          () => {
            this.removeAuthToken(guard);
            return config;
          }
        );
      } else {
        config.headers.common.Authorization = `${token.token_type} ${
          token.access_token
        }`;
        return config;
      }
    } else {
      return config;
    }
  }

  public async middlewareResponse(response) {
    return response;
  }

  private setAuthToken(response) {
    this.storageService.set(
      `${this.storagePath}.${this.authService.getGuardFromResponse(response)}`,
      JSON.stringify({
        access_token:
          response.data[this.authService.getGuardConfig("token.accessToken")],
        token_type:
          response.data[this.authService.getGuardConfig("token.tokenTypeName")],
        expires_at:
          new Date().getTime() +
          1000 *
            response.data[this.authService.getGuardConfig("token.expiresIn")]
      })
    );
  }

  private removeAuthToken(guard) {
    this.storageService.remove(`${this.storagePath}.${guard}`);
  }
}
