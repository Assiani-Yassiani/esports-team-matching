package com.alibou.security.entities;

import lombok.Data;

import java.util.List;
@Data
public class SearchCriteriaTeam {

    private List<String> selectedCountries;
    private List<String> selectedGames;
    private List<String> selectedPlatforms;
    private List<String> selectedLevels;

    private String teamName;
    private List<String> selectedProfiles;

}
