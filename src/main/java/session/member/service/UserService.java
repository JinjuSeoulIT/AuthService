package session.member.service;

import session.member.dto.login.LoginRequestDTO;
import session.member.dto.login.LoginResponseDTO;
import session.member.dto.membership.Request.UserRequestDTO;
import session.member.dto.membership.Response.UserResponseDTO;



public interface UserService {

    /**
     * ✅ 로그인 유스케이스(컨트롤러가 호출)
     * - loginId로 passwordHash 조회
     * - matches() 검증
     * - 응답 DTO 구성
     */
    LoginResponseDTO login(LoginRequestDTO loginReq);
    /**
     * ✅ 회원가입 유스케이스(컨트롤러가 호출)
     //  * - 중복체크(조회=MyBatis)
     //  * - 비번 해시(SecurityService)
     //  * - 저장(쓰기=JPA)
     //  * - 응답 DTO 구성

     */


    /**
     * 내 정보 조회 (세션 기반)
//     * @param userId SecurityContext에서 얻은 로그인 계정 PK
//     */
//
//    LoginResponseDTO me(long userId);
//


    UserResponseDTO createLogin(UserRequestDTO userReq);









}