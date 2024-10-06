package com.project.library_management.service;

import com.project.library_management.customException.exceptions.EmailAlreadyExistException;
import com.project.library_management.customException.exceptions.UserNotFoundException;
import com.project.library_management.dto.PasswordChangeReq;
import com.project.library_management.dto.UserDTO;
import com.project.library_management.model.User;
import com.project.library_management.repository.UserRepository;
import com.project.library_management.util.BasicResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UserNotFoundException {
        return userRepository.findByEmail(username)
                .orElseThrow(()-> new UserNotFoundException("user not found"));
    }

    public List<UserDTO> getUserDetails() {

        List<User> users = userRepository.findAll();
        return users.stream()
                .map(user -> new UserDTO(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getNumber(),
                        user.isBlocked(),
                        user.getCreated_at(),
                        user.getUpdated_at(),
                        user.getRole()
                )).collect(Collectors.toList());
    }


    public Page<User> getAllUsersBasedOnSearch(String search, Pageable pageable) {
        if(Objects.equals(search, "")) {
            return userRepository.findAll(pageable);
        }
        return userRepository.findByNameContainingIgnoreCase(search,pageable);
    }

    public BasicResponse manageBlockAndUnblock(int id) {

        try{
//            checkForBlockedUsers();
            User user = userRepository.findById(id).orElseThrow(()->new UserNotFoundException("User not found"));
            if(user.isBlocked()){
                user.setBlocked(false);
            } else {
                user.setBlocked(true);
            }
            userRepository.save(user);

            return BasicResponse.builder()
                    .status( HttpStatus.OK.value())
                    .message("Success")
                    .description("changes updated successfully")
                    .timestamp(LocalDateTime.now())
                    .build();

        } catch (UserNotFoundException e) {
            throw new UserNotFoundException(e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("Internal server error");
        }
    }

    public UserDTO editUser(UserDTO userDTO) {
        try{
            System.out.println(userDTO.toString());
            User user = userRepository.findById(userDTO.getId()).orElseThrow(()-> new UserNotFoundException("Book not found"));

            if (!user.getEmail().equals(userDTO.getEmail())) {
                // Check if the new email already exists in the database
                boolean emailExists = userRepository.existsByEmail(userDTO.getEmail());
                if (emailExists) {
                    throw new EmailAlreadyExistException("email already exits, cant use that one.");
                }
            }
            user.setName(userDTO.getName());
            user.setEmail(userDTO.getEmail());
            user.setNumber(userDTO.getNumber());
            user.setUpdated_at(LocalDateTime.now());
            userRepository.save(user);
            return  UserDTO.builder()
                    .id(user.getId())
                    .name(user.getName())
                    .email(user.getEmail())
                    .number(user.getNumber())
                    .build();
//            return BasicResponse.builder()
//                    .status(HttpStatus.OK.value())
//                    .message("edited successfully")
//                    .description("Book details edited successfully")
//                    .timestamp(LocalDateTime.now())
//                    .build();

        } catch (UserNotFoundException e) {
            throw new UserNotFoundException(e.getMessage());
        } catch (EmailAlreadyExistException e) {
            throw new EmailAlreadyExistException(e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public BasicResponse changePassword(PasswordChangeReq changeReq) {
        User user = userRepository.findById(changeReq.getUserId()).
                orElseThrow(()-> new UserNotFoundException("user not found"));
        if(!passwordEncoder.matches(changeReq.getPassword(),user.getPassword())){
            return BasicResponse.builder()
                    .status(HttpStatus.NOT_FOUND.value())
                    .message("Current password is incorrect")
                    .timestamp(LocalDateTime.now())
                    .build();
        }
        user.setPassword(passwordEncoder.encode(changeReq.getNewPassword()));
        userRepository.save(user);
        return BasicResponse.builder()
                .status(HttpStatus.OK.value())
                .message("password changed successfully")
                .description("password changed successfully")
                .timestamp(LocalDateTime.now())
                .build();
    }

    public boolean isUserBlocked(String userEmail) {
        User user = userRepository.findByEmail(userEmail).orElseThrow(()-> new UserNotFoundException("user not found"));
        return user.isBlocked();
    }
}
