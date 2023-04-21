package com.codestates.preproject.answer.entity;

import com.codestates.preproject.User.entity.User;
import com.codestates.preproject.answer.like.entity.AnswerLike;
import com.codestates.preproject.answer.audit.Auditable;
import com.codestates.preproject.question.entity.QuestionEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Answer extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long answerId;
    @Setter
    @Column(columnDefinition = "TEXT", nullable = false)
    private String body;

    @Setter
    @Column
    private int likeCount;

    @Setter
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
    @Setter
    @ManyToOne
    @JoinColumn(name="question_id")
    private QuestionEntity questionEntity;

    @OneToMany(mappedBy = "answer")
    private List<AnswerLike> likes = new ArrayList<>();



}