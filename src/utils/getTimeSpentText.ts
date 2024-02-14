export function getTimeSpentText(timeInSeconds: number = 0) {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);

  if (minutes === 0) {
    return "<1 min";
  }

  if (hours > 0) {
    return `${hours}h ${minutes}min`;
  }

  return `${minutes}min`;
}
