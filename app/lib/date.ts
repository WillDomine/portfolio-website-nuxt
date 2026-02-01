export interface DateDiff {
  years: number;
  months: number;
}

export const calculateTimeSince = (dateString: string): DateDiff => {
  const start = new Date(dateString);
  const now = new Date();

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();

  // Adjust years and months if the current month/day is before the start month/day
  if (months < 0 || (months === 0 && now.getDate() < start.getDate())) {
    years--;
    // Add 12 to months to wrap around to the previous year
    months += 12;
  }

  // If the current day is earlier than the start day, the current month isn't "full" yet
  if (now.getDate() < start.getDate()) {
    months--;
  }

  return { years, months };
};