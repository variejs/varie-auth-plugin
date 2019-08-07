import HttpResponseInterface from "varie/lib/http/interfaces/HttpResponseInterface";
import HttpRequestConfigInterface from "varie/lib/http/interfaces/HttpRequestConfigInterface";

export default interface AuthDriverInterface {
  loginResponse(response: HttpResponseInterface): Promise<any>;
  logoutResponse(response: HttpResponseInterface): Promise<any>;
  isLoggedIn(guard: string): Promise<boolean>;
  refreshData?(guard: string): object;
  refreshResponse?(response: HttpResponseInterface): Promise<any>;
  registerResponse(response: HttpResponseInterface): Promise<any>;
  resetPasswordResponse(response: HttpResponseInterface): Promise<any>;
  middlewareRequest(
    config: HttpRequestConfigInterface,
  ): Promise<HttpRequestConfigInterface>;
  middlewareResponse(
    response: HttpResponseInterface,
  ): Promise<HttpResponseInterface>;
}
