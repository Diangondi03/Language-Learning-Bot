export const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new window.SpeechSynthesisUtterance(text);
      utterance.pitch = 1.75
      window.speechSynthesis.speak(utterance);
    }
};