import { useState } from 'react';

export function useInputChange() {
  const [isTyping, setIsTyping] = useState(false);

  const handleInputChange = (e) => {
    // Change the state if the input has any value
    if (e.target.value) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  };

  return { isTyping, handleInputChange };
}