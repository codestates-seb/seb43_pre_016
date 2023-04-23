package com.codestates.preproject.answer.mapper;

import com.codestates.preproject.answer.dto.AnswerDto;
import com.codestates.preproject.answer.entity.Answer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper(componentModel = "spring")
@Component//빈 인식 못해서 모든 매퍼에 추가함, 없어도 다른 환경에서 실행되는 경우가 있어서 문제되면 지워도 괜찮습니다.
public interface AnswerMapper {
    @Mapping(source ="questionId",target ="question.questionId")
    @Mapping(source="userId",target ="user.userId")
    Answer answerPostDtoToAnswer(AnswerDto.Post requestBody);
    Answer answerPatchDtoToAnswer(AnswerDto.Patch requestBody);
    @Mapping(source="user.userId",target="userId")
    @Mapping(source ="question.questionId",target ="questionId")
    AnswerDto.Response answerToAnswerResponseDto(Answer answer);
//    AnswerDto.AnswerUserDto answerUser= new AnswerDto.AnswerUserDto();

    List<AnswerDto.Response> answersToResponseDtos(List<Answer> answers);


}

