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
        private String user_name;

        @NotBlank
        private String password;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Patch {
        private long userId;

        private String user_name;

        @Email
        private String email;

        private String password;

        public Patch addUserId(Long userId){
            Assert.notNull(userId, "user id must not be null.");
            this.userId = userId;

            return this;
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Response {
        private Long userId;
        private String user_name;
        private String email;
        private LocalDateTime modifiedAt;
        private LocalDateTime createdAt;
        private String createdBy;
    }

}
