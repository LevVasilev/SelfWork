

package com.platform.freelance.controller;

import com.platform.freelance.model.Job;
import com.platform.freelance.dto.JobCreateDTO;
import com.platform.freelance.service.JobService;

import java.util.List;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Заказ", description = "API для реализации управления заказами")
@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/api/jobs", produces = MediaType.APPLICATION_JSON_VALUE)
public class JobController {
    private final JobService jobService;

    public JobController(final JobService jobService) {
        this.jobService = jobService;
    }

    @Operation(
            summary = "Получение информации о заказах",
            description = "Получает информацию о всех существующих заказах"
    )
    @GetMapping("")
    public ResponseEntity<List<Job>> allJobs() {
        //System.out.println("check");
        List <Job> jobs = jobService.allJobs();
        System.out.println(jobs);
        return new ResponseEntity<>(jobs, HttpStatus.OK);
    }
/*
    @GetMapping("/{jobId}/applications")
    public List<Application> getApplicationsForJob(@PathVariable Integer jobId) {
        return applicationRepository.findByJobId(jobId);
    }
*/

/*
    public ResponseEntity<ResponseDto> createJob(@RequestBody JobDTO jobDTO) {
        Job createdJob = jobService.createJob(jobDTO);
        return buildResponseEntity(HttpStatus.CREATED, true, jobMapper.mapTo(createdJob), null);
    }
 */

    @Operation(
            summary = "Добавление заказа",
            description = "Создает новый заказ"
    )
    @PostMapping
    public ResponseEntity<Job> addJob(@RequestBody JobCreateDTO jobCreateDTO) {
        Job createdJob = jobService.addJob(jobCreateDTO);
        return new ResponseEntity<>(createdJob, HttpStatus.CREATED);
    }
}
