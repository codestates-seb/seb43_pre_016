package com.codestates.preproject.User.entity;


import com.codestates.preproject.answer.audit.Auditable;
import com.codestates.preproject.answer.entity.Answer;
import com.codestates.preproject.question.entity.Question;
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

    @Column(nullable = false, unique = true)
    private String email;

    @Column(length = 100, nullable = false)
    private String password;


    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Answer> answers = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Question> questions= new ArrayList<>();

    public User( String userName, String email, String password) {

        this.userName = userName;
        this.email = email;
        this.password = password;
    }

    public List<Answer> getAnswers(){
        return answers;
    }

    public List<Question> getQuestions(){
        return questions;
    }
}