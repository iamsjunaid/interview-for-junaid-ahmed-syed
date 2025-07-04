import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CalendarIcon, FilterIcon } from "lucide-react";
import DateFilterModal from "./DateFilterModal";

export function FilterDropdowns() {
  const [dateModalOpen, setDateModalOpen] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
      {/* Date Filter */}
      <>
        <Button variant="ghost" className="gap-2" onClick={() => setDateModalOpen(true)}>
          <CalendarIcon className="w-4 h-4" />
          Past 6 Months
        </Button>
        <DateFilterModal open={dateModalOpen} onClose={() => setDateModalOpen(false)} />
      </>

      {/* Launch Status Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="gap-2">
            <FilterIcon className="w-4 h-4" />
            All Launches
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
          <DropdownMenuItem>All Launches</DropdownMenuItem>
          <DropdownMenuItem>Upcoming</DropdownMenuItem>
          <DropdownMenuItem>Past</DropdownMenuItem>
          <DropdownMenuItem>Success</DropdownMenuItem>
          <DropdownMenuItem>Failed</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
