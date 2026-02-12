import { apiClient } from "@/components/features/login/LoginApi";

export type PatientFlag = {
  flagId: number;
  patientId: number;
  flagType: string;
  note?: string | null;
  activeYn: boolean;
  createdAt?: string | null;
  updatedAt?: string | null;
};

const BASE = process.env.NEXT_PUBLIC_PATIENTS_API_BASE_URL ?? "/api/patients";

export async function fetchPatientFlagsApi(patientId: number): Promise<PatientFlag[]> {
  try {
    const res = await apiClient.get(`${BASE}/${patientId}/flags`);
    const data = (res.data as any)?.result ?? res.data;
    return (Array.isArray(data) ? data : []) as PatientFlag[];
  } catch (err) {
    console.warn("[flagApi] fetchPatientFlagsApi fallback", err);
    return [];
  }
}

export async function createPatientFlagApi(payload: {
  patientId: number;
  flagType: string;
  note?: string;
}): Promise<PatientFlag> {
  try {
    const res = await apiClient.post(`${BASE}/${payload.patientId}/flags`, payload);
    const data = (res.data as any)?.result ?? res.data;
    return data as PatientFlag;
  } catch {
    return {
      flagId: Date.now(),
      patientId: payload.patientId,
      flagType: payload.flagType,
      note: payload.note,
      activeYn: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
}

export async function updatePatientFlagApi(
  flagId: number,
  payload: Partial<PatientFlag>
): Promise<PatientFlag> {
  try {
    const res = await apiClient.put(`${BASE}/flags/${flagId}`, payload);
    const data = (res.data as any)?.result ?? res.data;
    return { flagId, ...payload, ...data } as PatientFlag;
  } catch {
    return { flagId, patientId: payload.patientId ?? 0, flagType: payload.flagType ?? "", activeYn: payload.activeYn ?? true, note: payload.note };
  }
}

export async function deletePatientFlagApi(flagId: number): Promise<void> {
  try {
    await apiClient.delete(`${BASE}/flags/${flagId}`);
  } catch (err) {
    console.warn("[flagApi] deletePatientFlagApi fallback", err);
  }
}

