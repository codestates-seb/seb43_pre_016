package com.codestates.preproject.question.service;

import com.codestates.preproject.answer.dto.AnswerDto;
import com.codestates.preproject.answer.repository.AnswerRepository;
import com.codestates.preproject.exception.BusinessLogicException;
import com.codestates.preproject.exception.ExceptionCode;
import com.codestates.preproject.question.dto.QuestionResponseDto;
import com.codestates.preproject.question.entity.Question;
import com.codestates.preproject.question.like.QuestionLike;
import com.codestates.preproject.question.like.QuestionLikeRepository;
import com.codestates.preproject.question.repository.QuestionRepository;
import com.codestates.preproject.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final QuestionLikeRepository questionLikeRepository;

    public QuestionService(QuestionRepository questionRepository, AnswerRepository answerRepository, QuestionLikeRepository questionLikeRepository) {
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
        this.questionLikeRepository = questionLikeRepository;
    }

    public Question createQuestion(Question question){
        if(question.getUser() == null){
            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND); //
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
//        long current = question.getViewCount();
//        question.setViewCount(current);

        QuestionResponseDto questionResponseDto = new QuestionResponseDto();
        questionResponseDto.setQuestionId(question.getQuestionId());
        questionResponseDto.setTitle(question.getTitle());
        questionResponseDto.setBody(question.getBody());
        questionResponseDto.setBodyDetail(question.getBodyDetail());
        questionResponseDto.setUserId(question.getUser().getUserId());
        questionResponseDto.setCreatedAt(question.getCreatedAt());
        questionResponseDto.setModifiedAt(question.getModifiedAt());
        questionResponseDto.setUserName(question.getUser().getUserName());
        questionResponseDto.setUserEmail(question.getUser().getEmail());
        questionResponseDto.setLikeCount(question.getLikeCount());
//        questionResponseDto.setViewCount(question.getViewCount());

        List<AnswerDto.Response> answerResponseList = answerRepository.findByQuestionQuestionId(questionId).stream()
                .map(answer -> {
                    AnswerDto.Response answerResponseDto = new AnswerDto.Response();
                    answerResponseDto.setAnswerId(answer.getAnswerId());
                    answerResponseDto.setBody(answer.getBody());
                    answerResponseDto.setUserId(answer.getUser().getUserId());
                    answerResponseDto.setQuestionId(questionId);
                    answerResponseDto.setLikeCount(answer.getLikeCount());
                    answerResponseDto.setCreatedAt(answer.getCreatedAt());
                    answerResponseDto.setModifiedAt(answer.getModifiedAt());
                    answerResponseDto.setUserName(answer.getUser().getUserName());
                    return answerResponseDto;
                })
                .collect(Collectors.toList());
        questionResponseDto.setAnswers(answerResponseList);

        return questionResponseDto;
    }
    //질문 상세
    //- 태그, 추천수, 방문자수, 좋아요 여부 정보로그인중인 사용자 기준), 북마크 여부 정보(로그인중인 사용자 기준)


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
                .orElseThrow(() ->  new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
    }

    //좋아요서비스
    public Question likeQuestion(long questionId, long userId){
        User user = new User();
        user.setUserId(userId);

        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));  //다시 살펴보기
        QuestionLike findQuestionLike = questionLikeRepository.findByUserAndQuestion(user,question);

        if (findQuestionLike == null){
            findQuestionLike = new QuestionLike(user,question,true);
        }
        else {
            findQuestionLike.setLiked(true);
        }
        QuestionLike questionLike = questionLikeRepository.save(findQuestionLike);
        question.addQuestionLike(questionLike);
        questionRepository.save(question);
        return question;
    }
    public Question dislikeQuestion(long questionId, long userId){
        User user = new User();
        user.setUserId(userId);

        Question question = questionRepository.findById(questionId)
                .orElseThrow(()->  new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND)); //같이 살펴보자..
        QuestionLike questionLike = questionLikeRepository
                .findByUserAndQuestion(user,question);
        if (questionLike == null){
            questionLike = new QuestionLike(user,question,false);
        } else {
            questionLike.setLiked(false);
        }
        QuestionLike questionLike1 = questionLikeRepository.save(questionLike);
        question.addQuestionLike(questionLike1);
        questionRepository.save(question);
        return question;
    }

    public void verifiedSameUser(Long questionId,String email){
        Optional<Question>Question= questionRepository.findById(questionId);
        Question findQuestion = Question.orElseThrow(()->new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
        if( !findQuestion.getUser().getEmail().equals(email)){
        throw new BusinessLogicException(ExceptionCode.METHOD_NOT_ALLOWED);}
       }
  }

