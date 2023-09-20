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

const setFirstDate = (year, month) => {
  return dayjs([year, month]);
};

const setLastDate = (firstDate) => {
  return firstDate.endOf("month");
};

const setTargetDates = (firstDate, lastDate) => {
  let dates = [];
  for (let i = firstDate; i.isSameOrBefore(lastDate); i = i.add(1, "d")) {
    dates.push(i);
  }
  return dates;
};

const inputYearAndMonth = minimist(process.argv.slice(2));
const today = dayjs();

const targetYear = setTargetYear(inputYearAndMonth.y);
const targetMonth = setTargetMonth(inputYearAndMonth.m);

const firstDate = setFirstDate(targetYear, targetMonth);
const lastDate = setLastDate(firstDate);
const targetDates = setTargetDates(firstDate, lastDate);

const firstDayIdx = parseInt(firstDate.format("d"));

console.log(`      ${firstDate.format("M")}月 ${firstDate.format("YYYY")}`);
console.log("日 月 火 水 木 金 土 ");
process.stdout.write(" ".repeat(firstDayIdx * 3));
targetDates.forEach((date) => {
  process.stdout.write(`${date.format("D").padStart(2, " ").padEnd(3, " ")}`);
  if (date.format("dd") === "土") {
    console.log();
  }
});
console.log();
