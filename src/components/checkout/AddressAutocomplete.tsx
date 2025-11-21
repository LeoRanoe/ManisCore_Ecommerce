'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Loader2, Search } from 'lucide-react';
import { Input } from '../ui/Input';

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onAddressSelect?: (address: AddressComponents) => void;
  placeholder?: string;
  disabled?: boolean;
}

export interface AddressComponents {
  streetNumber?: string;
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  formattedAddress: string;
}

interface Suggestion {
  placeId: string;
  description: string;
  mainText: string;
  secondaryText: string;
}

export function AddressAutocomplete({
  value,
  onChange,
  onAddressSelect,
  placeholder = 'Enter your address',
  disabled = false,
}: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout>();

  // Mock suggestions - Replace with actual Google Places API integration
  const mockSuggestions: Suggestion[] = [
    {
      placeId: '1',
      description: 'Kerkstraat 123, Paramaribo, Suriname',
      mainText: 'Kerkstraat 123',
      secondaryText: 'Paramaribo, Suriname',
    },
    {
      placeId: '2',
      description: 'Henck Arronstraat 45, Paramaribo, Suriname',
      mainText: 'Henck Arronstraat 45',
      secondaryText: 'Paramaribo, Suriname',
    },
    {
      placeId: '3',
      description: 'Waterkant 78, Paramaribo, Suriname',
      mainText: 'Waterkant 78',
      secondaryText: 'Paramaribo, Suriname',
    },
  ];

  // Fetch suggestions (mock implementation)
  const fetchSuggestions = async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Replace with actual Google Places API call
      // const response = await fetch(`/api/places/autocomplete?input=${encodeURIComponent(query)}`);
      // const data = await response.json();
      
      // Mock delay to simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      // Filter mock suggestions based on query
      const filtered = mockSuggestions.filter(
        (s) => s.description.toLowerCase().includes(query.toLowerCase())
      );
      
      setSuggestions(filtered);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error fetching address suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input change with debounce
  const handleInputChange = (newValue: string) => {
    onChange(newValue);
    setSelectedIndex(-1);

    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set new timer
    debounceTimer.current = setTimeout(() => {
      fetchSuggestions(newValue);
    }, 300);
  };

  // Handle suggestion selection
  const handleSelectSuggestion = async (suggestion: Suggestion) => {
    onChange(suggestion.description);
    setShowSuggestions(false);
    setSuggestions([]);

    // TODO: Fetch full address details from Google Places API
    // const response = await fetch(`/api/places/details?placeId=${suggestion.placeId}`);
    // const details = await response.json();
    
    // Mock address components
    const addressComponents: AddressComponents = {
      streetNumber: '123',
      street: 'Kerkstraat',
      city: 'Paramaribo',
      state: 'Paramaribo District',
      postalCode: '0000',
      country: 'Suriname',
      formattedAddress: suggestion.description,
    };

    onAddressSelect?.(addressComponents);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSelectSuggestion(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        break;
    }
  };

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative">
      {/* Input */}
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) setShowSuggestions(true);
          }}
          placeholder={placeholder}
          disabled={disabled}
          className="pr-10"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          ) : (
            <Search className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
      </div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            ref={suggestionsRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-1 bg-popover border rounded-lg shadow-lg overflow-hidden"
          >
            {suggestions.map((suggestion, index) => (
              <button
                key={suggestion.placeId}
                type="button"
                onClick={() => handleSelectSuggestion(suggestion)}
                className={`w-full flex items-start gap-3 p-3 text-left hover:bg-muted transition-colors ${
                  index === selectedIndex ? 'bg-muted' : ''
                }`}
              >
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">
                    {suggestion.mainText}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {suggestion.secondaryText}
                  </p>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Helper Text */}
      <p className="mt-1 text-xs text-muted-foreground">
        Start typing to see address suggestions
      </p>
    </div>
  );
}
