import dayjs from "dayjs";
import minimist from "minimist";

import ja from "dayjs/locale/ja.js";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore.js";
import arraySupport from "dayjs/plugin/arraySupport.js";
dayjs.locale(ja);
dayjs.extend(isSameOrBefore);
dayjs.extend(arraySupport);

const setTargetYear = (year) => {
  if (year) {
    return year;
  } else {
    return parseInt(today.format("YYYY"));
  }
};

const setTargetMonth = (month) => {
  if (month) {
    return month - 1;
  } else {
    return parseInt(today.format("M")) - 1;
  }
};

const setTargetDates = (firstDate, lastDate) => {
  let dates = [];
  const formattedLastDate = parseInt(lastDate.format("D"))
  for (let i = 1; i <= formattedLastDate; i++) {
    if (i > 1) {
      dates.push(firstDate.add(i - 1, "d"));
    } else {
      dates.push(firstDate);
    }
  }
  return dates;
};

const inputYearAndMonth = minimist(process.argv.slice(2));
const today = dayjs();

const targetYear = setTargetYear(inputYearAndMonth.y);
const targetMonth = setTargetMonth(inputYearAndMonth.m);

const firstDate = dayjs([targetYear, targetMonth]);
const lastDate = firstDate.endOf("month");
const targetDates = setTargetDates(firstDate, lastDate);

const firstDayIdx = parseInt(firstDate.format("d"));

console.log(`      ${firstDate.format("M")}月 ${firstDate.format("YYYY")}`);
console.log("日 月 火 水 木 金 土 ");
process.stdout.write(" ".repeat(firstDayIdx * 3));
targetDates.forEach((date) => {
  process.stdout.write(`${date.format("D").padStart(2, " ").padEnd(3, " ")}`);
  if (date.day() === 6) {
    console.log();
  }
});
console.log();
