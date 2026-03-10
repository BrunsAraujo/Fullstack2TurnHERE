package com.turnhere.fullstack2.controllers;

import com.turnhere.fullstack2.models.City;
import com.turnhere.fullstack2.repository.CityRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin/cities")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminCityController {

    private final CityRepository cityRepository;

    public AdminCityController(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    @PostMapping
    public ResponseEntity<City> create(@RequestBody City city) {
        return ResponseEntity.ok(cityRepository.save(city));
    }

    @PutMapping("/{id}")
    public ResponseEntity<City> update(@PathVariable Long id,
                                       @RequestBody City updated) {
        City city = cityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("City not found"));

        city.setName(updated.getName());
        city.setState(updated.getState());
        city.setCountry(updated.getCountry());

        return ResponseEntity.ok(cityRepository.save(city));
    }

    @GetMapping
    public ResponseEntity<List<City>> getAllCities() {
        return ResponseEntity.ok(cityRepository.findAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!cityRepository.existsById(id)) {
            throw new RuntimeException("City not found");
        }
        cityRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}