export function getCurrentWeekRange(): { start: string; end: string; formatted: string } {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, etc.

  // Calculate Monday of current week (start)
  const monday = new Date(now);
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // If Sunday, go back 6 days
  monday.setDate(now.getDate() + diff);
  monday.setHours(0, 0, 0, 0);

  // Calculate Friday of current week (end)
  const friday = new Date(monday);
  friday.setDate(monday.getDate() + 4);

  // Format dates
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const startMonth = monthNames[monday.getMonth()];
  const endMonth = monthNames[friday.getMonth()];

  const startDay = monday.getDate();
  const endDay = friday.getDate();

  // Format: "Jan 24-30" or "Jan 30 - Feb 3" if crossing months
  let formatted;
  if (startMonth === endMonth) {
    formatted = `${startMonth} ${startDay}-${endDay}`;
  } else {
    formatted = `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
  }

  return {
    start: monday.toISOString(),
    end: friday.toISOString(),
    formatted
  };
}
