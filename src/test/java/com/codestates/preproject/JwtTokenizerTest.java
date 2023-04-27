//package com.codestates.preproject;
//
//import com.codestates.preproject.security.JwtTokenizer;
//import io.jsonwebtoken.io.Decoders;
//import org.junit.jupiter.api.BeforeAll;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.TestInstance;
//
//import java.util.*;
//
//import static org.hamcrest.MatcherAssert.assertThat;
//import static org.hamcrest.Matchers.is;
//import static org.hamcrest.Matchers.notNullValue;
//
//@TestInstance(TestInstance.Lifecycle.PER_CLASS)
//public class JwtTokenizerTest {
//
//    private static JwtTokenizer jwtTokenizer;
//    private String secretKey;
//    private String base64EncodedSecretKey;
//
//
//    @BeforeAll
//    public void init() {
//        jwtTokenizer = new JwtTokenizer();
//        secretKey = "ONE123456789101112131415161718192021222324252627282930";  // encoded "a2V2aW4xMjM0MTIzNDEyMzQxMjM0MTIzNDEyMzQxMjM0"
//
//        base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(secretKey);
//    }
//
//
//    @Test
//    public void encodeBase64SecretKeyTest() {
//        System.out.println(base64EncodedSecretKey);
//
//        assertThat(secretKey, is(new String(Decoders.BASE64.decode(base64EncodedSecretKey))));
//    }
//
//
//    @Test
//    public void generateAccessTokenTest() {
//        Map<String, Object> claims = new HashMap<>();
//        claims.put("memberId", 1);
//        claims.put("roles", List.of("USER"));
//
//        String subject = "test access token";
//        Calendar calendar = Calendar.getInstance();
//        calendar.add(Calendar.MINUTE, 10);
//        Date expiration = calendar.getTime();
//
//        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
//
//        System.out.println(accessToken);
//
//        assertThat(accessToken, notNullValue());
//    }
//
//
//    @Test
//    public void generateRefreshTokenTest() {
//        String subject = "test refresh token";
//        Calendar calendar = Calendar.getInstance();
//        calendar.add(Calendar.HOUR, 24);
//        Date expiration = calendar.getTime();
//
//        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);
//
//        System.out.println(refreshToken);
//
//        assertThat(refreshToken, notNullValue());
//    }
//
//}
