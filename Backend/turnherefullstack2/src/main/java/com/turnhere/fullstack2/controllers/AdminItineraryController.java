package com.turnhere.fullstack2.controllers;

import com.turnhere.fullstack2.dto.ItineraryRequest;
import com.turnhere.fullstack2.models.Attraction;
import com.turnhere.fullstack2.models.City;
import com.turnhere.fullstack2.models.Itinerary;
import com.turnhere.fullstack2.repository.AttractionRepository;
import com.turnhere.fullstack2.repository.CityRepository;
import com.turnhere.fullstack2.repository.ItineraryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// REST controller for admin itinerary management (CRUD operations)
@RestController
@RequestMapping("/api/admin/itineraries")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminItineraryController {

    private final ItineraryRepository itineraryRepository;
    private final CityRepository cityRepository;
    private final AttractionRepository attractionRepository;

    // Constructor injection of all required repositories
    public AdminItineraryController(ItineraryRepository itineraryRepository,
                                    CityRepository cityRepository,
                                    AttractionRepository attractionRepository) {
        this.itineraryRepository = itineraryRepository;
        this.cityRepository = cityRepository;
        this.attractionRepository = attractionRepository;
    }

    // Returns all itineraries in the database
    @GetMapping
    public ResponseEntity<List<Itinerary>> getAllItineraries() {
        return ResponseEntity.ok(itineraryRepository.findAll());
    }

    // Returns a single itinerary by ID
    @GetMapping("/{id}")
    public ResponseEntity<Itinerary> getItineraryById(@PathVariable Long id) {
        return itineraryRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Returns all itineraries associated with a specific city
    @GetMapping("/city/{cityId}")
    public ResponseEntity<List<Itinerary>> getItinerariesByCity(@PathVariable Long cityId) {
        return ResponseEntity.ok(itineraryRepository.findByCityId(cityId));
    }

    // Creates a new itinerary and links it to a city and optional attractions
    @PostMapping
    public ResponseEntity<Itinerary> createItinerary(@RequestBody ItineraryRequest request) {

        City city = cityRepository.findById(request.getCityId())
                .orElseThrow(() -> new RuntimeException("City not found"));

        Itinerary itinerary = new Itinerary();
        itinerary.setName(request.getName());
        itinerary.setDescription(request.getDescription());
        itinerary.setDuration(request.getDuration());
        itinerary.setCity(city);

        // Links attractions to the itinerary if any are provided
        if (request.getAttractionIds() != null && !request.getAttractionIds().isEmpty()) {
            List<Attraction> attractions = attractionRepository.findAllById(request.getAttractionIds());
            itinerary.setAttractions(attractions);
        }

        Itinerary saved = itineraryRepository.save(itinerary);
        return ResponseEntity.ok(saved);
    }

    // Updates an existing itinerary's details, city, and attractions by ID
    @PutMapping("/{id}")
    public ResponseEntity<Itinerary> updateItinerary(@PathVariable Long id, @RequestBody ItineraryRequest request) {

        return itineraryRepository.findById(id)
                .map(itinerary -> {
                    itinerary.setName(request.getName());
                    itinerary.setDescription(request.getDescription());
                    itinerary.setDuration(request.getDuration());

                    // Updates city only if a new cityId is provided
                    if (request.getCityId() != null) {
                        City city = cityRepository.findById(request.getCityId())
                                .orElseThrow(() -> new RuntimeException("City not found"));
                        itinerary.setCity(city);
                    }

                    // Updates attractions only if a new list is provided
                    if (request.getAttractionIds() != null) {
                        List<Attraction> attractions = attractionRepository.findAllById(request.getAttractionIds());
                        itinerary.setAttractions(attractions);
                    }

                    Itinerary updated = itineraryRepository.save(itinerary);
                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Deletes an itinerary by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItinerary(@PathVariable Long id) {
        if (!itineraryRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        itineraryRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}