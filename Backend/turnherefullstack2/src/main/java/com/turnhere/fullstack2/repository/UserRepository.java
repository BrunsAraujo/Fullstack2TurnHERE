package com.turnhere.fullstack2.repository;

import com.turnhere.fullstack2.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

// Repository for User entity - provides standard CRUD operations via JpaRepository
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Returns a user by username (used during login)
    Optional<User> findByUsername(String username);

    // Returns a user by email (used for lookups)
    Optional<User> findByEmail(String email);

    // Checks if a username is already taken (used during registration)
    boolean existsByUsername(String username);

    // Checks if an email is already registered (used during registration)
    boolean existsByEmail(String email);
}