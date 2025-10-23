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

  console.log(username);
  console.log(password);
  
  try {
    if (!username || !password) throw new Error("Invalid credentials");
    const { url } = TOKEN_POST();

    console.log(url);
    
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
    
    console.log(url);
    if (!response.ok) throw new Error("Invalid credentials");

    const data = await response.json();
    console.log(data);
    (await cookies()).set("token", data.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });

    localStorage.setItem("user", JSON.stringify(data.id));

    // redirect('/dashboard')
    return { ok: true, data, error: "" };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    return { ok: false, data: null, error: errorMessage };
  }
}
