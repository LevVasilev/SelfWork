package com.platform.freelance.service;

import com.platform.freelance.dto.LoginUserDto;
import com.platform.freelance.dto.RegisterUserDto;
import com.platform.freelance.model.User;
import com.platform.freelance.repos.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    @Value("${upload.dir}")
    private String uploadDir;

    public AuthenticationService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // redundant api
    public User signup(RegisterUserDto input) {
        User user = new User();
        user.setName(input.getName());
        user.setMobile(input.getMobile());
        user.setEmail(input.getEmail());
        user.setPassword(passwordEncoder.encode(input.getPassword()));
        user.setRole(User.Role.CUSTOMER);
        user.setSkills(input.getSkills());

        return userRepository.save(user);
    }


    public User signupUser(RegisterUserDto input) {
        User user = new User();
        user.setName(input.getName());
        user.setMobile(input.getMobile());
        user.setEmail(input.getEmail());
        user.setPassword(passwordEncoder.encode(input.getPassword()));
        user.setRole(User.Role.SEEKER);
        user.setSkills(input.getSkills());

        User savedUser = userRepository.save(user);
/*
        if(input.getPhoto() != null && !input.getPhoto().isEmpty()) {
            String filename = savedUser.getId() + ".";
            Path filePath = Paths.get(uploadDir, filename);
            File file = filePath.toFile();

            try {
                input.getPhoto().transferTo(file);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
*/
        return savedUser;
    }


    public User authenticate(LoginUserDto input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );

        return userRepository.findByEmail(input.getEmail())
                .orElseThrow();
    }
}