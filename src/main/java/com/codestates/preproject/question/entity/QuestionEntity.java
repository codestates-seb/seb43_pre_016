package com.codestates.preproject.question.entity;
import com.codestates.preproject.User.entity.User;
import com.codestates.preproject.answer.entity.Answer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QuestionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    private Long questionId;

    @Column(length = 100,nullable = false)
    private String title;
    @Column(columnDefinition = "TEXT",nullable = false)
    private String body;
    private  Integer view;

    @ManyToOne
    @JoinColumn(name ="user_id")
    private User user;

    @OneToMany(mappedBy ="questionEntity")
    private List<Answer>answers=new ArrayList<>();


    //answers:리스트
    //like
    //tag: 추가삭제
    //questionLike,
    private int likeCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    //basetime 클래스 상속받으면 시간날쩌코드중복 줄일수있다고함
    //업데이트 후 다른 클래스에서 가져와야할것과 연관관계 매핑 할것



}
