package com.project.library_management.repository;

import com.project.library_management.model.BorrowedBooks;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BorrowedBooksRepository extends JpaRepository<BorrowedBooks,Integer> {

    BorrowedBooks findByUserId(int id);

    Page<BorrowedBooks> findByUserId(Pageable pageable, Integer userId);

    @Query("SELECT b FROM BorrowedBooks b WHERE b.returned_at IS NULL AND b.user.id = :userId")
    Page<BorrowedBooks> findBorrowedBooksByUserId(Pageable pageable, Integer userId);

    Page<BorrowedBooks> findByBookTitleContainingIgnoreCaseAndUserId(String search, int userId, Pageable pageable);

    @Query("SELECT b FROM BorrowedBooks b WHERE b.book.id= :bookId AND b.user.id= :userId AND b.returned_at IS NULL" )
    BorrowedBooks findBookExistOrNotByUser(@Param("bookId") int bookId,@Param("userId") Integer id);

    @Query("SELECT COUNT(b) FROM BorrowedBooks b WHERE b.user.id =:userId AND b.returned_at IS NUll")
    int findCountOfBorrowedBooks(@Param("userId") Integer id);

//    Page<BorrowedBooks> findByUserId(Pageable pageable, Integer id);

    @Query("SELECT b FROM BorrowedBooks b " +
            "WHERE b.returned_at IS NULL " +
            "AND (b.book.title LIKE %:search% OR b.book.author LIKE %:search%) " +
            "AND b.user.id = :userId")
    Page<BorrowedBooks> findBorrowedBooksBySearch(@Param("search") String search, Pageable pageable,@Param("userId") Integer id);
}
