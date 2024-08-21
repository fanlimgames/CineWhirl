import classNames from "classnames";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { Menu } from "@/components/player/internals/ContextMenu";
import { useOverlayRouter } from "@/hooks/useOverlayRouter";
import { usePlayerStore } from "@/stores/player/store";

interface PlaybackSettingsViewProps {
  id: string;
}

export function PlaybackSettingsView({ id }: PlaybackSettingsViewProps) {
  const { t } = useTranslation();
  const router = useOverlayRouter(id);
  const playbackRate = usePlayerStore((s) => s.mediaPlaying.playbackRate);
  const display = usePlayerStore((s) => s.display);

  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  const setPlaybackRate = useCallback(
    (value: number) => {
      display?.setPlaybackRate(value);
    },
    [display],
  );

  const resetPlaybackRate = () => {
    setPlaybackRate(1);
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setPlaybackRate(value);
  };

  const handleSliderMouseMove = (event: React.MouseEvent<HTMLInputElement>) => {
    const value = parseFloat(event.currentTarget.value);
    setHoveredValue(value);
  };

  const handleSliderMouseLeave = () => {
    setHoveredValue(null);
  };

  const minPlaybackSpeed = 0.1;
  const maxPlaybackSpeed = 4;
  const step = 0.05;
  const sliderPercentage =
    ((playbackRate - minPlaybackSpeed) /
      (maxPlaybackSpeed - minPlaybackSpeed)) *
    100;

  return (
    <Menu.CardWithScrollable>
      <Menu.BackLink onClick={() => router.navigate("/")}>
        {t("player.menus.playback.title")}
      </Menu.BackLink>
      <Menu.Section>
        <div className="p-4 space-y-6">
          <Menu.FieldTitle>
            {t("player.menus.playback.speedLabel")}
          </Menu.FieldTitle>
          <div className="flex flex-col items-center space-y-4">
            {/* Playback Speed Slider */}
            <div className="relative w-full max-w-md">
              <input
                type="range"
                min={minPlaybackSpeed}
                max={maxPlaybackSpeed}
                step={step}
                value={playbackRate}
                onChange={handleSliderChange}
                onMouseMove={handleSliderMouseMove}
                onMouseLeave={handleSliderMouseLeave}
                className={classNames(
                  "w-full h-2 rounded-full",
                  "bg-gradient-to-r from-accent-color to-background-color",
                  "accent-theme",
                )}
                style={{
                  background: `linear-gradient(to right, var(--accent-color) ${sliderPercentage}%, var(--background-color) ${sliderPercentage}%)`,
                }}
                aria-label={t("player.menus.playback.sliderLabel")}
              />
              {hoveredValue !== null && (
                <div
                  className={classNames(
                    "absolute -top-8 left-1/2 transform -translate-x-1/2 text-sm px-2 py-1 rounded-md",
                    "bg-gray-800 text-white",
                    "shadow-lg",
                  )}
                  style={{
                    left: `${sliderPercentage}%`,
                    transform: "translateX(-50%)",
                    transition: "opacity 0.3s ease",
                  }}
                >
                  {hoveredValue.toFixed(2)}x
                </div>
              )}
            </div>
            {/* Playback Speed Icon */}
            <button
              type="button"
              onClick={resetPlaybackRate}
              className={classNames(
                "px-4 py-2 text-lg font-medium text-white bg-accent-color rounded-lg",
                "hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent-color",
                "transition-colors duration-300",
              )}
              aria-label={t("player.menus.playback.resetSpeedLabel")}
            >
              {playbackRate.toFixed(2)}x
            </button>
          </div>
        </div>
      </Menu.Section>
    </Menu.CardWithScrollable>
  );
}
