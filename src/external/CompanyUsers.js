
import { callExternalApi, callExternalApiWithBody } from "./external-api";

const apiServerUrl = import.meta.env.VITE_REST_API_SERVER_URL;

export const getCompanyUsersByEmail = async(accessToken, email_id) => {
  const config = {
    url: `${apiServerUrl}/company-users/byEmail?user_email=${email_id}`,
    method: "GET",
    body: "",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const { data, error } = await callExternalApi(config);

  return {
    data: data,
    error: error,
  };
  }

export const addNewCompanyUsers = async(accessToken, company_user) => {
  const config = {
    url: `${apiServerUrl}/company-users`,
    method: "POST",
    body: company_user,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApiWithBody(config);

  return data
}
