package com.codestates.preproject.answer.dto;

import com.codestates.preproject.User.entity.User;
import com.codestates.preproject.answer.entity.Answer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class AnswerDto {
    @Setter
    @Getter
    @NoArgsConstructor
    public static class Post {

        @NotNull
        private long questionId;

        @NotBlank
        private String body;

        @NotNull
        private long userId;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Patch {

        @NotNull
        private long answerId;
        @NotBlank
        private String body;
    }


    @Getter
    @Setter
    @NoArgsConstructor
    public static class Response {

        private long answerId;
        private String body;
        private int likeCount;
        private long userId;
//      private AnswerDto.UserDto User;
        private long questionId;
        private LocalDateTime modifiedAt;
        private LocalDateTime createdAt;
        private String createdBy;


        }
//        @Setter
//        @NoArgsConstructor
//        public static class UserDto {
//            private String email;
//
//            private String user_name;
//
//            private String password;
//        }

    }

