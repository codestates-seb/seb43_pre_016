package com.codestates.preproject.user.mapper;


import com.codestates.preproject.answer.dto.AnswerDto;
import com.codestates.preproject.answer.entity.Answer;
import com.codestates.preproject.like.AnswerLike;
import com.codestates.preproject.like.AnswerLikeDto;
import com.codestates.preproject.question.dto.QuestionMyPageDto;
import com.codestates.preproject.question.entity.Question;
import com.codestates.preproject.user.dto.UserDto;
import com.codestates.preproject.user.entity.User;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
@Component//빈 인식 못해서 모든 매퍼에 추가함, 없어도 다른 환경에서 실행되는 경우가 있어서 문제되면 지워도 괜찮습니다.
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
        userMyPageDto.setCreatedAt(user.getCreatedAt());

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

        List<AnswerLike> answerLikesList= user.getAnswerLikes();
        List<AnswerLikeDto> answerLikeDtos= answerLikesList.stream()
                .map(answerLike ->
                {AnswerLikeDto answerLikeDto= new AnswerLikeDto();
                    answerLikeDto.setAnswerId(answerLike.getAnswer().getAnswerId());
                    answerLikeDto.setLiked(answerLike.isLiked());
                    return answerLikeDto;})
                .collect(Collectors.toList());
        userMyPageDto.setAnswerLikes(answerLikeDtos);

        return userMyPageDto;
    }
}
