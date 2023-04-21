package com.codestates.preproject.answer.like.service;

import com.codestates.preproject.User.dto.UserResponseDto;
import com.codestates.preproject.answer.like.repository.AnswerLikeRepository;
import com.codestates.preproject.User.service.UserService;
import com.codestates.preproject.answer.entity.Answer;
import com.codestates.preproject.answer.like.entity.AnswerLike;
import com.codestates.preproject.answer.service.AnswerService;
import org.springframework.stereotype.Service;

@Service
public class AnswerLikeService {
    private final AnswerLikeRepository answerLikeRepository;
    private final AnswerService answerService;

    private final UserService userService;

    public AnswerLikeService(AnswerLikeRepository answerLikeRepository, AnswerService answerService, UserService userService) {
        this.answerLikeRepository = answerLikeRepository;
        this.answerService = answerService;
        this.userService = userService;
    }

    public AnswerLike createAnswerLike(AnswerLike answerLike) {

       Answer findAnswer = answerService.findAnswer(answerLike.getAnswer().getAnswerId());

       if(answerLike.isAnswerLike()) {

       int currentLikeCount = findAnswer.getLikeCount();
       findAnswer.setLikeCount(currentLikeCount + 1);

       }
       else{
       UserResponseDto likeuse= userService.findUserById(answerLike.getUser().getUserId());
//      User엔티티를쓰고싶다.... answerLike.setUser()
       answerLike.setLikeStatus(AnswerLike.LikeStatus.NONE);
       int currentLikeCount =findAnswer.getLikeCount();
       findAnswer.setLikeCount(currentLikeCount - 1);

       }
       answerService.updateAnswer(findAnswer);
       AnswerLike savedAnswerLike = answerLikeRepository.save(answerLike);

       return savedAnswerLike;
    }
}
