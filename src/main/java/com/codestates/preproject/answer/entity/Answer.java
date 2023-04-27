package com.codestates.preproject.answer.entity;

import com.codestates.preproject.answer.like.AnswerLike;
import com.codestates.preproject.user.entity.User;
import com.codestates.preproject.audit.Auditable;
import com.codestates.preproject.question.entity.Question;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    @JoinColumn(name="USER_ID")
    @JsonManagedReference//나연:user와 순환참조를 끊으면서 코드에 영향안가게끔 추가
    private User user;
    @Setter
    @ManyToOne
    @JoinColumn(name="QUESTION_ID")
    @JsonBackReference//나연:question과 순환참조 끊으려고 추가
    private Question question;

    @OneToMany(mappedBy = "answer",cascade = CascadeType.ALL, fetch = FetchType.LAZY)//나연:좋아요 달린 답변글도 지울 수 있게 cascade 달아둠,lazy타입은 스택오버플로우 방지용
    private List<AnswerLike> answerLikes= new ArrayList<>();


    //좋아요 가 추가되면 likecount 올라가는 메소드
    public void addAnswerLike(AnswerLike answerLike) {
        answerLikes.add(answerLike);
        if (answerLike.isLiked()) {
            this.likeCount++;
        } else {
            this.likeCount--;
        }
    }
}