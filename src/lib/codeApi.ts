import { apiClient } from "@/components/features/login/LoginApi";

export type CodeItem = {
  code: string;
  name: string;
  sortOrder?: number | null;
  isActive?: boolean | null;
};

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api";

export async function fetchCodesApi(groupCode: string): Promise<CodeItem[]> {
  try {
    const res = await apiClient.get(`${BASE}/codes`, { params: { groupCode } });
    const data = (res.data as any)?.result ?? res.data;
    return (Array.isArray(data) ? data : []) as CodeItem[];
  } catch (err) {
    console.warn("[codeApi] fetchCodesApi fallback", err);
    return [];
  }
}

