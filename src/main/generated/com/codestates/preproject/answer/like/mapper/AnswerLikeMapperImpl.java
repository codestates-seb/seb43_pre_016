package com.codestates.preproject.answer.like.mapper;

import com.codestates.preproject.answer.entity.Answer;
import com.codestates.preproject.answer.like.dto.AnswerLikeDto;
import com.codestates.preproject.answer.like.entity.AnswerLike;
import com.codestates.preproject.user.entity.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-04-22T02:31:11+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.16.1 (Oracle Corporation)"
)
@Component
public class AnswerLikeMapperImpl implements AnswerLikeMapper {

    @Override
    public AnswerLike answerLikeDtoToAnswerLike(AnswerLikeDto.Post answerLikeDto) {
        if ( answerLikeDto == null ) {
            return null;
        }

        AnswerLike answerLike = new AnswerLike();

        answerLike.setUser( postToUser( answerLikeDto ) );
        answerLike.setAnswer( postToAnswer( answerLikeDto ) );
        answerLike.setAnswerLike( answerLikeDto.isAnswerLike() );

        return answerLike;
    }

    @Override
    public AnswerLikeDto.Response answerLikeToAnswerLikeResponseDto(AnswerLike answerLike) {
        if ( answerLike == null ) {
            return null;
        }

        AnswerLikeDto.Response response = new AnswerLikeDto.Response();

        Long userId = answerLikeUserUserId( answerLike );
        if ( userId != null ) {
            response.setUserId( userId );
        }
        response.setAnswerId( answerLikeAnswerAnswerId( answerLike ) );
        response.setLikeStatus( answerLike.getLikeStatus() );

        return response;
    }

    protected User postToUser(AnswerLikeDto.Post post) {
        if ( post == null ) {
            return null;
        }

        User user = new User();

        user.setUserId( post.getUserId() );

        return user;
    }

    protected Answer postToAnswer(AnswerLikeDto.Post post) {
        if ( post == null ) {
            return null;
        }

        Answer answer = new Answer();

        answer.setAnswerId( post.getAnswerId() );

        return answer;
    }

    private Long answerLikeUserUserId(AnswerLike answerLike) {
        if ( answerLike == null ) {
            return null;
        }
        User user = answerLike.getUser();
        if ( user == null ) {
            return null;
        }
        Long userId = user.getUserId();
        if ( userId == null ) {
            return null;
        }
        return userId;
    }

    private long answerLikeAnswerAnswerId(AnswerLike answerLike) {
        if ( answerLike == null ) {
            return 0L;
        }
        Answer answer = answerLike.getAnswer();
        if ( answer == null ) {
            return 0L;
        }
        long answerId = answer.getAnswerId();
        return answerId;
    }
}
