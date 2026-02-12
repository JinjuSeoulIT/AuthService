import { apiClient } from "@/components/features/login/LoginApi";

export type VisitStatus = "WAITING" | "CALLED" | "IN_PROGRESS" | "DONE" | "CANCELLED" | string;
export type VisitType = "OUTPATIENT" | "RESERVATION" | "EMERGENCY" | "INPATIENT" | string;

export type VisitRes = {
  id: number;
  patientId?: number | null;
  patientNo?: string | null;
  patientName?: string | null;
  patientPhone?: string | null;
  visitType?: VisitType;
  status?: VisitStatus;
  deptCode?: string | null;
  doctorId?: string | null;
  priorityYn?: boolean | null;
  memo?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  cancelledAt?: string | null;
  cancelReasonCode?: string | null;
  cancelMemo?: string | null;
  startedAt?: string | null;
  finishedAt?: string | null;
  calledAt?: string | null;
  createdBy?: string | null;
  updatedBy?: string | null;
};

const BASE = process.env.NEXT_PUBLIC_PATIENTS_API_BASE_URL ?? "/api/visits";

export async function fetchVisitsApi(): Promise<VisitRes[]> {
  try {
    const res = await apiClient.get(BASE);
    const data = (res.data as any)?.result ?? res.data;
    return (Array.isArray(data) ? data : []) as VisitRes[];
  } catch (err) {
    console.warn("[receptionApi] fetchVisitsApi fallback", err);
    return [];
  }
}

export type VisitPayload = Omit<VisitRes, "id"> & { createdBy?: string | null };

export async function createVisitApi(payload: VisitPayload): Promise<VisitRes> {
  try {
    const res = await apiClient.post(BASE, payload);
    const data = (res.data as any)?.result ?? res.data;
    return data as VisitRes;
  } catch {
    return { id: Date.now(), ...payload };
  }
}

export async function updateVisitApi(
  id: number,
  payload: Partial<VisitRes>
): Promise<VisitRes> {
  try {
    const res = await apiClient.put(`${BASE}/${id}`, payload);
    const data = (res.data as any)?.result ?? res.data;
    return { id, ...payload, ...data };
  } catch {
    return { id, ...payload };
  }
}

