$(() => {
  const redMessage: JQuery<HTMLSpanElement> = $('body > div > main > aside > span');
  const fontSize: string = redMessage.css('font-size');

  redMessage
    .animate({ fontSize: `${parseFloat(fontSize) * 1.3}px` }, 5000)
    .animate({ fontSize }, 5000);

  for (let i = 2; i <= 5; ++i) {
    $(`#poster > div:nth-child(${i})`).fadeIn(i * 1750);
  }
});
