package app.staff.controller;

import app.common.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/jpa/medical-staff")
public class StaffJpaCompatController {

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public StaffJpaCompatController(NamedParameterJdbcTemplate namedParameterJdbcTemplate) {
        this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<StaffListItemResponse>>> list(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String role,
            @RequestParam(required = false) String departmentId) {
        StringBuilder sql = new StringBuilder("""
                SELECT * FROM (
                    SELECT
                        a.ID AS id,
                        a.LOGIN_ID AS username,
                        NVL(s.FULL_NAME, a.LOGIN_ID) AS fullName,
                        a.ROLE_CODE AS roleCode,
                        NVL(s.EMPLOYMENT_STATUS, a.ACCOUNT_STATUS) AS statusCode,
                        s.STAFF_DEPARTMENT_ID AS deptId,
                        d.DEPARTMENT_NAME AS deptName
                    FROM CMH.AUTH_USER a
                    LEFT JOIN CMH.STAFF s ON s.STAFF_ID = a.STAFF_ID
                    LEFT JOIN CMH.STAFF_DEPARTMENT d ON d.DEPARTMENT_ID = s.STAFF_DEPARTMENT_ID
                    WHERE 1 = 1
                """);

        MapSqlParameterSource params = new MapSqlParameterSource();

        if (StringUtils.hasText(keyword)) {
            sql.append("""
                    AND (
                        LOWER(a.LOGIN_ID) LIKE :keyword
                        OR LOWER(NVL(s.FULL_NAME, '')) LIKE :keyword
                        OR LOWER(a.ID) LIKE :keyword
                    )
                    """);
            params.addValue("keyword", "%" + keyword.trim().toLowerCase() + "%");
        }

        if (StringUtils.hasText(role)) {
            sql.append(" AND UPPER(NVL(a.ROLE_CODE, '')) = :role ");
            params.addValue("role", role.trim().toUpperCase());
        }

        if (StringUtils.hasText(departmentId)) {
            sql.append(" AND NVL(s.STAFF_DEPARTMENT_ID, '') = :departmentId ");
            params.addValue("departmentId", departmentId.trim());
        }

        sql.append(" ORDER BY a.ID ) WHERE ROWNUM <= 200");

        List<StaffListItemResponse> result = namedParameterJdbcTemplate.query(
                sql.toString(),
                params,
                (rs, rowNum) -> new StaffListItemResponse(
                        rs.getString("id"),
                        rs.getString("username"),
                        rs.getString("fullName"),
                        rs.getString("roleCode"),
                        rs.getString("statusCode"),
                        rs.getString("deptId"),
                        rs.getString("deptName")
                )
        );

        return ResponseEntity.ok(new ApiResponse<List<StaffListItemResponse>>().ok(result));
    }

    public record StaffListItemResponse(
            String id,
            String username,
            String fullName,
            String roleCode,
            String statusCode,
            String deptId,
            String deptName
    ) {
    }
}
