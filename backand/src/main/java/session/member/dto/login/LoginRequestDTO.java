package session.member.dto.login;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


//***호출용****
//밖에서 가져옴
//로그인 입력
//외부입력값

//이게 프론트로 보냄
//로그인할때 평문 비번,아디 호출용
@Getter
@Setter
//@ToString //테스트용으로 로그확인할려고 붙여놓음
public class LoginRequestDTO {


private String loginId;
//    @ToString.Exclude //이렇게해놓으면 로그는 찍히지만 패스워드는 빠짐

private String password;  //프론트요청으로 따로빼놔야함



}
