// authHelpers.js

export const getBearerToken = async () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken ? Promise.resolve(accessToken) : Promise.resolve(null);
};

export const getRefreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  return refreshToken ? Promise.resolve(refreshToken) : Promise.reject("Token Not Found");
};

export const setNewBearerToken = (newToken) => {
  if (newToken) {
    localStorage.setItem("accessToken", newToken);
    return Promise.resolve();
  } else {
    return Promise.reject();
  }
};

export const setNewUser = (newUser) => {
  if (newUser) {
    localStorage.setItem("user", JSON.stringify(newUser));
    const { countryCode } = newUser;
    localStorage.setItem("countryCode", +countryCode.replace("+", ""));
    return Promise.resolve();
  } else {
    return Promise.reject();
  }
};

export const setSuperAdmin = (status) => {
  localStorage.setItem("isSuperAdmin", status ? "true" : "false");
  return Promise.resolve();
};

// New function to remove tokens
export const removeTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  return Promise.resolve();
};
