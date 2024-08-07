Feature: Allow multiple timers
  Allow multiple indipendent timers

  Scenario: No timers on clean startup
    Given I open the app
    Then There should be 0 timers