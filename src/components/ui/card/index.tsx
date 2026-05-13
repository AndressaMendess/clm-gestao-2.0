import { cx } from "@/lib/cx";
import {
  cardFieldsGridStyles,
  cardFieldsGridTwoColumnsStyles,
  cardLabelStyles,
  cardRootStyles,
  cardTitleStyles,
  cardValueStyles,
} from "./card.styles";
import type { CardProps } from "./card.types";

export function Card({ className, columns = 1, fields, title }: CardProps) {
  return (
    <article className={cx(cardRootStyles, className)}>
      {title ? <h3 className={cardTitleStyles}>{title}</h3> : null}

      <div className={cx(cardFieldsGridStyles, columns === 2 && cardFieldsGridTwoColumnsStyles)}>
        {fields.map((field) => (
          <div key={field.id}>
            <p className={cardLabelStyles}>{field.label}</p>
            {field.value !== undefined ? <div className={cardValueStyles}>{field.value}</div> : null}
          </div>
        ))}
      </div>
    </article>
  );
}

export type { CardField, CardProps } from "./card.types";
