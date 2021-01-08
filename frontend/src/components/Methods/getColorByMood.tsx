import { MoodCounter } from '../../datas/Emojis';

const getColorByMood = (
  emojisCounts: MoodCounter,
  totalStudents: number
): string => {
  const unhappys: number = emojisCounts.thinking + emojisCounts.dead;
  const unhappysPercentage: number = (unhappys / totalStudents) * 100;

  if (unhappysPercentage >= 20 && unhappysPercentage < 50) {
    return 'rgba(255, 249, 61, 0.7)';
  }
  if (unhappysPercentage >= 50 && unhappysPercentage < 80) {
    return 'rgba(230, 147, 5, 0.7)';
  }
  if (unhappysPercentage >= 80) {
    return 'rgba(235, 0, 0, 0.7)';
  }
  return 'rgba(148, 234, 72, 0.7)';
};

export default getColorByMood;
