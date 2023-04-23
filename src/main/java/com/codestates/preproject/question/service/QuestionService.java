package com.codestates.preproject.question.service;

import com.codestates.preproject.answer.dto.AnswerDto;
import com.codestates.preproject.answer.entity.Answer;
import com.codestates.preproject.answer.repository.AnswerRepository;
import com.codestates.preproject.question.dto.QuestionResponseDto;
import com.codestates.preproject.question.entity.Question;
import com.codestates.preproject.question.repository.QuestionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;

    public QuestionService(QuestionRepository questionRepository, AnswerRepository answerRepository) {
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
    }


    public Question createQuestion(Question question){
        if(question.getUser() == null){
            throw new IllegalArgumentException("사용자 정보가 없습니다.");
        }
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

    public QuestionResponseDto findQuestion(long questionId){
        Question question = findVerifierQuestion(questionId);

        QuestionResponseDto questionResponseDto = new QuestionResponseDto();
        questionResponseDto.setQuestionId(question.getQuestionId());
        questionResponseDto.setTitle(question.getTitle());
        questionResponseDto.setBody(question.getBody());
        questionResponseDto.setBodyDetail(question.getBodyDetail());
        questionResponseDto.setUserId(question.getUser().getUserId());
        questionResponseDto.setCreatedAt(question.getCreatedAt());
        questionResponseDto.setModifiedAt(question.getModifiedAt());
        questionResponseDto.setCreatedBy(question.getCreatedBy());
        questionResponseDto.setUserEmail(question.getUser().getEmail());

        List<AnswerDto.Response> answerResponseList = answerRepository.findById(questionId).stream()
                .map(answer -> {
                    AnswerDto.Response answerResponseDto = new AnswerDto.Response();
                    answerResponseDto.setAnswerId(answer.getAnswerId());
                    answerResponseDto.setBody(answer.getBody());
                    answerResponseDto.setUserId(answer.getUser().getUserId());
                    answerResponseDto.setQuestionId(questionId);
                    answerResponseDto.setCreatedAt(answer.getCreatedAt());
                    answerResponseDto.setModifiedAt(answer.getModifiedAt());
                    answerResponseDto.setCreatedBy(answer.getCreatedBy());
                    answerResponseDto.setUserName(answer.getUser().getUserName());
                    return answerResponseDto;
                })
                .collect(Collectors.toList());
        questionResponseDto.setAnswers(answerResponseList);

        return questionResponseDto;
    }


    public Page<Question> findQuestions(int page,int size){
        return questionRepository.findAll(PageRequest.of(page,size, Sort.by("questionId").descending()));
    }


    public void deleteQuestion(Long questionId){
        questionRepository.deleteById(questionId);
    }

    public void deleteAll(){

        questionRepository.deleteAll();
        //deleteAllInBatch()를 권장하고있긴함
    }

    private Question findVerifierQuestion(long questionId){
        return questionRepository.findById(questionId)
                .orElseThrow(() -> new EntityNotFoundException("Question Not Found"));
    }
}
