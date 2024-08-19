import classNames from "classnames";
import { useCallback, useState } from "react";
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
    (v: number) => {
      display?.setPlaybackRate(v);
    },
    [display],
  );

  // Handle slider input changes
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setPlaybackRate(value);
  };

  // Handle slider hover for tooltip
  const handleSliderMouseMove = (event: React.MouseEvent<HTMLInputElement>) => {
    const value = parseFloat(event.currentTarget.value);
    setHoveredValue(value);
  };

  // Handle mouse leave to hide tooltip
  const handleSliderMouseLeave = () => {
    setHoveredValue(null);
  };

  // Determine slider min and max values
  const minPlaybackSpeed = 0.1;
  const maxPlaybackSpeed = 4;
  const step = 0.05;

  return (
    <Menu.CardWithScrollable>
      <Menu.BackLink onClick={() => router.navigate("/")}>
        {t("player.menus.playback.title")}
      </Menu.BackLink>
      <Menu.Section>
        <div className="space-y-4 mt-3">
          <Menu.FieldTitle>
            {t("player.menus.playback.speedLabel")}
          </Menu.FieldTitle>
          <div className="flex flex-col items-center space-y-4">
            {/* Playback Speed Slider */}
            <div className="relative w-full flex items-center">
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
                  "w-full h-2 rounded-lg",
                  "bg-progress-background bg-opacity-25",
                  "accent-theme",
                )}
                style={{
                  background: `linear-gradient(to right, var(--accent-color) ${((playbackRate - minPlaybackSpeed) / (maxPlaybackSpeed - minPlaybackSpeed)) * 100}%, var(--background-color) ${((playbackRate - minPlaybackSpeed) / (maxPlaybackSpeed - minPlaybackSpeed)) * 100}%)`,
                }}
              />
              {hoveredValue !== null && (
                <div
                  className={classNames(
                    "absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs px-2 py-1 rounded-lg",
                    "bg-tooltip-background text-tooltip-text",
                  )}
                  style={{
                    left: `${((hoveredValue - minPlaybackSpeed) / (maxPlaybackSpeed - minPlaybackSpeed)) * 100}%`,
                    transform: "translateX(-50%)",
                  }}
                >
                  {hoveredValue.toFixed(2)}x
                </div>
              )}
            </div>
            <span className="text-lg font-semibold text-white">
              {playbackRate.toFixed(2)}x
            </span>
          </div>
        </div>
      </Menu.Section>
    </Menu.CardWithScrollable>
  );
}
