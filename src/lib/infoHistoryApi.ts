import { apiClient } from "@/components/features/login/LoginApi";

export type PatientInfoHistory = {
  id: number;
  patientId: number;
  fieldName?: string | null;
  oldValue?: string | null;
  newValue?: string | null;
  changedAt?: string | null;
  changedBy?: string | null;
};

const BASE = process.env.NEXT_PUBLIC_PATIENTS_API_BASE_URL ?? "/api/patients";

export async function fetchPatientInfoHistoryApi(
  patientId: number
): Promise<PatientInfoHistory[]> {
  try {
    const res = await apiClient.get(`${BASE}/${patientId}/info-history`);
    const data = (res.data as any)?.result ?? res.data;
    return (Array.isArray(data) ? data : []) as PatientInfoHistory[];
  } catch (err) {
    console.warn("[infoHistoryApi] fetchPatientInfoHistoryApi fallback", err);
    return [];
  }
}

