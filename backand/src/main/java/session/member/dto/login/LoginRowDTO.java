package session.member.dto.login;

import lombok.Data;
//검증용  (중간)


    @Data
    public class LoginRowDTO {
        private Long userId;
        private String loginId;
        private String passwordHash;  // 서버 내부용
        private String loginType;

    }


