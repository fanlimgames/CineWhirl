import classNames from "classnames";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { Menu } from "@/components/player/internals/ContextMenu";
import { useOverlayRouter } from "@/hooks/useOverlayRouter";
import { usePlayerStore } from "@/stores/player/store";

// Updated playback speeds
const options = [0.1, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 3, 4];

function ButtonList(props: {
  options: number[];
  selected: number;
  onClick: (v: number) => void;
}) {
  return (
    <div className="overflow-x-auto whitespace-nowrap bg-video-context-buttons-list p-1 rounded-lg">
      <div className="flex items-center">
        {props.options.map((option) => (
          <button
            type="button"
            className={classNames(
              "inline-block px-2 py-1 rounded-md tabbable",
              props.selected === option
                ? "bg-video-context-buttons-active text-white"
                : null,
            )}
            onClick={() => props.onClick(option)}
            key={option}
          >
            {option}x
          </button>
        ))}
      </div>
    </div>
  );
}

export function PlaybackSettingsView({ id }: { id: string }) {
  const { t } = useTranslation();
  const router = useOverlayRouter(id);
  const playbackRate = usePlayerStore((s) => s.mediaPlaying.playbackRate);
  const display = usePlayerStore((s) => s.display);

  const setPlaybackRate = useCallback(
    (v: number) => {
      display?.setPlaybackRate(v);
    },
    [display],
  );

  return (
    <>
      <Menu.BackLink onClick={() => router.navigate("/")}>
        {t("player.menus.playback.title")}
      </Menu.BackLink>
      <Menu.Section>
        <div className="space-y-4 mt-3">
          <Menu.FieldTitle>
            {t("player.menus.playback.speedLabel")}
          </Menu.FieldTitle>
          <ButtonList
            options={options}
            selected={playbackRate}
            onClick={setPlaybackRate}
          />
        </div>
      </Menu.Section>
    </>
  );
}
