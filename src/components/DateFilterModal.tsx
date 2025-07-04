import React, { useState } from "react";
import Modal from "./LaunchModal";
import { DateRange } from "react-date-range";
import type { Range, RangeKeyDict } from "react-date-range";
import { subMonths, subYears, endOfDay } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface DateFilterModalProps {
  open: boolean;
  onClose: () => void;
}

const quickRanges = [
  { label: "Past week", range: () => ({ startDate: subMonths(new Date(), 0), endDate: new Date() }) },
  { label: "Past month", range: () => ({ startDate: subMonths(new Date(), 1), endDate: new Date() }) },
  { label: "Past 3 months", range: () => ({ startDate: subMonths(new Date(), 3), endDate: new Date() }) },
  { label: "Past 6 months", range: () => ({ startDate: subMonths(new Date(), 6), endDate: new Date() }) },
  { label: "Past year", range: () => ({ startDate: subYears(new Date(), 1), endDate: new Date() }) },
  { label: "Past 2 years", range: () => ({ startDate: subYears(new Date(), 2), endDate: new Date() }) },
];

const DateFilterModal: React.FC<DateFilterModalProps> = ({ open, onClose }) => {
  const [range, setRange] = useState<Range>({
    startDate: subMonths(new Date(), 6),
    endDate: new Date(),
    key: "selection",
  });

  const handleSelect = (ranges: RangeKeyDict) => {
    setRange(ranges.selection);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-0 rounded-xl overflow-hidden bg-white min-w-[420px] max-w-full">
          {/* Quick select */}
          <div className="flex flex-col gap-1 py-6 px-5 min-w-[120px] bg-white">
            {quickRanges.map((q) => (
              <button
                key={q.label}
                className="text-left text-gray-700 text-sm py-1 px-0 hover:text-blue-700 focus:outline-none"
                style={{ background: "none", border: "none" }}
                onClick={() => setRange({ ...q.range(), key: "selection" })}
              >
                {q.label}
              </button>
            ))}
          </div>
          {/* Divider */}
          <div className="w-px bg-gray-200 mx-0 my-4" />
          {/* Calendar */}
          <div className="p-2">
            <DateRange
              ranges={[range]}
              onChange={handleSelect}
              moveRangeOnFirstSelection={false}
              months={2}
              direction="horizontal"
              rangeColors={["#2563eb"]}
              editableDateInputs={true}
              maxDate={endOfDay(new Date())}
              showMonthAndYearPickers={true}
              showDateDisplay={false}
              weekdayDisplayFormat="EE"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DateFilterModal; 