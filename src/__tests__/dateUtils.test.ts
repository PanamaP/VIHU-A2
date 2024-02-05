import {afterEach, describe, expect, it, vi} from 'vitest';
import { DATE_UNIT_TYPES } from '../constants';
import { getCurrentYear, add, isWithinRange, isDateBefore, isSameDay } from '../dateUtils';

describe("Date Utils", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  })

  describe("Get current year", () => {
    it("should return current year", () => {
      const result = getCurrentYear();
      expect(result).toBe(new Date().getFullYear());
    });
  })

  describe("Add to date", () => {
    it("should add seconds to date",() => {
      const datetime = new Date();
      const result = add(datetime, 60, DATE_UNIT_TYPES.SECONDS);
      expect(result).toStrictEqual(new Date(datetime.setSeconds(datetime.getSeconds() + 60)));
    })

    it("should add minutes to date",() => {
      const datetime = new Date();
      const result = add(datetime, 1, DATE_UNIT_TYPES.MINUTES);
      expect(result).toStrictEqual(new Date(datetime.setMinutes(datetime.getMinutes() + 1)));
    })

    it("should add days to date",() => {
      const datetime = new Date();
      const result = add(datetime, 1, DATE_UNIT_TYPES.DAYS);
      expect(result).toStrictEqual(new Date(datetime.setDate(datetime.getDate() + 1)));
    })

    it("should add weeks to date",() => {
      const datetime = new Date();
      const result = add(datetime, 1, DATE_UNIT_TYPES.WEEKS);
      expect(result).toStrictEqual(new Date(datetime.setDate(datetime.getDate() + 7)));
    })

    it("should add months to date",() => {
      const datetime = new Date();
      const result = add(datetime, 1, DATE_UNIT_TYPES.MONTHS);
      expect(result).toStrictEqual(new Date(datetime.setMonth(datetime.getMonth() + 1)));
    })

    it("should add years to date",() => {
      const datetime = new Date();
      const result = add(datetime, 1, DATE_UNIT_TYPES.YEARS);
      expect(result).toStrictEqual(new Date(datetime.setFullYear(datetime.getFullYear() + 1)));
    })
  })

  describe("Is within range", () => {
    it("should return true if date is within range", () => {
      const date = new Date(2024, 1, 15);
      const from = new Date(2024, 1, 1);
      const to = new Date(2024, 1, 31);
      const result = isWithinRange(date, from, to);
      expect(result).toBe(true);
    })

    it("should return false if date is not within range", () => {
      const date = new Date(2024, 1, 15);
      const from = new Date(2024, 1, 1);
      const to = new Date(2024, 1, 14);
      const result = isWithinRange(date, from, to);
      expect(result).toBe(false);
    })
  })

  describe("Is date before", () => {
    it("should return true if date is before", () => {
      const date = new Date(2024, 1, 15);
      const compareDate = new Date(2024, 1, 16);
      const result = isDateBefore(date, compareDate);
      expect(result).toBe(true);
    })

    it("should return false if date is not before", () => {
      const date = new Date(2024, 1, 15);
      const compareDate = new Date(2024, 1, 14);
      const result = isDateBefore(date, compareDate);
      expect(result).toBe(false);
    })
  })

  describe("Is same day", () => {
    it("should return true if date is same day", () => {
      const date = new Date(2024, 1, 15);
      const compareDate = new Date(2024, 1, 15);
      const result = isSameDay(date, compareDate);
      expect(result).toBe(true);
    })

    it("should return false if date is not same day", () => {
      const date = new Date(2024, 1, 15);
      const compareDate = new Date(2024, 1, 14);
      const result = isSameDay(date, compareDate);
      expect(result).toBe(false);
    })
  })
});
