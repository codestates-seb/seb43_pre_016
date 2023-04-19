package com.codestates.preproject.answer.like.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
public class AnswerLikeDto {


    @Getter @Setter
    public static class Post{
        private boolean answerLike; //좋아요의 여부
        private int answerId; //답변 ID
    }
    @AllArgsConstructor
    @Getter @Setter
    public static  class Response {
        private long answerId;
        private long userId;
        private boolean answerLike; //좋아요의 여부
//        private long userLikeId; //user가 누른 좋아요수

    }



}
