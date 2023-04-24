package com.codestates.preproject.answer.dto;
import com.codestates.preproject.user.entity.User;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class AnswerDto {
    @Setter
    @Getter
    @NoArgsConstructor
    public static class Post {
        @NotNull

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
        private String userName;
        private long questionId;
        private LocalDateTime modifiedAt;
        private LocalDateTime createdAt;
        private String createdBy;


    }

    //22일 수정
    @Getter
    @Setter
    public static class MyPageDto {
        private long answerId;
        private String body;
        private LocalDateTime crestedAt;

//        private long answerCount;
    }
}

