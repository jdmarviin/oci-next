/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
"use server";

import { TOKEN_POST } from "@/functions/api";
import { User } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type ActionState = {
  ok: boolean;
  data: any | null;
  error: string;
};

export default async function login(
  state: ActionState,
  formData: FormData
): Promise<ActionState> {
  const username = formData.get("username") as string | null;
  const password = formData.get("password") as string | null;
  
  try {
    if (!username || !password) throw new Error("Invalid credentials");
    const { url } = TOKEN_POST();
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    
    if (!response.ok) throw new Error("Invalid credentials");

    const data = await response.json();
    console.log(data);
    (await cookies()).set("token", data.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });

    (await cookies()).set("user", data.id, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });

    sendTokenToExtension(data);
    // redirect('/dashboard')
    return { ok: true, data, error: "" };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    return { ok: false, data: null, error: errorMessage };
  }
}

function sendTokenToExtension(data: any): void {
  window.postMessage({
    type: 'APP_TO_EXTENSION',
    action: 'SAVE_TOKEN',
    payload: {
      token: data.access_token,
      user: data,
    }
  }, '*');
}