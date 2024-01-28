import { createLazyFileRoute } from "@tanstack/react-router"
import React from "react"


export const Route = createLazyFileRoute('/')({
    component: Index,
  })
  
  function Index() {
    return (
      <div className="p-2 bg-red-400">
        <h3>Welcome Home!</h3>
      </div>
    )
  }