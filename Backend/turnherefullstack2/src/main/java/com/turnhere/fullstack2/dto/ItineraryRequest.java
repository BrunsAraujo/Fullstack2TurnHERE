package com.turnhere.fullstack2.dto;

import java.util.List;

// DTO for capturing itinerary form data from the frontend (admin use)
public class ItineraryRequest {

    private String name;
    private String description;
    private Integer duration;           // Duration of the itinerary in days
    private Long cityId;                // References the city this itinerary is based in
    private List<Long> attractionIds;   // List of attraction IDs to include in the itinerary

    // Constructors
    public ItineraryRequest() {
    }

    public ItineraryRequest(String name, String description, Integer duration, Long cityId, List<Long> attractionIds) {
        this.name = name;
        this.description = description;
        this.duration = duration;
        this.cityId = cityId;
        this.attractionIds = attractionIds;
    }

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

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
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