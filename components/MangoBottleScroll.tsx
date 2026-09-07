"use client";

import React from "react";
import { MotionValue } from "framer-motion";
import { ProductBottleScroll } from "./ProductBottleScroll";

interface MangoBottleScrollProps {
  progress: MotionValue<number>;
}

export const MangoBottleScroll: React.FC<MangoBottleScrollProps> = ({ progress }) => {
  return (
    <ProductBottleScroll
      folderPath="/images/ezgif-5127e5d4f52c97c9-jpg"
      progress={progress}
    />
  );
};
