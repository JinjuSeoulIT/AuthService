package session.member.service;



import session.member.dto.membership.Request.AuthenticationRequestDTO;
import session.member.dto.membership.Request.UserRequestDTO;



public interface JpaUserService {

    /**회원 추가선언 가입**/
    Long signupWithAuthentication(UserRequestDTO userReq,
                                  AuthenticationRequestDTO authReq,
                                  String passwordHash);






    void updateAuthentication(Long userId, AuthenticationRequestDTO authReq);



    void deleteUser(Long userId);
}