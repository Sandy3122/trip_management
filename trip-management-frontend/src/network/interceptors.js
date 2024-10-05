import axios from "axios";
import { getBearerToken, getRefreshToken, setNewBearerToken, removeTokens } from "./authHelpers";

// Bearer token interceptor
export const bearerTokenReqInterceptor = (axiosInstance) => {
  axiosInstance.interceptors.request.use(async (config) => {
    const token = await getBearerToken();
    config.headers["Accept-Language"] = "en";
    config.headers["Access-Control-Allow-Origin"] = "*";
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });
  return axiosInstance;
};

// Refresh token interceptor
export const refreshTokenInterceptor = (axiosInstance, baseURL) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // If access token expired (401 error) and it has not been retried yet
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        // Retrieve the refresh token
        const refreshToken = await getRefreshToken();

        // If refresh token is available, attempt to refresh access token
        if (refreshToken) {
          try {
            const apiRes = await axios.post(`${baseURL}/refresh-token`, { refreshToken });

            // Store the new access token
            await setNewBearerToken(apiRes.data.accessToken);

            // Retry the original request with the new access token
            originalRequest.headers["Authorization"] = `Bearer ${apiRes.data.accessToken}`;
            return axios(originalRequest);
          } catch (tokenRefreshError) {
            // Handle error in refreshing token, e.g., refresh token expired
            console.error("Error refreshing token", tokenRefreshError);
            removeTokens(); // Clear both access and refresh tokens
            return Promise.reject(tokenRefreshError); // User may need to log in again
          }
        }
      }
      return Promise.reject(error);
    }
  );
  return axiosInstance;
};
