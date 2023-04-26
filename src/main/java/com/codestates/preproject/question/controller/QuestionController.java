package com.codestates.preproject.question.controller;


import com.codestates.preproject.answer.entity.Answer;
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
    public ResponseEntity<QuestionResponseDto> patchQuestion(@PathVariable("question-Id") Long questionId,
                                                              @Valid @RequestBody QuestionPatchDto requestBody){
        Question question = mapper.questionPatchDtoToQuestion(requestBody);
        question.setQuestionId(questionId);
        Question updatedQuestion = questionService.updateQuestion(question);
        return new ResponseEntity<>(mapper.questionToQuestionResponseDto(updatedQuestion),HttpStatus.OK);
    }

    @GetMapping("/{question-Id}")
    public ResponseEntity<QuestionResponseDto> getQuestion(@PathVariable("question-Id") Long questionId){
        QuestionResponseDto responseDto = questionService.findQuestion(questionId);
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
    public ResponseEntity deleteQuestion(@PathVariable("question-Id") Long questionId){
        questionService.deleteQuestion(questionId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @DeleteMapping
    public ResponseEntity deleteQuestions(){
        questionService.deleteAll();

        return  new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @PostMapping("/{question-id}/like/{user-id}")
    public ResponseEntity likeQuestion(@PathVariable("question-id") long questionId,
                                     @PathVariable("user-id")long userId) {

        Question likedQuestion = questionService.likeQuestion(questionId,userId);

        return new ResponseEntity<>(mapper.questionToQuestionResponseDto(likedQuestion),HttpStatus.OK);
    }

    @PostMapping("/{question-id}/dislike/{user-id}")
    public ResponseEntity dislikeQuestion(@PathVariable("question-id") long questionId,
                                        @PathVariable("user-id") long userId) {

        Question dislikedQuestion= questionService.dislikeQuestion(questionId,userId);


        return new ResponseEntity<>(mapper.questionToQuestionResponseDto(dislikedQuestion),HttpStatus.OK);
    }

}
