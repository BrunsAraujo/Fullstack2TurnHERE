package com.turnhere.fullstack2.repository;

import com.turnhere.fullstack2.models.Itinerary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ItineraryRepository extends JpaRepository<Itinerary, Long> {

    // Find all itineraries for a specific city
    List<Itinerary> findByCityId(Long cityId);

    // Find itinerary by name
    Itinerary findByName(String name);
}