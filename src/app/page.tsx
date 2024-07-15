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
  const [tick,setTick] = useState(Date.now())

  useEffect(() => {
    const ticker = setInterval(()=>{
      setTick(Date.now())
    },500)
    return ()=>clearInterval(ticker)
  },[])

  function addTimer() {
    setTimers([...timers, new TimerData(nextId)])
    setNextId(n => n + 1)
  }

  function delTimer(id: number) {
    setTimers([...timers.filter(t => t.id != id)])
  }

  function updateTimer(id: number, update: (timer: TimerData) => void) {
    setTimers([...timers.map(t => { if (t.id == id) { update(t); return t } else { return t } })])
  }

  return (
    <main className="flex flex-col justify-between items-center min-h-screen">
      <div className="timers">
        <Timers timers={timers} delTimer={delTimer} updateTimer={updateTimer} />
        <FingerButton className="addTimer" title="Add new timer" onClick={addTimer}><AddIcon /></FingerButton>
      </div>
    </main>
  )
}
