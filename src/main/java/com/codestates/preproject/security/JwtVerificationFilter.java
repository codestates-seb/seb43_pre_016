package com.codestates.preproject.security;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;


public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;


    public JwtVerificationFilter(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        Map<String,Object>claims=verifyJws(request);
        setAuthenticationToContext(claims);

        filterChain.doFilter(request,response);

    }
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException{
        String authorization= request.getHeader("Authorization");

        return authorization==null|| !authorization.startsWith("Bearer");
    }



    private void setAuthenticationToContext(Map<String, Object> claims) {
        String username=(String)claims.get("username");
        List< GrantedAuthority> authorities=authorityUtils.createAuthorities((List)claims.get("roles"));
        Authentication authentication=new UsernamePasswordAuthenticationToken(username,null,authorities);
        //권한포함된 인증된 ../ 홀더에 담는건  인증필터 여기서 권한만들고..인가 설정을?아..토큰만 전달되니까 풀어야되는구나..?
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    private Map<String, Object> verifyJws(HttpServletRequest request) {
        String jws =request.getHeader("Authorization").replace("Bearer ","");
        String base64EncodedSecretKey=jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String,Object> claims=jwtTokenizer.getClaims(jws,base64EncodedSecretKey).getBody();
       
        return claims;
        
    }
}
