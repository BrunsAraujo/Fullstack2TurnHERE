package com.turnhere.fullstack2.repository;



import com.turnhere.fullstack2.models.Attraction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttractionRepository extends JpaRepository<Attraction, Long> {

    List<Attraction> findByCityId(Long cityId);

    List<Attraction> findByType(Attraction.Type type);
}