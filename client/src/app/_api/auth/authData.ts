import { TLoginSchema } from "@/app/_lib/validationSchemas";
import { jwtDecode } from "jwt-decode";

type UsernameType = {
  username: string;
};

type DecodedTokenType = {
  exp: number;
};

export async function login(data: TLoginSchema): Promise<UsernameType | null> {
  const res = await fetch("http://localhost:8080/auth/jwt/create/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    const responseData: UsernameType = await res.json();
    return responseData;
  } else {
    console.error("Login fehlgeschlagen:", res.statusText);
    return null;
  }
}

export async function rotateToken(): Promise<boolean> {
  const res = await fetch("http://localhost:8080/auth/jwt/refresh/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (res.ok) {
    return true;
  } else {
    console.error("Token-Erneuerung fehlgeschlagen:", res.statusText);
    return false;
  }
}

export function isTokenExpired(refreshToken: string): boolean {
  const decodedToken: DecodedTokenType = jwtDecode(refreshToken);

  if (!decodedToken.exp) {
    return true;
  }

  const expirationDate = new Date(decodedToken.exp * 1000);
  const currentDate = new Date();

  return expirationDate <= currentDate;
}
