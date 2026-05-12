export type AvatarVariant = "with-image" | "without-image";

export type AvatarProps = {
  alt?: string;
  className?: string;
  initials?: string;
  name?: string;
  size?: "sm" | "md" | "lg";
  src?: string;
  variant?: AvatarVariant;
};
