/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
"use server";

import { TOKEN_POST } from "@/functions/api";
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
    
    // Salvar cookies
    (await cookies()).set("token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 dia
    });

    (await cookies()).set("user", data.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });

    // Redirecionar após salvar os cookies
    redirect('/import');
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      throw error;
    }
    
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    return { ok: false, data: null, error: errorMessage };
  }
}
