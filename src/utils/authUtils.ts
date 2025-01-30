import Cookies from "js-cookie"
export function getAuthenticatedUser() {
  const authToken = localStorage.getItem("authToken");
  // const authToken = Cookies.get("authToken");
  let parsedToken
  authToken ? parsedToken = JSON.parse(authToken) : parsedToken = null;
  const user = parsedToken?.user;

  return {user, parsedToken, isAuthenticated: !!user};
}