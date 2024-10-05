package com.project.library_management.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;

    private String author;

    private String description;
    private Integer quantity;
    private boolean archived;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;

//    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
//    private List<BorrowedBooks> borrowedBooks;

//    @PrePersist
//    protected void onCreate() {
//        this.created_at = LocalDateTime.now();
//    }
//
//    @PreUpdate
//    protected void onUpdate() {
//        this.updated_at = LocalDateTime.now();
//    }
}
