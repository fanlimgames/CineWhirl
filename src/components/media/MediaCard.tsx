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
import { Icons } from "../Icon";

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
  const currentYear = new Date().getFullYear();
  const currentDate = new Date();

  const isReleasedYear = media.year ? media.year <= currentYear : false;
  const isReleasedDate = media.release_date
    ? new Date(media.release_date) <= currentDate
    : false;

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
  const percentageString = percentage
    ? `${Math.round(percentage).toFixed(0)}%`
    : undefined;

  const isReleased = useCallback(() => checkReleased(media), [media]);
  const canLink = linkable && !closable && isReleased();
  const { isMobile } = useIsMobile();
  const [searchQuery] = useSearchQuery();

  const dotListContent = [t(`media.types.${media.type}`)];
  if (media.year) dotListContent.push(media.year.toFixed());
  if (!isReleased()) dotListContent.push(t("media.unreleased"));

  return (
    <Flare.Base
      className={classNames(
        "group -m-[0.4em] rounded-lg bg-background-main shadow-lg transition-all duration-300 focus:relative focus:z-10",
        canLink && "hover:bg-mediaCard-hoverBackground tabbable",
      )}
      tabIndex={canLink ? 0 : -1}
      onKeyUp={(e) => e.key === "Enter" && e.currentTarget.click()}
    >
      <Flare.Light
        flareSize={200}
        cssColorVar="--colors-mediaCard-hoverAccent"
        backgroundClass="bg-mediaCard-hoverBackground duration-100"
        className={classNames({
          "rounded-lg bg-background-main group-hover:opacity-100": canLink,
        })}
      />
      <Flare.Child
        className={classNames(
          "pointer-events-auto relative mb-1.5 p-[0.25em] transition-transform duration-300",
          canLink ? "group-hover:scale-98" : "opacity-60",
        )}
      >
        <div
          className={classNames(
            "relative mb-2.5 pb-[140%] w-full overflow-hidden rounded-md bg-mediaCard-hoverBackground bg-cover bg-center transition-[border-radius] duration-300",
            canLink && "group-hover:rounded-md",
          )}
          style={{
            backgroundImage: media.poster ? `url(${media.poster})` : undefined,
          }}
        >
          {series && (
            <div className="absolute right-2 top-2 rounded-md bg-mediaCard-badge px-1.5 py-0.5 transition-colors">
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

          {percentage !== undefined && (
            <>
              <div
                className={classNames(
                  "absolute inset-x-0 -bottom-px pb-1 h-8 bg-gradient-to-t from-mediaCard-shadow to-transparent transition-colors",
                  canLink && "group-hover:from-mediaCard-hoverShadow",
                )}
              />
              <div
                className={classNames(
                  "absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-mediaCard-shadow to-transparent transition-colors",
                  canLink && "group-hover:from-mediaCard-hoverShadow",
                )}
              />
              <div className="absolute inset-x-0 bottom-0 p-2">
                <div className="relative h-1 overflow-hidden rounded-full bg-mediaCard-barColor">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-mediaCard-barFillColor"
                    style={{ width: percentageString }}
                  />
                </div>
              </div>
            </>
          )}

          <div
            className={classNames("absolute", !isMobile && "bookmark-button")}
            onClick={(e) => e.preventDefault()}
          >
            <MediaBookmarkButton media={media} />
          </div>

          {searchQuery.length > 0 && (
            <div className="absolute" onClick={(e) => e.preventDefault()}>
              <MediaBookmarkButton media={media} />
            </div>
          )}

          {closable && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-mediaCard-badge bg-opacity-80 transition-opacity duration-500"
              onClick={() => onClose?.()}
            >
              <IconPatch
                clickable
                className="text-xl text-mediaCard-badgeText transition-transform hover:scale-105 duration-500"
                icon={Icons.X}
              />
            </div>
          )}
        </div>
        <div className="px-2">
          <h1 className="mb-1 text-base font-bold text-white line-clamp-2">
            {media.title}
          </h1>
          <p className="text-sm text-gray-400 flex items-center space-x-2">
            <span>{t(`media.types.${media.type}`)}</span>
            {media.year && (
              <span className="text-gray-500">• {media.year}</span>
            )}
          </p>
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

  if (!canLink) return <span>{content}</span>;

  return (
    <Link
      to={link}
      tabIndex={-1}
      className={classNames(
        "tabbable",
        props.closable && "hover:cursor-default",
      )}
    >
      {content}
    </Link>
  );
}
