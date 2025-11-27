package com.alibou.security.controller;

import com.alibou.security.Repository.ResumeRepository;
import com.alibou.security.Repository.ViewRepository;
import com.alibou.security.entities.Resume;
import com.alibou.security.entities.view;
import com.alibou.security.entities.SearchCriteria;
import com.alibou.security.entities.User;
import com.alibou.security.respense.ResumeRespense;
import com.alibou.security.service.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/resumes")
public class ResumeController {
    @Autowired
    private  com.alibou.security.Repository.UserRepository UserRepository;

    @Autowired
    private ResumeRepository resumeRepository;
    @Autowired
    private ResumeService resumeService;
    @Autowired
    private ViewRepository viewRepository;

    @PostMapping
    public Resume createResume(@RequestBody ResumeRespense resumeRespense) {
        Optional<Resume> existingResume = resumeRepository.findByGame(resumeRespense.getGame());
        if (existingResume.isPresent()) {
            throw new IllegalArgumentException("A resume with the game " + resumeRespense.getGame() + " already exists.");
        }
        Resume resume_map = mapToResume(resumeRespense);
        Resume savedResume = resumeRepository.save(resume_map);

        Optional<User> userOptional = UserRepository.findById(resumeRespense.getUser());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            List<Resume> resumes = user.getResumes();
            resumes.add(savedResume);
            user.setResumes(resumes);
            UserRepository.save(user); // Sauvegarder l'utilisateur avec la liste mise à jour
        } else {
            throw new UsernameNotFoundException("User not found with id " + resumeRespense.getUser());
        }

        return savedResume;
    }

    @GetMapping
    public List<Resume> getAllResumes() {
        return resumeRepository.findAll();
    }


    @GetMapping("/{id}")
    public ResponseEntity<Resume> getResumeById(@PathVariable Integer id) {
        Optional<Resume> resume = resumeRepository.findById(id);
        return resume.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Resume> updateResume(@PathVariable Integer id, @RequestBody Resume resumeDetails) {
        Optional<Resume> optionalResume = resumeRepository.findById(id);
        if (optionalResume.isPresent()) {
            Resume resume = optionalResume.get();
            // Set the updated fields here
            resume.setGame(resumeDetails.getGame());
            resume.setPlatform(resumeDetails.getPlatform());
            resume.setPriority(resumeDetails.getPriority());
            resume.setComments(resumeDetails.getComments());
            resume.setProfileList(resumeDetails.getProfileList());
            resume.setRecruitmentList(resumeDetails.getRecruitmentList());
            resume.setItems1(resumeDetails.getItems1());
            resume.setItems2(resumeDetails.getItems2());
            resume.setItems3(resumeDetails.getItems3());
            resume.setAmbitions(resumeDetails.getAmbitions());
            resume.setDescription(resumeDetails.getDescription());
            resumeRepository.save(resume);
            return ResponseEntity.ok(resume);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResume(@PathVariable Integer id) {
        if (resumeRepository.existsById(id)) {
            resumeRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    private Resume mapToResume(ResumeRespense resumeRespense) {
        return Resume.builder()
                .id(resumeRespense.getId())
                .game(resumeRespense.getGame())
                .platform(resumeRespense.getPlatform())
                .priority(resumeRespense.getPriority())
                .comments(resumeRespense.getComments())
                .profileList(resumeRespense.getProfileList())
                .recruitmentList(resumeRespense.getRecruitmentList())
                .items1(resumeRespense.getItems1())
                .items2(resumeRespense.getItems2())
                .items3(resumeRespense.getItems3())
                .description(resumeRespense.getDescription())
                .ambitions(resumeRespense.getAmbitions())
                .build();
    }
    @PostMapping("/search")
    public ResponseEntity<List<Resume>> searchResumes(@RequestBody SearchCriteria searchCriteria) {
        List<Resume> resumes = resumeService.searchResumes(searchCriteria);
        return ResponseEntity.ok(resumes);
    }

    @PostMapping("/view/{id}")
    public ResponseEntity<String> view(@PathVariable Integer id, @RequestBody view ViewRequest) {
        Optional<Resume> ResumeOptional = resumeRepository.findById(id);
        if (ResumeOptional.isPresent()) {
            Resume resume = ResumeOptional.get();
            List<view> views = resume.getViwes();
            Optional<view> existingView = findViewByUser(views, ViewRequest.getUser());

            if (existingView.isPresent()) {
                return ResponseEntity.ok("View already exists for this user.");
            } else {
                view newView = viewRepository.save(ViewRequest);
                views.add(newView);
                resume.setViwes(views);
                resumeRepository.save(resume);
                return ResponseEntity.ok("View added successfully.");
            }
        } else {
            return ResponseEntity.status(404).body("Resume not found.");
        }
    }

    private Optional<view> findViewByUser(List<view> views, Integer userId) {
        return views.stream()
                .filter(view -> view.getUser().equals(userId))
                .findFirst();
    }


    @PutMapping("/actif")
    public  void actif(@RequestBody Resume resume )
    {
        resumeRepository.save(resume);

    }

    }






