package com.alibou.security.controller;

import com.alibou.security.Repository.*;
import com.alibou.security.entities.*;
import com.alibou.security.respense.ResumeRespense;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/api/app")
public class appController {
    @Autowired
    private AppOfferRepository appRepository;

    @Autowired
    private AppResumeRepository appResumeRepository;
    @Autowired
    private AppTeamRepository apptaemRepository;
    @Autowired
    private OffreRepository offerRepository;
    @Autowired
    private ResumeRepository resumeRepository;
    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/{ido}/{idr}/{idt}")
    public AppOffre createOffre( @PathVariable Integer ido, @PathVariable Integer idr, @PathVariable Integer idt) {
        Optional<AppOffre> existAppOffre =appRepository.findByIdr(idr) ;
        if (existAppOffre.isPresent()) {
            throw new IllegalArgumentException("A app with  already exists.");
        }

        AppResume appResume = new AppResume();
        appResume.setIdo(ido);
        appResume.setIdto(idt);


        AppOffre AppOffre =new AppOffre();
        AppOffre.setIdr(idr);
        // Save the AppResume instance
        AppResume appResumeSaved = appResumeRepository.save(appResume);

        // Set the AppResume to AppOffre
        AppOffre.setAppResume(appResumeSaved);

        AppOffre newAppOffre = appRepository.save(AppOffre);
        Optional<Offre> OffreOptional = offerRepository.findById(ido);
        Optional<Resume>  ResumeOptional=resumeRepository.findById(idr);
        if (OffreOptional.isPresent()) {
            Offre   Offre = OffreOptional.get();
            Resume Resume =ResumeOptional.get();
            List<AppOffre> AppOffres =  Offre.getAppOffre();
            List<AppResume> appsr =  Resume.getAppResume();

            appsr.add( appResumeSaved);
            AppOffres.add( newAppOffre );
            Offre.setAppOffre(AppOffres);
            resumeRepository.save(Resume);
            offerRepository.save(Offre);
        } else {
            throw new UsernameNotFoundException("User not found with id " );
        }
        return  newAppOffre;
    }

    @PostMapping("recruite/{idt}/{idr}")
    public AppResume create( @PathVariable Integer idt, @PathVariable Integer idr) {

        Optional<AppResume> existAppResume =appResumeRepository.findByIdt(idt) ;
        if (existAppResume.isPresent()) {
            throw new IllegalArgumentException(" app w  already exists.");
        }

        AppTeam appTeam = new AppTeam();
        appTeam.setIdr(idr);
        AppResume appResume = new  AppResume();
        appResume.setIdt(idt);


        AppTeam newapp = apptaemRepository.save( appTeam);

        appResume.setAppTeam(newapp);
        AppResume appResumeSaved = appResumeRepository.save(appResume);
        Optional<Resume> resumeOptional = resumeRepository.findById(idr);
        Optional<Team> teamOptional = teamRepository.findById(idt);
        if (teamOptional.isPresent() && resumeOptional.isPresent() ) {


           Team   team = teamOptional.get();
           Resume   resume = resumeOptional.get();
            List<AppTeam> appsteam =  team.getAppTeam();
            List<AppResume> appsresume =  resume.getAppResume();
            appsresume.add(  appResumeSaved );
            appsteam.add( newapp );
            team.setAppTeam(appsteam);
            resume.setAppResume(appsresume);
            teamRepository.save(team);
            resumeRepository.save(resume);
        } else {
            throw new UsernameNotFoundException("User not found with id " );
        }
        return appResumeSaved;
    }

    @PostMapping("/find/{userId}")
    public ResponseEntity<Resume> findResumeByGameAndPlatform(
            @PathVariable Integer userId,
            @RequestBody ResumeRespense searchRequest) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            List<Resume> resumes = resumeRepository.findByGameAndPlatform( searchRequest.getGame(), searchRequest.getPlatform());
            if (!resumes.isEmpty()) {
                return ResponseEntity.ok(resumes.get(0));
            } else {
                return ResponseEntity.ok().build();
            }
        } else {
            throw new UsernameNotFoundException("User not found with id " + userId);
        }
    }
    @PostMapping("/find/team/{userId}")
    public ResponseEntity<Team> findteamByGameAndPlatform(
            @PathVariable Integer userId,
            @RequestBody ResumeRespense searchRequest) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            List<Team> team = teamRepository.findByGameAndPlatform( searchRequest.getGame(), searchRequest.getPlatform());
            if (!team.isEmpty()) {
                return ResponseEntity.ok(team.get(0));
            } else {
                return ResponseEntity.ok().build();
            }
        } else {
            throw new UsernameNotFoundException("User not found with id " + userId);
        }
    }

    @PutMapping("/offer/view/{id}")
    public AppOffre viewOffer (@PathVariable Integer id)
    {
        Optional<AppOffre> appOptional =appRepository.findById(id);
        if(appOptional.isPresent())
        {
            AppOffre AppOffre =appOptional.get();
            AppOffre.setView(true);
            appRepository.save(AppOffre);
            return AppOffre;


        }

        else {
            throw new UsernameNotFoundException("User not found with id ");


    }}

    @PutMapping("/player/view/{id}")
    public AppResume viewPlayer (@PathVariable Integer id)
    {
        Optional<AppResume> appOptional =appResumeRepository.findById(id);
        if(appOptional.isPresent())
        {
            AppResume AppResume =appOptional.get();
            AppResume.setView(true);
            appResumeRepository.save(AppResume);
            return   AppResume;


        }

        else {
            throw new UsernameNotFoundException("User not found with id ");


        }}

    @PutMapping("/offer/status/{id}/{link}")
    public AppOffre statusOffer (@PathVariable Integer id,@PathVariable String link)
    {
        Optional<AppOffre> appOptional =appRepository.findById(id);
        if(appOptional.isPresent())
        {
            AppOffre AppOffre =appOptional.get();
            AppOffre.setStatus(true);
            AppOffre.setLink(link);
            AppOffre.getAppResume().setStatus(true);
            AppOffre.getAppResume().setLink(link);
            appRepository.save(AppOffre);
            return AppOffre;


        }

        else {
            throw new UsernameNotFoundException("User not found with id ");


        }}

    @PutMapping("/player/status/{id}")
    public AppResume statusPlayer (@PathVariable Integer id) {

        Optional<AppResume> appOptional =appResumeRepository.findById(id);
        if(appOptional.isPresent())
        {
            AppResume AppResume =appOptional.get();
            AppResume.setStatus(true);
            AppResume.getAppTeam().setStatus(true);
            appResumeRepository.save(AppResume);
            return   AppResume;


        }

        else {
            throw new UsernameNotFoundException("User not found with id ");


        }}

}
