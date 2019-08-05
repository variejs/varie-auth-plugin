import VarieHttpRequestConfigInterface from "varie/lib/http/interfaces/HttpRequestConfigInterface";

export default interface HttpRequestConfigInterface
  extends VarieHttpRequestConfigInterface {
  guard?: string | undefined;
}
