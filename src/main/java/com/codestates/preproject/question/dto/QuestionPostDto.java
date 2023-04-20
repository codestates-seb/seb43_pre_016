package com.codestates.preproject.question.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class QuestionPostDto {
    private String title;
    private String body;
    private Long UserId;
}
