package com.project.library_management.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class AuthRequest {

    private String email;
    private String password;
}
