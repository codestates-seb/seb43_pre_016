package com.codestates.preproject.answer.mapper;

import com.codestates.preproject.user.entity.User;
import com.codestates.preproject.answer.dto.AnswerDto;
import com.codestates.preproject.answer.entity.Answer;
import com.codestates.preproject.question.entity.Question;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-04-22T00:48:30+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.16.1 (Oracle Corporation)"
)
@Component
public class AnswerMapperImpl implements AnswerMapper {

    @Override
    public Answer answerPostDtoToAnswer(AnswerDto.Post requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Answer answer = new Answer();

        answer.setQuestion( postToQuestion( requestBody ) );
        answer.setUser( postToUser( requestBody ) );
        answer.setBody( requestBody.getBody() );

        return answer;
    }

    @Override
    public Answer answerPatchDtoToAnswer(AnswerDto.Patch requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Answer answer = new Answer();

        answer.setAnswerId( requestBody.getAnswerId() );
        answer.setBody( requestBody.getBody() );

        return answer;
    }

    @Override
    public AnswerDto.Response answerToAnswerResponseDto(Answer answer) {
        if ( answer == null ) {
            return null;
        }

        AnswerDto.Response response = new AnswerDto.Response();

        Long userId = answerUserUserId( answer );
        if ( userId != null ) {
            response.setUserId( userId );
        }
        Long questionId = answerQuestionQuestionId( answer );
        if ( questionId != null ) {
            response.setQuestionId( questionId );
        }
        response.setAnswerId( answer.getAnswerId() );
        response.setBody( answer.getBody() );
        response.setLikeCount( answer.getLikeCount() );
        response.setModifiedAt( answer.getModifiedAt() );
        response.setCreatedAt( answer.getCreatedAt() );
        response.setCreatedBy( answer.getCreatedBy() );

        return response;
    }

    @Override
    public List<AnswerDto.Response> answersToResponseDtos(List<Answer> answers) {
        if ( answers == null ) {
            return null;
        }

        List<AnswerDto.Response> list = new ArrayList<AnswerDto.Response>( answers.size() );
        for ( Answer answer : answers ) {
            list.add( answerToAnswerResponseDto( answer ) );
        }

        return list;
    }

    protected Question postToQuestion(AnswerDto.Post post) {
        if ( post == null ) {
            return null;
        }

        Question question = new Question();

        question.setQuestionId( post.getQuestionId() );

        return question;
    }

    protected User postToUser(AnswerDto.Post post) {
        if ( post == null ) {
            return null;
        }

        User user = new User();

        user.setUserId( post.getUserId() );

        return user;
    }

    private Long answerUserUserId(Answer answer) {
        if ( answer == null ) {
            return null;
        }
        User user = answer.getUser();
        if ( user == null ) {
            return null;
        }
        Long userId = user.getUserId();
        if ( userId == null ) {
            return null;
        }
        return userId;
    }

    private Long answerQuestionQuestionId(Answer answer) {
        if ( answer == null ) {
            return null;
        }
        Question question = answer.getQuestion();
        if ( question == null ) {
            return null;
        }
        Long questionId = question.getQuestionId();
        if ( questionId == null ) {
            return null;
        }
        return questionId;
    }
}
