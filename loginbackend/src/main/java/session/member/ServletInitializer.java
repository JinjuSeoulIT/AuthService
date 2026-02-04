package session.member;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;


public class ServletInitializer extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(MemberApplication.class);
    }

}
//WAR로 빌드해서 외부 톰캣 같은 서블릿 컨테이너에 올릴 때,
//“여기가 이 스프링 부트 애플리케이션의 시작점이에요” 라고 알려주는 부트스트랩 클래스.
//SpringBootServletInitializer 를 상속하면
//내장 톰캣(Jar 실행) 뿐 아니라
//외부 톰캣(WAR 배포) 방식도 지원할 수 있다.
//외부 톰캣이 애플리케이션을 로딩할 때,
//이 클래스를 보고 configure() 메서드를 호출한다.

///Jar 실행(내장 톰캣)과
/// War 배포(외부 톰캣)
/// 두 방식 모두를 지원할 수 있는 구조가 됩니다.