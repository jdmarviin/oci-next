/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { PRODUCS_GET } from "@/functions/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type Product = {
  id: number;
  product_id: string;
  product_url: string;
  scrapper_data: any;
  scrapper_data: string;
  shopify_data: any;
  ai_data: any;
  user_data: any;
  ai_provider: string;
  import_status: string;
};

export default async function getProductData() {
  const _cookies = await cookies();
  const token = _cookies.get("token");

  const { url } = PRODUCS_GET();

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    });
    if (!response.ok) throw new Error("Erro ao buscar os produtos.");

    const data = (await response.json()) as Product[];
    // revalidatePath('/produtos');
    return { ok: true, data };
  } catch (error: unknown) {
    redirect("/login");
    // throw new Error("Erro ao buscar os produtos.");
  }
}
