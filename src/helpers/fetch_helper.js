import { API_URL } from "../config";

const fetchApi = async (
  url,
  method,
  data,
  headers = { "Content-Type": "application/json" },
  credentials
) => {
  const requestUrl = API_URL + url;

  const fetchOptions = {
    method,
    headers: {
      ...headers,
    },
    body:
      data instanceof FormData ? data : data ? JSON.stringify(data) : undefined,
    credentials,
  };

  if (data instanceof FormData) {
    fetchOptions.headers["Content-Type"] = "multipart/form-data";
  }

  return fetch(requestUrl, fetchOptions)
    .then((response) => {
      if (!response.ok) {
        return response.json();
      }
      return response.json();
    })
    .catch((error) => {
      if (error.status === 401) {
        if (window.location.pathname !== "/login") {
          window.location.reload("/login");
        }
      }
      throw error;
    });
};

export async function get(url, headers, credentials = "include") {
  return await fetchApi(url, "GET", undefined, headers, credentials);
}

export async function post(url, data, headers, credentials = "include") {
  return fetchApi(url, "POST", data, headers, credentials);
}

export async function put(url, data, headers, credentials = "include") {
  return fetchApi(url, "PUT", data, headers, credentials);
}

export async function del(url, headers, credentials = "include") {
  return await fetchApi(url, "DELETE", undefined, headers, credentials);
}
