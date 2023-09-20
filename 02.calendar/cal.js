import dayjs from "dayjs";
import minimist from "minimist";

import ja from "dayjs/locale/ja.js";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore.js";
dayjs.locale(ja);
dayjs.extend(isSameOrBefore);

const setTargetYear = (year) => {
  if (year) {
    return year;
  } else {
    return today.format("YYYY");
  }
};

const setTargetMonth = (month) => {
  if (month) {
    return month;
  } else {
    return today.format("M");
  }
};

const setFirstDate = (year, month) => {
  return dayjs([year, month]);
};

const setLastDate = (firstDate) => {
  return firstDate.endOf("month");
};

const setTargetDates = (firstDate, lastDate) => {
  let days = [];
  for (let i = firstDate; i.isSameOrBefore(lastDate); i = i.add(1, "d")) {
    days.push(i);
  }
  return days;
};

const argv = minimist(process.argv.slice(2));
const today = dayjs();

const targetYear = setTargetYear(argv.y);
const targetMonth = setTargetMonth(argv.m);

const firstDate = setFirstDate(targetYear, targetMonth);
const lastDate = setLastDate(firstDate);
const targetDates = setTargetDates(firstDate, lastDate);

const firstDay = parseInt(firstDate.format("d"));

console.log(`      ${targetMonth}月 ${targetYear}`);
console.log("日 月 火 水 木 金 土 ");
process.stdout.write(" ".repeat(firstDay * 3));
targetDates.forEach((date) => {
  process.stdout.write(`${date.format("D").padStart(2, " ").padEnd(3, " ")}`);
  if (date.format("dd") === "土") {
    console.log();
  }
});
console.log();
