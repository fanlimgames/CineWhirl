import classNames from "classnames";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { mediaItemToId } from "@/backend/metadata/tmdb";
import { DotList } from "@/components/text/DotList";
import { Flare } from "@/components/utils/Flare";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useSearchQuery } from "@/hooks/useSearchQuery";
import { MediaItem } from "@/utils/mediaTypes";

import { MediaBookmarkButton } from "./MediaBookmark";
import { IconPatch } from "../buttons/IconPatch";
import { Icon, Icons } from "../Icon";

export interface MediaCardProps {
  media: MediaItem;
  linkable?: boolean;
  series?: {
    episode: number;
    season?: number;
    episodeId: string;
    seasonId: string;
  };
  percentage?: number;
  closable?: boolean;
  onClose?: () => void;
}

function checkReleased(media: MediaItem): boolean {
  const isReleasedYear = Boolean(
    media.year && media.year <= new Date().getFullYear(),
  );
  const isReleasedDate = Boolean(
    media.release_date && media.release_date <= new Date(),
  );

  return media.release_date ? isReleasedDate : isReleasedYear;
}

function MediaCardContent({
  media,
  linkable,
  series,
  percentage,
  closable,
  onClose,
}: MediaCardProps) {
  const { t } = useTranslation();
  const percentageString = `${Math.round(percentage ?? 0).toFixed(0)}%`;

  const isReleased = useCallback(() => checkReleased(media), [media]);

  const canLink = linkable && !closable && isReleased();
  const dotListContent = [t(`media.types.${media.type}`)];
  if (media.year) {
    dotListContent.push(media.year.toFixed());
  }
  if (!isReleased()) {
    dotListContent.push(t("media.unreleased"));
  }

  const [searchQuery] = useSearchQuery();
  const { isMobile } = useIsMobile();

  return (
    <Flare.Base
      className={classNames(
        "group -m-[0.705em] rounded-xl bg-background-main transition-colors duration-300 focus:relative focus:z-10",
        canLink ? "hover:bg-mediaCard-hoverBackground tabbable" : "",
      )}
      tabIndex={canLink ? 0 : -1}
      onKeyUp={(e) => e.key === "Enter" && e.currentTarget.click()}
    >
      <Flare.Light
        flareSize={300}
        cssColorVar="--colors-mediaCard-hoverAccent"
        backgroundClass="bg-mediaCard-hoverBackground duration-100"
        className={classNames({
          "rounded-xl bg-background-main group-hover:opacity-100": canLink,
        })}
      />
      <Flare.Child
        className={classNames(
          "pointer-events-auto relative mb-2 p-[0.4em] transition-transform duration-300",
          canLink ? "group-hover:scale-95" : "opacity-60",
        )}
      >
        <div
          className={classNames(
            "relative mb-4 pb-[150%] w-full overflow-hidden rounded-xl bg-mediaCard-hoverBackground bg-cover bg-center transition-[border-radius] duration-300",
            canLink ? "group-hover:rounded-lg" : "",
          )}
          style={{
            backgroundImage: media.poster ? `url(${media.poster})` : undefined,
          }}
        >
          {/* Bookmark Button */}
          {!isMobile && canLink && searchQuery.length > 0 && (
            <div className="absolute top-2 left-2 z-10">
              <MediaBookmarkButton media={media} />
            </div>
          )}

          {/* Series Badge */}
          {series && (
            <div className="absolute top-2 right-2 rounded-md bg-mediaCard-badge px-2 py-1 transition-colors z-10">
              <p
                className={classNames(
                  "text-center text-xs font-bold text-mediaCard-badgeText transition-colors",
                  !closable && "group-hover:text-white",
                )}
              >
                {t("media.episodeDisplay", {
                  season: series.season || 1,
                  episode: series.episode,
                })}
              </p>
            </div>
          )}

          {/* Percentage Bar */}
          {percentage !== undefined && (
            <>
              <div
                className={classNames(
                  "absolute inset-x-0 bottom-0 h-1 bg-gradient-to-t from-mediaCard-shadow to-transparent transition-colors",
                  canLink && "group-hover:from-mediaCard-hoverShadow",
                )}
              />
              <div className="absolute inset-x-0 bottom-0 p-3">
                <div className="relative h-1 overflow-hidden rounded-full bg-mediaCard-barColor">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-mediaCard-barFillColor"
                    style={{ width: percentageString }}
                  />
                </div>
              </div>
            </>
          )}

          {/* Close Button */}
          <div
            className={classNames(
              "absolute inset-0 flex items-center justify-center bg-mediaCard-badge bg-opacity-80 transition-opacity duration-500",
              closable ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            <IconPatch
              clickable
              className="text-2xl text-mediaCard-badgeText transition-transform hover:scale-110 duration-500"
              onClick={() => closable && onClose?.()}
              icon={Icons.X}
            />
          </div>
        </div>

        {/* Title and DotList */}
        <h1 className="mb-1 line-clamp-3 max-h-[4.5rem] text-ellipsis break-words font-bold text-white">
          <span>{media.title}</span>
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-2">
          <DotList className="text-xs" content={dotListContent} />
        </div>

        {/* Info Button */}
        <div className="relative mt-2 flex justify-end">
          <button
            className={classNames(
              "flex items-center justify-center p-2 rounded-full transition-colors duration-300",
              "bg-transparent text-gray-300 hover:bg-mediaCard-hoverBackground hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500",
            )}
            type="button"
            aria-label={t("media.infoButtonLabel")}
            onClick={(e) => {
              e.preventDefault();
              const searchParam = encodeURIComponent(media.id);
              const url =
                media.type === "movie"
                  ? `https://www.themoviedb.org/movie/${searchParam}`
                  : `https://www.themoviedb.org/tv/${searchParam}`;
              window.open(url, "_blank");
            }}
          >
            <Icon className="text-xl" icon={Icons.CIRCLE_QUESTION} />
          </button>
        </div>
      </Flare.Child>
    </Flare.Base>
  );
}

export function MediaCard(props: MediaCardProps) {
  const content = <MediaCardContent {...props} />;

  const isReleased = useCallback(
    () => checkReleased(props.media),
    [props.media],
  );

  const canLink = props.linkable && !props.closable && isReleased();

  let link = canLink
    ? `/media/${encodeURIComponent(mediaItemToId(props.media))}`
    : "#";
  if (canLink && props.series) {
    link +=
      props.series.season === 0 && !props.series.episodeId
        ? `/${encodeURIComponent(props.series.seasonId)}`
        : `/${encodeURIComponent(props.series.seasonId)}/${encodeURIComponent(props.series.episodeId)}`;
  }

  return canLink ? (
    <Link
      to={link}
      tabIndex={-1}
      className={classNames(
        "tabbable",
        props.closable ? "hover:cursor-default" : "",
      )}
    >
      {content}
    </Link>
  ) : (
    <span>{content}</span>
  );
}
