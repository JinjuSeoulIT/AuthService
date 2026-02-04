package session.member.configuration.SecurityFilter;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.servlet.util.matcher.PathPatternRequestMatcher;

//✅ 필터 로그인/ 로그아웃 인가규칙
//톰켓이동후 스프링오기전 확인
@Configuration
public class SecurityConfig {


    //빈 애는 각각 역활에맞는 상황에 실행시키기위해 임시저장용이고 호출하면 바로 사용할수있게 해놓음
    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder(); //애가 서큐리티 비번검증
    }



    //2.
    // 컨트롤러에서 수동로그인 처리용 (AuthenticationManager.authenticate() 애가 아이디 비번 검증용 )
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .sessionManagement(
                        session -> session.sessionFixation
                                (fix -> fix.migrateSession()))


                // ✅ 접근 제어 (인가규칙)
                .authorizeHttpRequests(auth -> auth //“이 요청을 통과시킬지 / 403으로 막을지” 결정

                        .requestMatchers("/login", "/api/auth/**", "/swagger-ui/**", "/v3/api-docs/**").permitAll()
                        .anyRequest()    //역할: 위에서 매칭되지 않은 “나머지 모든 요청”
                        .authenticated() //역할: “나머지 모든 요청은 인증된 사용자만 접근 가능”
                )
                // ✅ 필터 로그인
                .formLogin(from -> from
                        .loginProcessingUrl("/login")
                        .usernameParameter("username")  //아이디용
                        .passwordParameter("password")  //패스워드용
                        .permitAll()

                )

                // ✅ 로그아웃
                .logout(logout -> logout
                        .logoutRequestMatcher(PathPatternRequestMatcher.pathPattern("/logout"))
                        //PathPatternRequestMatcher 로그아웃인지 로그인인지 이런것들을 판단해주는 녀석
                        .invalidateHttpSession(true)
                        .clearAuthentication(true) //로그아웃용 DB 해시삭제
                        .deleteCookies("JSESSIONID")
                        .logoutSuccessUrl("/")

                );

        return http.build();

        //formLogin() 또는 기본 로그인 엔드포인트 쓰면 됨.
    }
    }





