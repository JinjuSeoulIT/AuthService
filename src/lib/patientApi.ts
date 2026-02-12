import { apiClient } from "@/components/features/login/LoginApi";
import type {
  Patient,
  PatientForm,
  PatientMultiSearchPayload,
} from "@/components/features/patients/patientTypes";

const BASE = process.env.NEXT_PUBLIC_PATIENTS_API_BASE_URL ?? "/api/patients";

export type PatientStatusChangePayload = { statusCode: string; reason?: string | null };

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export async function fetchPatientsApi(): Promise<Patient[]> {
  try {
    const res = await apiClient.get(`${BASE}`);
    const data = (res.data as any)?.result ?? res.data;
    return (Array.isArray(data) ? data : []) as Patient[];
  } catch (err) {
    console.warn("[patientApi] fetchPatientsApi fallback", err);
    return [];
  }
}

export async function fetchPatientApi(patientId: number): Promise<Patient> {
  try {
    const res = await apiClient.get(`${BASE}/${patientId}`);
    const data = (res.data as any)?.result ?? res.data;
    return data as Patient;
  } catch {
    return {
      patientId,
      name: "미상",
    };
  }
}

export async function createPatientApi(form: PatientForm): Promise<Patient> {
  try {
    const res = await apiClient.post(`${BASE}`, form);
    const data = (res.data as any)?.result ?? res.data;
    return data as Patient;
  } catch {
    return {
      patientId: Date.now(),
      name: form.name,
      ...form,
    };
  }
}

export async function updatePatientApi(
  patientId: number,
  form: PatientForm
): Promise<Patient> {
  try {
    const res = await apiClient.put(`${BASE}/${patientId}`, form);
    const data = (res.data as any)?.result ?? res.data;
    return data as Patient;
  } catch {
    return { patientId, name: form.name, ...form };
  }
}

export async function deletePatientApi(patientId: number): Promise<void> {
  await apiClient.delete(`${BASE}/${patientId}`);
}

export async function changePatientVipApi(
  patientId: number,
  payload: { isVip: boolean }
): Promise<void> {
  try {
    await apiClient.post(`${BASE}/${patientId}/vip`, payload);
  } catch (err) {
    console.warn("[patientApi] changePatientVipApi fallback", err);
  }
}

export async function changePatientStatusApi(
  patientId: number,
  payload: PatientStatusChangePayload
): Promise<void> {
  try {
    await apiClient.post(`${BASE}/${patientId}/status`, payload);
  } catch (err) {
    console.warn("[patientApi] changePatientStatusApi fallback", err);
  }
}

export async function searchPatientsApi(
  type: string,
  keyword: string
): Promise<Patient[]> {
  if (!keyword.trim()) return [];
  try {
    const res = await apiClient.get(`${BASE}/search`, {
      params: { type, keyword },
    });
    const data = (res.data as any)?.result ?? res.data;
    return (Array.isArray(data) ? data : []) as Patient[];
  } catch (err) {
    console.warn("[patientApi] searchPatientsApi fallback", err);
    return [];
  }
}

export async function searchPatientsMultiApi(
  payload: PatientMultiSearchPayload
): Promise<Patient[]> {
  try {
    const res = await apiClient.post(`${BASE}/search`, payload);
    const data = (res.data as any)?.result ?? res.data;
    return (Array.isArray(data) ? data : []) as Patient[];
  } catch (err) {
    console.warn("[patientApi] searchPatientsMultiApi fallback", err);
    return [];
  }
}

