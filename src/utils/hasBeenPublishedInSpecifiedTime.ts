export default function hasBeenPublishedInSpecifiedTime(
  creationTimeInSeconds: number,
  lastDaysStart: number,
  lastDaysEnd: number
) {
  const currentTimeInSeconds = new Date().getTime() / 1000;

  const timeDifferenceInSeconds = currentTimeInSeconds - creationTimeInSeconds;
  const timeDifferenceDays = timeDifferenceInSeconds / (24 * 60 * 60);

  return (
    timeDifferenceDays <= lastDaysEnd && timeDifferenceDays >= lastDaysStart
  );
}
