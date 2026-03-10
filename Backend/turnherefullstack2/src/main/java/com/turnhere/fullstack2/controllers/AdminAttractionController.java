package com.turnhere.fullstack2.controllers;

import com.turnhere.fullstack2.dto.AttractionRequest;
import com.turnhere.fullstack2.models.Attraction;
import com.turnhere.fullstack2.models.City;
import com.turnhere.fullstack2.repository.AttractionRepository;
import com.turnhere.fullstack2.repository.CityRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/attractions")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminAttractionController {

    private final CityRepository cityRepository;
    private final AttractionRepository attractionRepository;

    public AdminAttractionController(CityRepository cityRepository,
                                     AttractionRepository attractionRepository) {
        this.cityRepository = cityRepository;
        this.attractionRepository = attractionRepository;
    }

    @PostMapping
    public ResponseEntity<Attraction> createAttraction(@RequestBody AttractionRequest request) {

        City city = cityRepository.findById(request.getCityId())
                .orElseThrow(() -> new RuntimeException("City not found"));

        Attraction attraction = new Attraction();
        attraction.setName(request.getName());
        attraction.setType(Attraction.Type.valueOf(request.getType()));
        attraction.setDescription(request.getDescription());
        attraction.setAddress(request.getAddress());
        attraction.setCity(city);

        Attraction saved = attractionRepository.save(attraction);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<List<Attraction>> getAll() {
        return ResponseEntity.ok(attractionRepository.findAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Attraction> updateAttraction(@PathVariable Long id,
                                                       @RequestBody AttractionRequest request) {

        Attraction attraction = attractionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Attraction not found"));

        City city = cityRepository.findById(request.getCityId())
                .orElseThrow(() -> new RuntimeException("City not found"));

        attraction.setName(request.getName());
        attraction.setType(Attraction.Type.valueOf(request.getType()));
        attraction.setDescription(request.getDescription());
        attraction.setAddress(request.getAddress());
        attraction.setCity(city);

        Attraction updated = attractionRepository.save(attraction);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!attractionRepository.existsById(id)) {
            throw new RuntimeException("Attraction not found");
        }
        attractionRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}