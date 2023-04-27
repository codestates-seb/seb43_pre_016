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
//    @Mapping(source="user.userId",target="userId")
//    @Mapping(source ="question.questionId",target ="questionId")

  default AnswerDto.Response answerToAnswerResponseDto(Answer answer) {

       AnswerDto.Response response = new AnswerDto.Response();
       response.setAnswerId(answer.getAnswerId());
       response.setBody(answer.getBody());
       response.setUserId(answer.getUser().getUserId());
       response.setModifiedAt(answer.getModifiedAt());
       response.setCreatedBy(answer.getCreatedBy());
       response.setQuestionId(answer.getQuestion().getQuestionId());
       response.setUserName(answer.getUser().getUserName());
       response.setCreatedAt(answer.getCreatedAt());
       response.setLikeCount(answer.getLikeCount());
       return response;

   }

    List<AnswerDto.Response> answersToResponseDtos(List<Answer> answers);


}

