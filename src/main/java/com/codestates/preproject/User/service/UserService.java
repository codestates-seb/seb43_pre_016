package com.codestates.preproject.User.service;

import com.codestates.preproject.User.dto.UserPatchDto;
import com.codestates.preproject.User.dto.UserPostDto;
import com.codestates.preproject.User.dto.UserResponseDto;
import com.codestates.preproject.User.entity.User;
import com.codestates.preproject.User.mapper.UserMapper;
import com.codestates.preproject.User.repository.UserRepository;
import com.codestates.preproject.answer.entity.Answer;
import com.codestates.preproject.question.entity.QuestionEntity;
import com.codestates.preproject.question.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {
    @Autowired
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(User user){
        User savedUser = userRepository.save(user);
        return savedUser;
    }

    public User updateUser(User user){
        User findUser = findVerifiedUser(user.getUserId());

        Optional.ofNullable(user.getEmail())
                .ifPresent(email -> findUser.setEmail(email));
        Optional.ofNullable(user.getPassword())
                .ifPresent(password -> findUser.setPassword(password));

        return userRepository.save(findUser);
    }

    public User findUser(long userId){
        return findVerifiedUser(userId);
    }

    public Page<User> findUsers(int page, int size) {
        return userRepository.findAll(PageRequest.of(page,size, Sort.by("userId").descending()));
    }

    public void deleteUser(Long userId){
        User findUser = findVerifiedUser(userId);
        userRepository.delete(findUser);
    }

    public void deleteAll(){
        userRepository.deleteAll();
    }

    private User findVerifiedUser(Long userId){
        Optional<User> optionalUser = userRepository.findById(userId);
        User finduser = optionalUser.orElseThrow(() -> new RuntimeException());
        return finduser;
    }

//
//    public List<Answer> getUserAnswers(Long userId) {
//        User user = userRepository.findById(userId).orElse(null);
//        System.out.println("서비스단의 겟유저엔써!!!!!!");
//        System.out.println(user);
//        return user.getAnswers();
//    }
//
//    public List<QuestionEntity> getUserQuestions(Long userId) {
//        User user = userRepository.findById(userId).orElse(null);
//        return user.getQuestions();
//    }
//    public List<Answer> getUserAnswers(Long userId) {
//        Optional<User> optionalUser = userRepository.findById(userId);
//        if (optionalUser.isPresent()) {
//            User user = optionalUser.get();
//            return user.getAnswers();
//        }
//        return Collections.emptyList();
//}

}
