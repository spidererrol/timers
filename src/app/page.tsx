'use client'

import React, { useEffect, useState } from "react"
import TimerData from "@/objects/TimerData"
import { StateDefault } from "@/libs/State"
import { arrayMoveImmutable } from "array-move"
import PageSelector, { PageName } from "@/components/PageSelector"
import { loadData, saveData } from "@/libs/dataStorage"
import { TimersSavesCollection } from "@/objects/DataTypes"

export default function Home() {
  const [nextId, setNextId] = useState(1)
  const [timers, setTimers] = useState([] as TimerData[]) // Immer didn't work for deeper updates.
  const [tick, setTick] = useState(() => new Date())
  const pagename = new StateDefault(useState(PageName.MainView), PageName.MainView)

  useEffect(() => {
    const ticker = setInterval(() => {
      setTick(new Date())
    }, 100)
    return () => clearInterval(ticker)
  }, [])

  function reId(timers: TimerData[]) {
    return timers.map((t, i) => { t.id = i; return t })
  }
  function resetNextId(timerslist?: TimerData[]) {
    if (timerslist === undefined)
      timerslist = timers
    setNextId(timerslist.map(t => t.id).reduce((p, c) => Math.max(p, c), 0) + 1)
  }

  function importTimersObj(saveTimers: TimerData[]) {
    const newTimers = reId(saveTimers.map(o => TimerData.restore(o)))
    setTimers(newTimers)
    resetNextId(newTimers)
    saveData("timers", newTimers)
  }

  function isString(thing: string | any[]): thing is string {
    if ((thing as string).charAt)
      return true
    return false
  }

  function importTimers(json: string | (TimerData[])) {
    const obj = isString(json) ? (JSON.parse(json) as TimerData[]) : json
    importTimersObj(obj)
  }

  useEffect(() => {

    importTimersObj(loadData("timers", [] as TimerData[]))

    // This disables an miss-detected warning:
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  function addTimer() {
    setTimers([...timers, new TimerData(nextId)])
    setNextId(n => n + 1)
  }

  function copyTimer(id: number) {
    const copyFrom = timers.find(t => t.id == id) as TimerData
    setTimers([...timers, copyFrom.clone(nextId)])
    setNextId(n => n + 1)
  }

  function delTimer(id: number) {
    const toDel = timers.find(t => t.id == id)
    if (toDel !== undefined) {
      const saveSlots = loadData<TimersSavesCollection>("savedTimers", {})
      const basename = "AutoSave (delete " + toDel.name + ")"
      let name = basename
      let i = 1
      while (saveSlots[name] !== undefined) {
        name = basename + " " + i++
      }
      saveSlots[name] = {
        name: name,
        modified: Date.now(),
        autosave: true,
        timers
      }
      const saveNames = Object.keys(saveSlots).filter(sn => saveSlots[sn].autosave)
      let countas = saveNames.length
      const max_autosaves = 10
      if (countas > max_autosaves) {
        const toDel = saveNames.toSorted((a, b) => saveSlots[b].modified - saveSlots[a].modified).slice(max_autosaves)
        for (const savename of toDel) {
          delete saveSlots[savename]
        }
      }
      saveData("savedTimers", saveSlots)
    }
    setTimers([...timers.filter(t => t.id != id)])
  }

  function updateTimer(id: number, update: (timer: TimerData) => void) {
    const newTimers = [...timers.map(t => { if (t.id == id) { update(t); return t } else { return t } })]
    setTimers(newTimers)
    saveData("timers", newTimers)
  }

  /**
   * Move a timer.
   * 
   * @param id Id of timer to move
   * @param before Move timer to be after the timer with this id
   */
  function moveTimer(id: number, before: number) {
    // if (before <= id) ok
    // if (before == id) ok
    // if (before == id + 1) ok
    if (before >= (id + 2))
      before--
    const newTimers = reId(arrayMoveImmutable(timers, id, before))
    setTimers(newTimers)
    saveData("timers", newTimers)
  }

  return (
    <main className="flex flex-col justify-between items-center">
      <PageSelector pagename={pagename} timers={timers} moveTimer={moveTimer} addTimer={addTimer} copyTimer={copyTimer} delTimer={delTimer} updateTimer={updateTimer} importTimers={importTimers} />
      <div className="rtc" suppressHydrationWarning={true}>{tick.toLocaleTimeString("en-GB")}</div>
    </main>
  )
}
