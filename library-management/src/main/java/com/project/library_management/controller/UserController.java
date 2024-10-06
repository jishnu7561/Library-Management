package com.project.library_management.controller;

import com.project.library_management.dto.BookDTO;
import com.project.library_management.dto.PasswordChangeReq;
import com.project.library_management.dto.UserDTO;
import com.project.library_management.model.Book;
import com.project.library_management.model.BorrowedBooks;
import com.project.library_management.service.BookService;
import com.project.library_management.service.BorrowedService;
import com.project.library_management.service.UserService;
import com.project.library_management.util.BasicResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
//@CrossOrigin("http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private BorrowedService borrowedService;

    @Autowired
    private BookService bookService;

//    @PutMapping("/editProfile")
//    public ResponseEntity<UserDTO> editProfile(@RequestBody UserDTO userDTO) {
//        return ResponseEntity.ok(userService.editUser(userDTO));
//    }

    @PutMapping("/editUser")
    public ResponseEntity<UserDTO> editUser(@RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.editUser(userDTO));
    }

    @PutMapping("changePassword")
    public ResponseEntity<BasicResponse> changePassword(
            @RequestBody PasswordChangeReq changeReq) {
        return ResponseEntity.ok(userService.changePassword(changeReq));
    }

    @PostMapping("/borrowBook")
    public ResponseEntity<BasicResponse> borrowBook(@RequestParam int bookId,
                                                    @RequestHeader("Authorization") String header) {
        System.out.println("authorization header == "+ header);
        return ResponseEntity.ok(borrowedService.borrowBook(bookId,header));
    }

    @GetMapping("/getAllBooksOnSearch")
    public ResponseEntity<Page<Book>> getAllBooks(@RequestParam(defaultValue = "3") int size,
                                                  @RequestParam(defaultValue = "") String search,
                                                  @RequestParam(defaultValue = "0") int page) {

        return ResponseEntity.ok(bookService.getAllBooksAvailable(search, PageRequest.of(page, size)));
    }


    @GetMapping("/getAllBorrowedBooksOnSearch")
    public  ResponseEntity<Page<BorrowedBooks>> getBorrowedBooks(@RequestParam(defaultValue = "3") int size,
                                                                 @RequestParam(defaultValue = "") String search,
                                                                 @RequestParam(defaultValue = "0") int page,
                                                                 @RequestHeader("Authorization") String header) {
        return ResponseEntity.ok(borrowedService.getBorrowedBooks(header,search, PageRequest.of(page,size)));
    }

    @PutMapping("/returnBook")
    public ResponseEntity<BasicResponse> returnBook(@RequestParam int id) {
        return ResponseEntity.ok(borrowedService.returnBook(id));
    }

}
