package com.codestates.preproject.answer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

public class AnswerDto {
    @AllArgsConstructor
    @Getter
    public static class Post {
        @NotBlank
        private String title;
        @NotBlank
        private String body;

    }

    @AllArgsConstructor
    @Getter
    @Setter
    public static class Patch {

        private long answerId;
        @NotBlank
        private String title;
        @NotBlank
        private String body;


    }

    @AllArgsConstructor
    @Getter
    public static class Response {

        private long answerId;
        private String title;
        private String body;
        //private int like;

    }

}
