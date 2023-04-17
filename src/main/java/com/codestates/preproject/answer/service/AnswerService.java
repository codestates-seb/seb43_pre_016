package com.codestates.preproject.answer.service;

import com.codestates.preproject.answer.entity.Answer;
import com.codestates.preproject.answer.repository.AnswerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AnswerService {
    private final AnswerRepository answerRepository;

    public Answer createAnswer(Answer answer) {
        Answer savedAnswer =answerRepository.save(answer);
        return savedAnswer;
    }
}
