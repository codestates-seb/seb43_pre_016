package com.codestates.preproject.question.repository;

import com.codestates.preproject.question.entity.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    @Query(value = "SELECT DISTINCT q FROM Question q LEFT JOIN q.answers a WHERE q.title LIKE %:keyword% OR a.body LIKE %:keyword%")
    Page<Question> search(@Param("keyword")String keyword, Pageable pageable);
}
//태그기능 추가시 태그전용 레포도 추가필요