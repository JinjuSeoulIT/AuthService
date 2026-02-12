import { apiClient } from "@/components/features/login/LoginApi";

export type VisitReservation = {
  visitId: number;
  reservationId?: string | null;
  scheduledAt?: string | null;
  arrivalAt?: string | null;
  note?: string | null;
};

export type VisitReservationPayload = Partial<VisitReservation>;

const BASE = process.env.NEXT_PUBLIC_PATIENTS_API_BASE_URL ?? "/api/visits";

export async function fetchVisitReservationApi(
  visitId: number
): Promise<VisitReservation | null> {
  try {
    const res = await apiClient.get(`${BASE}/${visitId}/reservation`);
    const data = (res.data as any)?.result ?? res.data;
    return data ?? null;
  } catch (err) {
    console.warn("[reservationApi] fetchVisitReservationApi fallback", err);
    return null;
  }
}

export async function saveVisitReservationApi(
  visitId: number,
  payload: VisitReservationPayload
): Promise<VisitReservation> {
  try {
    const res = await apiClient.post(`${BASE}/${visitId}/reservation`, payload);
    const data = (res.data as any)?.result ?? res.data;
    return { visitId, ...payload, ...data };
  } catch {
    return { visitId, ...payload };
  }
}

export async function deleteVisitReservationApi(visitId: number): Promise<void> {
  try {
    await apiClient.delete(`${BASE}/${visitId}/reservation`);
  } catch (err) {
    console.warn("[reservationApi] deleteVisitReservationApi fallback", err);
  }
}

