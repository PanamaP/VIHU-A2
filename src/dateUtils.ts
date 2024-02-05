import moment from "moment";
import { DATE_UNIT_TYPES } from "./constants";

export function getCurrentYear() {
  return moment().year();
}

export function add(date: Date, number: number, type = DATE_UNIT_TYPES.DAYS) {
  return moment(date).add(number, type).toDate();
}

export function isWithinRange(date: Date, from: Date, to: Date) {
  return moment(date).isBetween(from, to);
}

export function isDateBefore(date: Date, compareDate: Date) {
  return moment(date).isBefore(compareDate);
}

export function isSameDay(date: Date, compareDate: Date) {
  return moment(date).isSame(compareDate);
}
