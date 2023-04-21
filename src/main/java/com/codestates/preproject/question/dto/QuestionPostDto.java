package com.codestates.preproject.question.dto;

import jdk.jfr.Name;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class QuestionPostDto {

    private Long userId;

    private String title;

    private String body;

    private String bodyDetail;

}
