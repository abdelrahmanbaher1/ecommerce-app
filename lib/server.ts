import { headers } from "next/headers";
import { API_BASE_URL } from "./helpers/constants";

// export async function getData<T>(
//   url: string,
//   service: string,
//   id?: string,
//   customHeaders?: any
// ): Promise<T | TError> {
//   const headersInstance = headers();
//   const allHeaders = headersInstance.get("cookie");

//   const response = await fetch(`${API_BASE_URL}{service}`, {
//     method: "GET",
//     headers: {
//       "x-guest": "error",
//       "Content-Type": "application/json",
//       Cookie: allHeaders as string,
//       ...customHeaders,
//     },
//   });
//   const data: Promise<T | TError | TAuthError> = await response.json();

//   if (response.status === 401 || response.statusText === "Unauthorized") {
//     redirect(
//       `https://auth.${appDomain}.team/public/login?next=https://fms.sc.${appDomain}.team/`
//     );
//   }

//   if (checkForErrorType("code", data) && checkForErrorType("error", data)) {
//     return (await data) as TError;
//   }

//   return (await data) as T;
// }
// const getNavigationData = async (
//   xLocale: TLocaleAPI,
//   xContent: "mobile" | "desktop"
// ): Promise<NavDepartmentsResponse | { error: string; status: number }> => {
//   try {
//     const t0 = performance.now();
//     const res = await fetch(`${baseUrl}/v5/navigation-categories`, {
//       method: "GET",
//       cache: "no-store",
//       headers: {
//         "x-locale": xLocale,
//         "x-content": xContent,
//         Cookie: decodeURIComponent(cookies().toString()),
//         ...getCommonHeaders(),
//         ...getGeoLocHeaders(),
//       },
//     });
//     const t1 = performance.now();

//     if (t1 - t0 > 500) {
//       console.warn(`⏱ nav data fetched in ${Math.round(t1 - t0)}ms`);
//     }

//     if (res.status === 200) {
//       return await res.json();
//     }

//     console.error(`📮 API Error ${res.status}`, res);

//     return { error: "Something went wrong", status: res.status };
//   } catch (error) {
//     console.error("Navigation Data Error", error);
//     return { error: "Something went wrong on SSR", status: 500 };
//   }
// };
