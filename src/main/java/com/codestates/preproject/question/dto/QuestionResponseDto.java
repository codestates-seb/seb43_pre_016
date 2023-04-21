package com.codestates.preproject.question.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class QuestionResponseDto {

    private Long questionId;

    private String title;

    private String body;

    private String bodyDetail;

    private Long userId;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    private String createdBy;

    //private Integer likeCount;
    //private List<String> tags;
    //private Integer view;

}
