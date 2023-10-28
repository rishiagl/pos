import { callExternalApi, callExternalApiWithBody } from "./external-api";

const apiServerUrl = import.meta.env.VITE_REST_API_SERVER_URL;

export const addNewInvoice = async(accessToken, Invoice) => {
  const config = {
    url: `${apiServerUrl}/invoice`,
    method: "POST",
    body: JSON.stringify(Invoice),
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
  
  const { data, error } = await callExternalApiWithBody(config);

  return {
    data: data,
    error: error
  };
}
