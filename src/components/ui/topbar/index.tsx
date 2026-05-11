import { Menu } from "lucide-react";
import Image from "next/image";
import {
  topbarMenuButtonStyles,
  topbarMobileGroupStyles,
  topbarQuoteStyles,
  topbarRootStyles,
} from "./topbar.styles";
import type { TopbarProps } from "./topbar.types";

export function Topbar({ onMenuClick, showMenuButton = true }: TopbarProps) {
  return (
    <header className={topbarRootStyles}>
      <p className={topbarQuoteStyles}>
        A musica e a linguagem universal da humanidade. - Henry Wadsworth Longfellow.
      </p>

      <div className={topbarMobileGroupStyles}>
        {showMenuButton ? (
          <button
            aria-label="Abrir menu"
            className={topbarMenuButtonStyles}
            onClick={onMenuClick}
            type="button"
          >
            <Menu className="h-5 w-5" />
          </button>
        ) : (
          <span />
        )}

        <Image alt="CLM Gestao" className="h-8 w-auto object-contain" height={33} src="/images/clm-logo.svg" width={110} />
      </div>
    </header>
  );
}

export type { TopbarProps } from "./topbar.types";