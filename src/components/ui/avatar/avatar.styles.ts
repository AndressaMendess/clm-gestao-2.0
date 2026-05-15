import type { AvatarProps } from "./avatar.types";

const avatarBaseStyles =
  "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--accent-purple-background)] text-[var(--accent-purple-content)]";

const avatarSizeStyles: Record<NonNullable<AvatarProps["size"]>, string> = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
  xl: "h-16 w-16",
};

const avatarInitialsStyles: Record<NonNullable<AvatarProps["size"]>, string> = {
  sm: "[font-size:var(--typography-body-small-medium-font-size)] [line-height:var(--typography-body-small-medium-line-height)] [font-weight:var(--typography-body-small-medium-font-weight)] [letter-spacing:var(--typography-body-small-medium-letter-spacing)]",
  md: "[font-size:var(--typography-body-large-medium-font-size)] [line-height:var(--typography-body-large-medium-line-height)] [font-weight:var(--typography-body-large-medium-font-weight)] [letter-spacing:var(--typography-body-large-medium-letter-spacing)]",
  lg: "[font-size:var(--typography-body-large-medium-font-size)] [line-height:var(--typography-body-large-medium-line-height)] [font-weight:var(--typography-body-large-medium-font-weight)] [letter-spacing:var(--typography-body-large-medium-letter-spacing)]",
  xl: "[font-size:var(--typography-body-large-semibold-font-size)] [line-height:var(--typography-body-large-semibold-line-height)] [font-weight:var(--typography-body-large-semibold-font-weight)] [letter-spacing:var(--typography-body-large-semibold-letter-spacing)]",
};

export function getAvatarStyles(size: NonNullable<AvatarProps["size"]> = "md"): string {
  return `${avatarBaseStyles} ${avatarSizeStyles[size]}`;
}

export function getAvatarInitialsStyles(
  size: NonNullable<AvatarProps["size"]> = "md",
): string {
  return avatarInitialsStyles[size];
}

export function getAvatarImageStyles(size: NonNullable<AvatarProps["size"]> = "md"): string {
  return `h-full w-full object-cover ${avatarSizeStyles[size]}`;
}
