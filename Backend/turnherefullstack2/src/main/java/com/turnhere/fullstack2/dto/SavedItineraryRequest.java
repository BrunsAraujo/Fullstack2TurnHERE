package com.turnhere.fullstack2.dto;

import java.util.List;

// DTO for capturing saved itinerary form data from the frontend (user use)
public class SavedItineraryRequest {
    private String name;
    private String description;
    private Long userId;              // References the user saving the itinerary
    private Long cityId;              // References the city the itinerary is based in
    private List<Long> attractionIds; // List of attraction IDs selected by the user

    // Constructors
    public SavedItineraryRequest() {}

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getCityId() {
        return cityId;
    }

    public void setCityId(Long cityId) {
        this.cityId = cityId;
    }

    public List<Long> getAttractionIds() {
        return attractionIds;
    }

    public void setAttractionIds(List<Long> attractionIds) {
        this.attractionIds = attractionIds;
    }
}