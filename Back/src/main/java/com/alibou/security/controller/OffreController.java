package com.alibou.security.controller;

import com.alibou.security.Repository.OffreRepository;
import com.alibou.security.Repository.TeamRepository;
import com.alibou.security.entities.Offre;
import com.alibou.security.entities.Team;
import com.alibou.security.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/offres")
public class OffreController {

    @Autowired
    private OffreRepository offreRepository;

    @Autowired
    private TeamRepository teamRepository;


    @PostMapping("/{id}")
    public Offre createOffre(@RequestBody Offre offre, @PathVariable Integer id) {
        Offre newOffre = offreRepository.save(offre);
        Optional<Team> teamOptional = teamRepository.findById(id);
        if (teamOptional.isPresent()) {
            Team team = teamOptional.get();
            List<Offre> ofrres = team.getOffres();
            ofrres.add(newOffre);
            team.setOffres(ofrres);
            teamRepository.save(team);
        } else {
            throw new UsernameNotFoundException("User not found with id " + id);
        }
        return newOffre;
    }


    @PutMapping("/{id}")
    public ResponseEntity<Offre> updateOffre(@PathVariable Integer id, @RequestBody Offre offreDetails) {


        Optional<Offre> optionalOffre = offreRepository.findById(id);
        if (optionalOffre.isPresent()) {
            Offre offre = optionalOffre.get();
            offre.setComments(offreDetails.getComments());
            offre.setComments2(offreDetails.getComments2());
            offre.setDescription(offreDetails.getDescription());
            offre.setTeamType(offreDetails.getTeamType());
            offre.setParticipation(offreDetails.isParticipation());
            offre.setRemunere(offreDetails.isRemunere());

            Offre updatedOffre = offreRepository.save(offre);
            System.out.println(updatedOffre);
            return ResponseEntity.ok(updatedOffre);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOffre(@PathVariable Integer id) {
        if (offreRepository.findById(id).isPresent()) {
            offreRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Offre> getOffreById(@PathVariable Integer id) {
        Optional<Offre> offre = offreRepository.findById(id);
        return offre.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<Offre> getAllOffres() {
        return offreRepository.findAll();
    }


    @PutMapping("/actif")
    public void updateoffer(@RequestBody Offre offre)
    {
        offreRepository.save(offre);
    }
}
