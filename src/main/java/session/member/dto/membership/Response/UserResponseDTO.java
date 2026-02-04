package session.member.dto.membership.Response;






//출력용 (프론트)//
import lombok.Data;

@Data
//비밀번호 평문용
//**회원가입(용)** 응답전용(Res) 프론트 DTO (출력) 보내기
//서버 내부에서 JPA 요청에 쓰이도록 가공

public class UserResponseDTO {


    private Long userId;

    private String loginId;
}
