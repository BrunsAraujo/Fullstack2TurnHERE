package com.turnhere.fullstack2.repository;



import com.turnhere.fullstack2.models.City;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepository extends JpaRepository<City, Long> {

}