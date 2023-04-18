package com.codestates.preproject.answer.like.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Setter@Getter
@Entity
public class AnswerLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  long answerLikeId;

    @Column(nullable = false, unique = true)
    private  long answerId;

    @Column(nullable = false, unique = true)
    private  long userId;

    @Column(unique = true)
    private boolean answerLike;//1이던지 트루던지...
}
