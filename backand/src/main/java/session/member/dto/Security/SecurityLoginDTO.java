package session.member.dto.Security;

import lombok.AllArgsConstructor;
import lombok.Getter;



////  ℹ️ 시큐리터 DTO
//시큐리터 식별아이디 보내기용 (SecurityContext)
    //me 상세용
    //SecurityLoginDTO principal에서 userId 꺼냄
//
//DB에서 userId로 authentication_id(= STAFF PK) 조회
//
//그 authId로 STAFF 상세를 조회해서 내려줌

@Getter
@AllArgsConstructor
public class SecurityLoginDTO implements java.io.Serializable{
    private Long userId;
    private String loginId;



}