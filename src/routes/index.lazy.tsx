import { createLazyFileRoute, Link } from "@tanstack/react-router"
import React from "react"
import Swap from "../components/Swap"


export const Route = createLazyFileRoute('/')({
    component: Index,
  })
  
  function Index() {
    return (
      <div className="">
        <h3>Welcome Home!</h3>
        <Link to="/swaps">Swaps</Link>
      </div>
    )
  }