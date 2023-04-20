package com.codestates.preproject.answer.like.mapper;

import com.codestates.preproject.answer.like.dto.AnswerLikeDto;
import com.codestates.preproject.answer.like.entity.AnswerLike;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AnswerLikeMapper {
     @Mapping(source = "userId",target ="user.userId")
     @Mapping(source= "answerId",target ="answer.answerId")
     AnswerLike answerLikeDtoToAnswerLike(AnswerLikeDto.Post answerLikeDto);

     @Mapping(source = "user.userId",target ="userId")
     @Mapping(source = "answer.answerId",target ="answerId")
     AnswerLikeDto.Response answerLikeToAnswerLikeResponseDto(AnswerLike answerLike);
}
