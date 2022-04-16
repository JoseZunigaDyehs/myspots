import axios from "axios";
import { URL_API } from "@env";

const http = axios.create({
  baseURL: URL_API,
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});
