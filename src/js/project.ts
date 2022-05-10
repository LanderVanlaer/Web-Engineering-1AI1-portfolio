$(() => {
  const redMessage: JQuery<HTMLSpanElement> = $('body > div > main > aside > span');
  const fontSize: string = redMessage.css('font-size');

  redMessage
    .animate({ fontSize: `${parseFloat(fontSize) * 1.3}px` }, 5000)
    .animate({ fontSize }, 5000);

  for (let i = 2; i <= 5; ++i) {
    $(`#poster > div:nth-child(${i})`).fadeIn(i * 1750);
  }

  const slideShow: { images: NodeListOf<HTMLImageElement>; index: number; nextImage: () => void, speed: number, className: string } = {
    index: 0,
    speed: 5000,
    className: 'visible',
    images: document.querySelectorAll<HTMLImageElement>('#slideshow > img'),
    nextImage: () => {
      slideShow.images.forEach((img, i) =>
        img.classList[i === slideShow.index ? 'add' : 'remove'](slideShow.className)
      );

      slideShow.index = (slideShow.index + 1) % slideShow.images.length;

      setTimeout(slideShow.nextImage, slideShow.speed);
    }
  };

  slideShow.nextImage();
});
