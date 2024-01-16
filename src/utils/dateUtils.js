const { addDays } = require('date-fns');
const { Temporal } = require('@js-temporal/polyfill');

function getDate() {
    const dateTime = Temporal.Now.plainDateTimeISO().toString();
    const [date, time] = dateTime.split('T');
    const [year, month, day] = date.split('-');
    
    const [fullHour, milliseconds] = time.split('.');
    milliseconds.split('Z');
    const [formattedHour, minutes, seconds] = fullHour.split(':');

  // Convert the hour to the correct time zone (considering the local time zone)
  const completeDate = new Date(`${year}-${month}-${day}T${fullHour}`);
  const localTimeZoneOffset = completeDate.getTimezoneOffset();
  completeDate.setMinutes(completeDate.getMinutes() - localTimeZoneOffset);

  // Format the date and time in the desired format 'yyyy-MM-dd HH:mm:ss'
  const now = `${year}-${month}-${day} ${formattedHour}:${minutes}:${seconds}`;

  return now;
}

function calculateDate(daysToAdd) {
    const baseDate = new Date();
    return addDays(baseDate, daysToAdd);
}

function formatToBrazilDate(date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

module.exports = {
    getDate,
    calculateDate,
    formatToBrazilDate,
};