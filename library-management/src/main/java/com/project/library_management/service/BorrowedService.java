package com.project.library_management.service;

import com.project.library_management.customException.exceptions.EmailAlreadyExistException;
import com.project.library_management.customException.exceptions.UserBlockedException;
import com.project.library_management.customException.exceptions.UserNotFoundException;
import com.project.library_management.jwt.JwtService;
import com.project.library_management.model.Book;
import com.project.library_management.model.BorrowedBooks;
import com.project.library_management.model.LibrarySettings;
import com.project.library_management.model.User;
import com.project.library_management.repository.BookRepository;
import com.project.library_management.repository.BorrowedBooksRepository;
import com.project.library_management.repository.LibrarySettingsRepository;
import com.project.library_management.repository.UserRepository;
import com.project.library_management.util.BasicResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
public class BorrowedService {

    @Autowired
    private BorrowedBooksRepository borrowedBooksRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LibrarySettingsRepository librarySettingsRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private JwtService jwtService;
    public BorrowedBooks getBorrowedHistory(int id) {
        return borrowedBooksRepository.findByUserId(id);
    }

    public Page<BorrowedBooks> getAllBorrowedBooksHistory(String search, int userId, Pageable pageable) {
        if(Objects.equals(search,"")){
            System.out.println("==================================================="+borrowedBooksRepository.findByUserId(pageable,userId).toString());

            return borrowedBooksRepository.findByUserId(pageable,userId);
        } else {
            System.out.println("==================================================="+borrowedBooksRepository.findByBookTitleContainingIgnoreCaseAndUserId(search, userId, pageable).toString());

            return borrowedBooksRepository.findByBookTitleContainingIgnoreCaseAndUserId(search, userId, pageable);
        }

    }

    @Transactional
    public BasicResponse borrowBook(int bookId, String header) {
        String jwt = header.substring(7);
        String email = jwtService.extractUsername(jwt);
        try {
            User user = userRepository.findByEmail(email).
                    orElseThrow(()-> new UserNotFoundException("user not found"));

            BorrowedBooks bookExist = borrowedBooksRepository.findBookExistOrNotByUser(bookId,user.getId());

            if(bookExist != null && bookExist.getReturned_at() == null ) {
                throw new EmailAlreadyExistException("You have already borrowed it");
            }

            boolean limitExceed = checkLimitExceedOrNot(user);
            if(!limitExceed){
                throw new EmailAlreadyExistException("Can't borrow more books, you have reached your maximum limit.");
            }

            Book book = bookRepository.findById(bookId).
                    orElseThrow(()-> new UserNotFoundException("book no found"));

            BorrowedBooks borrowedBooks = BorrowedBooks.builder()
                    .book(book)
                    .user(user)
                    .borrowed_at(LocalDateTime.now())
                    .build();

            borrowedBooksRepository.save(borrowedBooks);

            book.setQuantity(book.getQuantity()-1);
            bookRepository.save(book);

            return BasicResponse.builder()
                    .status(HttpStatus.OK.value())
                    .message("borrowed successfully")
                    .description("book borrowed successfully")
                    .timestamp(LocalDateTime.now())
                    .build();

        } catch (UserNotFoundException e) {
            throw new UserNotFoundException(e.getMessage());
        } catch (EmailAlreadyExistException e) {
            throw new EmailAlreadyExistException(e.getMessage());
        }
    }

    private boolean checkLimitExceedOrNot(User user) {
        int count = borrowedBooksRepository.findCountOfBorrowedBooks(user.getId());
        int limit = librarySettingsRepository.findBorrowLimit(1);
        System.out.println("limit and count  "+count+" ");
        return count < limit;
    }

    public Page<BorrowedBooks> getBorrowedBooks(String header, String search,Pageable pageable) {
        String jwt = header.substring(7);
        String email = jwtService.extractUsername(jwt);
        try {
            User user = userRepository.findByEmail(email).
                    orElseThrow(() -> new UserNotFoundException("user not found"));

            if(Objects.equals(search,"")) {
                Page<BorrowedBooks> borrowedBooks = borrowedBooksRepository.findBorrowedBooksByUserId(pageable, user.getId());
                return borrowedBooks;
            }
            return borrowedBooksRepository.findBorrowedBooksBySearch(search, pageable,user.getId());
        } catch (UserNotFoundException e) {
            throw new UserNotFoundException(e.getMessage());
        }
    }

    public BasicResponse returnBook(int id) {
        try{
            BorrowedBooks borrowedBook = borrowedBooksRepository.findById(id).
                    orElseThrow(()-> new UserNotFoundException("book not found"));

            borrowedBook.setReturned_at(LocalDateTime.now());
            borrowedBooksRepository.save(borrowedBook);
            Book book = borrowedBook.getBook();
            book.setQuantity(book.getQuantity()+1);
            bookRepository.save(book);
            return BasicResponse.builder()
                    .status(HttpStatus.OK.value())
                    .message("book returned successfully")
                    .description("borrowed book returned back successfully.")
                    .timestamp(LocalDateTime.now())
                    .build();
        } catch (UserNotFoundException e){
            throw new UserNotFoundException(e.getMessage());
        }
    }

    public BasicResponse updateBorrowedLimit(Integer limit) {
        List<LibrarySettings> librarySettings = librarySettingsRepository.findAll();

        LibrarySettings librarySettings1 = librarySettings.get(0);
        librarySettings1.setBorrow_limit(limit);
        librarySettings1.setUpdated_at(LocalDateTime.now());
        librarySettingsRepository.save(librarySettings1);
        return BasicResponse.builder()
                .status(HttpStatus.OK.value())
                .message("updated successfully")
                .description("Borrowed books limit updated")
                .timestamp(LocalDateTime.now())
                .build();
    }

    public LibrarySettings limitDetails() {
        try {
            return librarySettingsRepository.findById(1).orElseThrow(()-> new UserNotFoundException("not found"));
        } catch (UserNotFoundException e) {
            throw new UserNotFoundException(e.getMessage());
        }
    }
}

