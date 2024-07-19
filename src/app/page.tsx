'use client'

import Timers from "@/components/Timers"
import React, { useEffect, useState } from "react"
import TimerData from "@/objects/TimerData"
import { AddIcon, ExportIcon, ImportIcon } from "@/components/Icons"
import FingerButton from "@/components/FingerButton"
import { tState } from "@/libs/State"
import { MainView } from "@/components/MainView"
import { AllExporter } from "@/components/AllExporter"
import { AllImporter } from "@/components/AllImporter"

export default function Home() {
  const [nextId, setNextId] = useState(1)
  const [timers, setTimers] = useState([] as TimerData[]) // Immer didn't work for deeper updates.
  const [tick, setTick] = useState(() => new Date())
  const ShowImporter = new tState(useState(false))
  const ShowExporter = new tState(useState(false))

  useEffect(() => {
    const ticker = setInterval(() => {
      setTick(new Date())
    }, 100)
    return () => clearInterval(ticker)
  }, [])

  function importTimers(json: string) {
    const saveTimers = JSON.parse(json) as TimerData[]
    const newTimers = saveTimers.map(o => TimerData.restore(o)).map((t, i) => { t.id = i; return t })
    setTimers(newTimers)
    setNextId(newTimers.map(t => t.id).reduce((p, c) => Math.max(p, c)) + 1)
    localStorage.setItem("timers", JSON.stringify(newTimers))
  }

  useEffect(() => {
    const storedTimers = localStorage.getItem("timers")
    if (storedTimers)
      importTimers(storedTimers)
  }, [])

  function addTimer() {
    setTimers([...timers, new TimerData(nextId)])
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

  return (
    <main className="flex flex-col justify-between items-center">
      {
        ShowExporter.state
          ? <AllExporter timers={timers} Show={ShowExporter} />
          : ShowImporter.state
            ? <AllImporter timers={timers} Show={ShowImporter} importTimers={importTimers} />
            : <MainView timers={timers} addTimer={addTimer} delTimer={delTimer} updateTimer={updateTimer} ShowExporter={ShowExporter} ShowImporter={ShowImporter} />
      }
      <div className="rtc" suppressHydrationWarning={true}>{tick.toLocaleTimeString("en-GB")}</div>
    </main>
  )
}
