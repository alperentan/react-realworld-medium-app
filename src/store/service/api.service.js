const API_ROOT = "https://api.realworld.io/api";

const fetchnoAuthnoCred = (apiMethod, API_URL) => {
  return fetch(API_ROOT + API_URL, {
    method: apiMethod,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => ({ response, error: null }))
    .catch((error) => ({ response: null, error }))
    .then((response) => response);
};

const fetchwithAuthnoCred = (apiMethod, API_URL, token) => {
  return fetch(API_ROOT + API_URL, {
    method: apiMethod,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  })
    .then((response) => response.json())
    .then((response) => ({ response, error: null }))
    .catch((error) => ({ response: null, error }))
    .then((response) => response);
};

const fetchnoAuthwithCred = (apiMethod, API_URL, credentials) => {
  return fetch(API_ROOT + API_URL, {
    method: apiMethod,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then((response) => response.json())
    .then((response) => ({ response, error: null }))
    .catch((error) => ({ response: null, error }))
    .then((response) => response);
};

const fetchwithAuthwithCred = (apiMethod, API_URL, credentials, token) => {
  return fetch(API_ROOT + API_URL, {
    method: apiMethod,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(credentials),
  })
    .then((response) => response.json())
    .then((response) => ({ response, error: null }))
    .catch((error) => ({ response: null, error }))
    .then((response) => response);
};

export {
  fetchnoAuthnoCred,
  fetchwithAuthnoCred,
  fetchnoAuthwithCred,
  fetchwithAuthwithCred,
};
