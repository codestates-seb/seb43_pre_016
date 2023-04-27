package com.codestates.preproject.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfiguration {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    public SecurityConfiguration(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .cors(withDefaults())   //프론트와문제시 확인해볼것
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .apply(new CustomFilterConfigurer())
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(new UserAuthenticationEntryPoint())  //인증필터들 먼저 적용하고 핸들러추가해도 되겟지?
                .accessDeniedHandler(new UserAccessDeniedHandler())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers(HttpMethod.POST,"/users").permitAll()
                        .antMatchers(HttpMethod.POST,"/*").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE,"/*/*").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE,"/*").hasRole("ADMIN")

                );
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }


    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        var configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST", "PATCH", "DELETE"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer,HttpSecurity>{

        @Override
        public void configure(HttpSecurity builder) throws Exception{
            AuthenticationManager authenticationManager= builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter=new JwtAuthenticationFilter(authenticationManager,jwtTokenizer);
            jwtAuthenticationFilter.setFilterProcessesUrl("/auth/login");// requestUrL 설정.

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new UserAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new UserAuthenticationFailureHandler());

            builder.addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }
}
