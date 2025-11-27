package com.alibou.security.entities;

import lombok.Data;

import java.util.List;
@Data
public class SearchCriteria {
    private List<String> selectedCountries;
    private List<String> selectedGames;
    private List<String> selectedPlatforms;
    private List<String> selectedLevels;
    private List<String> selectedProfiles;
    private String teamName;
}