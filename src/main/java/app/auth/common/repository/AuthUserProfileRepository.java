package app.auth.common.repository;

import app.auth.common.dto.AuthUserProfileInfo;
import app.auth.common.dto.AuthUserSearchInfo;
import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Locale;

@Repository
@AllArgsConstructor
public class AuthUserProfileRepository {

    private final JdbcTemplate jdbcTemplate;

    public AuthUserProfileInfo readProfileInfo(Long staffId) {
        if (staffId == null) {
            return new AuthUserProfileInfo(null, null, null, null);
        }

        List<AuthUserProfileInfo> results = jdbcTemplate.query(
                """
                SELECT
                    s.FULL_NAME AS fullName,
                    s.EMPLOYMENT_STATUS AS status,
                    TO_CHAR(s.STAFF_DEPARTMENT_ID) AS departmentId,
                    d.DEPARTMENT_NAME AS departmentName
                FROM CMH.STAFF s
                LEFT JOIN CMH.STAFF_DEPARTMENT d ON d.STAFF_DEPARTMENT_ID = s.STAFF_DEPARTMENT_ID
                WHERE s.STAFF_ID = ?
                """,
                (rs, rowNum) -> {
                    String departmentId = rs.getString("departmentId");
                    String departmentName = rs.getString("departmentName");
                    return new AuthUserProfileInfo(
                            rs.getString("fullName"),
                            rs.getString("status"),
                            departmentId,
                            StringUtils.hasText(departmentName) ? departmentName : resolveDepartmentName(departmentId)
                    );
                },
                staffId
        );

        if (results.isEmpty()) {
            return new AuthUserProfileInfo(null, null, null, null);
        }

        return results.get(0);
    }

    public List<AuthUserSearchInfo> searchUsers(String keyword, int limit) {
        if (limit <= 0) {
            return List.of();
        }

        String normalizedKeyword = normalizeKeyword(keyword);
        if (!StringUtils.hasText(normalizedKeyword)) {
            return jdbcTemplate.query(
                    """
                    SELECT * FROM (
                        SELECT
                            a.ID AS userId,
                            a.LOGIN_ID AS username,
                            a.ROLE_CODE AS roleCode,
                            s.FULL_NAME AS fullName,
                            s.EMPLOYMENT_STATUS AS status,
                            TO_CHAR(s.STAFF_DEPARTMENT_ID) AS departmentId,
                            d.DEPARTMENT_NAME AS departmentName
                        FROM CMH.AUTH_USER a
                        LEFT JOIN CMH.STAFF s ON s.STAFF_ID = a.STAFF_ID
                        LEFT JOIN CMH.STAFF_DEPARTMENT d ON d.STAFF_DEPARTMENT_ID = s.STAFF_DEPARTMENT_ID
                        ORDER BY a.LOGIN_ID ASC
                    )
                    WHERE ROWNUM <= ?
                    """,
                    (rs, rowNum) -> mapSearchInfo(
                            rs.getString("userId"),
                            rs.getString("username"),
                            rs.getString("roleCode"),
                            rs.getString("fullName"),
                            rs.getString("status"),
                            rs.getString("departmentId"),
                            rs.getString("departmentName")
                    ),
                    limit
            );
        }

        String likeKeyword = toLikeKeyword(normalizedKeyword);
        return jdbcTemplate.query(
                """
                SELECT * FROM (
                    SELECT
                        a.ID AS userId,
                        a.LOGIN_ID AS username,
                        a.ROLE_CODE AS roleCode,
                        s.FULL_NAME AS fullName,
                        s.EMPLOYMENT_STATUS AS status,
                        TO_CHAR(s.STAFF_DEPARTMENT_ID) AS departmentId,
                        d.DEPARTMENT_NAME AS departmentName
                    FROM CMH.AUTH_USER a
                    LEFT JOIN CMH.STAFF s ON s.STAFF_ID = a.STAFF_ID
                    LEFT JOIN CMH.STAFF_DEPARTMENT d ON d.STAFF_DEPARTMENT_ID = s.STAFF_DEPARTMENT_ID
                    WHERE LOWER(a.ID) LIKE ? ESCAPE '\\'
                       OR LOWER(a.LOGIN_ID) LIKE ? ESCAPE '\\'
                       OR LOWER(NVL(s.FULL_NAME, '')) LIKE ? ESCAPE '\\'
                    ORDER BY a.LOGIN_ID ASC
                )
                WHERE ROWNUM <= ?
                """,
                (rs, rowNum) -> mapSearchInfo(
                        rs.getString("userId"),
                        rs.getString("username"),
                        rs.getString("roleCode"),
                        rs.getString("fullName"),
                        rs.getString("status"),
                        rs.getString("departmentId"),
                        rs.getString("departmentName")
                ),
                likeKeyword,
                likeKeyword,
                likeKeyword,
                limit
        );
    }

    private AuthUserSearchInfo mapSearchInfo(String userId,
                                             String username,
                                             String roleCode,
                                             String fullName,
                                             String status,
                                             String departmentId,
                                             String departmentName) {
        return new AuthUserSearchInfo(
                userId,
                username,
                StringUtils.hasText(fullName) ? fullName : username,
                roleCode,
                StringUtils.hasText(status) ? status : "INACTIVE",
                StringUtils.hasText(departmentName) ? departmentName : resolveDepartmentName(departmentId)
        );
    }

    private String normalizeKeyword(String keyword) {
        if (keyword == null) {
            return "";
        }

        return keyword.trim().toLowerCase(Locale.ROOT);
    }

    private String toLikeKeyword(String keyword) {
        return "%" + keyword
                .replace("\\", "\\\\")
                .replace("%", "\\%")
                .replace("_", "\\_") + "%";
    }

    private String resolveDepartmentName(String departmentId) {
        if (departmentId == null) {
            return null;
        }

        String normalized = departmentId.trim().toUpperCase(Locale.ROOT);
        if (normalized.isEmpty()) {
            return null;
        }

        return switch (normalized) {
            case "DEPT_MED", "INTERNAL_MEDICINE", "ORTHOPEDICS" -> "내과";
            case "DEPT_NURSING", "NURSING", "NURSING_DEPARTMENT" -> "간호부";
            case "DEPT_DIAG", "COMMON", "RADIOLOGY", "LAB", "RECEPTION" -> "진료지원";
            default -> departmentId;
        };
    }
}
