package com.codestates.preproject.question.entity;
import com.codestates.preproject.User.entity.User;
import com.codestates.preproject.answer.audit.Auditable;
import com.codestates.preproject.answer.entity.Answer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QuestionEntity extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "QUESTION_ID")
    private Long questionId;
    @Column(length = 100,nullable = false)
    private String title;
    @Column(columnDefinition = "TEXT",nullable = false)
    private String body;
    private  Integer view;

    @ManyToOne
    @JoinColumn(name ="USER_ID")
    private User user;
    @OneToMany(mappedBy ="questionEntity")
    private List<Answer>answers=new ArrayList<>();
    private int likeCount;
}
//post요청을 보내봤으나 서버에러가 계속됨, 매핑문제인것으로 보이니 나중에 한꺼번에 체크해볼것