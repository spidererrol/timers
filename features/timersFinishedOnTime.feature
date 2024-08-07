Feature: Timers should finish once expired
  Not before, not after

  Background:
    Given I open the app

  Scenario: Ensure timer doesn't finish early
    Given I add a timer with name "Test"
    And I set the timer "Test" to 0:10
    When I switch timer "Test" to Run mode
    And I start the timer "Test"
    And I wait 5 seconds
    Then Timer "Test" is not finished

  Scenario: Ensure timer finishes after time is over
    Given I add a timer with name "Test"
    And I set the timer "Test" to 0:10
    When I switch timer "Test" to Run mode
    And I start the timer "Test"
    And I wait 10 seconds
    Then Timer "Test" is finished

  Scenario: Ensure multiple timers finish at their respective times.
    Given I add a timer with name "Test 1"
    And I add a timer with name "Test 2"
    And I set timer "Test 1" to 0:5
    And I set timer "Test 2" to 0:10
    And I switch timer "Test 1" to Run mode
    And I switch timer "Test 2" to Run mode
    When I start the timer "Test 1"
    And I start the timer "Test 2"
    And I wait 5 seconds
    Then Timer "Test 1" is finished
    And Timer "Test 2" is not finished
    And I wait 5 seconds
    Then Timer "Test 2" is finished
