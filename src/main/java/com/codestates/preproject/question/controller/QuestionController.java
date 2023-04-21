package com.codestates.preproject.question.controller;


import com.codestates.preproject.question.dto.QuestionPatchDto;
import com.codestates.preproject.question.dto.QuestionPostDto;
import com.codestates.preproject.question.dto.QuestionResponseDto;
import com.codestates.preproject.question.entity.Question;
import com.codestates.preproject.question.mapper.QuestionMapper;
import com.codestates.preproject.question.service.QuestionService;
import com.codestates.preproject.response.MultiResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/questions")
@RequiredArgsConstructor
@Validated
public class QuestionController {
    private final QuestionService questionService;
    private final QuestionMapper mapper;

    @PostMapping
    public ResponseEntity<QuestionResponseDto> postQuestion(@Valid @RequestBody QuestionPostDto requestBody) {
        Question question = mapper.questionPostDtoToQuestion(requestBody);
        Question createdQuestion = questionService.createQuestion(question);
        return new ResponseEntity<>(mapper.questionToQuestionResponseDto(createdQuestion), HttpStatus.CREATED);
    }

    @PatchMapping("/{question-Id}")
    public ResponseEntity<QuestionResponseDto> patchQuestion(@PathVariable Long questionId,
                                                              @Valid @RequestBody QuestionPatchDto requestBody){
        Question question = mapper.questionPatchDtoToQuestion(requestBody);
        question.setQuestionId(questionId);
        Question updatedQuestion = questionService.updateQuestion(question);
        return new ResponseEntity<>(mapper.questionToQuestionResponseDto(updatedQuestion),HttpStatus.OK);
    }

    @GetMapping("/{questionId}")
    public ResponseEntity<QuestionResponseDto> getQuestion(@PathVariable Long questionId){
        Question question = questionService.findQuestion(questionId);
        QuestionResponseDto responseDto = mapper.questionToQuestionResponseDto(question);
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping
    public ResponseEntity getQuestions(@Positive @RequestParam int page,
                                         @Positive @RequestParam int size) {

        Page<Question> pageQuestions = questionService.findQuestions(page - 1, size);
        List<Question> questions = pageQuestions.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.questionsToQuestionResponseDtos(questions), pageQuestions), HttpStatus.OK);
    }

    @DeleteMapping("/{question-Id}")
    public ResponseEntity deleteQuestion(@PathVariable("question-id") Long questionId){
        questionService.deleteQuestion(questionId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @DeleteMapping
    public ResponseEntity deleteQuestions(){
        questionService.deleteAll();

        return  new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
