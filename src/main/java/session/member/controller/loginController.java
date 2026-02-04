package session.member.controller;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.*;
import session.member.dto.ApiResponse.ApiResponse;
import session.member.dto.Security.SecurityLoginDTO;
import session.member.dto.login.LoginRequestDTO;
import session.member.dto.login.LoginResponseDTO;


import session.member.service.UserService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users") //✅ 관례상 소문자/복수형 추천
public class loginController {

    //컨트롤러는 항상 출력용으로만 이용
    private final UserService userService;


    // ✅ 핵심: SecurityContext를 세션에 저장해주는 저장소
    // (빈으로 등록해도 되고, 간단히 여기서 바로 써도 됨)
    private final SecurityContextRepository securityContextRepository = new HttpSessionSecurityContextRepository();


    //로그인 (세션 아이디) 저장용
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponseDTO>> login(@RequestBody LoginRequestDTO req,
                                                               HttpServletRequest request,  //""세션(창고)를 주입 대상
                                                               HttpServletResponse response //"“세션(창고)을 찾거나 만들기” (읽기 대상)
    ) {

        // ✅ 세션에 로그인 사용자 식별자 저장 (키는 팀에서 컨벤션으로 통일)
        LoginResponseDTO data = userService.login(req);


        if (data == null) {
            return ResponseEntity.status(401)
                    .body(new ApiResponse<>(false, "로그인 실패", null));
        }

        // ✅ 성공 응답 먼저 만들기
        ApiResponse<LoginResponseDTO> res = new ApiResponse<>(true, "로그인 성공", data);


        //  ℹ️ 시큐리터 DTO (리디스 로그인 성공시 상태 설정부분)
        var auth = new UsernamePasswordAuthenticationToken(  //=== 애메서드안에 내부 내장격체를 가짐
                data.getLoginId(), //principal “누가 로그인했냐?” (사용자 식별 정보) (프린-서펄)

                null,      //credentials(내장객체) : “비밀번호/자격증명” (로그인 성공 후엔 비밀번호를  null로 둠)

                List.of(new SimpleGrantedAuthority("ROLE_USER"))); //권한은 일단 ROLE_USER
        // //authorities(내장객체 = ROLE_USER = 일반 사용자


        //  ℹ️ 시큐리터 DTO
        // 1) SecurityContext에 세팅
        SecurityContext context = SecurityContextHolder.
                createEmptyContext();    //해당유저 세션 생성
        context.setAuthentication(auth); //그리고 인증성공하면
        // 해당유저 상세정보 고정 “지금 이 요청은 로그인된 사용자다” 라고 표시
        //auth그리고 이변수안에 내가만들어둔 상세정보 정보가 담겨져있음

        SecurityContextHolder.setContext(context);
        //현재 요청(스레드)에 그 상자를 붙여두는 보관함


        //세션 한번만 만들고
        HttpSession session = request.getSession(true);


        //세션ID 교체는 세션 만든 다음에
        request.changeSessionId();


        //이부분 안만들었음
// ✅ [애가 리디스 ] 세션이 실제로 변경되었다고 표시(=Redis 저장 트리거) 세션 데이터의 key/value 항목
        //네가 정한 세션 attribute 이름(컨벤션)
        session.setAttribute("LOGIN_USER_ID", data.getUserId());  //   //지금 이게 로그인 성공후 세션이랑 맞아서 성공하면 authenticationId 보냄)
        session.setAttribute("LOGIN_ID", data.getLoginId());


        // (3) SecurityContextRepository로 저장한다 => 세션에 SPRING_SECURITY_CONTEXT 저장
        securityContextRepository.saveContext(
                context,   //“무슨 로그인 상태를 저장할지” (내용물)
                request,   //“세션(창고)을 찾거나 만들기” (읽기/쓰기 대상)
                response); //“브라우저에게 세션ID/쿠키를 내려주기” (결과 전달)
        //(그리고 여기에 넣어지면 Spring Session이 Redis로 저장)


        /////////////////////////////////////////////////////////////////////////////////////////////////////
        return ResponseEntity.ok(res);
    }


    /**
     * 로그아웃
     * - 세션 무효화
     */
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.noContent().build(); // 204
    }


    /**
     * 내 정보 조회 (세션 기반)
     * - 세션에서 userId 꺼내서 조회
     */
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<LoginResponseDTO>> me(
            @AuthenticationPrincipal SecurityLoginDTO principal
            //“지금 로그인한 사용자(인증된 사용자)의 정보(principal)를 컨트롤러 파라미터로 바로 꺼내주는 장치”
    ) {
        if (principal == null) {
            return ResponseEntity.status(401)
                    .body(new ApiResponse<>(false, "인증이 필요합니다.", null));
        }

        long userId = principal.getUserId();

        LoginResponseDTO data = new LoginResponseDTO();
        data.setUserId(userId);

        return ResponseEntity.ok(new ApiResponse<>(true, "내 정보 조회 성공", data));
    }
}