package com.alibou.security.controller;

import com.alibou.security.Repository.*;
import com.alibou.security.entities.*;
import com.alibou.security.respense.MultiRespense;
import com.alibou.security.service.MultiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/multigaming")
public class MultiGamingController {

    @Autowired
    private MultiGamingRepository multiGamingRepository;
    @Autowired
    private UserRepository UserRepository;
    @Autowired
    private MultiService MultiService;
    @Autowired
    private ViewMultiRepository viewMultiRepository;

    @PostMapping
    public MultiGaming createMultiGaming(@RequestBody MultiRespense multiRespense) {
        MultiGaming multiGaming = mapToMultiGaming(multiRespense);
        MultiGaming savedMultiGaming = multiGamingRepository.save(multiGaming);

        Optional<User> userOptional = UserRepository.findById(multiRespense.getUser());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            List<MultiGaming> multiGamings = user.getMultiGamings();
            multiGamings.add(savedMultiGaming);
            user.setMultiGamings(multiGamings);
            UserRepository.save(user);
        } else {
            throw new UsernameNotFoundException("User not found with id " + multiRespense.getUser());
        }

        return savedMultiGaming;
    }

    @GetMapping
    public List<MultiGaming> getAllMultiGamings() {
        return multiGamingRepository.findAll();
    }


    @GetMapping("/{id}")
    public ResponseEntity<MultiGaming> getMultiGamingById(@PathVariable Integer id) {
        Optional<MultiGaming> multiGaming = multiGamingRepository.findById(id);
        return multiGaming.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<MultiGaming> updateMultiGaming(@PathVariable Integer id, @RequestBody MultiGaming multiGamingDetails) {
        Optional<MultiGaming> optionalMultiGaming = multiGamingRepository.findById(id);
        if (optionalMultiGaming.isPresent()) {
            MultiGaming multiGaming = optionalMultiGaming.get();
            // Set the updated fields here
            multiGaming.setPlatform(multiGamingDetails.getPlatform());
            multiGaming.setRegion(multiGamingDetails.getRegion());
            multiGaming.setComments(multiGamingDetails.getComments());
            multiGaming.setComments2(multiGamingDetails.getComments2());
            multiGaming.setPassword(multiGamingDetails.getPassword());
            multiGaming.setPassword2(multiGamingDetails.getPassword2());
            multiGaming.setItems1(multiGamingDetails.getItems1());
            multiGaming.setItems2(multiGamingDetails.getItems2());
            multiGaming.setDescription(multiGamingDetails.getDescription());
            multiGaming.setAmbitions(multiGamingDetails.getAmbitions());
            multiGaming.setItems3(multiGamingDetails.getItems3());
            multiGaming.setItems4(multiGamingDetails.getItems4());
            multiGamingRepository.save(multiGaming);
            return ResponseEntity.ok(multiGaming);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMultiGaming(@PathVariable Integer id) {
        if (multiGamingRepository.existsById(id)) {
            multiGamingRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    private MultiGaming mapToMultiGaming(MultiRespense multiRespense) {
        return MultiGaming.builder()
                .platform(multiRespense.getPlatform())
                .region(multiRespense.getRegion())
                .comments(multiRespense.getComments())
                .comments2(multiRespense.getComments2())
                .password(multiRespense.getPassword())
                .password2(multiRespense.getPassword2())
                .items1(multiRespense.getItems1())
                .items2(multiRespense.getItems2())
                .items3(multiRespense.getItems3())
                .items4(multiRespense.getItems4())
                .description(multiRespense.getDescription())
                .ambitions(multiRespense.getAmbitions())
                .build();
    }


    @PostMapping("/search")
    public ResponseEntity<List<MultiGaming>> searchResumes(@RequestBody SearchCriteriaMulti searchCriteria) {
        List<MultiGaming> Multi = MultiService.searchmulti(searchCriteria);
        return ResponseEntity.ok(Multi);
    }
    @PostMapping("/view/{id}")
    public ResponseEntity<String> view(@PathVariable Integer id, @RequestBody ViewMulti ViewRequest) {
        Optional<MultiGaming> MultiGamingOptional =  multiGamingRepository.findById(id);
        if (MultiGamingOptional.isPresent()) {
            MultiGaming multiGaming = MultiGamingOptional.get();
            List<ViewMulti> views =  multiGaming.getView();
            Optional<ViewMulti> existingView = findViewByUser(views, ViewRequest.getUser());

            if (existingView.isPresent()) {
                return ResponseEntity.ok("View already exists for this user.");
            } else {
                ViewMulti newView = viewMultiRepository.save(ViewRequest);
                views.add(newView);
                multiGaming.setView(views);
                multiGamingRepository.save(multiGaming);
                return ResponseEntity.ok("Multi added successfully.");
            }
        } else {
            return ResponseEntity.status(404).body("Multi not found.");
        }
    }

    private Optional<ViewMulti> findViewByUser(List<ViewMulti> views, Integer userId) {
        return views.stream()
                .filter(view -> view.getUser().equals(userId))
                .findFirst();
    }


}
