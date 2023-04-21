package com.codestates.preproject.question.repository;

import com.codestates.preproject.question.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {

}
//태그기능 추가시 태그전용 레포도 추가필요