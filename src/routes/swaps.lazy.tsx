import { createLazyFileRoute } from "@tanstack/react-router"
import React from "react"
import Swap from "../components/Swap"


export const Route = createLazyFileRoute('/swaps')({
    component: Swaps,
  })
  
  function Swaps() {
    return (
      <div className="m-2 text-center">
        <h3>Swap Log</h3>
        <Swap />
      </div>
    )
  }