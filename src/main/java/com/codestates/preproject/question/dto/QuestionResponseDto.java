package com.codestates.preproject.question.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
public class QuestionResponseDto {
    private Long questionId;
    private String title;
    private String body;
    private Long userId;
    //private Integer likeCount;
    //private List<String> tags;
    //private Integer view;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public QuestionResponseDto(Long questionId, String title, String body, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.questionId = questionId;
        this.title = title;
        this.body = body;
        this.userId = userId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
