"use client";
import { ICategory } from "@/lib/models/category.model";
import React from "react";

import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
} from "react-icons/fc";

interface categoryProps {
  items: Array<ICategory>;
}
import { IconType } from "react-icons/lib";
import CategoryItem from "./category-item";

const iconMap: Record<ICategory["name"], IconType> = {
  "Computer Science": FcMultipleDevices,
  Music: FcMusic,
  Fitness: FcSportsMode,
  Photography: FcOldTimeCamera,
  Accounting: FcSalesPerformance,
  Engineering: FcEngineering,
  Filming: FcFilmReel,
};

const Categories = ({ items }: categoryProps) => {
  return (
    <>
      <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
        {items.map((item: any) => (
          <CategoryItem
            key={item._id}
            label={item.name}
            icon={iconMap[item.name]}
            value={item._id}
          />
        ))}
      </div>
    </>
  );
};

export default Categories;
