package session.member.dto.onboarding;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class OnboardingStatusResponseDTO {

    private final boolean hasAuthentication;
    //애가 true: 이 userId에 해당하는 상세회원(STAFF/AuthenticationEntity)이 이미 존재함
    //false: 아직 없음 → 온보딩 화면으로 보내는 분기점


    private final Long authenticationId; // 없으면 null 로 예외처리


//세션에 LOGIN_USER_ID가 있으면 “로그인됨”
//
//그 userId로 DB에서 authentication(=상세회원) 존재 여부 확인
//
//결과로 hasAuthentication / authenticationId 내려줘서
//
//프론트가 온보딩 갈지 / 메인 갈지 분기



    //8880이 세션(Redis)에서 userId 확인하고 DTO 반환


}