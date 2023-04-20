package com.codestates.preproject.question.service;

import com.codestates.preproject.question.entity.QuestionEntity;
import com.codestates.preproject.question.mapper.QuestionMapper;
import com.codestates.preproject.question.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@Service
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final QuestionMapper questionMapper;

    public QuestionService(QuestionRepository questionRepository, QuestionMapper questionMapper) {
        this.questionRepository = questionRepository;
        this.questionMapper = questionMapper;
    }

    //질문생성
    public QuestionEntity createQuestion(QuestionEntity question){
        return questionRepository.save(question);
    }
    //수정
    public QuestionEntity updateQuestion(QuestionEntity question){
        QuestionEntity findQuestion = findVerifierQuestion(question.getQuestionId());
        Optional.ofNullable(question.getTitle())
                .ifPresent(title -> findQuestion.setTitle(title));
        Optional.ofNullable(question.getBody())
                .ifPresent(body -> findQuestion.setBody(body));
        return questionRepository.save(findQuestion);
    }
    //조회
    public QuestionEntity findQuestion(long questionId){
        return findVerifierQuestion(questionId);
    }
    public Page<QuestionEntity> findQuestions(int page,int size){
        return questionRepository.findAll(PageRequest.of(page,size, Sort.by("questionId").descending()));
    }
    //삭제
    public void deleteQuestion(Long questionId){
        QuestionEntity findQuestion = findVerifierQuestion(questionId);
        questionRepository.delete(findQuestion);
    }
    //일괄삭제
    public void deleteAll(){
        questionRepository.deleteAll();
    }
    //질문조회
    private QuestionEntity findVerifierQuestion(long questionId){
        return questionRepository.findById(questionId)
                .orElseThrow(() -> new EntityNotFoundException("Question Not Found"));
    }
}
