package com.turnhere.fullstack2.controllers;

import com.turnhere.fullstack2.dto.UserLoginRequest;
import com.turnhere.fullstack2.dto.UserRegistrationRequest;
import com.turnhere.fullstack2.dto.AdminRegistrationRequest;
import com.turnhere.fullstack2.models.User;
import com.turnhere.fullstack2.models.UserRole;
import com.turnhere.fullstack2.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

// REST controller handling user and admin authentication (register and login)
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // BCrypt password encoder injected from SecurityConfig
    @Autowired
    private PasswordEncoder passwordEncoder;

    // Registers a new regular user with a hashed password and USER role
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserRegistrationRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // Hash password before saving
        user.setEmail(request.getEmail());
        user.setEnabled(true);
        user.setRole(UserRole.USER);

        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }

    // Registers a new admin - requires a secret key to prevent unauthorized admin creation
    @PostMapping("/register-admin")
    public ResponseEntity<?> registerAdmin(@RequestBody AdminRegistrationRequest request) {

        // Validates the admin secret key before proceeding
        if (!request.getAdminSecretKey().equals("TURNHERE_ADMIN_2026")) {
            return ResponseEntity.badRequest().body("Invalid admin secret key");
        }

        if (userRepository.existsByUsername(request.getUsername())) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        User admin = new User();
        admin.setUsername(request.getUsername());
        admin.setPassword(passwordEncoder.encode(request.getPassword())); // Hash password before saving
        admin.setEmail(request.getEmail());
        admin.setEnabled(true);
        admin.setRole(UserRole.ADMIN);

        User savedAdmin = userRepository.save(admin);
        return ResponseEntity.ok(savedAdmin);
    }

    // Authenticates a user or admin using BCrypt password matching
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginRequest request) {
        Optional<User> userOptional = userRepository.findByUsername(request.getUsername());

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }

        User user = userOptional.get();

        // Compares the plain text password against the stored hashed password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }

        if (!user.getEnabled()) {
            return ResponseEntity.status(403).body("Account is disabled");
        }

        return ResponseEntity.ok(user);
    }

    // Retrieves a user by their ID (used for profile lookups)
    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}