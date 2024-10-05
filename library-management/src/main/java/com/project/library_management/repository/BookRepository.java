package com.project.library_management.repository;

import com.project.library_management.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book,Integer> {
    Page<Book> findByTitleContainingIgnoreCaseAndAuthorContainingIgnoreCase(String title, String author, Pageable pageable);

    Page<Book> findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(String search, String search1, Pageable pageable);

    Page<Book> findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCaseAndArchivedFalse(String search, String search1, Pageable pageable);

    Page<Book> findByArchivedFalse(Pageable pageable);

//    Page<Book> findAllBooks(Pageable pageable);
}
