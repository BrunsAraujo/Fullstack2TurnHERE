package com.turnhere.fullstack2.dto;

// DTO for capturing attraction form data from the frontend
public class AttractionRequest {

    private String name;
    private String type;        // Sent as a String, converted to enum in the controller
    private String description;
    private String address;
    private Long cityId;        // References the city this attraction belongs to

    // Constructors
    public AttractionRequest() {
    }

    public AttractionRequest(String name, String type, String description, String address, Long cityId) {
        this.name = name;
        this.type = type;
        this.description = description;
        this.address = address;
        this.cityId = cityId;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Long getCityId() {
        return cityId;
    }

    public void setCityId(Long cityId) {
        this.cityId = cityId;
    }
}