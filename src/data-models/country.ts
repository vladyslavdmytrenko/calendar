import { PublicHolidayType } from '@data-models/enums/country.enum.ts';

export interface PublicHoliday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  launchYear: number;
  types: PublicHolidayType[];
}

export interface PublicHolidayList {
  [key: number]: PublicHoliday[];
}
