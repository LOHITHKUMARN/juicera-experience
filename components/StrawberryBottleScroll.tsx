"use client";

import React from "react";
import { MotionValue } from "framer-motion";
import { ProductBottleScroll } from "./ProductBottleScroll";

interface StrawberryBottleScrollProps {
  progress: MotionValue<number>;
}

export const StrawberryBottleScroll: React.FC<StrawberryBottleScrollProps> = ({ progress }) => {
  return (
    <ProductBottleScroll
      folderPath="/images/ezgif-2ac927a590d0b067-jpg"
      progress={progress}
    />
  );
};
