import { inject, injectable } from "inversify";
import AxiosHttpMiddlewareInterface from "varie/lib/http/AxiosHttpMiddlewareInterface";

@injectable()
export default class AuthMiddleware implements AxiosHttpMiddlewareInterface {
  protected authService;

  constructor(@inject("AuthService") authService) {
    this.authService = authService;
  }

  public request(config) {
    return this.authService
      .getDriver(config.guard)
      .middlewareRequest(config)
      .then((config) => {
        return config;
      });
  }

  public response(response) {
    return this.authService
      .getDriver(response.config.guard)
      .middlewareResponse(response)
      .then((response) => {
        return response;
      });
  }

  public responseError(error) {
    return error;
  }
}
