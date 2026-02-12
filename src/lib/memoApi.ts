import { apiClient } from "@/components/features/login/LoginApi";

export type PatientMemo = {
  id: number;
  patientId: number;
  content: string;
  createdAt?: string | null;
  createdBy?: string | null;
};

const BASE = process.env.NEXT_PUBLIC_PATIENTS_API_BASE_URL ?? "/api/patients";

export async function fetchPatientMemosApi(patientId: number): Promise<PatientMemo[]> {
  try {
    const res = await apiClient.get(`${BASE}/${patientId}/memos`);
    const data = (res.data as any)?.result ?? res.data;
    return (Array.isArray(data) ? data : []) as PatientMemo[];
  } catch (err) {
    console.warn("[memoApi] fetchPatientMemosApi fallback", err);
    return [];
  }
}

export async function createPatientMemoApi(
  patientId: number,
  payload: { content: string }
): Promise<PatientMemo> {
  try {
    const res = await apiClient.post(`${BASE}/${patientId}/memos`, payload);
    const data = (res.data as any)?.result ?? res.data;
    return data as PatientMemo;
  } catch {
    return { id: Date.now(), patientId, content: payload.content };
  }
}

