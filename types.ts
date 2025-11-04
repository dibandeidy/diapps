export const PRODUCTS = ['11', '15', '19', '23', '27'] as const;
export const ITEMS = ['base', 'prato', 'disco', 'papelao', 'alca', 'impressao'] as const;

export const ITEM_LABELS: Record<Item, string> = {
  base: 'Base',
  prato: 'Prato',
  disco: 'Disco',
  papelao: 'Papelão',
  alca: 'Alça',
  impressao: 'Impressão',
};

export type Product = typeof PRODUCTS[number];
export type Item = typeof ITEMS[number];

export type PriceData = Record<Product, Record<Item, number>>;

export type Feedback = {
  type: 'success' | 'error';
  message: string;
} | null;
