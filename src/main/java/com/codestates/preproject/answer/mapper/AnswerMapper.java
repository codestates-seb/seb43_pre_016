package com.codestates.preproject.answer.mapper;

import com.codestates.preproject.User.entity.User;
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
//    @Mapping(source = "answer.user",target ="userId" )
    AnswerDto.Response answerToAnswerResponseDto(Answer answer);
//        AnswerDto.UserDto User= new AnswerDto.UserDto();
//        User.setUser_name(answer.getUser().getUser_name());
//        User.setEmail(answer.getUser().getEmail());
//        AnswerDto.Response response= new AnswerDto.Response();
//            response.setUser(User);
//            response.setQuestionId(answer.getQuestionEntity().getQuestionId());
//            response.setUserId(answer.getUser().getUserId());
//            response.setAnswerId(answer.getAnswerId());
//            response.setBody(answer.getBody());
//            response.setLikeCount(answer.getLikeCount());
//            response.setModifiedAt(answer.getModifiedAt());
//            response.setCreatedAt(answer.getCreatedAt());
//            response.setCreatedBy(answer.getCreatedBy());
//        return response;


    List<AnswerDto.Response> answersToResponseDtos(List<Answer> answers);


}

