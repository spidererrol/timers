# Timers App

This application is published to [Timers](https://spidererrol.github.io/timers/).

Currently there is only a dark mode colour scheme.

## Main Page

Initially there will only be the main controls and a real-time clock:

![Main Controls](docs/images/MainControls.png).

These consist of:

* ![Load](docs/images/LoadButton.png) Load a saved set of timers (from current browser storage)
* ![Save](docs/images/SaveButton.png) Save the current timers (to current browser storage)
* ![Import](docs/images/ImportButton.png) Upload timers & settings from an external JSON file.
* ![Export](docs/images/ExportButton.png) Download timers & settings as a JSON file.
* ![Add Timer](docs/images/AddButton.png) Add a new timer.

Once you add a timer, it will appear in the last position in edit mode.

## Timers

### Edit

![Edit Timer](docs/images/EditTimer.png)

This is composed of the following elements:

* ![Clone](docs/images/CloneButton.png) Clone this timer and it's current state to a new timer.
* ![Delete](docs/images/DeleteButton.png) Delete this timer. An autosave will be created just before this timer is deleted.
* ![Accept](docs/images/AcceptButton.png) Accept all changes and switch this timer to "Run" mode. There are 2 of these buttons, they both do the same thing.
* ![Edit Name](docs/images/EditName.png) Change the name of the timer here. There are no restrictions imposed here, even duplicate names are permitted.
* ![Colours](docs/images/TimerColours.png) Display the default background colour and the background colour from finished timers along with corrisponding Edit buttons.
* ![Edit Colour](docs/images/EditButton.png) Edit the corrisponding colour.
* ![Stage](docs/images/EditStageHMS.png) This is where you can edit a timer stage in Hours:Minutes:Seconds format.
  * ![Stage Number](docs/images/StageNumber1.png) At the top left there is a tiny stage number.
  * ![Inc10](docs/images/Inc10.png)![Inc1](docs/images/Inc1.png) Increment the corrisponding number by 10 or 1. If gray, it would move above maximum.
  * ![Dec10](docs/images/Dec10.png)![Dec1](docs/images/Dec1.png) Decrement the corrisponding number by 10 or 1. If gray, it would move below the minimum.
  * ![Edit Colours](docs/images/ColourButton.png) This button will switch to editing the colour transitions for this stage.
  * ![Edit Seconds](docs/images/EditInSecsButton.png) This shows the current stage length in seconds, pressing it will switch to editing in seconds:
    * ![Edit in seconds](docs/images/EditStageSecs.png)
    * ![Edit HMS](docs/images/EditInHMS.png) Return to Hours:Minutes:Seconds editing. Also show current (Hours:)Mins:Secs form.
  * ![Remove Stage](docs/images/RemoveStageButton.png) This button will remove this stage. If gray it is disabled. You must have at least one stage.
* ![Add Stage](docs/images/AddStageButton.png) This button will add another stage to this timer.

### Edit default/finished colours

![Edit Colour Panel](docs/images/EditColour.png)

The sliders' backgrounds will alter to reflect the current values of each other.
Clicking the colour swatch next to the slider will switch that slider to direct numeric editing.

Click the ![Edit Button](docs/images/EditButton.png) to close the edit sliders.

## TODO (docs)

* Stage colour transitions view.
* Run view.
  * Play
  * Pause
  * Stop
  * Alarm active.
* Minimised view.
* Drag & drop ordering.

## TODO (code)

See [TODO.md](TODO.md)

## END OF FILE
