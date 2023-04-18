package com.codestates.preproject.answer.like.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
public class AnswerLikeDto {


    public static class Post{
        private boolean answerLike; //좋아요 수
        private int answerId; //답변 ID
    }

    public static  class Response {
        private long answerId;
        private long userId;

    }



}
