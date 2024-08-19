import { useCallback, useRef } from "react";

import { Icon, Icons } from "@/components/Icon";
import {
  makePercentage,
  makePercentageString,
  useProgressBar,
} from "@/hooks/useProgressBar";
import { usePlayerStore } from "@/stores/player/store";
import { canChangeVolume } from "@/utils/detectFeatures";

import { useVolume } from "../hooks/useVolume";

interface Props {
  className?: string;
}

export function Volume(props: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const setHovering = usePlayerStore((s) => s.setHoveringLeftControls);
  const hovering = usePlayerStore((s) => s.interface.leftControlHovering);
  const volume = usePlayerStore((s) => s.mediaPlaying.volume);
  const { setVolume, toggleMute } = useVolume();

  const commitVolume = useCallback(
    (percentage: number) => {
      setVolume(percentage);
    },
    [setVolume],
  );

  const { dragging, dragPercentage, dragMouseDown } = useProgressBar(
    ref,
    commitVolume,
    true,
  );

  const handleClick = useCallback(() => {
    toggleMute();
  }, [toggleMute]);

  const handleMouseEnter = useCallback(async () => {
    if (await canChangeVolume()) setHovering(true);
    document.body.classList.add("overflow-y-hidden");
  }, [setHovering]);

  const handleMouseLeave = () => {
    document.body.classList.remove("overflow-y-hidden");
  };

  let percentage = makePercentage(volume * 100);
  if (dragging) percentage = makePercentage(dragPercentage);
  const percentageString = makePercentageString(percentage);

  const handleWheel = useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      event.preventDefault();
      let newVolume = volume - event.deltaY / 1000;
      newVolume = Math.max(0, Math.min(newVolume, 1));
      setVolume(newVolume);
    },
    [volume, setVolume],
  );

  const getVolumeIcon = (volumeLevel: number) => {
    if (volumeLevel === 0) {
      return Icons.VOLUME_X;
    }
    if (volumeLevel > 0 && volumeLevel <= 0.33) {
      return Icons.VOLUME_LOW;
    }
    if (volumeLevel > 0.33 && volumeLevel <= 0.66) {
      return Icons.VOLUME_MED;
    }
    return Icons.VOLUME;
  };

  return (
    <div
      className={props.className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onWheel={handleWheel}
      aria-label="Volume Control"
    >
      <div className="flex items-center py-0">
        {/* Volume Icon */}
        <div
          className="px-4 text-2xl text-white cursor-pointer"
          onClick={handleClick}
        >
          <Icon icon={getVolumeIcon(percentage / 100)} />
        </div>

        {/* Volume Slider */}
        <div
          className={`relative flex h-10 items-center px-2 transition-all duration-300 ${
            hovering || dragging ? "opacity-100 w-32" : "opacity-0 w-12"
          }`}
        >
          <div
            ref={ref}
            className="relative flex-1 h-2 rounded-full bg-gray-600"
            onMouseDown={dragMouseDown}
            onTouchStart={dragMouseDown}
          >
            <div
              className="absolute inset-0 rounded-full bg-video-audio-set"
              style={{ width: percentageString }}
            >
              <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
