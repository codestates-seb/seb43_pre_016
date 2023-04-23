package com.codestates.preproject.question.mapper;

import com.codestates.preproject.question.dto.QuestionResponseDto;
import com.codestates.preproject.question.dto.QuestionPatchDto;
import com.codestates.preproject.question.dto.QuestionPostDto;
import com.codestates.preproject.question.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper(componentModel = "spring")
@Component//빈 인식 못해서 모든 매퍼에 추가함, 없어도 다른 환경에서 실행되는 경우가 있어서 문제되면 지워도 괜찮습니다.
public interface QuestionMapper {
     @Mapping(source = "userId",target ="user.userId")
     Question questionPostDtoToQuestion(QuestionPostDto questionPostDto);


     Question questionPatchDtoToQuestion(QuestionPatchDto questionPatchDto);

     @Mapping(source = "user.userId",target = "userId")
     QuestionResponseDto questionToQuestionResponseDto(Question question);

    List<QuestionResponseDto> questionsToQuestionResponseDtos(List<Question> questions);

}
