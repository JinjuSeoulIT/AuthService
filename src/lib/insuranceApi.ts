import { apiClient } from "@/components/features/login/LoginApi";
import type {
  Insurance,
  InsuranceCreateReq,
  InsuranceHistory,
  InsuranceUpdateReq,
} from "@/components/features/insurance/insuranceTypes";

const BASE = process.env.NEXT_PUBLIC_PATIENTS_API_BASE_URL ?? "/api/patients";

// 전체 리스트 (saga용)
export async function fetchInsuranceListApi(patientId: number): Promise<Insurance[]> {
  try {
    const res = await apiClient.get(`${BASE}/${patientId}/insurances`);
    const data = (res.data as any)?.result ?? res.data;
    return (Array.isArray(data) ? data : []) as Insurance[];
  } catch (err) {
    console.warn("[insuranceApi] fetchInsuranceListApi fallback", err);
    return [];
  }
}

export async function fetchInsuranceHistoryApi(
  patientId: number
): Promise<InsuranceHistory[]> {
  try {
    const res = await apiClient.get(`${BASE}/${patientId}/insurances/history`);
    const data = (res.data as any)?.result ?? res.data;
    return (Array.isArray(data) ? data : []) as InsuranceHistory[];
  } catch (err) {
    console.warn("[insuranceApi] fetchInsuranceHistoryApi fallback", err);
    return [];
  }
}

export async function fetchValidInsuranceApi(patientId: number): Promise<Insurance | null> {
  try {
    const res = await apiClient.get(`${BASE}/${patientId}/insurances/valid`);
    const data = (res.data as any)?.result ?? res.data;
    if (!data) return null;
    if (Array.isArray(data)) return data[0] ?? null;
    return data as Insurance;
  } catch (err) {
    console.warn("[insuranceApi] fetchValidInsuranceApi fallback", err);
    return null;
  }
}

export async function createInsuranceApi(payload: InsuranceCreateReq): Promise<Insurance> {
  try {
    const res = await apiClient.post(`${BASE}/${payload.patientId}/insurances`, payload);
    const data = (res.data as any)?.result ?? res.data;
    return data as Insurance;
  } catch {
    return {
      insuranceId: Date.now(),
      patientId: payload.patientId,
      insuranceType: payload.insuranceType,
      policyNo: payload.policyNo ?? null,
      activeYn: true,
      verifiedYn: payload.verifiedYn ?? false,
      startDate: payload.startDate,
      endDate: payload.endDate,
      note: payload.note,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
}

export async function updateInsuranceApi(
  insuranceId: number,
  payload: InsuranceUpdateReq
): Promise<Insurance> {
  try {
    const res = await apiClient.put(`${BASE}/insurances/${insuranceId}`, payload);
    const data = (res.data as any)?.result ?? res.data;
    return { insuranceId, ...(data ?? payload) } as Insurance;
  } catch {
    return { insuranceId, patientId: 0, insuranceType: payload.insuranceType ?? "", activeYn: payload.activeYn ?? true, verifiedYn: payload.verifiedYn ?? false };
  }
}
