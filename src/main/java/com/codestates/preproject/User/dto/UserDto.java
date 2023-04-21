package com.codestates.preproject.User.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.util.Assert;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class UserDto {
    @Setter
    @Getter
    @NoArgsConstructor
    public static class Post{

        @NotBlank
        @Email
        private String email;

        @NotBlank
        private String userName;

        @NotBlank
        private String password;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Patch {
        private long userId;

        private String userName;

        @Email
        private String email;

        private String password;

    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Response {
        private Long userId;
        private String userName;
        private String email;
        private LocalDateTime modifiedAt;
        private LocalDateTime createdAt;
        private String createdBy;
    }

}
