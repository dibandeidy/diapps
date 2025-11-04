import React, { useState, useCallback, useEffect } from 'react';
import type { Product, Item, Feedback } from './types';
import { PRODUCTS, ITEMS, ITEM_LABELS } from './types';
import { PRICE_DATA } from './constants';

const LOGO_BASE64 = 'data:image/png;base64,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';

interface ThemeToggleProps {
  isDarkMode: boolean;
  onClick: () => void;
}

const ThemeToggleButton: React.FC<ThemeToggleProps> = ({ isDarkMode, onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-4 right-4 p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
    aria-label="Alternar tema"
  >
    {isDarkMode ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    )}
  </button>
);


interface SummaryCardProps {
  product: Product | null;
  items: Item[];
}

const SummaryCard: React.FC<SummaryCardProps> = ({ product, items }) => {
  const itemNames = items.map(item => ITEM_LABELS[item]).join(', ');

  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-lg p-4 shadow-inner text-text-dark-secondary dark:text-gray-400">
      <h2 className="text-lg font-bold text-text-dark-primary dark:text-white mb-2">Resumo</h2>
      <div className="flex justify-between items-center text-sm">
        <span className="font-semibold">Produto:</span>
        <span className="text-gray-600 dark:text-gray-300">{product || 'N/A'}</span>
      </div>
      <div className="flex justify-between items-start text-sm mt-1">
        <span className="font-semibold">Itens:</span>
        <span className="text-right text-gray-600 dark:text-gray-300">
          {items.length > 0 ? itemNames : 'Nenhum'}
        </span>
      </div>
    </div>
  );
};

interface ProductSelectorProps {
  selectedProduct: Product | null;
  onChange: (product: Product) => void;
}

const ProductSelector: React.FC<ProductSelectorProps> = ({ selectedProduct, onChange }) => (
  <fieldset>
    <legend className="text-lg font-semibold mb-4 text-text-dark-primary dark:text-white">Selecione o Produto</legend>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {PRODUCTS.map((product) => (
        <div key={product} className={product === '27' ? 'col-span-2 sm:col-span-1' : ''}>
          <input
            className="hidden peer"
            id={`prod-${product}`}
            name="product"
            type="radio"
            value={product}
            checked={selectedProduct === product}
            onChange={() => onChange(product)}
          />
          <label
            htmlFor={`prod-${product}`}
            className="flex items-center justify-center w-full p-3 text-gray-500 bg-gray-100 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-200 peer-checked:bg-primary peer-checked:text-white peer-checked:font-semibold dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600 peer-checked:dark:bg-primary transition-colors duration-200"
          >
            <span className="text-base">{product}</span>
          </label>
        </div>
      ))}
    </div>
  </fieldset>
);

interface ItemSelectorProps {
  selectedItems: Item[];
  onChange: (item: Item, isChecked: boolean) => void;
}

const ItemSelector: React.FC<ItemSelectorProps> = ({ selectedItems, onChange }) => (
  <fieldset>
    <legend className="text-lg font-semibold mb-4 text-text-dark-primary dark:text-white">Adicione Itens</legend>
    <div className="grid grid-cols-2 gap-x-6 gap-y-3">
      {ITEMS.map((item) => (
        <label key={item} className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 cursor-pointer">
          <input
            className="form-checkbox h-5 w-5 rounded text-primary focus:ring-primary focus:ring-offset-card-light dark:focus:ring-offset-background-dark border-gray-300 dark:border-gray-500 bg-transparent dark:bg-gray-700 dark:checked:bg-primary dark:checked:border-transparent"
            id={`item-${item}`}
            name="items"
            type="checkbox"
            value={item}
            checked={selectedItems.includes(item)}
            onChange={(e) => onChange(item, e.target.checked)}
          />
          <span>{ITEM_LABELS[item]}</span>
        </label>
      ))}
    </div>
  </fieldset>
);

interface ActionButtonsProps {
  onCalculate: () => void;
  onClear: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onCalculate, onClear }) => (
  <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
     <button
      type="button"
      onClick={onCalculate}
      className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card-light dark:focus:ring-offset-background-dark"
    >
      Calcular
    </button>
    <button
      type="button"
      onClick={onClear}
      className="w-full bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-card-light dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 dark:focus:ring-offset-background-dark"
    >
      Limpar
    </button>
  </div>
);

interface FeedbackMessageProps {
    feedback: Feedback;
}

const FeedbackMessage: React.FC<FeedbackMessageProps> = ({ feedback }) => {
    if (!feedback) return null;

    const baseClasses = "text-white p-4 mt-4 rounded-lg text-center font-semibold text-lg";
    const colorClasses = feedback.type === 'success'
        ? "bg-green-500"
        : "bg-red-500";
    
    return (
        <div className={`${baseClasses} ${colorClasses}`}>
            {feedback.message}
        </div>
    );
};


const Logo: React.FC<{isDarkMode: boolean}> = ({ isDarkMode }) => (
    <div className="flex justify-center">
        <img src={LOGO_BASE64} alt="Embalare Logo" className={`h-12 transition-all ${!isDarkMode ? 'invert' : ''}`}/>
    </div>
);


export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  const handleProductChange = useCallback((product: Product) => {
    setSelectedProduct(product);
    setFeedback(null);
  }, []);

  const handleItemChange = useCallback((item: Item, isChecked: boolean) => {
    setSelectedItems(prevItems => {
        const newItems = isChecked
            ? [...prevItems, item]
            : prevItems.filter(i => i !== item);
        return newItems;
    });
    setFeedback(null);
  }, []);

  const handleClear = useCallback(() => {
    setSelectedProduct(null);
    setSelectedItems([]);
    setFeedback(null);
  }, []);

  const handleCalculate = useCallback(() => {
    if (!selectedProduct) {
      setFeedback({ type: 'error', message: 'Por favor, selecione um produto.' });
      return;
    }
    if (selectedItems.length === 0) {
      setFeedback({ type: 'error', message: 'Por favor, selecione pelo menos um item.' });
      return;
    }

    const totalSum = selectedItems.reduce((sum, item) => {
      return sum + (PRICE_DATA[selectedProduct]?.[item] ?? 0);
    }, 0);

    console.log(`Custo Total Calculado: ${totalSum.toFixed(2)}`);
    
    const formattedTotal = `R$ ${totalSum.toFixed(2).replace('.', ',')}`;
    setFeedback({ type: 'success', message: `Custo Total: ${formattedTotal}` });

  }, [selectedProduct, selectedItems]);

  return (
    <div className="flex flex-col h-screen p-4 bg-background-dark dark:bg-gray-900 transition-colors duration-300">
      <div className="flex-grow flex items-center justify-center">
        <main className="w-full max-w-md mx-auto">
          <div className="relative bg-card-light dark:bg-background-dark text-text-dark-primary dark:text-gray-200 rounded-xl shadow-lg p-6 space-y-4 transition-colors duration-300">
            <ThemeToggleButton isDarkMode={isDarkMode} onClick={toggleTheme} />
            <SummaryCard product={selectedProduct} items={selectedItems} />
            <form noValidate>
                <div className="space-y-4">
                    <ProductSelector selectedProduct={selectedProduct} onChange={handleProductChange} />
                    <ItemSelector selectedItems={selectedItems} onChange={handleItemChange} />
                    <ActionButtons onCalculate={handleCalculate} onClear={handleClear} />
                </div>
            </form>
             <FeedbackMessage feedback={feedback} />
          </div>
        </main>
      </div>
      <footer className="w-full py-4">
        <Logo isDarkMode={isDarkMode} />
      </footer>
    </div>
  );
}