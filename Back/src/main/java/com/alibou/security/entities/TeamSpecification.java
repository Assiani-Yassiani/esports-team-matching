package com.alibou.security.entities;


import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class TeamSpecification implements Specification<Team> {
    private SearchCriteriaTeam criteria;

    public TeamSpecification(SearchCriteriaTeam criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate(Root<Team> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        List<Predicate> predicates = new ArrayList<>();

        if (criteria.getSelectedCountries() != null && !criteria.getSelectedCountries().isEmpty()) {
            predicates.add(root.get("region").in(criteria.getSelectedCountries()));
        }

        if (criteria.getSelectedGames() != null && !criteria.getSelectedGames().isEmpty()) {
            predicates.add(root.get("game").in(criteria.getSelectedGames()));
        }

        if (criteria.getSelectedPlatforms() != null && !criteria.getSelectedPlatforms().isEmpty()) {
            predicates.add(root.get("platform").in(criteria.getSelectedPlatforms()));
        }

        if (criteria.getSelectedLevels() != null && !criteria.getSelectedLevels().isEmpty()) {
            predicates.add(root.get("priority").in(criteria.getSelectedLevels()));
        }

        if (criteria.getTeamName() != null && !criteria.getTeamName().isEmpty()) {
            predicates.add(builder.like(root.get("comments"), "%" + criteria.getTeamName() + "%"));
        }

        if (criteria.getSelectedProfiles() != null && !criteria.getSelectedProfiles().isEmpty()) {
            // Join on 'offres' and add the predicate for 'teamType'
            Join<Team, Offre> offreJoin = root.join("offres", JoinType .LEFT);
            predicates.add(offreJoin.get("teamType").in(criteria.getSelectedProfiles()));
        }

        // Ensure distinct results
        query.distinct(true);

        return builder.and(predicates.toArray(new Predicate[0]));
    }
}