package session.member.mapper;

import org.apache.ibatis.annotations.Mapper;

import org.apache.ibatis.annotations.Param;
import session.member.dto.login.LoginRowDTO;

import session.member.dto.membership.Response.UserResponseDTO;

@Mapper
public interface UserMapper {

    /** loginId 중복 체크: 존재하면 1 이상, 없으면 0 */
    int countByLoginId(String loginId);


    //로그인 조회용
    LoginRowDTO selectLoginRowByLoginId(String loginId);
    //로그인 때 인증용 Row(password_hash 포함)

//
//    //로그인 조회용
//    UserResponseDTO selectUserById(@Param("userId") Long userId);
//    /** 로그인 검증용 Row 조회 (password_hash 포함) */

}