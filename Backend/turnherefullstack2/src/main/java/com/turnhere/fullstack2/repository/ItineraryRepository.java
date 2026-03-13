package com.turnhere.fullstack2.repository;

import com.turnhere.fullstack2.models.Itinerary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

// Repository for Itinerary entity - provides standard CRUD operations via JpaRepository
@Repository
public interface ItineraryRepository extends JpaRepository<Itinerary, Long> {

    // Returns all itineraries associated with a specific city
    List<Itinerary> findByCityId(Long cityId);

    // Returns a single itinerary matching the given name
    Itinerary findByName(String name);
}