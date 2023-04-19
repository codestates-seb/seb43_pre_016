package com.codestates.preproject.question.controller;

import com.codestates.preproject.question.dto.QuestionPostDto;
import com.codestates.preproject.question.dto.QuestionResponseDto;
import com.codestates.preproject.question.entity.QuestionEntity;
import com.codestates.preproject.question.mapper.QuestionMapper;
import com.codestates.preproject.question.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/questions")
@Validated
@RequiredArgsConstructor
public class QuestionController {
    private final QuestionService questionService;
    private final QuestionMapper mapper;
    //로그인 한 뒤 질문글 작성
    @PostMapping
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionPostDto requestBody){
        QuestionEntity question = mapper.questionPostDtoToQuestion(requestBody);
        QuestionEntity createdQuestion = questionService.createQuestion(question);

    }
    public ResponseEntity patchQuestion(){}
    public ResponseEntity getQuestion(){}
    public ResponseEntity deleteQuestion(){}



}
