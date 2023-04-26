package com.codestates.preproject.answer.like;


import com.codestates.preproject.answer.entity.Answer;
import com.codestates.preproject.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class AnswerLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long answerLikeId;

    @ManyToOne
    @JoinColumn(name= "USER_ID")
    private User user;

    @ManyToOne
    @JoinColumn(name="answerId")
    private Answer answer;

    @Column(nullable = false)
    private boolean isLiked;

    public AnswerLike(User user, Answer answer, boolean isLiked) {
        this.user = user;
        this.answer = answer;
        this.isLiked = isLiked;
    }
}

