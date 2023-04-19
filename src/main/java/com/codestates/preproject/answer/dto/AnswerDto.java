package com.codestates.preproject.answer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class AnswerDto {
    @AllArgsConstructor
    @Getter
    public static class Post {
        @NotBlank
        private long questionId;

        @NotBlank
        private String body;

    }

    @AllArgsConstructor
    @Getter
    @Setter
    public static class Patch {
        private long answerId;
        @NotBlank
        private String body;
    }

    @AllArgsConstructor
    @Getter
    public static class Response {

        private long answerId;
        private String body;
        //private int like;
        private long userId;  //질문 작성자
        private LocalDateTime createAt; // 생성일
        private LocalDateTime modifiedAt; // 수정일

    }

}
