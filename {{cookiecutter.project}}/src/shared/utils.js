import axios from "axios";
import Cookies from "js-cookie";

export function isAuthenticated() {
  const token = Cookies.get("{{cookiecutter.project|lower|replace(' ', '-')}}-token");
  if (token)
    return true;

  return false;
}

export function getPermission() {
  return Cookies.get("{{cookiecutter.project|lower|replace(' ', '-')}}-permission");
}

export function hasPermission(requiredPermissions, userPermissions) {
  if (!requiredPermissions) return true;
  if (userPermissions.indexOf("ADMIN") !== -1) return true;

  const allowedPermissions = new Set(requiredPermissions.filter(item => userPermissions.includes(item)));
  return allowedPermissions.size > 0;
}

export function populateZipCode(zipCode) {
  let url = `https://viacep.com.br/ws/${zipCode}/json/`;
  return axios.get(url);
}

export function formatError(error) {
  try {
    let errorObj = error.networkError.result.error;
    console.log({ message: errorObj.message, cause: errorObj.cause });
    return errorObj.message;
  } catch (e) {
    console.error(e);
    return "Erro de conexão com o servidor!";
  }
}
