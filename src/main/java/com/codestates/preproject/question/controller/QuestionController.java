package com.codestates.preproject.question.controller;


import com.codestates.preproject.question.dto.QuestionPatchDto;
import com.codestates.preproject.question.dto.QuestionPostDto;
import com.codestates.preproject.question.dto.QuestionResponseDto;
import com.codestates.preproject.question.entity.Question;
import com.codestates.preproject.question.mapper.QuestionMapper;
import com.codestates.preproject.question.repository.QuestionRepository;
import com.codestates.preproject.question.service.QuestionService;
import com.codestates.preproject.response.MultiResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/questions")
@RequiredArgsConstructor
@Validated
//@CrossOrigin(origins = "https://e6c9-121-143-130-149.jp.ngrok.io", maxAge = 3600)
public class QuestionController {
    private final QuestionService questionService;
    private final QuestionMapper mapper;

    private QuestionRepository questionRepository;

    @PostMapping
    public ResponseEntity<QuestionResponseDto> postQuestion(@Valid @RequestBody QuestionPostDto requestBody) {
        Question question = mapper.questionPostDtoToQuestion(requestBody);
        Question createdQuestion = questionService.createQuestion(question);
        return new ResponseEntity<>(mapper.questionToQuestionResponseDto(createdQuestion), HttpStatus.CREATED);
    }

    @PatchMapping("/{question-Id}")
    public ResponseEntity<QuestionResponseDto> patchQuestion(@PathVariable("question-Id") Long questionId,
                                                             @AuthenticationPrincipal String email,
                                                              @Valid @RequestBody QuestionPatchDto requestBody) throws Exception{
        questionService.verifiedSameUser(questionId,email);
        requestBody.setQuestionId(questionId);

        Question question = mapper.questionPatchDtoToQuestion(requestBody);

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
    public ResponseEntity deleteQuestion(@PathVariable("question-Id") Long questionId,
                                         @AuthenticationPrincipal String email){
        questionService.verifiedSameUser(questionId,email);
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

    //검색기능
    @GetMapping(value = "/search", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<?> search(@RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "10") int size,
                                    @RequestParam(defaultValue = "questionId") String sortBy,
                                    @RequestParam(defaultValue = "desc") String sortOrder,
                                    @RequestParam(defaultValue = "") String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Keyword cannot be empty");
        }
        Sort sort = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        PageRequest pageRequest = PageRequest.of(page, size, sort);
        Page<Question> questions = questionRepository.search(keyword, pageRequest);
        return ResponseEntity.ok().body(questions);
    }


}
