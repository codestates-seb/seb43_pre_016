package com.codestates.preproject.answer.like.service;

import com.codestates.preproject.answer.entity.Answer;
import com.codestates.preproject.answer.like.entity.AnswerLike;
import com.codestates.preproject.answer.like.repository.AnswerLikeRepository;
import com.codestates.preproject.answer.repository.AnswerRepository;
import com.codestates.preproject.answer.service.AnswerService;
import org.springframework.stereotype.Service;

@Service
public class AnswerLikeService {
    private final AnswerLikeRepository answerLikeRepository;

    private final AnswerService answerService;

    public AnswerLikeService(AnswerLikeRepository answerLikeRepository, AnswerService answerService) {
        this.answerLikeRepository = answerLikeRepository;
        this.answerService = answerService;
    }

    public AnswerLike createAnswerLike(long userId, AnswerLike answerLike) {

        answerLike.setUserId(userId); // 좋아요한 사람

        //어느 질문에 좋아요를 눌렀는지 가지고 와서 count UP (Answer count 올려주기)
        Answer findAnswerId = answerService.findAnswer(answerLike.getAnswerId());  //좋아요한 답변 ID 가져오기
        int currentLikeCount = findAnswerId.getLikeCount(); //답변이 가지고있는 좋아요 수 가져오기
//        findAnswerId.setLikeCount(currentLikeCount + 1); //좋아요 하나 올려주기
        Answer likeCount = findAnswerId; // 좋아요 1개를 가지고 있는 질문 ID --> 타입때문에 위코드를 두개로 나눠씀 /Set이 void반환
        answerService.updateAnswer(likeCount); //  답변에 좋아요 업데이트

        AnswerLike savedAnswerLike = answerLikeRepository.save(answerLike); // 좋아요 한개 저장 (AnswerLike)
        return savedAnswerLike;
    }
}
