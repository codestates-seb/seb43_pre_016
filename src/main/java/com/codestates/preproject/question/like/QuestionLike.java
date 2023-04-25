package com.codestates.preproject.question.like;
import com.codestates.preproject.answer.entity.Answer;
import com.codestates.preproject.question.entity.Question;
import com.codestates.preproject.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class QuestionLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long QuestionLikeId;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    @ManyToOne
    @JoinColumn(name = "questionId")
    private Question question;

    @Column(nullable = false)
    private boolean isLiked;

    public QuestionLike (User user, Question question, boolean isLiked) {
        this.user = user;
        this.question = question;
        this.isLiked = isLiked;
    }

}
