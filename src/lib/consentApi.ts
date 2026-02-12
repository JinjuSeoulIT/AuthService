import { apiClient } from "@/components/features/login/LoginApi";
import type {
  Consent,
  ConsentCreateReq,
  ConsentUpdateReq,
} from "@/components/features/consent/consentTypes";

// Fallback base URL. Adjust when real backend endpoints are available.
const BASE = process.env.NEXT_PUBLIC_PATIENTS_API_BASE_URL ?? "/api/patients";

export type ConsentType = {
  id: number;
  code: string;
  name: string;
  sortOrder?: number | null;
  isActive: boolean;
};

export type ConsentLatest = {
  consentId: number;
  consentType: string;
  activeYn: boolean;
  agreedAt?: string | null;
  withdrawnAt?: string | null;
};

export type ConsentWithdrawHistory = {
  historyId: number;
  consentId: number;
  consentType: string;
  withdrawnAt?: string | null;
  changedBy?: string | null;
};

// ----- Consent CRUD -------------------------------------------------------
export async function fetchConsentListApi(patientId: number): Promise<Consent[]> {
  try {
    const res = await apiClient.get(`${BASE}/${patientId}/consents`);
    const data = (res.data as any)?.result ?? res.data;
    return (Array.isArray(data) ? data : []) as Consent[];
  } catch (err: any) {
    console.warn("[consentApi] fetchConsentListApi fallback", err?.message);
    return [];
  }
}

export async function createConsentApi(
  patientId: number,
  form: ConsentCreateReq,
  file?: File | null
): Promise<void> {
  const url = `${BASE}/${patientId}/consents`;
  const hasFile = Boolean(file);
  const payload = hasFile ? new FormData() : (form as any);
  if (hasFile) {
    payload.append("payload", JSON.stringify(form));
    if (file) payload.append("file", file);
  }
  await apiClient.post(url, payload, {
    headers: hasFile ? { "Content-Type": "multipart/form-data" } : undefined,
  });
}

export async function updateConsentApi(
  patientId: number,
  consentId: number,
  form: ConsentUpdateReq,
  file?: File | null
): Promise<void> {
  const url = `${BASE}/${patientId}/consents/${consentId}`;
  const hasFile = Boolean(file);
  const payload = hasFile ? new FormData() : (form as any);
  if (hasFile) {
    payload.append("payload", JSON.stringify(form));
    if (file) payload.append("file", file);
  }
  await apiClient.put(url, payload, {
    headers: hasFile ? { "Content-Type": "multipart/form-data" } : undefined,
  });
}

export async function deleteConsentApi(
  patientId: number,
  consentId: number
): Promise<void> {
  const url = `${BASE}/${patientId}/consents/${consentId}`;
  await apiClient.delete(url);
}

// ----- Consent types ------------------------------------------------------
export async function fetchConsentTypesApi(): Promise<ConsentType[]> {
  try {
    const res = await apiClient.get(`${BASE}/consent-types`, {
      params: { active: true },
    });
    const data = (res.data as any)?.result ?? res.data;
    return (Array.isArray(data) ? data : []) as ConsentType[];
  } catch (err: any) {
    console.warn("[consentApi] fetchConsentTypesApi fallback", err?.message);
    return [];
  }
}

export async function fetchConsentTypesAllApi(): Promise<ConsentType[]> {
  try {
    const res = await apiClient.get(`${BASE}/consent-types`);
    const data = (res.data as any)?.result ?? res.data;
    return (Array.isArray(data) ? data : []) as ConsentType[];
  } catch (err: any) {
    console.warn("[consentApi] fetchConsentTypesAllApi fallback", err?.message);
    return [];
  }
}

export async function createConsentTypeApi(
  payload: Omit<ConsentType, "id" | "isActive">
): Promise<ConsentType> {
  try {
    const res = await apiClient.post(`${BASE}/consent-types`, payload);
    const data = (res.data as any)?.result ?? res.data;
    return {
      id: data?.id ?? Date.now(),
      isActive: true,
      ...payload,
      ...data,
    } as ConsentType;
  } catch {
    return { id: Date.now(), isActive: true, ...payload };
  }
}

export async function updateConsentTypeApi(
  id: number,
  payload: Partial<ConsentType>
): Promise<ConsentType> {
  try {
    const res = await apiClient.put(`${BASE}/consent-types/${id}`, payload);
    const data = (res.data as any)?.result ?? res.data;
    return { id, ...payload, ...data, isActive: data?.isActive ?? payload.isActive ?? true };
  } catch {
    return { id, code: payload.code ?? "", name: payload.name ?? "", sortOrder: payload.sortOrder, isActive: payload.isActive ?? true };
  }
}

export async function deactivateConsentTypeApi(id: number): Promise<void> {
  try {
    await apiClient.post(`${BASE}/consent-types/${id}/deactivate`);
  } catch (err) {
    console.warn("[consentApi] deactivateConsentTypeApi fallback", err);
  }
}

// ----- Derived views ------------------------------------------------------
export async function fetchConsentLatestApi(
  patientId: number
): Promise<ConsentLatest[]> {
  try {
    const res = await apiClient.get(`${BASE}/${patientId}/consents/latest`);
    const data = (res.data as any)?.result ?? res.data;
    return (Array.isArray(data) ? data : []) as ConsentLatest[];
  } catch (err: any) {
    console.warn("[consentApi] fetchConsentLatestApi fallback", err?.message);
    return [];
  }
}

export async function fetchConsentWithdrawHistoryApi(
  patientId: number
): Promise<ConsentWithdrawHistory[]> {
  try {
    const res = await apiClient.get(`${BASE}/${patientId}/consents/withdraw-history`);
    const data = (res.data as any)?.result ?? res.data;
    return (Array.isArray(data) ? data : []) as ConsentWithdrawHistory[];
  } catch (err: any) {
    console.warn("[consentApi] fetchConsentWithdrawHistoryApi fallback", err?.message);
    return [];
  }
}

