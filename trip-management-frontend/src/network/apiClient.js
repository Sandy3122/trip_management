import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { bearerTokenReqInterceptor, refreshTokenInterceptor } from "../network/interceptors";
import { successHandler, errorHandler } from "../network/responseHandlers";

// Function to get the Axios instance
const getAxiosInstance = (baseUrl) => {
  let axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 30000,
    headers: {
      "Trace-Id": uuidv4(),
      "Content-Type": "application/json",
      offset: -330
    }
  });

  console.log('baseURL: ', baseURL);
  // Add request and response interceptors
  axiosInstance = bearerTokenReqInterceptor(axiosInstance);
  axiosInstance = refreshTokenInterceptor(axiosInstance, baseUrl);
  return axiosInstance;
};

// Main ApiClient class
class ApiClient {
  constructor(baseUrl) {
    this.client = getAxiosInstance(baseUrl);
  }

  // Main request method to handle all HTTP methods
  async request(config) {
    try {
      const response = await this.client.request(config);
      const handledResponse = await successHandler(response);
      return handledResponse;
    } catch (error) {
      const handledError = await errorHandler(error);
      throw handledError;
    }
  }

  // Different HTTP methods
  async get(url, params = {}) {
    return this.request({ method: "GET", url, params  });
  }

  async put(url, data = {}, params = {}) {
    return this.request({ method: "PUT", url, data, params });
  }

  async post(url, data = {}, params = {}) {
    console.log('datadata: ', data)
    return this.request({ method: "POST", url, data, params });
  }

  async delete(url, data = {}, params = {}) {
    return this.request({ method: "DELETE", url, data, params });
  }

  async patch(url, data = {}, params = {}) {
    return this.request({ method: "PATCH", url, data, params });
  }
}

// Base URL from environment variables or configuration
const baseURL = process.env.REACT_APP_API_BASE_URL;
const apiClient = new ApiClient(baseURL);
export { apiClient as ApiClient };
