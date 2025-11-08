/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

'use server'

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { PRODUCT_EDIT_AI } from '@/functions/api';

export async function editProductWithAI(productId: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  
  if (!token) {
    throw new Error('Não autenticado');
  }
  
  const { url } = PRODUCT_EDIT_AI(productId);
  
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error('Erro ao editar produto');
  }
  
  const data = await response.json();
  
  // Revalidar páginas que usam esse produto
  revalidatePath(`/import/${productId}`);
  revalidatePath('/import');
  
  return data;
}