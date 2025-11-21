'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Ruler } from 'lucide-react';

interface SizeGuideProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

export function SizeGuide({ isOpen, onClose, category = 'general' }: SizeGuideProps) {
  // Sample size data - would come from API in production
  const sizeData = {
    clothing: {
      title: 'Clothing Size Guide',
      units: 'Measurements in inches',
      headers: ['Size', 'Chest', 'Waist', 'Hips', 'Length'],
      rows: [
        ['XS', '32-34', '24-26', '34-36', '26'],
        ['S', '34-36', '26-28', '36-38', '27'],
        ['M', '38-40', '30-32', '40-42', '28'],
        ['L', '42-44', '34-36', '44-46', '29'],
        ['XL', '46-48', '38-40', '48-50', '30'],
        ['2XL', '50-52', '42-44', '52-54', '31'],
      ],
    },
    shoes: {
      title: 'Shoe Size Guide',
      units: 'US Sizes',
      headers: ['US', 'UK', 'EU', 'CM'],
      rows: [
        ['6', '5.5', '39', '24'],
        ['7', '6.5', '40', '25'],
        ['8', '7.5', '41', '26'],
        ['9', '8.5', '42', '27'],
        ['10', '9.5', '43', '28'],
        ['11', '10.5', '44', '29'],
        ['12', '11.5', '45', '30'],
      ],
    },
    general: {
      title: 'Size Guide',
      units: 'Standard Measurements',
      headers: ['Size', 'Description'],
      rows: [
        ['S', 'Small - Best for petite builds'],
        ['M', 'Medium - Standard fit for most'],
        ['L', 'Large - Comfortable fit for bigger builds'],
        ['XL', 'Extra Large - Generous fit'],
      ],
    },
  };

  const data = sizeData[category as keyof typeof sizeData] || sizeData.general;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-lift-lg max-w-3xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Ruler className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{data.title}</h2>
                  <p className="text-sm text-muted-foreground">{data.units}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="Close size guide"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-auto max-h-[calc(90vh-8rem)]">
              {/* Size Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      {data.headers.map((header, index) => (
                        <th
                          key={index}
                          className="px-4 py-3 text-left text-sm font-semibold text-foreground"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {data.rows.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className={`px-4 py-3 text-sm ${
                              cellIndex === 0
                                ? 'font-semibold text-foreground'
                                : 'text-muted-foreground'
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Helpful Tips */}
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Measuring Tips
                </h3>
                <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400">•</span>
                    <span>Use a soft measuring tape for accurate measurements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400">•</span>
                    <span>Measure over light clothing for best results</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400">•</span>
                    <span>If between sizes, we recommend sizing up for comfort</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400">•</span>
                    <span>Contact us if you need help choosing the right size</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
