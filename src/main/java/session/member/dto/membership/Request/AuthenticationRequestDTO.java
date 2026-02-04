package session.member.dto.membership.Request;

//상세 입력용
import lombok.Data;

import java.time.LocalDate;

@Data

public class AuthenticationCreateRequestDTO {
    private String realName;
    private String phone;
    private String email;
    private LocalDate birthDate;
    private String sex;
    private String nationCode;
}