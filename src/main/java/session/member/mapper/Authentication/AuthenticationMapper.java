package session.member.mapper.Authentication;

import org.apache.ibatis.annotations.Param;

public interface AuthenticationMapper {



    //조회
    Long selectAuthenticationIdByUserId(@Param("userId") Long userId); //세션조회 닥터))

}
