package com.codestates.preproject.question.controller;

import com.codestates.preproject.question.dto.QuestionResponseDto;
import com.codestates.preproject.question.entity.QuestionEntity;
import com.codestates.preproject.question.mapper.QuestionMapper;
import com.codestates.preproject.question.dto.QuestionPatchDto;
import com.codestates.preproject.question.dto.QuestionPostDto;
import com.codestates.preproject.question.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/questions")
@RequiredArgsConstructor
@Validated
public class QuestionController {

    private final QuestionService questionService;
    private final QuestionMapper mapper;

    @PostMapping
    public ResponseEntity<QuestionResponseDto> postQuestion(@Valid @RequestBody QuestionPostDto requestBody){
        QuestionEntity question = mapper.questionPostDtoToQuestion(requestBody);
        QuestionEntity createdQuestion = questionService.createQuestion(question);
        QuestionResponseDto responseDto = mapper.questionToQuestionResponseDto(createdQuestion);
        return ResponseEntity.created(URI.create("/questions/" + responseDto.getQuestionId())).body(responseDto);
    }

    @PatchMapping("/{questionId}")
    public ResponseEntity<QuestionResponseDto> patchQuestion(@PathVariable Long questionId,
                                                                         @Valid @RequestBody QuestionPatchDto requestBody){
        QuestionEntity question = mapper.questionPatchDtoToQuestion(requestBody);
        question.setQuestionId(questionId);
        QuestionEntity updatedQuestion = questionService.updateQuestion(question);
        QuestionResponseDto responseDto = mapper.questionToQuestionResponseDto(updatedQuestion);
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/{questionId}")
    public ResponseEntity<QuestionResponseDto> getQuestion(@PathVariable Long questionId){
        QuestionEntity question = questionService.findQuestion(questionId);
        QuestionResponseDto responseDto = mapper.questionToQuestionResponseDto(question);
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping
    public ResponseEntity<List<QuestionResponseDto>> getQuestions(@RequestParam(defaultValue = "0") int page,
                                                                  @RequestParam(defaultValue = "15") int size){
        Page<QuestionEntity> questions = questionService.findQuestions(page, size);
        List<QuestionResponseDto> responseDtos = mapper.questionsToQuestionResponseDtos(questions.getContent());
        return ResponseEntity.ok(responseDtos);
    }

    @DeleteMapping("/{questionId}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long questionId){
        questionService.deleteQuestion(questionId);
        return ResponseEntity.noContent().build();
    }
}
