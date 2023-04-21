package com.codestates.preproject.question.service;

import com.codestates.preproject.question.entity.Question;
import com.codestates.preproject.question.mapper.QuestionMapper;
import com.codestates.preproject.question.repository.QuestionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@Service
public class QuestionService {
    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public Question createQuestion(Question question){
        return questionRepository.save(question);
    }

    public Question updateQuestion(Question question){
        Question findQuestion = findVerifierQuestion(question.getQuestionId());
        Optional.ofNullable(question.getTitle())
                .ifPresent(title -> findQuestion.setTitle(title));
        Optional.ofNullable(question.getBody())
                .ifPresent(body -> findQuestion.setBody(body));
        Optional.ofNullable(question.getBodyDetail())
                .ifPresent(bodyDetail->findQuestion.setBodyDetail(bodyDetail));

        return questionRepository.save(findQuestion);
    }

    public Question findQuestion(long questionId){

        return findVerifierQuestion(questionId);
    }


    public Page<Question> findQuestions(int page,int size){
        return questionRepository.findAll(PageRequest.of(page,size, Sort.by("questionId").descending()));
    }


    public void deleteQuestion(Long questionId){
        Question findQuestion = findVerifierQuestion(questionId);
        questionRepository.delete(findQuestion);
    }

    public void deleteAll(){

        questionRepository.deleteAll();
    }

    private Question findVerifierQuestion(long questionId){
        return questionRepository.findById(questionId)
                .orElseThrow(() -> new EntityNotFoundException("Question Not Found"));
    }
}
