package session.member.service.OnboardingService;


import session.member.dto.onboarding.OnboardingStatusResponseDTO;

public interface OnboardingService {

    /**
     * 온보딩(회원상세/authentication) 완료 여부 조회
     * - 완료: hasAuthentication=true, authenticationId!=null
     * - 미완료: hasAuthentication=false, authenticationId=null
     */
    OnboardingStatusResponseDTO getStatus(long userId);


}