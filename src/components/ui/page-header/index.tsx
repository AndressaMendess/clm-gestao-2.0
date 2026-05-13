import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ButtonVariant } from "@/components/ui/button";

type PageHeaderProps = {
  ctaOnClick?: () => void;
  ctaLabel?: string;
  ctaVariant?: Exclude<ButtonVariant, "icon">;
  subtitle: string;
  title: string;
};

export function PageHeader({ ctaLabel, ctaOnClick, ctaVariant = "primary", subtitle, title }: PageHeaderProps) {
  return (
    <header className="flex flex-col items-start gap-4 pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col items-start gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-2">
        <h1 className="[font-size:var(--typography-body-x-large-semibold-font-size)] [font-weight:var(--typography-body-x-large-semibold-font-weight)] [line-height:var(--typography-body-x-large-semibold-line-height)] [letter-spacing:var(--typography-body-x-large-semibold-letter-spacing)] text-[var(--content-primary)]">
          {title}
        </h1>
        <p className="[font-size:var(--typography-body-x-large-regular-font-size)] [font-weight:var(--typography-body-x-large-regular-font-weight)] [line-height:var(--typography-body-x-large-regular-line-height)] [letter-spacing:var(--typography-body-x-large-regular-letter-spacing)] text-[var(--content-secondary)]">
          - {subtitle}
        </p>
      </div>

      {ctaLabel ? (
        <Button className="justify-center sm:w-auto" icon={Plus} onClick={ctaOnClick} variant={ctaVariant}>
          {ctaLabel}
        </Button>
      ) : null}
    </header>
  );
}

export type { PageHeaderProps };
