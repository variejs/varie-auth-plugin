import { injectable, inject } from "inversify";
import AuthServiceInterface from "./AuthServiceInterface";
import ConfigInterface from "varie/lib/config/ConfigInterface";
import AuthDriverInterface from "./drivers/AuthDriverInterface";
import HttpServiceInterface from "./interfaces/HttpServiceInterface";
import HttpResponseInterface from "./interfaces/HttpResponseInterface";
import ApplicationInterface from "varie/lib/foundation/ApplicationInterface";

@injectable()
export default class AuthService implements AuthServiceInterface {
  protected app: ApplicationInterface;
  protected configService: ConfigInterface;
  protected httpService: HttpServiceInterface;

  constructor(
    @inject("app") app,
    @inject("ConfigService") configService: ConfigInterface,
    @inject("HttpService") httpService: HttpServiceInterface,
  ) {
    this.app = app;
    this.httpService = httpService;
    this.configService = configService;
  }

  public login(data: object, guard?: string): Promise<Response> {
    if (!guard) {
      guard = this.getDefaultGuard();
    }
    return this.httpService
      .post(this.getGuardConfig("endpoints.login", guard), data, {
        guard,
      })
      .then((response) => {
        return this.getDriver(guard).loginResponse(response);
      });
  }

  public logout(guard?: string) {
    if (!guard) {
      guard = this.getDefaultGuard();
    }
    return this.httpService
      .post(this.getGuardConfig("endpoints.logout", guard), {
        guard,
      })
      .then((response) => {
        return this.getDriver(guard).logoutResponse(response);
      });
  }

  public register(data: object, guard?: string) {
    if (!guard) {
      guard = this.getDefaultGuard();
    }
    return this.httpService
      .post(this.getGuardConfig("endpoints.register", guard), data, {
        guard,
      })
      .then((response) => {
        return this.getDriver(guard).registerResponse(response);
      });
  }

  public forgotPasswordRequest(data: object, guard?: string) {
    if (!guard) {
      guard = this.getDefaultGuard();
    }
    return this.httpService
      .post(this.getGuardConfig("endpoints.forgotPassword", guard), data, {
        guard,
      })
      .then((response) => {
        return response;
      });
  }

  public resetPassword(data: object, guard?: string) {
    if (!guard) {
      guard = this.getDefaultGuard();
    }
    return this.httpService
      .post(this.getGuardConfig("endpoints.resetPassword", guard), data, {
        guard,
      })
      .then((response) => {
        return this.getDriver(guard).resetPasswordResponse(response);
      });
  }

  public getUser(guard?: string) {
    if (!guard) {
      guard = this.getDefaultGuard();
    }
    return this.httpService.get(this.getGuardConfig("endpoints.user", guard), {
      guard,
    });
  }

  public async isLoggedIn(guard?: string) {
    if (!guard) {
      guard = this.getDefaultGuard();
    }
    return await this.getDriver(guard).isLoggedIn(guard);
  }

  public getDefaultGuard(): string {
    return this.configService.get("auth.defaults.guard");
  }

  public getGuardConfig(config: string, guard: string): any {
    return this.configService.get(
      `auth.guards.${guard || this.getDefaultGuard()}.${config}`,
    );
  }

  public getGuardFromResponse(response: HttpResponseInterface) {
    return response.config.guard || this.getDefaultGuard();
  }

  public getDriver(guard?: string): AuthDriverInterface {
    return this.app.make(
      this.getGuardConfig("driver", guard || this.getDefaultGuard()),
    );
  }
}
