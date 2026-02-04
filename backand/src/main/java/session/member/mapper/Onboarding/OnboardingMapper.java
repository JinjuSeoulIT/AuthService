package session.member.mapper.Onboarding;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface OnboardingMapper {

    Long selectAuthenticationIdByUserId(@Param("userId") long userId);


}