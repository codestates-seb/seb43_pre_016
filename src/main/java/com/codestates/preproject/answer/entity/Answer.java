package com.codestates.preproject.answer.entity;

import com.codestates.preproject.answer.audit.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

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

    private long questionId; //Todo: 매핑 연결하기



//    private long answerLikeId;

}