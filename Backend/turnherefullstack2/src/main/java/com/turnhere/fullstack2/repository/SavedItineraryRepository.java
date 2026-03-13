package com.turnhere.fullstack2.repository;

import com.turnhere.fullstack2.models.SavedItinerary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

// Repository for SavedItinerary entity - provides standard CRUD operations via JpaRepository
@Repository
public interface SavedItineraryRepository extends JpaRepository<SavedItinerary, Long> {

    // Returns all saved itineraries belonging to a specific user
    List<SavedItinerary> findByUserId(Long userId);
}