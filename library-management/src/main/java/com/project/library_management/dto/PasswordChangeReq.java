package com.project.library_management.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class PasswordChangeReq {
    private int userId;
    private String password;
    private String newPassword;
}
