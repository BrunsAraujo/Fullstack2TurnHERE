package com.turnhere.fullstack2.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

// Entity representing a user-created saved itinerary stored in the "saved_itineraries" table
@Entity
@Table(name = "saved_itineraries")
public class SavedItinerary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;

    // Many saved itineraries can belong to one user
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Many saved itineraries can be associated with one city (optional)
    @ManyToOne
    @JoinColumn(name = "city_id")
    private City city;

    // Many-to-many relationship with attractions via a join table
    @ManyToMany
    @JoinTable(
            name = "saved_itinerary_attractions",
            joinColumns = @JoinColumn(name = "itinerary_id"),
            inverseJoinColumns = @JoinColumn(name = "attraction_id")
    )
    private List<Attraction> attractions;

    // Automatically records when the itinerary was created
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // One saved itinerary can have many reviews; deletes reviews if itinerary is deleted
    @OneToMany(mappedBy = "itinerary", cascade = CascadeType.ALL)
    private List<Review> reviews;

    // Automatically sets createdAt timestamp before the entity is saved
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    // Constructors
    public SavedItinerary() {}

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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
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

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }
}