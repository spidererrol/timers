# TO DO LIST

This I want to achieve in this project:

* [ ] Allow updating progress of a running timer. For if I start a timer late.
* [ ] Change drag and drop to behave better when I have many timers.
  * [ ] Perhaps seperate minimise and normal modes.
  * [ ] Make spacing between timers a permenant drop zone just without highlighting
* [ ] Make timer borders flash when alarming.
  * [ ] Change default border to blue and alarm flashes between yellow and red.

## Bonus items

## DONE

* [X] Flexible number of timers (add & remove timers)
* [X] Manually (quickly) adjust to a different start point (time left).
* [X] Highlight timers when they get below a (settable) threshold time.
* [X] Multi-stage timers (eg main time, alarm, then cooldown, alarm)
* [X] Quick reset-and-restart for each timer.
* [X] Alarm after each stage
* [X] Add sliders to edit colours ~~instead of~~ <u>as well as</u> NumberScrollers
* [X] Ability to set timers as either (hours):minutes:seconds or just seconds >= 60.
* [ ] ~~Should default and/or final colours be per-stage?~~ (No)
  * These can easily be handled via the stage colour spans.
  * The final colour is only used when timer has expired so has no use for a stage anyway.
* [X] Edit default & final colours
* [X] Distinguish add button for colours vs stages.
* [X] (Allow) Save timers into browser local storage [example code](https://www.freecodecamp.org/news/how-to-persist-a-logged-in-user-in-react/)
* [X] Prevent deleting of last stage.
* [X] Display a real time clock on screen.
* [X] fix next id on reload
* [X] reorder timers
  * [X] drag & drop ([DnD kit](https://docs.dndkit.com/))
* [X] auto order colour steps
* [X] copy timer
* [X] Save/load sets of timers to named group
* [X] Option to pause between stages (option on stage means auto-pause when stage finished, ignored for last stage)
* [X] Auto-save on deleting a timer.
* [X] Minimise timers - display just name & remaining time if running.
  * [X] Auto restore on alarm
  * Maintain positions in list but visually move to earlier area.
  * Need to restore/mirror/indicate normal position during drag & drop.
  * [X] Allow drag to minimse/restore?
* [ ] ~~Adjustable default length for timers?~~ (Don't care enough & copying suffices)
  * [ ] ~~Or maybe a "default" template timer?~~ (Already effectivly available via copying of timers)
* [ ] ~~Remove tailwindcss.~~ It provides more defaults than I realised and really doesn't hurt.
* [ ] ~~Real time alarms?~~ I already have real time alarms elsewhere, no need to duplicate here.
* [X] import/export timers
  * [X] one
  * [X] all
* [X] Allow colour times to be edited as seconds?
* [X] ~~Possible bug, can only clone a timer once? Can clone the previously cloned timer.~~
      Remembered wrong - was actually just that copying a "1" always produced "2" even if "2" exists.
* [X] Adjust minimum timer size larger to reduce reshuffling of timer positions.
* [X] On import and clone, stop timers. But not on initial load (refresh page or brower crash should resume timers).
* [X] Loading screen (loading state, default true, set to false after initial timer load)

---
END OF FILE
---
