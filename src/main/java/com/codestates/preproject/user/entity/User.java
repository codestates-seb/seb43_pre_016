package com.codestates.preproject.user.entity;


import com.codestates.preproject.audit.Auditable;
import com.codestates.preproject.answer.entity.Answer;
import com.codestates.preproject.answer.like.AnswerLike;
import com.codestates.preproject.question.entity.Question;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "users")
public class User extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(length = 100, nullable = false)
    private String userName;

    @Column(nullable = false,updatable = false, unique = true)
    private String email;

    @Column(length = 100, nullable = false)
    private String password;


    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();



    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonBackReference//나연: answer과도 순환참조가 생겨서 코드 영향 안가면서 참조끊도록 추가
    private List<Answer> answers = new ArrayList<>();

    @OneToMany(mappedBy = "user",fetch = FetchType.LAZY)//나연:스택오버플로우 방지
    private List<Question> questions = new ArrayList<>();

    @OneToMany(mappedBy = "user",fetch = FetchType.LAZY)//나연:위와 마찬가지
    private List<AnswerLike>answerLikes= new ArrayList<>();

    public User(String userName, String email, String password) {

        this.userName = userName;
        this.email = email;
        this.password = password;
    }
}