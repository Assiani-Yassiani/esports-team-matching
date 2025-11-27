package com.alibou.security.service;


import com.alibou.security.Repository.TeamRepository;
import com.alibou.security.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class TeamService {
    @Autowired
    private TeamRepository teamRepository;

    public List<Team> searchteam(SearchCriteriaTeam searchCriteria) {
        Specification<Team> spec = new TeamSpecification(searchCriteria);
        return teamRepository.findAll(spec);
    }
}
