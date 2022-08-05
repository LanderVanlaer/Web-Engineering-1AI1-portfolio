const welcomeMessage = document.getElementById('message');
const messages = ['Welcome!!!', 'This is my webpage.', 'Check out the project page!'];
const time = {
    typing: 125,
    maxVariation: 50,
    wait: 2000,
    delete: 50,
};
let activeMessageIndex = 0;
let messageCharIndex = 0;
let typing = true;
const getNextLetterSpeed = () => time.typing + Math.random() * time.maxVariation;
const nextLetter = () => {
    let wait = false;
    if (typing) {
        if (messageCharIndex <= messages[activeMessageIndex].length) {
            ++messageCharIndex;
        }
        else {
            typing = false;
            --messageCharIndex;
            wait = true;
        }
    }
    else {
        if (messageCharIndex >= 0) {
            --messageCharIndex;
        }
        else {
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
//# sourceMappingURL=index.js.map