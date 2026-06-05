"use client";

import { Outlet } from "react-router";
import { DistressEntriesLayout } from "./features/DistressEntriesLayout";

export function DistressEntries() {
  return <DistressEntriesLayout><Outlet /></DistressEntriesLayout>;
}
