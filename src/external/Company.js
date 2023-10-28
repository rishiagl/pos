import { callExternalApi, callExternalApiWithBody } from "./external-api";

const apiServerUrl = import.meta.env.VITE_REST_API_SERVER_URL;

export const getCompanyById = async(accessToken, id) => {
  const config = {
    url: `${apiServerUrl}/company/${id}`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi(config);

  return {
    data: data,
    error: error
  }
  }

export const addNewCompany = async(accessToken, company) => {
  const config = {
    url: `${apiServerUrl}/company`,
    method: "POST",
    body: JSON.stringify(company),
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
