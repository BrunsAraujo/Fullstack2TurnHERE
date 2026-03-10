package com.turnhere.fullstack2.controllers;

import com.turnhere.fullstack2.dto.ReviewRequest;
import com.turnhere.fullstack2.models.Review;
import com.turnhere.fullstack2.models.SavedItinerary;
import com.turnhere.fullstack2.models.User;
import com.turnhere.fullstack2.repository.ReviewRepository;
import com.turnhere.fullstack2.repository.SavedItineraryRepository;
import com.turnhere.fullstack2.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:5173")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SavedItineraryRepository savedItineraryRepository;

    // Get all reviews for a specific itinerary
    @GetMapping("/itinerary/{itineraryId}")
    public ResponseEntity<List<Review>> getReviewsByItinerary(@PathVariable Long itineraryId) {
        List<Review> reviews = reviewRepository.findByItineraryId(itineraryId);
        return ResponseEntity.ok(reviews);
    }

    // Get all reviews by a specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Review>> getReviewsByUser(@PathVariable Long userId) {
        List<Review> reviews = reviewRepository.findByUserId(userId);
        return ResponseEntity.ok(reviews);
    }

    // Get all reviews
    @GetMapping
    public ResponseEntity<List<Review>> getAllReviews() {
        List<Review> reviews = reviewRepository.findAll();
        return ResponseEntity.ok(reviews);
    }

    // Get a specific review by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getReviewById(@PathVariable Long id) {
        Optional<Review> review = reviewRepository.findById(id);
        if (review.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(review.get());
    }

    // Create a new review
    @PostMapping
    public ResponseEntity<?> createReview(@RequestBody ReviewRequest request) {
        // Validate user
        Optional<User> userOptional = userRepository.findById(request.getUserId());
        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }

        // Validate itinerary
        Optional<SavedItinerary> itineraryOptional = savedItineraryRepository.findById(request.getItineraryId());
        if (itineraryOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Itinerary not found");
        }

        // Validate rating (1-5)
        if (request.getRating() != null && (request.getRating() < 1 || request.getRating() > 5)) {
            return ResponseEntity.badRequest().body("Rating must be between 1 and 5");
        }

        // Create review
        Review review = new Review();
        review.setUser(userOptional.get());
        review.setItinerary(itineraryOptional.get());
        review.setComment(request.getComment());
        review.setRating(request.getRating());

        Review savedReview = reviewRepository.save(review);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedReview);
    }

    // Update a review
    @PutMapping("/{id}")
    public ResponseEntity<?> updateReview(@PathVariable Long id, @RequestBody ReviewRequest request) {
        Optional<Review> reviewOptional = reviewRepository.findById(id);
        if (reviewOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Review review = reviewOptional.get();

        // Update comment if provided
        if (request.getComment() != null) {
            review.setComment(request.getComment());
        }

        // Update rating if provided
        if (request.getRating() != null) {
            if (request.getRating() < 1 || request.getRating() > 5) {
                return ResponseEntity.badRequest().body("Rating must be between 1 and 5");
            }
            review.setRating(request.getRating());
        }

        Review updatedReview = reviewRepository.save(review);
        return ResponseEntity.ok(updatedReview);
    }

    // Delete a review
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReview(@PathVariable Long id) {
        if (!reviewRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        reviewRepository.deleteById(id);
        return ResponseEntity.ok("Review deleted successfully");
    }
}