package com.turnhere.fullstack2.models;

import jakarta.persistence.*;

// Entity representing an attraction stored in the "attraction" table
@Entity
@Table(name = "attraction")
public class Attraction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    // Stored as a string in the database using the enum name
    @Enumerated(EnumType.STRING)
    private Type type;

    private String address;

    // Allows longer text for attraction descriptions
    @Column(length = 1000)
    private String description;

    // Many attractions can belong to one city
    @ManyToOne
    @JoinColumn(name = "city_id", nullable = false)
    private City city;

    // Enum defining all valid attraction types for the application
    public enum Type {
        ANTIQUE_SHOP,
        BREWERY,
        WINERY,
        MUSEUM,
        PARK,
        RESTAURANT,
        WALKING_TRAILS,
        CEMETERIES,
        BARNS,
        CIVIL_WAR,
        HISTORICAL_INTEREST
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

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
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

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }
}