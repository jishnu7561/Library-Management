package com.project.library_management.repository;

import com.project.library_management.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {

    public Optional<User> findByEmail(String username);

    Page<User> findByNameContainingIgnoreCase(String search, Pageable pageable);

    boolean existsByEmail(String email);
}
