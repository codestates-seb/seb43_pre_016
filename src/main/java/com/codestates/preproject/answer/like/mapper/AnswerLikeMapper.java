package com.codestates.preproject.answer.like.mapper;

import com.codestates.preproject.answer.like.dto.AnswerLikeDto;
import com.codestates.preproject.answer.like.entity.AnswerLike;
import org.mapstruct.Mapper;
import org.springframework.http.HttpStatus;

@Mapper(componentModel = "spring")
public interface AnswerLikeMapper {
     AnswerLikeDto.Response answerLikeToAnswerLikeResponseDto(AnswerLike answerLike);

     AnswerLike answerLikeDtoToAnswerLike(AnswerLikeDto.Post answerLikeDto);
}
