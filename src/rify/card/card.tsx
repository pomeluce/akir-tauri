import { HTMLAttributes } from 'react';

type CardAttributes = Omit<HTMLAttributes<HTMLElement>, 'title'>;

export interface CardProps extends CardAttributes {
  bgColor?: string;
  children?: React.ReactNode;
  isHoverShadow?: boolean;
  title?: React.ReactNode;
  foot?: React.ReactNode;
}

const card: React.FC<CardProps> = (props: CardProps) => {
  const { bgColor, className = '', children, isHoverShadow, title, foot, ...attributes } = props;
  const classes: string = !!(children || title || foot) ? `rify-card-default ${isHoverShadow ? `rify-card--hover_shadow ${className}` : className}` : className;

  return (
    <section style={{ backgroundColor: bgColor ?? 'white' }} className={`rify-card ${classes}`.trimEnd()} {...attributes}>
      {title && <h1 className={'rify-card--title'}>{title}</h1>}
      {children && <div className={'rify-card--content'}>{children}</div>}
      {foot && <footer className={'rify-card--footer'}>{foot}</footer>}
    </section>
  );
};

if (import.meta.env.MODE !== 'pro') card.displayName = 'rify-card';

export default card;
