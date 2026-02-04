package session.member.controller;//package session.member.controller;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import session.member.dto.ApiResponse.ApiResponse;
import session.member.dto.onboarding.OnboardingStatusResponseDTO;
import session.member.service.OnboardingService.OnboardingService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/onboarding")
public class OnboardingController {

    private final OnboardingService onboardingService;

//    쿠키(JSESSIONID) + 세션(서버/Redis) 확인
//
//    세션에서 userId 꺼내서
//
//    DB에 member_authentication(STAFF) 존재 여부 확인
//
//    그 결과를 hasAuthentication으로 내려줌

    //온보딩용
    @GetMapping("/status")
    public ResponseEntity<ApiResponse<OnboardingStatusResponseDTO>> status(HttpSession session) {


        Object userIdObj = session.getAttribute("LOGIN_USER_ID");
        // ✅ 온보딩 상태 확인용
        // 1) 로그인 세션에서 userId(LOGIN_USER_ID) 확인
        // 2) userId로 authenticationId 존재 여부 조회
        // 3) 프론트에서 authenticationId 유무로 온보딩/메인 분기 나눔
        
        if (userIdObj == null) {
            // ✅ 로그인 안 된 상태
            return ResponseEntity.status(401).body(new ApiResponse<>(false,"상세가입 하세요", null));
        }

        long userId = (userIdObj instanceof Number)
                ? ((Number) userIdObj).longValue()
                : Long.parseLong(userIdObj.toString());

        OnboardingStatusResponseDTO dto = onboardingService.getStatus(userId);
        return ResponseEntity.ok(new ApiResponse<>(true,"성공입니다.",dto));
    }
}
