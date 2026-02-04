package session.member.service.SecurityService;


import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor

public class SecurityServicempl {


        private final PasswordEncoder passwordEncoder;

        @Override
        public String encode(String rawPassword) {
            return passwordEncoder.encode(rawPassword);
        }

        @Override
        public boolean matches(String rawPassword, String encodedPassword) {
            return passwordEncoder.matches(rawPassword, encodedPassword);
        }

}
