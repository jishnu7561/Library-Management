package com.project.library_management.repository;

import com.project.library_management.model.LibrarySettings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LibrarySettingsRepository extends JpaRepository<LibrarySettings,Integer> {

    @Query("SELECT l.borrow_limit FROM LibrarySettings l WHERE l.id= :id")
    int findBorrowLimit(@Param("id") int id);
}
