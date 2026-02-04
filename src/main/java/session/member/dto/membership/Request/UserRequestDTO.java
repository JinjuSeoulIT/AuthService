package session.member.dto.membership.Request;

//입력용 (호출)
import lombok.Data;

@Data
//**회원가입(용)** 요청  등록전용 DTO (입력)
//비밀번호 평문용
//서버 내부에서 JPA 저장에 쓰이도록 가공

public class UserRequestDTO {

    //유저아이디는 DB에 시퀀스로 자동으로 해놨기 때문에
    //유저 아이디까지 안해도 됌
    //같이넣으면 충돌 우려
    //등록

    private String loginId;

    private String password;   // 평문(요청용)



//    private String loginType; 나중에 구현
// ✅ 회원상세 입력을 같이 받는다(컨트롤러용)
//    AuthenticationCreateRequestDTO




}
