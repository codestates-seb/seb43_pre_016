package com.codestates.preproject.answer.like.entity;

import com.codestates.preproject.user.entity.User;
import com.codestates.preproject.answer.entity.Answer;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Setter
@Getter
@Entity
public class AnswerLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long answerLikeId;

    @Enumerated(value = EnumType.STRING)
    private LikeStatus likeStatus= LikeStatus.LIKE;

    @ManyToOne
    @JoinColumn(name="ANSWER_ID")
    private Answer answer;

    @ManyToOne
    @JoinColumn(name="USER_ID")
    private User user;

    @Column
    private boolean answerLike;

    public enum LikeStatus {
        LIKE,
        NONE
    }

}
