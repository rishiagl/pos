import { callExternalApi, callExternalApiWithBody } from "./external-api";

const apiServerUrl = import.meta.env.VITE_REST_API_SERVER_URL;

export const getProduct = async(accessToken) => {
  const config = {
    url: `${apiServerUrl}/product`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return await callExternalApi(config);
  }

export const addNewProduct = async(accessToken, Product_user) => {
  const config = {
    url: `${apiServerUrl}/product`,
    method: "POST",
    body: JSON.stringify(Product_user),
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return await callExternalApiWithBody(config);
}
