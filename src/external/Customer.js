import { callExternalApi, callExternalApiWithBody } from "./external-api";

const apiServerUrl = import.meta.env.VITE_REST_API_SERVER_URL;

export const getCustomer = async(accessToken) => {
  const config = {
    url: `${apiServerUrl}/customer`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return await callExternalApi(config);
  }

export const addNewCustomer = async(accessToken, Customer_user) => {
  const config = {
    url: `${apiServerUrl}/customer`,
    method: "POST",
    body: JSON.stringify(Customer_user),
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return await callExternalApiWithBody(config);
}
