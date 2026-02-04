package session.member.dto.login;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

//
//****출력용***** (식별)
//정제후 출력함
//

//로그인 요청전용(Req) 프론트 DTO (입력)
@Getter
@Setter

public class LoginResponseDTO {

    private Long userId;

    private Long authenticationId;   // ✅ 추가 프론트용으로(온로딩) 사용할려고 만들어놓음

    private String loginId;


//    private String loginType; 나중에 구현
//
}
