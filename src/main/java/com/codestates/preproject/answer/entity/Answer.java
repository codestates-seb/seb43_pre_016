package com.codestates.preproject.answer.entity;

import com.codestates.preproject.User.entity.User;
import com.codestates.preproject.answer.audit.Auditable;
import com.codestates.preproject.answer.like.entity.AnswerLike;
import com.codestates.preproject.question.entity.QuestionEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter  //맵핑시 필수!
@NoArgsConstructor
public class Answer extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long answerId;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String body;

    private int likeCount; // 좋아요 수

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private  User user;

    @ManyToOne
    @JoinColumn(name = "QUESTION_ID")
    private QuestionEntity questionEntity;


//    @OneToMany(mappedBy = "answer")
//    private List<AnswerLike> answerLikeList = new ArrayList<>();



}