package com.project.library_management.dto;

import com.project.library_management.model.Role;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {

    private Integer id;
    private String name;
    private String email;
    private Long number;
    private boolean isBlocked;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
    private Role role;
}
