import dayjs from "dayjs";
import minimist from "minimist";

import ja from "dayjs/locale/ja.js";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore.js";
import arraySupport from "dayjs/plugin/arraySupport.js";
dayjs.locale(ja);
dayjs.extend(isSameOrBefore);
dayjs.extend(arraySupport);

const determineTargetYear = (year) => {
  if (year) {
    return year;
  } else {
    return today.year();
  }
};

const determineTargetMonth = (month) => {
  if (month) {
    return month - 1;
  } else {
    return today.month();
  }
};

const organizeTargetDates = (firstDate, lastDate) => {
  let dates = [];
  for (let i = 1; i <= lastDate.date(); i++) {
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

const targetYear = determineTargetYear(inputYearAndMonth.y);
const targetMonth = determineTargetMonth(inputYearAndMonth.m);

const firstDate = dayjs([targetYear, targetMonth]);
const lastDate = firstDate.endOf("month");
const targetDates = organizeTargetDates(firstDate, lastDate);

const firstDayIdx = firstDate.day();

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
