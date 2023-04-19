package com.codestates.preproject.question.dto;

import lombok.*;

import java.time.LocalDateTime;


public class QuestionResponseDto {
    @Getter
    @Setter
    public class responseDto{
        private Long questionId;
        private String title;
        private String body;
        private Long userId;
        //private Integer likeCount;
        //private List<String> tags;
        //private Integer view;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

    }
}
