export type Size = 'tiny' | 'small' | 'medium' | 'large';

export type OnUpdateValue = (value: string & [string, string], meta: { source: 0 | 1 | 'clear' }) => void;
export type OnUpdateValueImpl = (value: string | [string, string], meta: { source: 0 | 1 | 'clear' }) => void;
