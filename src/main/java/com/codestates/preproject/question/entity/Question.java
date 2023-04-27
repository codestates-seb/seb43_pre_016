package com.codestates.preproject.question.entity;

import com.codestates.preproject.question.like.QuestionLike;
import com.codestates.preproject.user.entity.User;
import com.codestates.preproject.audit.Auditable;
import com.codestates.preproject.answer.entity.Answer;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
public class Question extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "QUESTION_ID")
    private Long questionId;

    @Column(length = 100,nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT",nullable = false)
    private String body;

    @Column
    private String bodyDetail;

//    @Column
//    private Long viewCount = 0L;

    @ManyToOne
    @JoinColumn(name ="USER_ID")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "questions"})
    private User user;

    @OneToMany(mappedBy ="question" , fetch = FetchType.LAZY)
    @JsonManagedReference//추가
    private List<Answer> answers=new ArrayList<>();

    private int likeCount;

    @OneToMany(mappedBy = "question",cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<QuestionLike> questionLikes = new ArrayList<>();

    public void addQuestionLike(QuestionLike questionLike){
        questionLikes.add(questionLike);
        if (questionLike.isLiked()){
            this.likeCount++;
        } else {
            this.likeCount--;
        }
    }

//    public void increaseViewCount(){
//        if (this.viewCount == null){
//            this.viewCount = 1L;
//        } else if (this.viewCount >= 0L) {
//            this.viewCount++;
//        }
//    }


}
