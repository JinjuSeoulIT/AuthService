import { apiClient } from "@/components/features/login/LoginApi";

export type VisitEmergency = {
  visitId: number;
  triageLevel?: string | null;
  ambulanceYn?: boolean | null;
  traumaYn?: boolean | null;
  note?: string | null;
};

export type VisitEmergencyPayload = Partial<VisitEmergency>;

const BASE = process.env.NEXT_PUBLIC_PATIENTS_API_BASE_URL ?? "/api/visits";

export async function fetchVisitEmergencyApi(
  visitId: number
): Promise<VisitEmergency | null> {
  try {
    const res = await apiClient.get(`${BASE}/${visitId}/emergency`);
    const data = (res.data as any)?.result ?? res.data;
    return data ?? null;
  } catch (err) {
    console.warn("[emergencyApi] fetchVisitEmergencyApi fallback", err);
    return null;
  }
}

export async function saveVisitEmergencyApi(
  visitId: number,
  payload: VisitEmergencyPayload
): Promise<VisitEmergency> {
  try {
    const res = await apiClient.post(`${BASE}/${visitId}/emergency`, payload);
    const data = (res.data as any)?.result ?? res.data;
    return { visitId, ...payload, ...data };
  } catch {
    return { visitId, ...payload };
  }
}

export async function deleteVisitEmergencyApi(visitId: number): Promise<void> {
  try {
    await apiClient.delete(`${BASE}/${visitId}/emergency`);
  } catch (err) {
    console.warn("[emergencyApi] deleteVisitEmergencyApi fallback", err);
  }
}

