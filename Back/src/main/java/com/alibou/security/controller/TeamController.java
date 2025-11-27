package com.alibou.security.controller;

import com.alibou.security.Repository.TeamRepository;
import com.alibou.security.Repository.UserRepository;
import com.alibou.security.Repository.ViewTeamRepository;
import com.alibou.security.entities.*;
import com.alibou.security.respense.TeamRespense;
import com.alibou.security.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/teams")
public class TeamController {

    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private UserRepository UserRepository;
    @Autowired
    private TeamService TeamService;
    @Autowired
    private ViewTeamRepository viewTeamRepository;


    @PostMapping
    public Team createTeam(@RequestBody TeamRespense teamRespense) {
        Optional<Team> existingResume = teamRepository.findByGame(teamRespense.getGame());
        if (existingResume.isPresent()) {
            throw new IllegalArgumentException("A resume with the game " + teamRespense.getGame() + " already exists.");
        }
        Team team = mapToTeam(teamRespense);
        Team savedTeam = teamRepository.save(team);

        Optional<User> userOptional = UserRepository.findById(teamRespense.getUser());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            List<Team> teams = user.getTeams();
            teams.add(savedTeam);
            user.setTeams(teams);
            UserRepository.save(user);
        } else {
            throw new UsernameNotFoundException("User not found with id " + teamRespense.getUser());
        }

        return savedTeam;
    }

    @GetMapping
    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }



    @GetMapping("/{id}")
    public ResponseEntity<Team> getTeamById(@PathVariable Integer id) {
        Optional<Team> team = teamRepository.findById(id);
        return team.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Team> updateTeam(@PathVariable Integer id, @RequestBody Team teamDetails) {
        Optional<Team> optionalTeam = teamRepository.findById(id);
        if (optionalTeam.isPresent()) {
            Team team = optionalTeam.get();
            // Set the updated fields here
            team.setGame(teamDetails.getGame());
            team.setPlatform(teamDetails.getPlatform());
            team.setRegion(teamDetails.getRegion());
            team.setPriority(teamDetails.getPriority());
            team.setTeamType(teamDetails.getTeamType());
            team.setComments(teamDetails.getComments());
            team.setComments2(teamDetails.getComments2());
            team.setItems1(teamDetails.getItems1());
            team.setItems2(teamDetails.getItems2());
            team.setItems3(teamDetails.getItems3());
            team.setItems4(teamDetails.getItems4());
            team.setAmbitions(teamDetails.getAmbitions());
            team.setDescription(teamDetails.getDescription());

            team.setItems5(teamDetails.getItems5());
            team.setPassword(teamDetails.getPassword());
            teamRepository.save(team);
            return ResponseEntity.ok(team);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeam(@PathVariable Integer id) {
        if (teamRepository.existsById(id)) {
            teamRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }



    private Team mapToTeam(TeamRespense teamRespense) {
        return Team.builder()
                .game(teamRespense.getGame())
                .platform(teamRespense.getPlatform())
                .region(teamRespense.getRegion())
                .priority(teamRespense.getPriority())
                .teamType(teamRespense.getTeamType())
                .comments(teamRespense.getComments())
                .comments2(teamRespense.getComments2())
                .items1(teamRespense.getItems1())
                .items2(teamRespense.getItems2())
                .items3(teamRespense.getItems3())
                .items4(teamRespense.getItems4())
                .password(teamRespense.getPassword())
                .items5(teamRespense.getItems5())
                .description(teamRespense.getDescription())
                .ambitions(teamRespense.getAmbitions())
                .build();
    }
    @PostMapping("/search")
    public ResponseEntity<List<Team>> searchResumes(@RequestBody SearchCriteriaTeam searchCriteria) {
        List<Team> team = TeamService.searchteam(searchCriteria);
        return ResponseEntity.ok(team);
    }

    @PostMapping("/view/{id}")
    public ResponseEntity<String> view(@PathVariable Integer id, @RequestBody ViewTeam ViewRequest) {
        Optional<Team> TeamOptional =  teamRepository.findById(id);
        if (TeamOptional.isPresent()) {
           Team  team = TeamOptional.get();
            List<ViewTeam> views =  team.getView();
            Optional<ViewTeam> existingView = findViewByUser(views, ViewRequest.getUser());

            if (existingView.isPresent()) {
                return ResponseEntity.ok("View already exists for this user.");
            } else {
                ViewTeam newView = viewTeamRepository.save(ViewRequest);
                views.add(newView);
                team.setView(views);
                teamRepository.save(team);
                return ResponseEntity.ok("Multi added successfully.");
            }
        } else {
            return ResponseEntity.status(404).body("Multi not found.");
        }
    }

    private Optional<ViewTeam> findViewByUser(List<ViewTeam> views, Integer userId) {
        return views.stream()
                .filter(view -> view.getUser().equals(userId))
                .findFirst();
    }

}