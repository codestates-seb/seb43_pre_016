package com.codestates.preproject.answer.like.entity;

import com.codestates.preproject.answer.entity.Answer;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Setter
@Getter
@Entity
public class AnswerLike { //답변에 대한 좋아요.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long answerLikeId;


    @Column(nullable = false, unique = true)
    private long answerId;

    @Column(nullable = false, unique = true)
    private long userId;

    @Column(unique = true)
    private boolean answerLike;//1이던지 트루던지...

//        @ManyToOne
//    @JoinColumn(name = "ANSWER_ID")
//    private Answer answer;
//

}
