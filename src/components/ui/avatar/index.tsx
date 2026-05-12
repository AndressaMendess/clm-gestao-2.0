import Image from "next/image";
import { cx } from "@/lib/cx";
import { getAvatarImageStyles, getAvatarInitialsStyles, getAvatarStyles } from "./avatar.styles";
import type { AvatarProps } from "./avatar.types";

function getInitialsFromName(name?: string): string {
  if (!name) return "";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

export function Avatar({
  alt,
  className,
  initials,
  name,
  size = "md",
  src,
  variant = "without-image",
}: AvatarProps) {
  const fallbackInitials = (initials?.trim() || getInitialsFromName(name) || "?").slice(0, 2);
  const shouldRenderImage = variant === "with-image" && Boolean(src);

  return (
    <span aria-label={alt ?? name ?? "Avatar"} className={cx(getAvatarStyles(size), className)} role="img">
      {shouldRenderImage ? (
        <Image
          alt={alt ?? name ?? "Foto do usuário"}
          className={getAvatarImageStyles(size)}
          height={size === "sm" ? 32 : size === "md" ? 40 : 48}
          src={src!}
          width={size === "sm" ? 32 : size === "md" ? 40 : 48}
        />
      ) : (
        <span aria-hidden className={getAvatarInitialsStyles(size)}>
          {fallbackInitials}
        </span>
      )}
    </span>
  );
}

export type { AvatarProps, AvatarVariant } from "./avatar.types";
