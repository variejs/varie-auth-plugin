import { inject, injectable } from "inversify";
import HttpMiddlewareInterface from "varie/lib/http/interfaces/HttpMiddlewareInterface";

@injectable()
export default class AuthMiddleware implements HttpMiddlewareInterface {
  protected authService;

  constructor(@inject("AuthService") authService) {
    this.authService = authService;
  }

  public async request(config) {
    return await this.authService
      .getDriver(config.guard)
      .middlewareRequest(config)
      .then((config) => {
        return config;
      });
  }

  public async response(response) {
    return await this.authService
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
