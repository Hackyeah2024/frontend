"use client";

import { Checkbox } from "@/shared/ui";
import { ColumnDef } from "@tanstack/react-table";

export type ComparedVideoColumn = {
  selected: boolean;
  id: string;
  title: string;
  modifications: number;
  coherence: number;
  quality: number;
};

export const columns: ColumnDef<ComparedVideoColumn>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "selected",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "title",
    header: "Nazwa",
  },
  {
    accessorKey: "modifications",
    header: "Ilosc Modyfikacji",
  },
  {
    accessorKey: "quality",
    header: "Jakość",
  },
  {
    accessorKey: "coherence",
    header: "Spójność",
  },
];
