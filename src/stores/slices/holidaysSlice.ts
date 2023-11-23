import { StateCreator } from 'zustand';
import type { Holiday } from '@/types';
interface HolidaysSlice {
  holidays: Holiday[];
  addHolidays: (data: Holiday) => void;
}

const holidaysSlice: StateCreator<HolidaysSlice> = (set) => ({
  holidays: [],
  addHolidays: (data) => {
    set((state) => ({ holidays: [...state.holidays, data] }));
  },
});

export type { HolidaysSlice };
export { holidaysSlice };
