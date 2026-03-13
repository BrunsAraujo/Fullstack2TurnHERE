package com.turnhere.fullstack2.repository;

import com.turnhere.fullstack2.models.Attraction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// Repository for Attraction entity - provides standard CRUD operations via JpaRepository
public interface AttractionRepository extends JpaRepository<Attraction, Long> {

    // Returns all attractions belonging to a specific city
    List<Attraction> findByCityId(Long cityId);

    // Returns all attractions matching a specific type (e.g. MUSEUM, PARK)
    List<Attraction> findByType(Attraction.Type type);
}