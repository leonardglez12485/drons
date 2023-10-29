import { endOfDay, startOfDay } from "date-fns"

export const dateRangeByCustomDates = (startDate: string, endDate: string) : {start: Date, end: Date} => {

    const StartDate = new Date(startDate)
    const EndDate = new Date(endDate)
  
    const start = startOfDay(StartDate)
    const end = endOfDay(EndDate)
  
    return {
      start,
      end
    }
  
  }