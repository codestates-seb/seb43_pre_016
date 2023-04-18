package com.codestates.preproject.answer.like.repository;

import com.codestates.preproject.answer.like.entity.AnswerLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerLikeRepository  extends JpaRepository<AnswerLike, Long> {
    //Optional<Member> findById(long userId);
}
