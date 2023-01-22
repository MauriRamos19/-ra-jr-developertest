

import { millisecondsToMinutes } from 'date-fns'

const calculateAmountPerMinute = (inDate: Date, outDate: Date) => {
  const diffTime = outDate.getTime() - inDate.getTime()
  return millisecondsToMinutes(diffTime) * 0.5
}


export default calculateAmountPerMinute;