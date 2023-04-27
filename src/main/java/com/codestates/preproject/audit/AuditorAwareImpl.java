package com.codestates.preproject.audit;

import com.codestates.preproject.user.repository.UserRepository;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class AuditorAwareImpl implements AuditorAware<String> {

    private final UserRepository userRepository;

    public AuditorAwareImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Optional<String> getCurrentAuditor() {

       String email = SecurityContextHolder.getContext().getAuthentication().getName();
//
//       Optional<User> user = userRepository.findByEmail(email);
//
//       User finduser=user.orElseThrow(()->new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        //여기서 레파지토리 쓰면 안되구나......최원가입하는데 에러던져버린다

        return Optional.of(email);

    }
}
