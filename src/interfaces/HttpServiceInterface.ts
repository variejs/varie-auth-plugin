import HttpRequestConfigInterface from "./HttpRequestConfigInterface";
import VarieHttpServiceInterface from "varie/lib/http/HttpServiceInterface";

export default interface HttpServiceInterface
  extends VarieHttpServiceInterface {
  get(url: string, config?: HttpRequestConfigInterface): any;
  put(url: string, data: object, config?: HttpRequestConfigInterface): any;
  post(url: string, data?: object, config?: HttpRequestConfigInterface): any;
  patch(url: string, data: object, config?: HttpRequestConfigInterface): any;
  delete(url: string, config?: HttpRequestConfigInterface): any;
  head(url: string, config?: HttpRequestConfigInterface): any;
  options(url: string, config?: HttpRequestConfigInterface): any;
  request(config?: HttpRequestConfigInterface): any;
}
