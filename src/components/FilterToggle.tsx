import { useState } from "react";
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

export type LaunchStatusFilter = "all" | "upcoming" | "past" | "success" | "failed";

interface FilterDropdownsProps {
  selectedStatus: LaunchStatusFilter;
  onStatusChange: (status: LaunchStatusFilter) => void;
}

export function FilterDropdowns({ selectedStatus, onStatusChange }: FilterDropdownsProps) {
  const [dateModalOpen, setDateModalOpen] = useState(false);

  const statusLabels: Record<LaunchStatusFilter, string> = {
    all: "All Launches",
    upcoming: "Upcoming Launches",
    past: "Past Launches",
    success: "Successful Launches",
    failed: "Failed Launches",
  };

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
            {statusLabels[selectedStatus]}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onStatusChange("all")}>All Launches</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onStatusChange("upcoming")}>Upcoming Launches</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onStatusChange("success")}>Successful Launches</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onStatusChange("failed")}>Failed Launches</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
