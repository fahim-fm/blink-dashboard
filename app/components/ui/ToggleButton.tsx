'use client';

import { useState } from 'react';
import { cn } from '../../utils/cn';

export const ToggleButton: React.FC = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <button
      type="button"
      aria-label="Toggle"
      onClick={() => setEnabled(!enabled)}
      className={cn(
        'relative flex items-center w-[32px] h-[19px]  rounded-full px-[1px] transition-colors duration-300 bg-border',
        
      )}
    >
      <span
        className={cn(
          'absolute top-1/2 -translate-y-1/2 h-[16px] w-[16px] rounded-full transition-transform duration-300',
          enabled
            ? 'translate-x-[14px] bg-green'
            : 'translate-x-0 bg-white border '
        )}
      />
    </button>
  );
};
