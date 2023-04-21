package com.codestates.preproject.question.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class QuestionTag {
    @Id
    @Column(name = "question_tag_id")
    private long questionTagId;
    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    //tag_id
}
