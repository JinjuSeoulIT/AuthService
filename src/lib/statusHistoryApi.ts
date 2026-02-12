import { apiClient } from "@/components/features/login/LoginApi";

export type PatientStatusHistory = {
  id: number;
  patientId: number;
  statusCode: string;
  changedAt?: string | null;
  reason?: string | null;
  changedBy?: string | null;
};

const BASE = process.env.NEXT_PUBLIC_PATIENTS_API_BASE_URL ?? "/api/patients";

export async function fetchPatientStatusHistoryApi(
  patientId: number
): Promise<PatientStatusHistory[]> {
  try {
    const res = await apiClient.get(`${BASE}/${patientId}/status-history`);
    const data = (res.data as any)?.result ?? res.data;
    return (Array.isArray(data) ? data : []) as PatientStatusHistory[];
  } catch (err) {
    console.warn("[statusHistoryApi] fetchPatientStatusHistoryApi fallback", err);
    return [];
  }
}

