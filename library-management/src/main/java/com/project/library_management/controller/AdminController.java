package com.project.library_management.controller;

import com.project.library_management.dto.BookDTO;
import com.project.library_management.dto.UserDTO;
import com.project.library_management.model.Book;
import com.project.library_management.model.BorrowedBooks;
import com.project.library_management.model.LibrarySettings;
import com.project.library_management.model.User;
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
@RequestMapping("/api/admin")
//@CrossOrigin(origins = "http://localhost:5173")
//@CrossOrigin
public class AdminController {

    @Autowired
    private BookService bookService;

    @Autowired
    private UserService userService;

    @Autowired
    private BorrowedService borrowedService;

    @GetMapping("/getAllUsersOnSearch")
    public ResponseEntity<Page<User>> getAllUsers(@RequestParam(defaultValue = "1") int size,
                                                  @RequestParam(defaultValue = "") String search,
                                                  @RequestParam(defaultValue = "0") int page) {

        return ResponseEntity.ok(userService.getAllUsersBasedOnSearch(search, PageRequest.of(page, size)));
    }

//    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/addBook")
    public ResponseEntity<BasicResponse> addBooks(@RequestBody BookDTO bookDTO) {

        return ResponseEntity.ok(bookService.addBooks(bookDTO));
    }

    @PutMapping("/updateBookDetails")
    public ResponseEntity<BasicResponse> updateBookDetails(@RequestBody BookDTO bookDTO) {

        return ResponseEntity.ok(bookService.updateBookDetails(bookDTO));
    }

    @GetMapping("/getAllBooksOnSearch")
    public ResponseEntity<Page<Book>> getAllBooks(@RequestParam(defaultValue = "4") int size,
                                                  @RequestParam(defaultValue = "") String search,
                                                  @RequestParam(defaultValue = "0") int page) {

        return ResponseEntity.ok(bookService.getAllBooks(search, PageRequest.of(page, size)));
    }

    @GetMapping("/ManageArchiveBook")
    public ResponseEntity<BasicResponse> manageArchiveAndUnarchive(@RequestParam int id) {
        return ResponseEntity.ok(bookService.manageArchiveAndUnArchive(id));
    }

    @PutMapping("/ManageBlockUser")
    public ResponseEntity<BasicResponse> manageBlockAndUnblock(@RequestParam int id) {
        return ResponseEntity.ok(userService.manageBlockAndUnblock(id));
    }

    @PutMapping("/editBook")
    public ResponseEntity<Book> editBook(@RequestBody BookDTO bookDTO) {
        return ResponseEntity.ok(bookService.editBook(bookDTO));
    }

    @PutMapping("/editUser")
    public ResponseEntity<UserDTO> editUser(@RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.editUser(userDTO));
    }

    @GetMapping("/borrowedHistory/{id}")
    public ResponseEntity<BorrowedBooks> getBorrowedHistory(@PathVariable int id) {
        return ResponseEntity.ok(borrowedService.getBorrowedHistory(id));
    }

    @PostMapping("/updateBookLimit")
    public ResponseEntity<BasicResponse> updateBookLimit(@RequestBody LibrarySettings librarySettings) {
        return ResponseEntity.ok(bookService.updateBookLimit(librarySettings));
    }

    @GetMapping("getAllHistory")
    public ResponseEntity<Page<BorrowedBooks>> getAllHistory(@RequestParam(defaultValue = "4") int size,
                                                             @RequestParam(defaultValue = "") String search,
                                                             @RequestParam(defaultValue = "0") int page,
                                                             @RequestParam int userId){
        System.out.println("===================================================");
        return ResponseEntity.ok(borrowedService.getAllBorrowedBooksHistory(search,userId,PageRequest.of(page,size)));
    }
}
