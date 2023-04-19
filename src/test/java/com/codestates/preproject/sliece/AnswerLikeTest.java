package com.codestates.preproject.sliece;

import com.codestates.preproject.answer.like.dto.AnswerLikeDto;
import com.google.gson.Gson;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
public class AnswerLikeTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;



//    @Test
//    void postAnswerLikeTest() throws  Exception {
//        //given
//        AnswerLikeDto.Post post = new AnswerLikeDto.Post();
//        post.setAnswerId(1);
//        post.setAnswerLike(true);
//
//
//
//        String content =  gson.toJson(post);
//
//
//        //when
//        ResultActions actions  =
//                mockMvc.perform(
//                        post("/answer/like/{user-id}",1)
//                                .accept(MediaType.APPLICATION_JSON)
//                                .contentType(MediaType.APPLICATION_JSON)
//                                .content(content)
//                );
//
//        //then
//        actions
//                .andExpect(status().isCreated());
////                .andExpect(jsonPath("$.answerId").value(post.getAnswerId()));
//
//
//    }
//

}
