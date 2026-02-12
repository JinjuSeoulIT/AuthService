import { apiClient } from "@/components/features/login/LoginApi";

export type VisitHistory = {
  id: number;
  visitId?: number | null;
  eventType?: string | null;
  fieldName?: string | null;
  oldValue?: string | null;
  newValue?: string | null;
  reason?: string | null;
  changedBy?: string | null;
  changedAt?: string | null;
};

const BASE = process.env.NEXT_PUBLIC_PATIENTS_API_BASE_URL ?? "/api/visits";

export async function fetchAllVisitHistoryApi(): Promise<VisitHistory[]> {
  try {
    const res = await apiClient.get(`${BASE}/history`);
    const data = (res.data as any)?.result ?? res.data;
    return (Array.isArray(data) ? data : []) as VisitHistory[];
  } catch (err) {
    console.warn("[visitHistoryApi] fetchAllVisitHistoryApi fallback", err);
    return [];
  }
}

