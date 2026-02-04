package session.member.service.SecurityService;
public interface SecurityService {


    String encode(String rawPassword);

    boolean matches(String rawPassword, String encodedPassword);

}
