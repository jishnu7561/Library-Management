package com.project.library_management.service;

import com.project.library_management.customException.exceptions.CustomBadCredentialException;
import com.project.library_management.customException.exceptions.EmailAlreadyExistException;
import com.project.library_management.customException.exceptions.UserBlockedException;
import com.project.library_management.customException.exceptions.UserNotFoundException;
import com.project.library_management.dto.AuthRequest;
import com.project.library_management.dto.AuthResponse;
import com.project.library_management.dto.RegistrationRequest;
import com.project.library_management.dto.UserDTO;
import com.project.library_management.jwt.JwtService;
import com.project.library_management.model.Role;
import com.project.library_management.model.User;
import com.project.library_management.repository.UserRepository;
import com.project.library_management.util.BasicResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    public BasicResponse registerUser(RegistrationRequest regRequest) {

        try{
            Optional<User> userExist = userRepository.findByEmail(regRequest.getEmail());
            if(userExist.isPresent()) {
                throw new EmailAlreadyExistException("Email address already exists");
            }

            var user = User.builder()
                    .name(regRequest.getName())
                    .email(regRequest.getEmail())
                    .password(passwordEncoder.encode(regRequest.getPassword()))
                    .number(regRequest.getNumber())
                    .role(Role.USER)
                    .build();
            userRepository.save(user);

            return BasicResponse.builder()
                    .status(HttpStatus.OK.value())
                    .message("Account created successfully")
                    .description("Account created successfully.")
                    .timestamp(LocalDateTime.now())
                    .build();
        } catch (EmailAlreadyExistException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new RuntimeException("An error occurred during user registration. Please try again later.", ex);
        }
    }

    public AuthResponse authenticate(AuthRequest authRequest) {

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authRequest.getEmail(),
                            authRequest.getPassword()
                    )
            );


            User user = userRepository.findByEmail(authRequest.getEmail())
                    .orElseThrow(() -> new UserNotFoundException("Email address is incorrect"));

            if(user.isBlocked()) {
                throw new UserBlockedException("account is blocked");
            }

            String jwtToken = jwtService.generateToken(authRequest.getEmail());
            return AuthResponse.builder()
                    .jwtToken(jwtToken)
                    .user(UserDTO.builder()
                            .id(user.getId())
                            .name(user.getName())
                            .email(user.getEmail())
                            .number(user.getNumber())
                            .role(user.getRole())
                            .created_at(user.getCreated_at())
                            .updated_at(user.getUpdated_at())
                            .isBlocked(user.isBlocked())
                            .build())
                    .basicResponse(BasicResponse.builder()
                            .status(HttpStatus.OK.value())
                            .message("Authentication successful")
                            .description("User successfully authenticated.")
                            .timestamp(LocalDateTime.now())
                            .build())
                    .build();
        } catch (BadCredentialsException e) {
            throw new CustomBadCredentialException("Email or Password is incorrect");
        } catch (UserBlockedException e) {
            throw new UserBlockedException(e.getMessage());
        }
        catch (UserNotFoundException e){
            throw new UserNotFoundException(e.getMessage());
        }
    }
}
