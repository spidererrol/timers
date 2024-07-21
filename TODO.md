# TO DO LIST

This I want to achieve in this project:

* [ ] import/export timers
  * [ ] one
  * [X] all
* [ ] Adjustable default length for timers?
  * [ ] Or maybe a "default" template timer?
* [X] Minimise timers - display just name & remaining time if running.
  * [ ] Auto restore on alarm
  * Maintain positions in list but visually move to earlier area.
  * Need to restore/mirror/indicate normal position during drag & drop.
  * [X] Allow drag to minimse/restore?

## Bonus items

* [ ] Real time alarms?
* [ ] Allow colour times to be edited as seconds?
* [ ] Remove tailwindcss. I barely use it so just setup the very few classes I want manually.

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

---
END OF FILE
---
