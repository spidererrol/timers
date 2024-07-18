'use client'

import Image from "next/image"
import Timers from "@/components/Timers"
import React, { useEffect, useState } from "react"
import TimerData from "@/objects/TimerData"
import { AddIcon } from "@/components/Icons"
import FingerButton from "@/components/FingerButton"

export default function Home() {
  const [nextId, setNextId] = useState(1)
  const [timers, setTimers] = useState([] as TimerData[]) // Immer didn't work for deeper updates.
  const [tick, setTick] = useState(() => Date.now())

  useEffect(() => {
    const ticker = setInterval(() => {
      setTick(Date.now())
    }, 100)
    return () => clearInterval(ticker)
  }, [])

  useEffect(() => {
    const storedTimers = localStorage.getItem("timers")
    if (storedTimers) {
      const saveTimers = JSON.parse(storedTimers) as TimerData[]
      const newTimers = saveTimers.map(o => TimerData.restore(o)).map((t, i) => { t.id = i; return t })
      setTimers(newTimers)
      setNextId(newTimers.map(t=>t.id).reduce((p,c)=>Math.max(p,c)) + 1)
    }
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
      <div className="timers">
        <Timers timers={timers} delTimer={delTimer} updateTimer={updateTimer} />
        <FingerButton className="addTimer" title="Add new timer" onClick={addTimer}><AddIcon /></FingerButton>
      </div>
      <div className="rtc">{new Date().toLocaleTimeString()}</div>
    </main>
  )
}
