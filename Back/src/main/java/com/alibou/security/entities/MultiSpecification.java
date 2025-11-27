package com.alibou.security.entities;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class MultiSpecification implements Specification<MultiGaming> {
    private SearchCriteriaMulti criteria;

    public MultiSpecification(SearchCriteriaMulti criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate(Root<MultiGaming> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
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


        if (criteria.getTeamName() != null && !criteria.getTeamName().isEmpty()) {
            predicates.add(builder.like(root.get("comments"), "%" + criteria.getTeamName() + "%"));
        }

        return builder.and(predicates.toArray(new Predicate[0]));
    }
}
