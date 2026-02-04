package session.member.service.SecurityService;


import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor

public class SecurityServiceImpl implements SecurityService {


        private final PasswordEncoder passwordEncoder;

        @Override
        public String encode(String rawPassword) {
            return passwordEncoder.encode(rawPassword);
        }
            //애가 해시를 만들어줌


        @Override
        public boolean matches(String rawPassword, String encodedPassword) {
            //애가 평문비밀번호랑 해시비밀번호 매칭 (마법의 지팡이)

            return passwordEncoder.matches(rawPassword, encodedPassword);
        }

}

//로그인 실패 횟수 제한(락)
//
//비밀번호 정책(길이/복잡도)
//
//비밀번호 변경 시 기존 비번 확인
