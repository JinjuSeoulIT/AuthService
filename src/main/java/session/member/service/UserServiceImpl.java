package session.member.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import session.member.dto.login.LoginRequestDTO;
import session.member.dto.login.LoginResponseDTO;
import session.member.dto.login.LoginRowDTO;
import session.member.dto.membership.Request.UserRequestDTO;
import session.member.dto.membership.Response.UserResponseDTO;
import session.member.mapper.Authentication.AuthenticationMapper;
import session.member.mapper.UserMapper;
import session.member.service.JpaService.JpaUserService;
import session.member.service.SecurityService.SecurityService;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;                     // ✅유저 조회(MyBatis)
    private final AuthenticationMapper authenticationMapper; // userId -> authenticationId 조회


    private final SecurityService securityService;            // ✅ 해시/검증
    private final JpaUserService jpaUserService;              // ✅ 쓰기(JPA)



    //로그인 조회 (검증)
    @Override
    public LoginResponseDTO login(LoginRequestDTO loginReq) {
        // 1) loginId로 유저 row 조회 (userId, loginId, passwordHash, loginType)
        LoginRowDTO row = userMapper.selectLoginRowByLoginId(loginReq.getLoginId());
        if (row == null) {
            return null;
        }
        // 2) 비밀번호 검증 (encode X, matches O)
        boolean ok = securityService.matches(loginReq.getPassword(), row.getPasswordHash());
        if (!ok) {
            return null;
        }
        // 3) 응답 DTO
        LoginResponseDTO res = new LoginResponseDTO();
        res.setUserId(row.getUserId());
        res.setLoginId(row.getLoginId());
        return res;
    }


//    @Override
//    public LoginResponseDTO me(long userId) {
//
//        // ✅ DTO로 받기
//        UserResponseDTO user = userMapper.selectUserById(userId);
//        if (user == null) {
//            throw new IllegalStateException("해당유저가 없습니다.");
//        }
//
//        // ✅ 온보딩 완료 여부
//        Long authenticationId = authenticationMapper.selectAuthenticationIdByUserId(userId);
//       //여기서 authenticationId == null이면 “온보딩 아직 안 함”
//
//        // ✅ 응답 DTO 구성
//        LoginResponseDTO dto = new LoginResponseDTO();
//        dto.setUserId(user.getUserId());          // 또는 userId 그대로 써도 됨
//        dto.setLoginId(user.getLoginId());
//        dto.setAuthenticationId(authenticationId);
//
//        return dto;
//    }
//
//
//







    //**오케스트레이션 **/
//  * - 중복체크(조회=MyBatis)
//  * - 비번 해시(SecurityService)
//  * - 저장(쓰기=JPA)
//  * - 응답 DTO 구성


    //회원추가 조회
    @Override
    public UserResponseDTO createLogin(UserRequestDTO userReq) {
        // ✅ 중복 체크는 서비스에서
        if (userMapper.countByLoginId(userReq.getLoginId()) > 0) return null;

        String hash = securityService.encode(userReq.getPassword());                   //인증서비스 비번해시처리

        Long userId = jpaUserService.createLoginId(userReq, hash);                    //DB“해시(암호화) 저장

        UserResponseDTO dto = new UserResponseDTO();
        dto.setUserId(userId);
        dto.setLoginId(userReq.getLoginId());
        return dto;




    }







}


