package com.project.library_management.service;

import com.project.library_management.customException.exceptions.UserNotFoundException;
import com.project.library_management.dto.BookDTO;
import com.project.library_management.model.Book;
import com.project.library_management.model.BorrowedBooks;
import com.project.library_management.model.LibrarySettings;
import com.project.library_management.repository.BookRepository;
import com.project.library_management.repository.LibrarySettingsRepository;
import com.project.library_management.util.BasicResponse;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDateTime;

import java.util.Objects;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private LibrarySettingsRepository librarySettingsRepository;

    @Transactional
    public BasicResponse addBooks(BookDTO bookDTO) {
        Book book = Book.builder()
                .title(bookDTO.getTitle())
                .author(bookDTO.getAuthor())
                .description(bookDTO.getDescription())
                .quantity(bookDTO.getQuantity())
                .build();

        bookRepository.save(book);

        return BasicResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Book added successfully!")
                .description("The book has been added to the database.")
                .timestamp(LocalDateTime.now())
                .build();
    }

    public Page<Book> getAllBooks(String search, Pageable pageable) {
        if(Objects.equals(search, "")) {
            return bookRepository.findAll(pageable);
        }
        return bookRepository.findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(search,search,pageable);
    }

    @Transactional
    public BasicResponse updateBookDetails(BookDTO bookDTO) {
        Book existingBook = bookRepository.findById(bookDTO.getId())
                .orElseThrow(() -> new EntityNotFoundException("Book not found with id: " + bookDTO.getId()));

        existingBook.setTitle(bookDTO.getTitle());
        existingBook.setAuthor(bookDTO.getAuthor());
        existingBook.setDescription(bookDTO.getDescription());
        existingBook.setQuantity(bookDTO.getQuantity());

        bookRepository.save(existingBook);

        return BasicResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Book updated successfully!")
                .description("The book details have been updated in the database.")
                .timestamp(LocalDateTime.now())
                .build();
    }

    public BasicResponse manageArchiveAndUnArchive(int userId) {
        try{
//            checkForBlockedUsers();
            Book book = bookRepository.findById(userId).orElseThrow(()->new UserNotFoundException("Book not found"));
            if(book.isArchived()){
                book.setArchived(false);
            } else {
                book.setArchived(true);
            }
            bookRepository.save(book);

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

    public Book editBook(BookDTO bookDTO) {
        try{
            Book book = bookRepository.findById(bookDTO.getId()).orElseThrow(()-> new UserNotFoundException("Book not found"));
            book.setTitle(bookDTO.getTitle());
            book.setAuthor(bookDTO.getAuthor());
            book.setDescription(bookDTO.getDescription());
            book.setQuantity(bookDTO.getQuantity());
            book.setUpdated_at(LocalDateTime.now());
            bookRepository.save(book);
            return book;
//            return BasicResponse.builder()
//                    .status(HttpStatus.OK.value())
//                    .message("edited successfully")
//                    .description("Book details edited successfully")
//                    .timestamp(LocalDateTime.now())
//                    .build();

        } catch (UserNotFoundException e) {
            throw new UserNotFoundException(e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("Internal server error");
        }
    }

    public BasicResponse updateBookLimit(LibrarySettings librarySettings) {
        LibrarySettings ls = librarySettingsRepository.findById(1).
                orElseThrow(()-> new UserNotFoundException("not found"));

        ls.setBorrow_limit(librarySettings.getBorrow_limit());
        ls.setUpdated_at(LocalDateTime.now());
        librarySettingsRepository.save(ls);
        return BasicResponse.builder()
                .status(HttpStatus.OK.value())
                .message("edited successfully")
                .description("limit for borrowing book updated.")
                .timestamp(LocalDateTime.now())
                .build();
    }

    public Page<Book> getAllBooksAvailable(String search, Pageable pageable) {
        if(Objects.equals(search, "")) {
            return bookRepository.findByArchivedFalse(pageable);
        }
        return bookRepository.findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCaseAndArchivedFalse(search,search,pageable);

    }


//    public void checkForBlockedUsers() {
//        List<User> users = userRepository.findAll();
//        for (User user : users) {
//            if (user.isBlocked()) {
//                // Check if user is logged in (session data example)
//                if (SecurityContextHolder.getContext().getAuthentication() != null
//                        && SecurityContextHolder.getContext().getAuthentication().getName().equals(user.getEmail())) {
//                    // Invalidate session (replace with your session management logic)
//                    SecurityContextHolder.clearContext();
//                    // Optionally, send a broadcast message (e.g., using a message queue)
//                    // to notify clients about the logout
//                }
//            }
//        }

}
