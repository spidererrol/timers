'use client'

import Timers from "@/components/Timers"
import React, { useEffect, useState } from "react"
import TimerData from "@/objects/TimerData"
import { AddIcon, ExportIcon, ImportIcon } from "@/components/Icons"
import FingerButton from "@/components/FingerButton"
import { StateDefault, tState } from "@/libs/State"
import { MainView } from "@/components/MainView"
import { AllExporter } from "@/components/AllExporter"
import { AllImporter } from "@/components/AllImporter"
import { arrayMoveImmutable } from "array-move"
import PageSelector, { PageName } from "@/components/PageSelector"

export default function Home() {
  const [nextId, setNextId] = useState(1)
  const [timers, setTimers] = useState([] as TimerData[]) // Immer didn't work for deeper updates.
  const [tick, setTick] = useState(() => new Date())
  const pagename = new StateDefault(useState(PageName.MainView),PageName.MainView)

  useEffect(() => {
    const ticker = setInterval(() => {
      setTick(new Date())
    }, 100)
    return () => clearInterval(ticker)
  }, [])

  function reId(timers: TimerData[]) {
    return timers.map((t, i) => { t.id = i; return t })
  }

  function importTimers(json: string) {
    const saveTimers = JSON.parse(json) as TimerData[]
    const newTimers = reId(saveTimers.map(o => TimerData.restore(o)))
    setTimers(newTimers)
    setNextId(newTimers.map(t => t.id).reduce((p, c) => Math.max(p, c)) + 1)
    localStorage.setItem("timers", JSON.stringify(newTimers))
  }

  useEffect(() => {
    const storedTimers = localStorage.getItem("timers")
    if (storedTimers)
      try {
        importTimers(storedTimers)
      } catch (_e) {
        setTimers([])
        setNextId(1)
      }

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
    localStorage.setItem("timers", JSON.stringify(newTimers))
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
    localStorage.setItem("timers", JSON.stringify(newTimers))
  }

  return (
    <main className="flex flex-col justify-between items-center">
      <PageSelector pagename={pagename} timers={timers} moveTimer={moveTimer} addTimer={addTimer} copyTimer={copyTimer} delTimer={delTimer} updateTimer={updateTimer} importTimers={importTimers} />
      <div className="rtc" suppressHydrationWarning={true}>{tick.toLocaleTimeString("en-GB")}</div>
    </main>
  )
}
