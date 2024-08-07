Feature: Allow timers to be named
  New timers should also be uniquely named.

  Background:
    Given I open the app
    And I add a timer

  Scenario: First timer should be called "Timer"
    Then There should be a timer called "Timer"
  
  Scenario: Test renaming a timer
    When I rename timer "Timer" to "New Timer"
    Then There should be a timer called "New Timer"
    But There should not be a timer called "Timer"

  Scenario: A second timer should get a unique name
    Given I add a timer
    Then There should be a timer called "Timer"
    And There should be a timer called "Timer 2"