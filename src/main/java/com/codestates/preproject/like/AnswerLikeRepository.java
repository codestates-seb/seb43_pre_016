package com.codestates.preproject.like;

import com.codestates.preproject.answer.entity.Answer;
import com.codestates.preproject.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerLikeRepository extends JpaRepository<AnswerLike,Long> {
    AnswerLike findByUserAndAnswer(User user, Answer answer);
}
