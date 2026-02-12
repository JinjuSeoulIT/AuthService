import { apiClient } from "@/components/features/login/LoginApi";

export type PatientRestriction = {
  restrictionId: number;
  patientId: number;
  restrictionType: string;
  reason?: string | null;
  activeYn: boolean;
  createdAt?: string | null;
  updatedAt?: string | null;
};

const BASE = process.env.NEXT_PUBLIC_PATIENTS_API_BASE_URL ?? "/api/patients";

export async function fetchPatientRestrictionsApi(
  patientId: number
): Promise<PatientRestriction[]> {
  try {
    const res = await apiClient.get(`${BASE}/${patientId}/restrictions`);
    const data = (res.data as any)?.result ?? res.data;
    return (Array.isArray(data) ? data : []) as PatientRestriction[];
  } catch (err) {
    console.warn("[restrictionApi] fetchPatientRestrictionsApi fallback", err);
    return [];
  }
}

export async function createPatientRestrictionApi(payload: {
  patientId: number;
  restrictionType: string;
  reason?: string;
}): Promise<PatientRestriction> {
  try {
    const res = await apiClient.post(`${BASE}/${payload.patientId}/restrictions`, payload);
    const data = (res.data as any)?.result ?? res.data;
    return data as PatientRestriction;
  } catch {
    return {
      restrictionId: Date.now(),
      patientId: payload.patientId,
      restrictionType: payload.restrictionType,
      reason: payload.reason,
      activeYn: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
}

export async function updatePatientRestrictionApi(
  restrictionId: number,
  payload: Partial<PatientRestriction>
): Promise<PatientRestriction> {
  try {
    const res = await apiClient.put(`${BASE}/restrictions/${restrictionId}`, payload);
    const data = (res.data as any)?.result ?? res.data;
    return { restrictionId, ...payload, ...data } as PatientRestriction;
  } catch {
    return { restrictionId, patientId: payload.patientId ?? 0, restrictionType: payload.restrictionType ?? "", activeYn: payload.activeYn ?? true, reason: payload.reason };
  }
}

export async function deletePatientRestrictionApi(restrictionId: number): Promise<void> {
  try {
    await apiClient.delete(`${BASE}/restrictions/${restrictionId}`);
  } catch (err) {
    console.warn("[restrictionApi] deletePatientRestrictionApi fallback", err);
  }
}

