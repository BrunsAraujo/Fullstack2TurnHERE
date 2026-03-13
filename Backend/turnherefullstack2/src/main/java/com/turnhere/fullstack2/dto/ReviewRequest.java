package com.turnhere.fullstack2.dto;

// DTO for capturing review form data from the frontend
public class ReviewRequest {
    private Long userId;        // References the user submitting the review
    private Long itineraryId;   // References the itinerary being reviewed
    private String comment;     // User's written feedback
    private Integer rating;     // Numeric rating between 1 and 5

    // Constructors
    public ReviewRequest() {}

    // Getters and Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getItineraryId() {
        return itineraryId;
    }

    public void setItineraryId(Long itineraryId) {
        this.itineraryId = itineraryId;
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
}