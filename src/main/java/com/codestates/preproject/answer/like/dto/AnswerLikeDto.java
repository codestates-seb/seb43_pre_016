package com.codestates.preproject.answer.like.dto;

import com.codestates.preproject.answer.like.entity.AnswerLike.LikeStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


public class AnswerLikeDto {

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Post {

        private long userId;
        private boolean answerLike;
        private int answerId;
    }

    @NoArgsConstructor
    @Getter
    @Setter
    public static class Response {
        private long answerId;
        private long userId;
        private LikeStatus likeStatus;

    }

}

