package com.codestates.preproject.question.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class QuestionPatchDto {

    private Long questionId;

    private String title;

    private String body;

    private String bodyDetail;
}
