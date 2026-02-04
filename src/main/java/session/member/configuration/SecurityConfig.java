package session.member.configuration;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


//✅ 필터 로그인/ 로그아웃 인가규칙
//톰켓이동후 스프링오기전 확인
@Configuration
@EnableWebSecurity
public class SecurityConfig {


    //빈 애는 각각 역활에맞는 상황에 실행시키기위해 임시저장용이고 호출하면 바로 사용할수있게 해놓음

    //✅비번 검증
    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder(); //애가 내장객체 서큐리티 비번검증
    }
    ///  //////////////////////////////////////////////////////////////////////////////////

    // ✅ CORS 정책(로컬 개발용) (나중에 없애기 )
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        // 세션 쿠키(JSESSIONID) 허용
        config.setAllowCredentials(true);


        // ✅ 로컬 개발에서 포트가 자주 바뀌니까 패턴 허용
        // (예: 5500, 3000, 5173 등)
        config.addAllowedOriginPattern("http://localhost:*");
        config.addAllowedOriginPattern("http://192.168.*.*:*");
        config.addAllowedOriginPattern("http://127.0.0.1:*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*"); // GET,POST,PUT,DELETE,OPTIONS

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }


//////////////////////////////////////////////////////////////////////////////////////////////
    //2.
    // 컨트롤러에서 수동로그인 처리용 (AuthenticationManager.authenticate() 애가 아이디 비번 검증용 )
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        //HttpSecurity http 시큐리티 필터 규칙/구성 설정

        http
                // ✅ CORS를 Security에 연결 (withCredentials/preflight 필수)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())

                .sessionManagement(session ->
                        session.sessionFixation(fix -> fix.migrateSession())
                )

                .authorizeHttpRequests(auth -> auth
                        // 1) ✅ 프리플라이트는 무조건 통과
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // 2) ✅ 공개(로그인/로그아웃/회원가입/테스트/정적/스웨거)
                        .requestMatchers(
                                // ✅ 온보딩 상태는 무조건 공개 (401 나오면 흐름 자체가 막힘)
                                "/api/onboarding/**",
                                "/", "/error",
                                "/api/users/**",

                                //의사 (api)
                                "/api/doctor/**",
                                "/api/doctors/**",

                                //상세 (api)
                                "/api/authentication/**",

                                //

                                "/v3/api-docs/**",
                                "/css/**", "/js/**", "/images/**", "/webjars/**",
                                "/favicon.ico"
                        ).permitAll()
                        // 3) ✅ 보호 구간
                        .requestMatchers("/auth/**", "/member/**").authenticated()
                        // 4) ✅ 그 외는 전부 인증 필요 (이게 가장 깔끔)
                        .anyRequest().authenticated()
                )

                // ✅ 필터 로그인  formLogin 비활성화 (컨트롤러에서 직접 로그인 처리)
                .formLogin(form -> form.disable())
                //기본 로그인 필터가 인증 성공 시 자동으로 SPRING_SECURITY_CONTEXT를 세션에 저장해주는 흐름이 빠져.



                // ✅ 로그아웃
                .logout(logout -> logout
                                .logoutUrl("/api/users/logout")  //전체적용
                                .invalidateHttpSession(true)
                                .deleteCookies("JSESSIONID")
                                .logoutSuccessHandler((req, res, auth) -> {
                                    res.setStatus(200);
                                    res.setContentType("application/json;charset=UTF-8");
                                    res.getWriter().write("{\"success\":true}");
                                })
                        );

                //이렇게 하면 프론트에서 /logout POST 치면 응답이 200으로 바로 떨어지고, /로 안 감.

        return http.build();

        //formLogin() 또는 기본 로그인 엔드포인트 쓰면 됨.
    }
    }





