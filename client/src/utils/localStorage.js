const getLS = (key) => {
  try {
    return localStorage.getItem(key) || sessionStorage.getItem(key);
  } catch (e) {
    return null;
  }
};

const storeLS = (key, value, inLocal) => {
  try {
    if (inLocal) return localStorage.setItem(key, value);
    return sessionStorage.setItem(key, value);
  } catch (e) {
    return null;
  }
};

const clearLS = () => {
  try {
    sessionStorage.clear();
    return localStorage.clear();
  } catch (e) {
    return null;
  }
};

const removeLS = (key) => {
  try {
    if (key in localStorage) localStorage.removeItem(key);
    if (key in sessionStorage) sessionStorage.removeItem(key);
    return;
  } catch (e) {
    return null;
  }
};

const existsLS = (key) => {
  return key in localStorage || key in sessionStorage;
};

export { getLS, storeLS, removeLS, clearLS, existsLS };
