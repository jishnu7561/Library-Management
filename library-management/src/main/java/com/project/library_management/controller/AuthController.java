package com.project.library_management.controller;

import com.project.library_management.dto.AuthRequest;
import com.project.library_management.dto.AuthResponse;
import com.project.library_management.dto.RegistrationRequest;
import com.project.library_management.model.User;
import com.project.library_management.service.AuthService;
import com.project.library_management.service.UserService;
import com.project.library_management.util.BasicResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/auth")
//@CrossOrigin
public class AuthController {

    @Autowired
    private AuthService authService;

//    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/register")
    public ResponseEntity<BasicResponse> register(@RequestBody RegistrationRequest regRequest) {
        return ResponseEntity.ok(authService.registerUser(regRequest));
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponse> authenticate(@RequestBody AuthRequest authRequest) {
        return ResponseEntity.ok(authService.authenticate(authRequest));
    }
}
