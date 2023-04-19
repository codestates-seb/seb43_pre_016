package com.codestates.preproject.question.mapper;

import com.codestates.preproject.question.dto.QuestionPatchDto;
import com.codestates.preproject.question.dto.QuestionPostDto;
import com.codestates.preproject.question.dto.QuestionResponseDto;
import com.codestates.preproject.question.entity.QuestionEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
    QuestionEntity questionPostDtoToQuestion(QuestionPostDto requestBody);
    QuestionEntity questionPatchDtoToQuestion(QuestionPatchDto requestBody);
    QuestionResponseDto.responseDto questionToQuestionResponseDto(QuestionEntity question);
    List<QuestionResponseDto> questionsToQuestionResponseDtos(List<QuestionEntity> questions);
}
