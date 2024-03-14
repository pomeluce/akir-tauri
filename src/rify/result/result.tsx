import { HTMLAttributes, ReactNode } from 'react';

export interface ResultProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  message?: string;
  children?: ReactNode;
  icon?: ReactNode;
  opreate?: ReactNode;
}

const result: React.FC<ResultProps> = (props: ResultProps) => {
  const { title, message, children, icon, opreate, className, ...attributes } = props;

  return (
    <main className={`rify-result ${className ?? ''}`.trim()} {...attributes}>
      <span className="rify-result-icon">{icon}</span>
      {title && <h1 className={'rify-result-title'}>{title}</h1>}
      {message && <span className={'rify-result-message'}>{message}</span>}
      {children && <section className={'rify-result-content'}>{children}</section>}
      {opreate && <section>{opreate}</section>}
    </main>
  );
};

if (import.meta.env.MODE !== 'pro') result.displayName = 'rify-result';

export default result;
