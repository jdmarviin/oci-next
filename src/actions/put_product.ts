/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

'use server'

import { PRODUCT_PUT, PRODUCS_GET } from "@/functions/api";
import { cookies } from 'next/headers';
import { Product } from "./products";

export default async function getProduct(id: string) {
    const _cookies = await cookies();
    const token = _cookies.get("token")

    const { url } = PRODUCT_PUT();
    const product = await getProduct(id);

    const clonedProduct = structuredClone(product)
    console.log(clonedProduct);
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token?.value}`,
            },
        });
        if (!response.ok) throw new Error('Erro ao buscar produto.');

        const data = (await response.json()) as Product;
        return { ok: true, data };
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        return { ok: false, data: null, error: errorMessage };
    }
}
