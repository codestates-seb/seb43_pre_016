package com.codestates.preproject.User.entity;


import com.codestates.preproject.answer.audit.Auditable;
import lombok.*;


import javax.persistence.*;


@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
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


    public User( String user_name, String email, String password) {

        this.user_name = user_name;
        this.email = email;
        this.password = password;
    }



}