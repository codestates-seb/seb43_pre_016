package com.codestates.preproject.question.entity;

import com.codestates.preproject.user.entity.User;
import com.codestates.preproject.answer.audit.Auditable;
import com.codestates.preproject.answer.entity.Answer;
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
public class Question extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "QUESTION_ID")
    private Long questionId;

    @Column(length = 100,nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT",nullable = false)
    private String body;

    @Column
    private String bodyDetail;

    @Column
    private Integer view;

    @ManyToOne
    @JoinColumn(name ="USER_ID")
    private User user;

    @OneToMany(mappedBy ="question")
    private List<Answer> answers=new ArrayList<>();

    private int likeCount;

}
