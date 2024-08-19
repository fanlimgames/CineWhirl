import { Icon, Icons } from "@/components/Icon";
import { Flare } from "@/components/utils/Flare";
import { Transition } from "@/components/utils/Transition";
import { usePlayerStore } from "@/stores/player/store";
import { useEmpheralVolumeStore } from "@/stores/volume";

export function VolumeChangedPopout() {
  const empheralVolume = useEmpheralVolumeStore();
  const volume = usePlayerStore((s) => s.mediaPlaying.volume);

  return (
    <Transition
      animation="slide-down"
      show={empheralVolume.showVolume}
      className="absolute inset-x-0 top-4 flex justify-center pointer-events-none"
    >
      <Flare.Base className="bg-video-context-background text-video-context-type-main rounded-lg shadow-lg flex items-center py-3 px-4 group w-72">
        <Flare.Light
          enabled
          flareSize={200}
          cssColorVar="--colors-video-context-light"
          backgroundClass="bg-video-context-background"
          className="rounded-lg"
        />
        <Flare.Child className="flex items-center w-full">
          {/* Volume Icon */}
          <div className="flex items-center justify-center p-2 text-2xl">
            <Icon
              className="text-2xl"
              icon={volume > 0 ? Icons.VOLUME : Icons.VOLUME_X}
            />
          </div>
          {/* Volume Slider and Percentage */}
          <div className="flex-1 ml-3">
            <div className="relative h-2 rounded-full bg-video-context-slider bg-opacity-30">
              <div
                className="absolute h-full rounded-full bg-video-context-sliderFilled transition-all duration-300"
                style={{ width: `${volume * 100}%` }}
              />
            </div>
            {/* Volume Percentage */}
            <div className="flex justify-between text-sm text-video-context-type-main mt-1">
              <span>0%</span>
              <span>{(volume * 100).toFixed(0)}%</span>
            </div>
          </div>
        </Flare.Child>
      </Flare.Base>
    </Transition>
  );
}
