package com.turnhere.fullstack2.repository;

import com.turnhere.fullstack2.models.SavedItinerary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SavedItineraryRepository extends JpaRepository<SavedItinerary, Long> {
    List<SavedItinerary> findByUserId(Long userId);
}