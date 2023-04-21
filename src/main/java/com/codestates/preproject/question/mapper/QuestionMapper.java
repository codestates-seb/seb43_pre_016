package com.codestates.preproject.question.mapper;

import com.codestates.preproject.question.dto.QuestionResponseDto;
import com.codestates.preproject.question.dto.QuestionPatchDto;
import com.codestates.preproject.question.dto.QuestionPostDto;
import com.codestates.preproject.question.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
     @Mapping(source = "userId",target ="user.userId")
     Question questionPostDtoToQuestion(QuestionPostDto questionPostDto);


     Question questionPatchDtoToQuestion(QuestionPatchDto questionPatchDto);

     @Mapping(source = "user.userId",target = "userId")
     QuestionResponseDto questionToQuestionResponseDto(Question question);

    List<QuestionResponseDto> questionsToQuestionResponseDtos(List<Question> questions);

}
