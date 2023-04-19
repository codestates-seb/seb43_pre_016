package com.codestates.preproject.question.repository;

import com.codestates.preproject.question.entity.QuestionEntity;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface QuestionRepository extends JpaRepository<QuestionEntity, Long> {
}
//태그기능 추가시 태그전용 레포도 추가필요