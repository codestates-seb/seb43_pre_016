package com.codestates.preproject.answer.service;

import com.codestates.preproject.answer.repository.AnswerRepository;
import com.codestates.preproject.answer.entity.Answer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AnswerService {
    private final AnswerRepository answerRepository;

    public AnswerService(AnswerRepository answerRepository) {
        this.answerRepository = answerRepository;
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
        Answer findanswer = optionalAnswer.orElseThrow(() -> new RuntimeException());//예외처리하기
        return findanswer;
    }

}
