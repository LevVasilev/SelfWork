package com.platform.freelance.controller;

import com.platform.freelance.model.Application;
import com.platform.freelance.dto.ApplicationDetailsDto;
import com.platform.freelance.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Отклики", description = "API для реализации управления откликами")
@RestController
@RequestMapping("/api/applications")
public class ApplicationController {
    @Autowired
    private ApplicationService applicationService;

    @PostMapping
    public Application applyToJob(@RequestBody Application application) {
        return applicationService.applyToJob(application);
    }


    @GetMapping("/user/{userId}")
    public List<Application> getApplicationsByUser(@PathVariable Long userId) {
        return applicationService.getApplicationsByUser(userId);
    }

    @GetMapping("/details")
    public List<ApplicationDetailsDto> getApplicationDetails() {
        return applicationService.getAllApplicationDetails();
    }
}

