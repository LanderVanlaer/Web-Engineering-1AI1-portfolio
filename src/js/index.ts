const welcomeMessage: HTMLDivElement = document.getElementById('message') as HTMLDivElement;
const messages: string[] = ['Welcome!!!', 'This is my webpage.', 'Check out the project page!'];
const time: { wait: number; typing: number; maxVariation: number; delete: number } = {
  typing: 125,
  maxVariation: 50,
  wait: 2000,
  delete: 50,
};
let activeMessageIndex = 0;
let messageCharIndex = 0;
let typing = true;

const getNextLetterSpeed: () => number = () => time.typing + Math.random() * time.maxVariation;

const nextLetter: () => void = () => {
  let wait = false;

  if (typing) {
    if (messageCharIndex <= messages[activeMessageIndex].length) {
      ++messageCharIndex;
    } else {
      typing = false;
      --messageCharIndex;
      wait = true;
    }
  } else {
    if (messageCharIndex >= 0) {
      --messageCharIndex;
    } else {
      typing = true;
      messageCharIndex = 0;
      activeMessageIndex = (activeMessageIndex + 1) % messages.length;
      wait = true;
    }
  }

  welcomeMessage.textContent = messages[activeMessageIndex].substring(0, messageCharIndex);

  setTimeout(nextLetter, wait ? time.wait : (typing ? getNextLetterSpeed() : time.delete));
};

nextLetter();
