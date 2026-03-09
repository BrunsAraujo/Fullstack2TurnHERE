package com.turnhere.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "itineraries")
public class Itinerary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(length = 1000)
    private String description;

    private Integer duration; // Duration in hours

    @ManyToOne
    @JoinColumn(name = "city_id", nullable = false)
    private com.turnhere.models.City city;

    @ManyToMany
    @JoinTable(
            name = "itinerary_attractions",
            joinColumns = @JoinColumn(name = "itinerary_id"),
            inverseJoinColumns = @JoinColumn(name = "attraction_id")
    )
    private List<Attraction> attractions = new ArrayList<>();

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // Constructors
    public Itinerary() {
        this.createdAt = LocalDateTime.now();
    }

    public Itinerary(String name, String description, Integer duration, com.turnhere.models.City city) {
        this.name = name;
        this.description = description;
        this.duration = duration;
        this.city = city;
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public com.turnhere.models.City getCity() {
        return city;
    }

    public void setCity(com.turnhere.models.City city) {
        this.city = city;
    }

    public List<Attraction> getAttractions() {
        return attractions;
    }

    public void setAttractions(List<Attraction> attractions) {
        this.attractions = attractions;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    // Helper methods to manage attractions
    public void addAttraction(Attraction attraction) {
        this.attractions.add(attraction);
    }

    public void removeAttraction(Attraction attraction) {
        this.attractions.remove(attraction);
    }
}
