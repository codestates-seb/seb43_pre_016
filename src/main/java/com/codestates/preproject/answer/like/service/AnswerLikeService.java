package com.codestates.preproject.answer.like.service;

import com.codestates.preproject.answer.like.entity.AnswerLike;
import com.codestates.preproject.answer.like.repository.AnswerLikeRepository;
import com.codestates.preproject.answer.repository.AnswerRepository;
import org.springframework.stereotype.Service;

@Service
public class AnswerLikeService {
    private  final AnswerLikeRepository answerLikeRepository;

    public AnswerLikeService(AnswerLikeRepository answerLikeRepository) {
        this.answerLikeRepository = answerLikeRepository;
    }

    public AnswerLike createAnswerLike(long userId,AnswerLike answerLike) {

        answerLike.setUserId(userId);

        AnswerLike savedAnswerLike = answerLikeRepository.save(answerLike);

        return savedAnswerLike;
    }
}
