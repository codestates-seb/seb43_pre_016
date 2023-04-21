package com.codestates.preproject.question.mapper;

import com.codestates.preproject.User.entity.User;
import com.codestates.preproject.question.dto.QuestionResponseDto;
import com.codestates.preproject.question.entity.QuestionEntity;
import com.codestates.preproject.question.dto.QuestionPatchDto;
import com.codestates.preproject.question.dto.QuestionPostDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
@Component
@RequiredArgsConstructor
public class QuestionMapper {
    public QuestionEntity questionPostDtoToQuestion(QuestionPostDto questionPostDto) {
        if (questionPostDto == null) return null;

        QuestionEntity question = new QuestionEntity();
        question.setTitle(questionPostDto.getTitle());
        question.setBody(questionPostDto.getBody());

        User user = new User();
        user.setUserId(questionPostDto.getUserId());
        question.setUser(user);

        return question;
    }

    public QuestionEntity questionPatchDtoToQuestion(QuestionPatchDto questionPatchDto) {
        if (questionPatchDto == null) return null;

        QuestionEntity question = new QuestionEntity();
        question.setQuestionId(questionPatchDto.getQuestionId());
        question.setTitle(questionPatchDto.getTitle());
        question.setBody(questionPatchDto.getBody());

        return question;
    }

    public QuestionResponseDto questionToQuestionResponseDto(QuestionEntity question) {
        return new QuestionResponseDto(
                question.getQuestionId(),
               question.getTitle(),
               question.getBody(),
                question.getCreatedAt(),
               question.getModifiedAt()
        );
  }

    public List<QuestionResponseDto> questionsToQuestionResponseDtos(List<QuestionEntity> questions) {
       List<QuestionResponseDto> questionResponseDtos = new ArrayList<>();
       for (QuestionEntity question : questions) {
           questionResponseDtos.add(questionToQuestionResponseDto(question));
       }
       return questionResponseDtos;
   }
}
