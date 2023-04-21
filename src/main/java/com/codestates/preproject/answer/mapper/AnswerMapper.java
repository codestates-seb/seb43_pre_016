package com.codestates.preproject.answer.mapper;

import com.codestates.preproject.answer.dto.AnswerDto;
import com.codestates.preproject.answer.entity.Answer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AnswerMapper {
    @Mapping(source ="questionId",target ="question.questionId")
    @Mapping(source="userId",target ="user.userId")
    Answer answerPostDtoToAnswer(AnswerDto.Post requestBody);
    Answer answerPatchDtoToAnswer(AnswerDto.Patch requestBody);
    @Mapping(source="user.userId",target="userId")
    @Mapping(source ="question.questionId",target ="questionId")
    AnswerDto.Response answerToAnswerResponseDto(Answer answer);
    AnswerDto.AnswerUserDto answerUser= new AnswerDto.AnswerUserDto();

    List<AnswerDto.Response> answersToResponseDtos(List<Answer> answers);


}

