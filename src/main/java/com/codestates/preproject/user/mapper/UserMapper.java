package com.codestates.preproject.user.mapper;


import com.codestates.preproject.answer.dto.AnswerDto;
import com.codestates.preproject.answer.entity.Answer;
import com.codestates.preproject.question.dto.QuestionMyPageDto;
import com.codestates.preproject.question.entity.Question;
import com.codestates.preproject.user.dto.UserDto;
import com.codestates.preproject.user.entity.User;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User userPostDtoToUser(UserDto.Post requestBody);

    User userPatchDtoToUser(UserDto.Patch requestBody);

    UserDto.Response userToUserResponseDto(User user);

    List<UserDto.Response> usersToUserResponseDtos(List<User> users);

    default UserDto.MyPage userToUserMyPageDto(User user) {
        if (user == null){
            return null;
        }

        UserDto.MyPage userMyPageDto = new UserDto.MyPage();
        userMyPageDto.setUserId(user.getUserId());
        userMyPageDto.setEmail(user.getEmail());
        userMyPageDto.setUserName(user.getUserName());

        List<Answer> answerList = user.getAnswers();

        List<AnswerDto.MyPageDto> answerMyPageDtoList = answerList.stream().map(answer -> {
            AnswerDto.MyPageDto answerMyPageDto = new AnswerDto.MyPageDto();
            answerMyPageDto.setAnswerId(answer.getAnswerId());
            answerMyPageDto.setBody(answer.getBody());//수정필요 답변의 제목을 가져올수 있도록 -> 질문의 제목으로?
            answerMyPageDto.setCrestedAt(answer.getCreatedAt());
            return answerMyPageDto;
        }).collect(Collectors.toList());
        userMyPageDto.setAnswers(answerMyPageDtoList);

        List<Question> questionList = user.getQuestions();

        List<QuestionMyPageDto> questionMyPageDtoList = questionList.stream().map(question -> {
            QuestionMyPageDto questionMyPageDto = new QuestionMyPageDto();
            questionMyPageDto.setQuestionId(question.getQuestionId());
            questionMyPageDto.setTitle(question.getTitle());
            questionMyPageDto.setCreatedAt(question.getCreatedAt());
            return questionMyPageDto;
        }).collect(Collectors.toList());
        userMyPageDto.setQuestions(questionMyPageDtoList);

        return userMyPageDto;
    }
}
