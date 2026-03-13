package com.turnhere.fullstack2.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

// Entity representing a user stored in the "users" table
// Supports both USER and ADMIN roles via the UserRole enum
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    // Password is stored as a BCrypt hash (never plain text)
    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String email;

    // Allows accounts to be disabled without deleting them
    @Column(nullable = false)
    private Boolean enabled = true;

    // Stored as a string in the database (USER or ADMIN)
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role = UserRole.USER;

    // Automatically set to current time when the user is created
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // One user can have many saved itineraries
    // JsonIgnore prevents infinite recursion during serialization
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<SavedItinerary> savedItineraries;

    // One user can have many reviews
    // JsonIgnore prevents infinite recursion during serialization
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Review> reviews;

    // Constructors
    public User() {}

    // Constructor for creating a standard user with default role of USER
    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.enabled = true;
        this.role = UserRole.USER;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<SavedItinerary> getSavedItineraries() {
        return savedItineraries;
    }

    public void setSavedItineraries(List<SavedItinerary> savedItineraries) {
        this.savedItineraries = savedItineraries;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }
}