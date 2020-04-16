import React from 'react'

const Day = val => {
  return (
    <div className="day-box" value={val}>
      <h2>{val}</h2>
    </div>
  )
}

export default Day
