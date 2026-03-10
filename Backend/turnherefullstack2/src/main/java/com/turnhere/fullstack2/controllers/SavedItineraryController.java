package com.turnhere.fullstack2.controllers;

import com.turnhere.fullstack2.dto.SavedItineraryRequest;
import com.turnhere.fullstack2.models.Attraction;
import com.turnhere.fullstack2.models.City;
import com.turnhere.fullstack2.models.SavedItinerary;
import com.turnhere.fullstack2.models.User;
import com.turnhere.fullstack2.repository.AttractionRepository;
import com.turnhere.fullstack2.repository.CityRepository;
import com.turnhere.fullstack2.repository.SavedItineraryRepository;
import com.turnhere.fullstack2.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/itineraries")
@CrossOrigin(origins = "http://localhost:5173")
public class SavedItineraryController {

    @Autowired
    private SavedItineraryRepository savedItineraryRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private AttractionRepository attractionRepository;

    // Get all saved itineraries for a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SavedItinerary>> getItinerariesByUser(@PathVariable Long userId) {
        List<SavedItinerary> itineraries = savedItineraryRepository.findByUserId(userId);
        return ResponseEntity.ok(itineraries);
    }

    // Get a specific saved itinerary by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getItineraryById(@PathVariable Long id) {
        Optional<SavedItinerary> itinerary = savedItineraryRepository.findById(id);
        if (itinerary.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(itinerary.get());
    }

    // Get all saved itineraries (for admin or public view)
    @GetMapping
    public ResponseEntity<List<SavedItinerary>> getAllItineraries() {
        List<SavedItinerary> itineraries = savedItineraryRepository.findAll();
        return ResponseEntity.ok(itineraries);
    }

    // Create a new saved itinerary
    @PostMapping
    public ResponseEntity<?> createItinerary(@RequestBody SavedItineraryRequest request) {
        // Validate user
        Optional<User> userOptional = userRepository.findById(request.getUserId());
        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }

        // Validate city (optional)
        City city = null;
        if (request.getCityId() != null) {
            Optional<City> cityOptional = cityRepository.findById(request.getCityId());
            if (cityOptional.isEmpty()) {
                return ResponseEntity.badRequest().body("City not found");
            }
            city = cityOptional.get();
        }

        // Validate attractions
        List<Attraction> attractions = attractionRepository.findAllById(request.getAttractionIds());
        if (attractions.size() != request.getAttractionIds().size()) {
            return ResponseEntity.badRequest().body("One or more attractions not found");
        }

        // Create itinerary
        SavedItinerary itinerary = new SavedItinerary();
        itinerary.setName(request.getName());
        itinerary.setDescription(request.getDescription());
        itinerary.setUser(userOptional.get());
        itinerary.setCity(city);
        itinerary.setAttractions(attractions);

        SavedItinerary savedItinerary = savedItineraryRepository.save(itinerary);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedItinerary);
    }

    // Update a saved itinerary
    @PutMapping("/{id}")
    public ResponseEntity<?> updateItinerary(@PathVariable Long id, @RequestBody SavedItineraryRequest request) {
        Optional<SavedItinerary> itineraryOptional = savedItineraryRepository.findById(id);
        if (itineraryOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        SavedItinerary itinerary = itineraryOptional.get();

        // Update city if provided
        if (request.getCityId() != null) {
            Optional<City> cityOptional = cityRepository.findById(request.getCityId());
            if (cityOptional.isEmpty()) {
                return ResponseEntity.badRequest().body("City not found");
            }
            itinerary.setCity(cityOptional.get());
        }

        // Update attractions if provided
        if (request.getAttractionIds() != null && !request.getAttractionIds().isEmpty()) {
            List<Attraction> attractions = attractionRepository.findAllById(request.getAttractionIds());
            if (attractions.size() != request.getAttractionIds().size()) {
                return ResponseEntity.badRequest().body("One or more attractions not found");
            }
            itinerary.setAttractions(attractions);
        }

        // Update name and description
        if (request.getName() != null) {
            itinerary.setName(request.getName());
        }
        if (request.getDescription() != null) {
            itinerary.setDescription(request.getDescription());
        }

        SavedItinerary updatedItinerary = savedItineraryRepository.save(itinerary);
        return ResponseEntity.ok(updatedItinerary);
    }

    // Delete a saved itinerary
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteItinerary(@PathVariable Long id) {
        if (!savedItineraryRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        savedItineraryRepository.deleteById(id);
        return ResponseEntity.ok("Itinerary deleted successfully");
    }
}