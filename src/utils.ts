import { headers } from "next/headers";
import "server-only";

export const getUrl = () => {
  const headerList = headers();
  const url = headerList.get("x-url");
  return url;
};
