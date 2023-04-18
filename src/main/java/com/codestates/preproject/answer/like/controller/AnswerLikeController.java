package com.codestates.preproject.answer.like.controller;

import com.codestates.preproject.answer.entity.Answer;
import com.codestates.preproject.answer.like.dto.AnswerLikeDto;
import com.codestates.preproject.answer.like.entity.AnswerLike;
import com.codestates.preproject.answer.like.mapper.AnswerLikeMapper;
import com.codestates.preproject.answer.like.service.AnswerLikeService;
import com.codestates.preproject.answer.service.AnswerService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/answer/like")

public class AnswerLikeController {
    private final AnswerLikeMapper mapper;
    private final AnswerLikeService answerLikeService;

    public AnswerLikeController(AnswerLikeMapper mapper, AnswerLikeService answerLikeService) {
        this.mapper = mapper;
        this.answerLikeService = answerLikeService;
    }

    @PostMapping("/{user-id}")
    public ResponseEntity postLike(@PathVariable("user-id") @Positive long userId,
                                   @RequestBody AnswerLikeDto.Post answerLikeDto) {
        AnswerLike answerLike = mapper.answerLikeDtoToAnswerLike(answerLikeDto);

        AnswerLike createAnswerLike = answerLikeService.createAnswerLike(userId,answerLike);

        return new ResponseEntity<>(mapper.answerLikeToAnswerLikeResponseDto(createAnswerLike), HttpStatus.CREATED);

    }
}
