// RTL utility functions for handling right-to-left layouts

export const rtlUtils = {
  // Get appropriate margin/padding classes based on RTL direction
  getMargin: (direction: 'left' | 'right', size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeMap = {
      sm: '2',
      md: '4', 
      lg: '6'
    };
    
    return direction === 'left' 
      ? `ml-${sizeMap[size]} rtl:mr-${sizeMap[size]} rtl:ml-0`
      : `mr-${sizeMap[size]} rtl:ml-${sizeMap[size]} rtl:mr-0`;
  },

  // Get appropriate text alignment
  getTextAlign: (align: 'left' | 'right' | 'center' = 'left') => {
    const alignMap = {
      left: 'text-left rtl:text-right',
      right: 'text-right rtl:text-left', 
      center: 'text-center'
    };
    
    return alignMap[align];
  },

  // Get appropriate flex direction
  getFlexDirection: (direction: 'row' | 'row-reverse' = 'row') => {
    return direction === 'row' 
      ? 'flex-row rtl:flex-row-reverse'
      : 'flex-row-reverse rtl:flex-row';
  },

  // Get appropriate border radius for RTL
  getBorderRadius: (position: 'left' | 'right' | 'both' = 'both') => {
    const radiusMap = {
      left: 'rounded-l-md rtl:rounded-r-md rtl:rounded-l-none',
      right: 'rounded-r-md rtl:rounded-l-md rtl:rounded-r-none',
      both: 'rounded-md'
    };
    
    return radiusMap[position];
  },

  // Check if current direction is RTL
  isRTL: () => {
    if (typeof document !== 'undefined') {
      return document.documentElement.dir === 'rtl';
    }
    return false;
  },

  // Get appropriate icon direction
  getIconDirection: (baseDirection: 'left' | 'right' = 'left') => {
    return baseDirection === 'left' 
      ? 'rtl:rotate-180'
      : 'rtl:rotate-180';
  }
};

// RTL-aware class names for common patterns
export const rtlClasses = {
  // Margins
  marginLeft: 'ml-4 rtl:mr-4 rtl:ml-0',
  marginRight: 'mr-4 rtl:ml-4 rtl:mr-0',
  
  // Padding
  paddingLeft: 'pl-4 rtl:pr-4 rtl:pl-0',
  paddingRight: 'pr-4 rtl:pl-4 rtl:pr-0',
  
  // Text alignment
  textLeft: 'text-left rtl:text-right',
  textRight: 'text-right rtl:text-left',
  
  // Flexbox
  flexRow: 'flex-row rtl:flex-row-reverse',
  flexRowReverse: 'flex-row-reverse rtl:flex-row',
  
  // Borders
  borderLeft: 'border-l rtl:border-r rtl:border-l-0',
  borderRight: 'border-r rtl:border-l rtl:border-r-0',
  
  // Border radius
  roundedLeft: 'rounded-l-md rtl:rounded-r-md rtl:rounded-l-none',
  roundedRight: 'rounded-r-md rtl:rounded-l-md rtl:rounded-r-none',
  
  // Positioning
  left: 'left-0 rtl:right-0 rtl:left-auto',
  right: 'right-0 rtl:left-0 rtl:right-auto',
  
  // Transform
  translateX: 'translate-x-0 rtl:-translate-x-0',
  scaleX: 'scale-x-100 rtl:scale-x-[-1]'
};
