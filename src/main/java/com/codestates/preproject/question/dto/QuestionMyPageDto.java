package com.codestates.preproject.question.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class QuestionMyPageDto { //22일 수정
    private long questionId;
    private String title;
    private LocalDateTime createdAt;
//    private long answerCount;
}
