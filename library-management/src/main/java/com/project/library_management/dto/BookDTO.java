package com.project.library_management.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BookDTO {

    private Integer id;
    private String title;

    private String author;

    private String description;
    private Integer quantity;
}
