import { apiClient } from "@/components/features/login/LoginApi";

export type VisitInpatient = {
  visitId: number;
  wardCode?: string | null;
  roomNo?: string | null;
  bedNo?: string | null;
  admissionAt?: string | null;
  note?: string | null;
};

export type VisitInpatientPayload = Partial<VisitInpatient>;

const BASE = process.env.NEXT_PUBLIC_PATIENTS_API_BASE_URL ?? "/api/visits";

export async function fetchVisitInpatientApi(
  visitId: number
): Promise<VisitInpatient | null> {
  try {
    const res = await apiClient.get(`${BASE}/${visitId}/inpatient`);
    const data = (res.data as any)?.result ?? res.data;
    return data ?? null;
  } catch (err) {
    console.warn("[inpatientApi] fetchVisitInpatientApi fallback", err);
    return null;
  }
}

export async function saveVisitInpatientApi(
  visitId: number,
  payload: VisitInpatientPayload
): Promise<VisitInpatient> {
  try {
    const res = await apiClient.post(`${BASE}/${visitId}/inpatient`, payload);
    const data = (res.data as any)?.result ?? res.data;
    return { visitId, ...payload, ...data };
  } catch {
    return { visitId, ...payload };
  }
}

export async function deleteVisitInpatientApi(visitId: number): Promise<void> {
  try {
    await apiClient.delete(`${BASE}/${visitId}/inpatient`);
  } catch (err) {
    console.warn("[inpatientApi] deleteVisitInpatientApi fallback", err);
  }
}

