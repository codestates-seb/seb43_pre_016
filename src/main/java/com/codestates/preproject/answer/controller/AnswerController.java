package com.codestates.preproject.answer.controller;

import com.codestates.preproject.answer.UriCreator;
import com.codestates.preproject.answer.dto.AnswerDto;
import com.codestates.preproject.answer.entity.Answer;
import com.codestates.preproject.answer.mapper.AnswerMapper;
import com.codestates.preproject.answer.repository.AnswerRepository;
import com.codestates.preproject.answer.service.AnswerService;
import com.codestates.preproject.response.MultiResponseDto;
import com.codestates.preproject.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/answers")
@Validated
public class AnswerController {

    private final static String ANSWERS_DEFAULT_URL = "/answers";

    private final AnswerService answerService;

    private final AnswerMapper mapper;

    private final AnswerRepository answerRepository;

    private final UserRepository userRepository;

    @PostMapping
    public ResponseEntity postAnswer(@Valid @RequestBody AnswerDto.Post answerDto,
                                     @AuthenticationPrincipal String email) {

        Answer answer = mapper.answerPostDtoToAnswer(answerDto);
        Answer createdAnswer = answerService.createAnswer(answer);
        URI location = UriCreator.createUri(ANSWERS_DEFAULT_URL, createdAnswer.getAnswerId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{answer-id}")
    public ResponseEntity patchAnswer(@PathVariable("answer-id") @Positive Long answerId,
                                      @Valid @RequestBody AnswerDto.Patch answerDto,
                                      @AuthenticationPrincipal String email) {
        answerService.verifiedSameUser(answerId, email);
        answerDto.setAnswerId(answerId);
        Answer updatedAnswer = answerService.updateAnswer(mapper.answerPatchDtoToAnswer(requestBody));

        return new ResponseEntity<>(mapper.answerToAnswerResponseDto(updatedAnswer), HttpStatus.OK);
    }

    @GetMapping("/{answer-id}")
    public ResponseEntity getAnswer(@PathVariable("answer-id") @Positive Long answerId) {

         Answer findAnswer = answerService.findAnswer(answerId);


        return new ResponseEntity<>(mapper.answerToAnswerResponseDto(findAnswer), HttpStatus.OK);
    }

    @GetMapping("question/{question-id}")
    public ResponseEntity getAnswerForQ(@PathVariable("question-id") @Positive Long questionId) {
        List<Answer> answers= answerRepository.findByQuestionQuestionId(questionId);

        return new ResponseEntity<>(mapper.answersToResponseDtos(answers), HttpStatus.OK);
    }


    @GetMapping
    public ResponseEntity getAnswers(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size) {
        Page<Answer> pageAnswers = answerService.findAnswers(page - 1, size);
        List<Answer> answers = pageAnswers.getContent();

        return  new ResponseEntity<>(
               new MultiResponseDto<>(mapper.answersToResponseDtos(answers),pageAnswers),HttpStatus.OK);

    }

    @DeleteMapping("/{answer-id}")
    public ResponseEntity deleteAnswer(@PathVariable("answer-id") @Positive Long answerId,
                                       @AuthenticationPrincipal String email) {
        answerService.verifiedSameUser(answerId,email);
        answerService.deleteAnswer(answerId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping
    public ResponseEntity deleteAll() {
        answerService.deleteAll();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{answer-id}/like/{user-id}")
    public ResponseEntity likeAnswer(@PathVariable("answer-id") long answerId,
                                     @PathVariable("user-id")long userId) {

        Answer likedAnswer=answerService.likeAnswer(answerId,userId);

        return new ResponseEntity<>(mapper.answerToAnswerResponseDto(likedAnswer),HttpStatus.OK);
    }

    @PostMapping("/{answer-id}/dislike/{user-id}")
    public ResponseEntity dislikeAnswer(@PathVariable("answer-id") long answerId,
                                        @PathVariable("user-id") long userId) {

        Answer dislikedAnswer=answerService.dislikeAnswer(answerId,userId);


        return new ResponseEntity<>(mapper.answerToAnswerResponseDto(dislikedAnswer),HttpStatus.OK);
    }
}

