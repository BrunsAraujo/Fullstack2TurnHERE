package com.turnhere.fullstack2.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

// Entity representing a user review on a saved itinerary stored in the "reviews" table
@Entity
@Table(name = "reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Many reviews can belong to one user
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Many reviews can belong to one saved itinerary
    @ManyToOne
    @JoinColumn(name = "itinerary_id", nullable = false)
    private SavedItinerary itinerary;

    // Allows longer text for review comments
    @Column(length = 1000)
    private String comment;

    private Integer rating; // 1-5 stars

    // Automatically records when the review was created
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // Automatically sets createdAt timestamp before the entity is saved
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    // Constructors
    public Review() {}

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public SavedItinerary getItinerary() {
        return itinerary;
    }

    public void setItinerary(SavedItinerary itinerary) {
        this.itinerary = itinerary;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}