export type AnyObject = Record<PropertyKey, any>;

export type LiteralUnion<T extends string> = T | (string & {});

export type RenderFunction = () => React.ReactNode;

export interface AdjustOverflow {
  adjustX?: 0 | 1;
  adjustY?: 0 | 1;
}
