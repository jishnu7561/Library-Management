package com.project.library_management.dto;

import com.project.library_management.util.BasicResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class AuthResponse {
    private String jwtToken;
    private UserDTO user;
    private BasicResponse basicResponse;

}
