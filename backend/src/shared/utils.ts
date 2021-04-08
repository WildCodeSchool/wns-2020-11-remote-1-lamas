export interface MoodCounter {
  [k: string]: number;
}

interface MoodCounterFromRedis {
  [k: string]: string;
}

export const parseIntHget = (
  newMoodCounter: MoodCounter,
  count: MoodCounterFromRedis
): MoodCounter => {
  const parsedMoodCounter = { ...newMoodCounter };
  Object.keys(count).forEach((key) => {
    parsedMoodCounter[key] = parseInt(count[key], 10);
  });
  return parsedMoodCounter;
};
