package com.turnhere.fullstack2.controllers;

import com.turnhere.fullstack2.dto.UserLoginRequest;
import com.turnhere.fullstack2.dto.UserRegistrationRequest;
import com.turnhere.fullstack2.models.User;
import com.turnhere.fullstack2.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // Register new user
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRegistrationRequest request) {
        // Validate input
        if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Username is required");
        }

        if (request.getPassword() == null || request.getPassword().length() < 8 || request.getPassword().length() > 12) {
            return ResponseEntity.badRequest().body("Password must be 8-12 characters long");
        }

        if (!request.getPassword().matches(".*\\d.*")) {
            return ResponseEntity.badRequest().body("Password must contain at least one number");
        }

        if (request.getEmail() == null || !request.getEmail().contains("@")) {
            return ResponseEntity.badRequest().body("Valid email is required");
        }

        // Check if username already exists
        if (userRepository.existsByUsername(request.getUsername())) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        // Create new user
        User user = new User(request.getUsername(), request.getPassword(), request.getEmail());
        userRepository.save(user);

        // Return success response
        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId());
        response.put("username", user.getUsername());
        response.put("email", user.getEmail());
        response.put("message", "User registered successfully");

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginRequest request) {
        Optional<User> userOptional = userRepository.findByUsername(request.getUsername());

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }

        User user = userOptional.get();

        // Simple password check (in production, use BCrypt or similar)
        if (!user.getPassword().equals(request.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }

        // Return user info
        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId());
        response.put("username", user.getUsername());
        response.put("email", user.getEmail());
        response.put("message", "Login successful");

        return ResponseEntity.ok(response);
    }

    // Get current user by ID
    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        Optional<User> userOptional = userRepository.findById(id);

        if (userOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User user = userOptional.get();
        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId());
        response.put("username", user.getUsername());
        response.put("email", user.getEmail());

        return ResponseEntity.ok(response);
    }
}