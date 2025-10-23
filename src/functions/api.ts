/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */

export const API_URL = 'http://127.0.0.1:8000';

export function PRODUCS_GET() {
  return {
    url: `${API_URL}/products`,
  };
}

export function PRODUCT_GET(id) {
  return {
    url: `${API_URL}/products/${Number(id)}`,
  };
}

export function TOKEN_POST() {
  return {
    url: `${API_URL}/login`,
  };
}

export function USER_GET(id: number) {
  return {
    url: `${API_URL}/user/${id}`,
  };
}
