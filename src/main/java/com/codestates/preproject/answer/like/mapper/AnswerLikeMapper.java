package com.codestates.preproject.answer.like.mapper;

import com.codestates.preproject.answer.like.dto.AnswerLikeDto;
import com.codestates.preproject.answer.like.entity.AnswerLike;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
@Component//빈 인식 못해서 모든 매퍼에 추가함, 없어도 다른 환경에서 실행되는 경우가 있어서 문제되면 지워도 괜찮습니다.
public interface AnswerLikeMapper {
     @Mapping(source = "userId",target ="user.userId")
     @Mapping(source= "answerId",target ="answer.answerId")
     AnswerLike answerLikeDtoToAnswerLike(AnswerLikeDto.Post answerLikeDto);

     @Mapping(source = "user.userId",target ="userId")
     @Mapping(source = "answer.answerId",target ="answerId")
     AnswerLikeDto.Response answerLikeToAnswerLikeResponseDto(AnswerLike answerLike);
}
