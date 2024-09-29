import React, { useEffect, useState, useRef } from "react";
import { useMediaState } from "@vidstack/react";
import { BoundingBox } from "@/shared/api";

interface BoundingBoxOverlayProps {
  boundingBoxes: BoundingBox[];
}

export function BoundingBoxOverlay({ boundingBoxes }: BoundingBoxOverlayProps) {
  const currentTime = useMediaState("currentTime");
  const [visibleBoxes, setVisibleBoxes] = useState<BoundingBox[]>([]);
  const [maxSimultaneousDetections, setMaxSimultaneousDetections] = useState(0);
  const lastUpdateTime = useRef(0);

  useEffect(() => {
    const updateInterval = 100;
    const timeThreshold = 0.05;

    const updateVisibleBoxes = () => {
      const now = Date.now();
      if (now - lastUpdateTime.current < updateInterval) {
        return;
      }

      lastUpdateTime.current = now;

      const relevantBoxes = boundingBoxes.filter(
        (box) => Math.abs(box.time_offset - currentTime) <= timeThreshold
      );

      setVisibleBoxes(relevantBoxes);

      setMaxSimultaneousDetections((prev) =>
        Math.max(prev, relevantBoxes.length)
      );
    };

    updateVisibleBoxes(); // Call immediately
    const intervalId = setInterval(updateVisibleBoxes, updateInterval);

    return () => clearInterval(intervalId);
  }, [currentTime, boundingBoxes]);

  return (
    <div className="absolute inset-0">
      {visibleBoxes.map((box, index) => (
        <div
          key={index}
          className="absolute border-2 border-red-500"
          style={{
            left: `${box.left * 100}%`,
            top: `${box.top * 100}%`,
            width: `${(box.right - box.left) * 100}%`,
            height: `${(box.bottom - box.top) * 100}%`,
          }}
        />
      ))}
      <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white p-2">
        Ludzi wykrytych: {maxSimultaneousDetections}
      </div>
    </div>
  );
}
