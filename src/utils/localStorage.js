function setLocalStorage(key, payload) {
  localStorage.setItem(key, payload);
}

function getLocalStorage(key) {
  return localStorage.getItem(key);
}

function removeToken() {
  localStorage.removeItem("token");
}

export { setLocalStorage, getLocalStorage, removeToken };
