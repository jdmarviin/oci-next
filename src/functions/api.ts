/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */

// export const API_URL = 'http://127.0.0.1:8000';
export const API_URL = 'https://oci-fast-api-production.up.railway.app';

export function PRODUCS_GET() {
  return {
    url: `${API_URL}/products`,
  };
}

export function PRODUCT_GET(id) {
  return {
    url: `${API_URL}/products/${id}`,
  };
}

export function PRODUCT_EDIT_AI(id) {
  return {
    url: `${API_URL}/products/edit-with-ai/${id}`,
  };
}

export function PRODUCT_CREATE() {
  return {
    url: `${API_URL}/products/create`,
  };
}

export function PRODUCT_PUT() {
  return {
    url: `${API_URL}/products/user-edit`,
  };
}

export function TOKEN_POST() {
  return {
    url: `${API_URL}/login`,
  };
}

export function USER_GET(id: string) {
  return {
    url: `${API_URL}/user/users/${id}`,
  };
}
