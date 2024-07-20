'use client'

import React, { useEffect, useState } from "react"
import TimerData from "@/objects/TimerData"
import { StateDefault } from "@/libs/State"
import { arrayMoveImmutable } from "array-move"
import PageSelector, { PageName } from "@/components/PageSelector"
import { loadData, saveData } from "@/libs/dataStorage"

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

  function importTimers(json: string) {
    importTimersObj((JSON.parse(json) as TimerData[]))
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
