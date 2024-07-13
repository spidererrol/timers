'use client'

import Image from "next/image"
import Timers from "@/components/Timers"
import React, { useState } from "react"
import { useImmer } from "use-immer"
import TimerData from "@/objects/TimerData"
import Add from "famfamfam-silk/dist/png/add.png"

export default function Home() {
  const [nextId, setNextId] = useState(1)
  const [timers, updateTimers] = useImmer([] as TimerData[])

  function addTimer() {
    updateTimers(n => { n.push(new TimerData(nextId)) })
    setNextId(n => n + 1)
  }

  function delTimer(id: number) {
    updateTimers(n => n.filter(t => t.id != id))
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="timers">
        <Timers timers={timers} delTimer={delTimer} />
        <div className="addTimer" title="Add new timer" onClick={addTimer}><Image alt="+" src={Add}/></div>
      </div>
    </main>
  )
}
