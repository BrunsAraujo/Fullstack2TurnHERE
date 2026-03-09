package com.turnhere.repository;

import com.turnhere.models.Attraction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttractionRepository extends JpaRepository<Attraction, Long> {

    List<Attraction> findByCityId(Long cityId);

    List<Attraction> findByType(Attraction.Type type);
}