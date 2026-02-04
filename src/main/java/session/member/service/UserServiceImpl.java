package session.member.service;


import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import session.member.dto.ApiResponse.ApiResponse;
import session.member.dto.login.LoginRequestDTO;
import session.member.dto.login.LoginResponseDTO;
import session.member.dto.membership.Request.AuthenticationCreateRequestDTO;
import session.member.dto.membership.Response.AuthenticationResponseDTO;
import session.member.dto.membership.Response.SignupResponseDTO;
import session.member.service.SecurityService.SecurityService;

@Service

@RequiredArgsConstructor

public class UserServicempl implements UserService {

  private final JpaUserService jpaUserService; // 리퀘스트용
  private final SecurityService securityService;  //검증용


    @Override
    @Transactional
    public ApiResponse<SignupResponseDTO> signup(SignupResponseDTO signupRep,
                                                  AuthenticationCreateRequestDTO authReq){
                           //회원상세 입력 dto  // 검증출력용 dto
        // 1) loginId 중복 체크 (DB 조회는 JPA 서비스로 위임)
        // 2) 비밀번호 해시 생성 (SecurityService)
        // 3) user 저장 → userId 확보 (JPA 서비스)
        // 4) authentication 저장 (JPA 서비스)
        // 5) SignupResponseDTO 생성 후 ApiResponse로 반환

     return null;
    }
    @Override
    public ApiResponse<LoginResponseDTO>  login(LoginRequestDTO loginReq){

        // 1) loginId로 LoginRowDTO 조회 (JPA 서비스)
        // 2) passwordEncoder.matches(평문, 해시) 검증 (SecurityService)
        // 3) LoginResponseDTO 생성 후 ApiResponse 반환


     return  null;
    }

     @Override
    public  ApiResponse<AuthenticationResponseDTO> getAuthentication(Long userId){
         // 1) userId로 AuthenticationResponseDTO 조회 (JPA 서비스)
         // 2) ApiResponse로 반환

        return null;
     }



   }