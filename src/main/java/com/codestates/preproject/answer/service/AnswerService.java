package com.codestates.preproject.answer.service;

import com.codestates.preproject.answer.repository.AnswerRepository;
import com.codestates.preproject.answer.entity.Answer;
import com.codestates.preproject.answer.like.AnswerLike;
import com.codestates.preproject.answer.like.AnswerLikeRepository;
import com.codestates.preproject.exception.BusinessLogicException;
import com.codestates.preproject.exception.ExceptionCode;
import com.codestates.preproject.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AnswerService {
    private final AnswerRepository answerRepository;

    private final AnswerLikeRepository answerLikeRepository;

    public AnswerService(AnswerRepository answerRepository, AnswerLikeRepository answerLikeRepository) {
        this.answerRepository = answerRepository;
        this.answerLikeRepository = answerLikeRepository;
    }

    public Answer createAnswer(Answer answer) {
        Answer savedAnswer = answerRepository.save(answer);
        return savedAnswer;
    }

    public Answer updateAnswer(Answer answer) {
        Answer findAnswer = findVerifiedAnswer(answer.getAnswerId());

        Optional.ofNullable(answer.getBody())
                .ifPresent(body -> findAnswer.setBody(body));
//        Optional.ofNullable(answer.getLikeCount()) //값이 null인지 확인하고
//                .ifPresent(likeCount -> findAnswer.setLikeCount(likeCount)); //null이 아니면 실행
        return answerRepository.save(findAnswer);
    }

    public Answer findAnswer(long answerId) {

        return findVerifiedAnswer(answerId);
    }

    public Page<Answer> findAnswers(int page, int size) {
        return answerRepository.findAll(PageRequest.of(page, size, Sort.by("answerId").descending()));

    }

    public void deleteAnswer(Long answerId) {
        Answer findAnswer = findVerifiedAnswer(answerId);

        answerRepository.delete(findAnswer);
    }

    public void deleteAll() {
        answerRepository.deleteAll();
    }


    private Answer findVerifiedAnswer(long answerId) {
        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);
        Answer findanswer = optionalAnswer.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
        return findanswer;
    }


    public Answer likeAnswer(long answerId, long userId){
        User user= new User();
        user.setUserId(userId);

        Answer answer= answerRepository.findById(answerId)
                .orElseThrow(()-> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));

        AnswerLike findAnswerLike = answerLikeRepository.findByUserAndAnswer(user,answer);

        if(findAnswerLike== null){
            findAnswerLike = new AnswerLike(user,answer,true);
        }
        else{
            findAnswerLike.setLiked(true);
        }
        AnswerLike answerLike= answerLikeRepository.save(findAnswerLike);
        answer.addAnswerLike(answerLike);
        //에드 라이크가 추가되고
        answerRepository.save(answer);

        return answer;
    }

    public Answer dislikeAnswer(long answerId, long userId) {
        User user = new User();
        user.setUserId(userId);

        Answer answer = answerRepository.findById(answerId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));

        AnswerLike answerLike = answerLikeRepository.findByUserAndAnswer(user, answer);
        if (answerLike == null) {
            answerLike = new AnswerLike(user, answer, false);
        } else {
            answerLike.setLiked(false);
        }
        AnswerLike answerLike1= answerLikeRepository.save(answerLike);
        answer.addAnswerLike(answerLike1);
        answerRepository.save(answer);
        return answer;
    }

}
