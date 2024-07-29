import { API_BASE_URL } from "@/lib/helpers/constants";
import { TNavDepartment } from "@/lib/types";
import { headers } from "next/headers";

export async function getNavigationData(
  customHeaders?: any
): Promise<TNavDepartment[]> {
  const headersInstance = headers();
  const allHeaders = headersInstance.get("cookie");

  const response = await fetch(`${API_BASE_URL}categories`, {
    method: "GET",
    headers: {
      "x-guest": "error",
      "Content-Type": "application/json",
      Cookie: allHeaders as string,
      ...customHeaders,
    },
  });
  const data: Promise<TNavDepartment[]> = await response.json();

  return (await data) as TNavDepartment[];
}
