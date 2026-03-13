package com.turnhere.fullstack2.repository;

import com.turnhere.fullstack2.models.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

// Repository for Review entity - provides standard CRUD operations via JpaRepository
@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    // Returns all reviews for a specific saved itinerary
    List<Review> findByItineraryId(Long itineraryId);

    // Returns all reviews submitted by a specific user
    List<Review> findByUserId(Long userId);
}