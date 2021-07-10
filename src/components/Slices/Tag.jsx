import React from "react"
const Tag = ({ text }) => {
  return (
    <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
      {text}
    </p>
  )
}

export default Tag
