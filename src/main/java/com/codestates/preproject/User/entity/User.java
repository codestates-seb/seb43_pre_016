package com.codestates.preproject.User.entity;


import com.codestates.preproject.answer.audit.Auditable;
import com.codestates.preproject.answer.entity.Answer;
import com.codestates.preproject.question.entity.QuestionEntity;
import lombok.*;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "USERS")
public class User extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(length = 100, nullable = false)
    private String user_name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(length = 100, nullable = false)
    private String password;

    @OneToMany(mappedBy ="user")
    private List<Answer>answers= new ArrayList<>();

    @OneToMany(mappedBy ="user")
    private List<QuestionEntity> questionEntities= new ArrayList<>();


    public User( String user_name, String email, String password) {

        this.user_name = user_name;
        this.email = email;
        this.password = password;
    }

}