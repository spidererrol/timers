Feature: Creating multiple timers with names

  Background:
    Given I open the app

  Scenario: Create multiple timers with different names
    When I add a timer with name "Test 1"
    And I add a timer with name "Test 2"
    Then There should be a timer called "Test 1"
    And There should be a timer called "Test 2"
    But There should not be a timer called "Timer"
