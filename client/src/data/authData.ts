import { TLoginSchema } from "@/lib/validationSchemas/LoginSchema";
import { TPasswordResetConfirmSchema } from "@/lib/validationSchemas/PasswordResetConfirmSchema";
import { TPasswordResetRequestSchema } from "@/lib/validationSchemas/PasswordResetRequestSchema";
import { TRegisterUserSchema } from "@/lib/validationSchemas/RegisterSchema";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

type UsernameType = {
  username: string;
};

type DecodedTokenType = {
  exp: number;
};

type UserDoesNotExist = {
  non_field_errors: Array<string>;
  detail: string;
};

export async function login(data: TLoginSchema): Promise<UsernameType | null> {
  try {
    const res = await fetch("http://localhost:8080/auth/jwt/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const responseData: UsernameType = await res.json();
      return responseData;
    } else if (res.status === 401) {
      const responseData: UserDoesNotExist = await res.json();
      toast.dismiss();
      toast.error(responseData.detail);
      return null;
    } else {
      const responseData: UserDoesNotExist = await res.json();
      toast.dismiss();
      toast.error(responseData.non_field_errors[0]);
      return null;
    }
  } catch (error) {
    return null;
  }
}

export async function rotateToken(): Promise<Response | null> {
  try {
    const res = await fetch("http://localhost:8080/auth/jwt/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    return res;
  } catch (error) {
    return null;
  }
}

export async function createUser(data: TRegisterUserSchema) {
  const res = await fetch("http://localhost:8080/users/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res;
}

export async function logout(): Promise<Response> {
  const res = await fetch("http://localhost:8080/auth/jwt/delete/", {
    method: "GET",
    credentials: "include",
  });

  return res;
}

export async function resendActivationEmail(
  email: string,
): Promise<Response | undefined> {
  const data = {
    email: email,
  };
  try {
    const res = await fetch("http://localhost:8080/users/resend_activation/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res;
  } catch (error) {
    toast.error("An Error Occurred while resending activation email");
  }
}

export async function sendResetPasswordMail(
  data: TPasswordResetRequestSchema,
): Promise<Response | null> {
  try {
    const res = await fetch("http://localhost:8080/users/reset_password/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res;
  } catch (error) {
    return null;
  }
}

export async function resetPasswordConfirm(
  data: TPasswordResetConfirmSchema,
): Promise<Response | null> {
  try {
    const res = await fetch(
      "http://localhost:8080/users/reset_password_confirm/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    return res;
  } catch (error) {
    return null;
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
