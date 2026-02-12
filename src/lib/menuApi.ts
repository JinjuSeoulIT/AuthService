import { apiClient } from "@/components/features/login/LoginApi";

export type MenuItem = {
  id: number;
  name: string;
  path: string;
  icon?: string | null;
  sortOrder?: number | null;
};

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api";

export async function fetchMenusApi(): Promise<MenuItem[]> {
  try {
    const res = await apiClient.get(`${BASE}/menus`);
    const data = (res.data as any)?.result ?? res.data;
    return (Array.isArray(data) ? data : []) as MenuItem[];
  } catch (err) {
    console.warn("[menuApi] fetchMenusApi fallback", err);
    return [];
  }
}

