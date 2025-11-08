'use server'
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { ActionState } from './login';

export default async function editProduct(
  state: ActionState,
  formData: FormData
): Promise<ActionState> {
    const title = formData.get("title") as string | null;
    const description = formData.get("description") as string | null;
    const price = formData.get("price") as string | null;
    const productId = formData.get("productId") as string | null;
    
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    
    if (!token) {
      throw new Error('Não autenticado');
    }
    
    return { ok: true, data: null, error: '' }
}