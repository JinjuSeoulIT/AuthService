import { apiClient } from "@/components/features/login/LoginApi";

export type Staff = {
  id: number;
  name: string;
  role?: string | null;
  department?: string | null;
  phone?: string | null;
  email?: string | null;
  activeYn?: boolean | null;
};

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api";

export async function fetchStaffListApi(includeInactive = false): Promise<Staff[]> {
  try {
    const res = await apiClient.get(`${BASE}/staff`, {
      params: { includeInactive },
    });
    const data = (res.data as any)?.result ?? res.data;
    return (Array.isArray(data) ? data : []) as Staff[];
  } catch (err) {
    console.warn("[staffApi] fetchStaffListApi fallback", err);
    return [];
  }
}

