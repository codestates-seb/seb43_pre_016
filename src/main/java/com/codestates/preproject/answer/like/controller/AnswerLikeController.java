package com.codestates.preproject.answer.like.controller;

import com.codestates.preproject.answer.like.dto.AnswerLikeDto;
import com.codestates.preproject.answer.like.entity.AnswerLike;
import com.codestates.preproject.answer.like.mapper.AnswerLikeMapper;
import com.codestates.preproject.answer.like.service.AnswerLikeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/answer/like")
public class AnswerLikeController {
    private final AnswerLikeMapper mapper;
    private final AnswerLikeService answerLikeService;

    public AnswerLikeController(AnswerLikeMapper mapper, AnswerLikeService answerLikeService) {
        this.mapper = mapper;
        this.answerLikeService = answerLikeService;
    }

     @PostMapping
    public ResponseEntity postLike(@RequestBody AnswerLikeDto.Post answerLikeDto) {
        AnswerLike AnswerLike = answerLikeService.createAnswerLike(mapper.answerLikeDtoToAnswerLike(answerLikeDto));

        return new ResponseEntity<>(mapper.answerLikeToAnswerLikeResponseDto(AnswerLike), HttpStatus.CREATED);

    }
}
