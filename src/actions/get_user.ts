/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { cookies } from 'next/headers';
import { USER_GET } from '@/functions/api';

export type User = {
    id: number;
    username: string;
    email: string;

    shops: any;
    integrations: any;
}

interface IResponse {
    status: number;
    response: User | undefined;
};

export default async function getUserData() {
    const _cookies = await cookies();
    const token = _cookies.get("token")
    const id = _cookies.get("user")?.value;

    console.log(id);
    
    const { url } = USER_GET(id);

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token?.value}`,
        },
    });

    if (!response.ok) throw new Error('Erro ao buscar os produtos.');

    const data = (await response.json()) as IResponse;
    return { ok: true, data };
}
