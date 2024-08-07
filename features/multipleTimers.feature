Feature: Allow multiple timers
  Allow multiple indipendent timers

  Scenario: No timers on clean startup
    Given I open the app
    Then There should be 0 timers
  
  Scenario: Add a timer
    Given I open the app
    And I add a timer
    Then There should be 1 timer

  Scenario: Add 2 timers
    Given I open the app
    And I add a timer
    And I add a timer
    Then There should be 2 timers