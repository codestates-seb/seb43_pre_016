package com.codestates.preproject.question.like;

import com.codestates.preproject.question.entity.Question;
import com.codestates.preproject.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionLikeRepository extends JpaRepository<QuestionLike,Long> {
    QuestionLike findByUserAndQuestion(User user, Question question);

}
