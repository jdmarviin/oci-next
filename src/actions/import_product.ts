/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
'use server'

import { PRODUCT_CREATE } from '@/functions/api';
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import { Product } from "./products";

export type ActionState = {
  ok: boolean;
  data: any | null;
  error: string;
};

export default async function createProduct(
    state: ActionState,
    formData: FormData,    
): Promise<ActionState> {
    const productUrl = formData.get('url') as string;

    const _cookies = await cookies();
    const token = _cookies.get("token")

    const { url } = PRODUCT_CREATE();
    console.log(productUrl);
    
    try {
        if (!productUrl) throw new Error("Invalid credentials");
        const response = await fetch(`${url}?url=${productUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token?.value}`,
            },
        });
        if (!response.ok) throw new Error('Erro ao buscar produto.');

        const data = (await response.json()) as Product;
        return { ok: true, data, error: '' };
    } catch (error: unknown) {
        redirect("/login");
        // const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        // return { ok: false, data: null, error: errorMessage };
    }
}
