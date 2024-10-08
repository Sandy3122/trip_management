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
// export const refreshTokenInterceptor = (axiosInstance, baseURL) => {
//   console.log('Inside refreshTokenInterceptor - axiosInstance: ', axiosInstance, ' baseURL: ', baseURL);  // Check if the interceptor is being reached
  
//   axiosInstance.interceptors.response.use(
//     (response) => {
//       console.log('Response received: ', response);  // Log the response to confirm the interceptor is applied
//       return response;
//     },
//     async (error) => {
//       console.log('Interceptor caught an error: ', error);  // Log any error caught
      
//       const originalRequest = error.config;

//       // If access token expired (401 error) and it has not been retried yet
//       if (error.response?.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;

//         // Retrieve the refresh token
//         const refreshToken = await getRefreshToken();
//         console.log('refreshToken: ', refreshToken);  // Check if refresh token is correctly retrieved

//         if (refreshToken) {
//           try {
//             const url =`${baseURL}/auth/refresh-token`;
//             console.log('urlurlurlurl: ', url)
//             const apiRes = await axios.post(url, { refreshToken });
//             console.log('Response from refresh-token: ', apiRes);

//             // Store the new access token
//             await setNewBearerToken(apiRes.data.accessToken);

//             // Retry the original request with the new access token
//             originalRequest.headers["Authorization"] = `Bearer ${apiRes.data.accessToken}`;
//             return axios(originalRequest);
//           } catch (tokenRefreshError) {
//             console.error('Error refreshing token: ', tokenRefreshError);
//             removeTokens();  // Clear tokens if refresh fails
//             return Promise.reject(tokenRefreshError);  // Reject the request
//           }
//         }
//       }
//       return Promise.reject(error);
//     }
//   );
//   return axiosInstance;
// };



export const refreshTokenInterceptor = (axiosInstance, baseURL) => {
  axiosInstance.interceptors.response.use(
    (response) => {
      // console.log('Response received: ', response);  // Log the response to confirm the interceptor is applied
      return response;
    },
    async (error) => {
      // console.log('Interceptor caught an error: ', error);

      const originalRequest = error.config;

      // If access token expired (401 error) and it has not been retried yet
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        // Retrieve the refresh token
        const refreshToken = await getRefreshToken();

        if (refreshToken) {
          try {
            const url =`${baseURL}/auth/refresh-token`;
            console.log('url: ', url);
            const apiRes = await axios.post(url, { refreshToken });

            // Store the new access token
            await setNewBearerToken(apiRes.data.accessToken);

            // Retry the original request with the new access token
            const newRequestConfig = {
              ...originalRequest,
              headers: {
                ...originalRequest.headers,
                Authorization: `Bearer ${apiRes.data.accessToken}`
              }
            };

            // Retry the original request
            return axios(newRequestConfig);
          } catch (tokenRefreshError) {
            console.error('Error refreshing token: ', tokenRefreshError);
            removeTokens();  // Clear tokens if refresh fails
            return Promise.reject(tokenRefreshError);  // Reject the request
          }
        }
      }

      // If the error is not related to an expired token, reject it
      return Promise.reject(error);
    }
  );
  return axiosInstance;
};
