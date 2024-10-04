import { serverErrors } from "./constants";

// Success handler
export const successHandler = (response) => {
  return response.data.responseCode === 204 ? Promise.resolve({}) : Promise.resolve(response.data);
};

// Error handler
export const errorHandler = (error) => {
  let errorMessage = serverErrors.SERVER_ERROR;

  if (error.message === "Network Error") {
    errorMessage = "Network Error. Please check your connection.";
  }

  if (error.response?.status >= 500) {
    errorMessage = serverErrors.SERVER_ERROR;
  } else if (error.response?.status >= 400 && error.response?.status < 500) {
    errorMessage = error.response?.data?.errorMessage || serverErrors.CLIENT_ERROR;
  }

  return Promise.reject(errorMessage);
};
