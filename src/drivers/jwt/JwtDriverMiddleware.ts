import { inject, injectable } from "inversify";
import StorageServiceInterface from "varie/lib/storage/StorageServiceInterface";
import AxiosHttpMiddlewareInterface from "varie/lib/http/AxiosHttpMiddlewareInterface";

@injectable()
export default class JwtDriverMiddleware
  implements AxiosHttpMiddlewareInterface {
  private authService;
  private storageService;

  protected storagePath;

  constructor(
    @inject("AuthService") authService,
    @inject("StorageService") storageService: StorageServiceInterface
  ) {
    this.authService = authService;
    this.storageService = storageService;
    this.storagePath = this.authService.getGuardConfig("storagePath");
  }

  // @ts-ignore
  public request(config) {
    return new Promise(resolve => {
      let token = JSON.parse(this.storageService.get(this.storagePath));
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
              resolve(config);
            },
            () => {
              resolve(config);
            }
          );
        } else {
          config.headers.common.Authorization = `${token.token_type} ${
            token.access_token
          }`;
          resolve(config);
        }
      } else {
        resolve(config);
      }
    });
  }

  public response(response) {
    return response;
  }

  public responseError(error) {
    return error;
  }
}
