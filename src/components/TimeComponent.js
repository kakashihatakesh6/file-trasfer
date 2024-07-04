import moment from 'moment'
import React, { useEffect, useState } from 'react'

const TimeComponent = ({timeString}) => {
    const [formattedTime, setformattedTime] = useState('')

    useEffect(() => {
    //   const formatted = moment(timeString).format('MMMM Do, YYYY h:mm A');
      const formatted = moment(timeString).format('MMM D, YYYY, HH:mm');
      setformattedTime(formatted)
    }, [timeString])
    

  return (
    <span> {formattedTime} IST</span>
  )
}

export default TimeComponent