"use client";

import { Checkbox } from "@/shared/ui";
import { ColumnDef } from "@tanstack/react-table";

export type VideoColumn = {
  selected: boolean;
  id: string;
  title: string;
  createdAt: string;
  duration: number;
};

export const columns: ColumnDef<VideoColumn>[] = [
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
    header: "Title",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      const date = new Date(createdAt);
      return date.toLocaleDateString();
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
  },
];
