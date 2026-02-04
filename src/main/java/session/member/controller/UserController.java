package session.member.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import session.member.dto.ApiResponse.ApiResponse;

import session.member.dto.membership.Request.UserRequestDTO;

import session.member.dto.membership.Response.UserResponseDTO;
import session.member.service.UserService;



@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users") //✅ 관례상 소문자/복수형 추천
public class UserController {

    private final UserService userService;

    //
    //추가
    @PostMapping("/login/create")
    public ResponseEntity<ApiResponse<UserResponseDTO>> signup(@RequestBody UserRequestDTO userReq) {

        UserResponseDTO create = userService.createLogin(userReq);


        //"예외처리
        if (create == null) {
            return ResponseEntity.status(409).body(
                    new ApiResponse<>(false, "중복아이디 있습니다.", null));
        }
        return ResponseEntity.status(201)
                .body(new ApiResponse<>(true, "회원가입 성공", create));
    }
}







//
//
//
//
//
//    }
//    //수정
//    //@PutMapping  이건 전체수정용으로 주로 씀
//    @PatchMapping("/{userId}/authentication")  //부분오류수정은 이렇게
//    public ResponseEntity<ApiResponse<AuthenticationResponseDTO>> updateAuth(
//         @PathVariable Long userId,
//         @RequestBody AuthenticationRequestDTO req
//    ){
//        AuthenticationResponseDTO updated = userService.updateAuthentication(userId, req);
//
//
//        //예외처리
//        if (updated == null) {
//            return ResponseEntity.status(409).body(
//                    new ApiResponse<>(false,"수정할수 없습니다." ,null));
//        }
//        return ResponseEntity.status(201).body(new ApiResponse<>(true,"회원가입 성공", updated));
//
//
//    }
//
//
//
//
//
//
//    // ✅ 내 계정 탈퇴형(삭제)
//    @DeleteMapping("delete/me")
//    //서버가 세션/토큰의 principal에서 userId 뽑아서 삭제
//    //
//    //장점: 프론트가 id를 몰라도 되고, 보안/UX 깔끔
//
//    public ResponseEntity<ApiResponse<UserResponseDTO>> deleteMe(Authentication authentication) {
//
//        SecurityLoginDTO principal = (SecurityLoginDTO) authentication.getPrincipal();
//        long userId = principal.getUserId();
//
//        UserResponseDTO deleted = userService.deleteUserAndReturn(userId);
//
//
//
//        if (deleted == null) {
//            return ResponseEntity.status(404)
//                    .body(new ApiResponse<>(false, "삭제실패", null));
//        }
//            return ResponseEntity.ok(new ApiResponse<>(true, "삭제성공", deleted));
//    }
//}