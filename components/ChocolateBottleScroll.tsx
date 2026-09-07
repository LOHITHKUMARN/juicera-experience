"use client";

import React from "react";
import { MotionValue } from "framer-motion";
import { ProductBottleScroll } from "./ProductBottleScroll";

interface ChocolateBottleScrollProps {
  progress: MotionValue<number>;
}

export const ChocolateBottleScroll: React.FC<ChocolateBottleScrollProps> = ({ progress }) => {
  return (
    <ProductBottleScroll
      folderPath="/images/chocolate"
      progress={progress}
    />
  );
};
