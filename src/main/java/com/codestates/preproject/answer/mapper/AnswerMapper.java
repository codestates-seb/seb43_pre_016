package com.codestates.preproject.answer.mapper;

import com.codestates.preproject.answer.dto.AnswerDto;
import com.codestates.preproject.answer.entity.Answer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AnswerMapper {
    @Mapping(source ="questionId",target ="questionEntity.questionId")
    @Mapping(source="userId",target ="user.userId")
    Answer answerPostDtoToAnswer(AnswerDto.Post requestBody);
    Answer answerPatchDtoToAnswer(AnswerDto.Patch requestBody);
    @Mapping(source="user.userId",target="userId")
    @Mapping(source ="questionEntity.questionId",target ="questionId")
    AnswerDto.Response answerToAnswerResponseDto(Answer answer);

    List<AnswerDto.Response> answersToResponseDtos(List<Answer> answers);


}

