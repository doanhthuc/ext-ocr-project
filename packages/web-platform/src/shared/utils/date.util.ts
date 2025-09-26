import dayjs, { ConfigType } from 'dayjs';
import { isNil } from 'lodash-es';

export function formatDate(date: ConfigType, fallback = '') {
  if (isNil(date)) return fallback;

  return dayjs(date).format('MMM dd, yyyy');
}

// Parses an AWS-style cron expression and extracts day and formatted time
export function parseCronExpression(
  cronExpr: string,
  durationInMinutes: number
) {
  // Updated regex to match multiple days (MON,TUE,WED,...)
  const cronRegex = /^cron\((\d+) (\d+) \? \* ((?:[A-Z]{3},?)+) \*\)$/;
  const match = cronExpr.match(cronRegex);

  if (!match) {
    throw new Error('Invalid AWS cron expression format');
  }

  const minute = parseInt(match[1]);
  const hour = parseInt(match[2]);
  const days = match[3].split(',').map(day => day.trim());

  // Calculate start and end times in minutes
  const startTime = hour * 60 + minute;
  const endTime = startTime + durationInMinutes;

  return {
    days, // Array of days, e.g., ['MON', 'TUE']
    startTime,
    endTime,
  };
}

export function minuteToHourMinutePeriod(minute: number) {
  const hour = Math.floor(minute / 60);
  const remainingMinute = minute % 60;
  const period = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  return `${String(formattedHour).padStart(2, '0')}:${String(remainingMinute).padStart(2, '0')} ${period}`;
}
