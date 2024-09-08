import { jwtDecode } from "jwt-decode";

export function isTokenExpired(refreshToken: string): boolean {
  const decodedToken: { exp: number } = jwtDecode(refreshToken);

  if (!decodedToken.exp) {
    return true;
  }

  const expirationDate = new Date(decodedToken.exp * 1000);
  const currentDate = new Date();

  return expirationDate <= currentDate;
}
