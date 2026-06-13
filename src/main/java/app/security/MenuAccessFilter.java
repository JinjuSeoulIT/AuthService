package app.security;

import app.auth.menu.service.MenuService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Set;

@Component
public class MenuAccessFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(MenuAccessFilter.class);
    private final MenuService menuService;

    public MenuAccessFilter(MenuService menuService) {
        this.menuService = menuService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String path = request.getRequestURI();
        if (isUnrestrictedPath(path)) {
            filterChain.doFilter(request, response);
            return;
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            filterChain.doFilter(request, response);
            return;
        }

        String username = authentication.getName();
        Set<String> allowedPaths = menuService.getAuthorizedMenuPaths(username);

        if (isPathAllowed(path, allowedPaths)) {
            filterChain.doFilter(request, response);
            return;
        }

        log.warn("Access denied for {} against allowed menu paths {}", path, allowedPaths);
        response.setStatus(HttpStatus.FORBIDDEN.value());
    }

    private boolean isUnrestrictedPath(String path) {
        return path.startsWith("/api/auth")
                || path.startsWith("/api/menus")
                || path.startsWith("/oauth2/")
                || path.startsWith("/login/oauth2/")
                || path.startsWith("/swagger-ui")
                || path.startsWith("/v3/api-docs")
                || path.startsWith("/api-docs")
                || path.startsWith("/error")
                || path.startsWith("/api/admin");
    }

    private boolean isPathAllowed(String requestPath, Set<String> allowedPaths) {
        if (allowedPaths == null || allowedPaths.isEmpty()) {
            return false;
        }

        String normalized = StringUtils.trimAllWhitespace(requestPath.toLowerCase());
        String normalizedWithoutApi = stripApiPrefix(normalized);
        String normalizedCompatibility = toCompatibilityPath(normalizedWithoutApi);

        for (String allowed : allowedPaths) {
            if (!StringUtils.hasText(allowed)) {
                continue;
            }
            String candidate = allowed.toLowerCase();
            if (matches(normalized, candidate)
                    || matches(normalizedWithoutApi, candidate)
                    || matches(normalizedCompatibility, candidate)) {
                return true;
            }
        }
        return false;
    }

    private boolean matches(String requestPath, String allowedPath) {
        if (!StringUtils.hasText(requestPath) || !StringUtils.hasText(allowedPath)) {
            return false;
        }
        if (requestPath.equals(allowedPath)) {
            return true;
        }
        return requestPath.startsWith(allowedPath + "/");
    }

    private String stripApiPrefix(String path) {
        if (!StringUtils.hasText(path)) {
            return path;
        }
        if (path.equals("/api")) {
            return "/";
        }
        if (path.startsWith("/api/")) {
            return path.substring(4);
        }
        return path;
    }

    private String toCompatibilityPath(String path) {
        if (!StringUtils.hasText(path)) {
            return path;
        }
        if (path.startsWith("/staff/departments")) {
            return path.replaceFirst("/staff/departments", "/staff/department");
        }
        if (path.startsWith("/staff/locations")) {
            return path.replaceFirst("/staff/locations", "/staff/location");
        }
        if (path.startsWith("/jpa/medical-staff")) {
            return path.replaceFirst("/jpa/medical-staff", "/staff");
        }
        return path;
    }
}
