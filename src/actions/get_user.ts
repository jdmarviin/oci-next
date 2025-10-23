/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { cookies } from 'next/headers';

export type User = {
    id: number;
    username: string;
    email: string;

    shops: any;
    integrations: any;
}

export default async function getUserData(id) {
    const _cookies = await cookies();
    const token = _cookies.get("token")

    const { url } = USER_GET(id);

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token?.value}`,
        },
    });
    if (!response.ok) throw new Error('Erro ao buscar os produtos.');

    const data = (await response.json()) as User;
    // revalidatePath('/produtos');
    return { ok: true, data };
}
