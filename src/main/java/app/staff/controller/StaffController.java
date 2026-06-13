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
@RequestMapping("/api/staff")
public class StaffController {

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public StaffController(NamedParameterJdbcTemplate namedParameterJdbcTemplate) {
        this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<StaffSummaryResponse>>> getStaff(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String role) {
        StringBuilder sql = new StringBuilder("""
                SELECT * FROM (
                    SELECT
                        a.ID AS id,
                        a.LOGIN_ID AS username,
                        NVL(s.FULL_NAME, a.LOGIN_ID) AS fullName,
                        a.ROLE_CODE AS roleCode,
                        NVL(s.EMPLOYMENT_STATUS, a.ACCOUNT_STATUS) AS statusCode,
                        CAST(NULL AS VARCHAR2(200)) AS officeLocation,
                        s.STAFF_DEPARTMENT_ID AS deptId,
                        d.DEPARTMENT_NAME AS deptName,
                        CAST(NULL AS NUMBER) AS positionId,
                        CAST(NULL AS VARCHAR2(200)) AS positionTitle
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

        sql.append(" ORDER BY a.ID ) WHERE ROWNUM <= 200");

        List<StaffSummaryResponse> result = namedParameterJdbcTemplate.query(
                sql.toString(),
                params,
                (rs, rowNum) -> new StaffSummaryResponse(
                        rs.getString("id"),
                        rs.getString("username"),
                        rs.getString("fullName"),
                        rs.getString("roleCode"),
                        rs.getString("statusCode"),
                        rs.getString("officeLocation"),
                        rs.getString("deptId"),
                        rs.getString("deptName"),
                        rs.getString("positionId"),
                        rs.getString("positionTitle")
                )
        );

        return ResponseEntity.ok(new ApiResponse<List<StaffSummaryResponse>>().ok(result));
    }

    @GetMapping("/departments")
    public ResponseEntity<ApiResponse<List<DepartmentResponse>>> getDepartments() {
        String sql = """
                SELECT
                    d.DEPARTMENT_ID AS id,
                    d.DEPARTMENT_NAME AS name,
                    CAST(NULL AS VARCHAR2(200)) AS location
                FROM CMH.STAFF_DEPARTMENT d
                ORDER BY d.DEPARTMENT_ID
                """;

        List<DepartmentResponse> result = namedParameterJdbcTemplate.query(
                sql,
                new MapSqlParameterSource(),
                (rs, rowNum) -> new DepartmentResponse(
                        rs.getString("id"),
                        rs.getString("name"),
                        rs.getString("location")
                )
        );

        return ResponseEntity.ok(new ApiResponse<List<DepartmentResponse>>().ok(result));
    }

    @GetMapping("/locations")
    public ResponseEntity<ApiResponse<List<String>>> getLocations() {
        return ResponseEntity.ok(new ApiResponse<List<String>>().ok(List.of()));
    }

    @GetMapping("/ping")
    public ResponseEntity<ApiResponse<String>> ping() {
        return ResponseEntity.ok(new ApiResponse<String>().ok("success", "pong"));
    }

    public record StaffSummaryResponse(
            String id,
            String username,
            String fullName,
            String roleCode,
            String statusCode,
            String officeLocation,
            String deptId,
            String deptName,
            String positionId,
            String positionTitle
    ) {
    }

    public record DepartmentResponse(
            String id,
            String name,
            String location
    ) {
    }
}
