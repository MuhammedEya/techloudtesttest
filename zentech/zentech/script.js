const bubbles = 400;
  const body = document.querySelector("body");
  const blackText = document.querySelector(".black-text");
  
  function updateBubbleColors() {
    const blackTextRect = blackText.getBoundingClientRect();
    const blackTextCenter = {
      x: blackTextRect.left + blackTextRect.width / 2,
      y: blackTextRect.top + blackTextRect.height / 2,
    };
  
    for (let i = 0; i < bubbles; i++) {
      const bubble = document.querySelector(`.bubble-${i}`);
      const bubbleRect = bubble.getBoundingClientRect();
      const bubbleCenter = {
        x: bubbleRect.left + bubbleRect.width / 2,
        y: bubbleRect.top + bubbleRect.height / 2,
      };
  
      if (
        bubbleRect.left < blackTextRect.right &&
        bubbleRect.right > blackTextRect.left &&
        bubbleRect.top < blackTextRect.bottom &&
        bubbleRect.bottom > blackTextRect.top
      ) {
        bubble.classList.add("bg-white");
        bubble.classList.remove("bg-gray-300");
  
        if (
          bubbleCenter.x > blackTextRect.left &&
          bubbleCenter.x < blackTextRect.right &&
          bubbleCenter.y > blackTextRect.top &&
          bubbleCenter.y < blackTextRect.bottom
        ) {
          blackText.style.color = "white";
        }
      } else {
        bubble.classList.add("bg-gray-300");
        bubble.classList.remove("bg-white");
        blackText.style.color = "black";
      }
    }
  
    window.requestAnimationFrame(updateBubbleColors);
  }
  
  for (let i = 0; i < bubbles; i++) {
    const bubble = document.createElement("div");
    bubble.classList.add(`bubble-${i}`);
    bubble.classList.add("bubble");
    bubble.style.left = `${Math.floor(Math.random() * 100)}%`;
    bubble.style.top = `${Math.floor(Math.random() * 100)}%`;
    bubble.style.animationName = `move-${i}`;
    bubble.style.animationDuration = `${Math.floor(Math.random() * 20) + 10}s`;
    bubble.style.animationTimingFunction = `linear`;
    bubble.style.animationIterationCount = "infinite";
    const keyframes = `@keyframes move-${i} {
      0% {
        transform: translate(0, 0);
      }
      100% {
        transform: translate(${Math.floor(Math.random() * 500 - 250)}px, ${Math.floor(Math.random() * 500 - 250)}px);
      }
    }`;
    const style = document.createElement("style");
    style.innerHTML = keyframes;
    document.head.appendChild(style);
    body.appendChild(bubble);
  }
  const titles = ["אתרים", "דפי נחיתה", "אפליקציות", "מערכות תוכנה"];
  let i = 0;
  let j = 0;
  let title = titles[i];
  let isDeleting = false;
  let isPaused = false;
  
  function typing() {
      if (!isPaused) {
          if (j === title.length - 1) {
              isDeleting = true;
              isPaused = true;
              setTimeout(() => {
                  isPaused = false;
              }, 2000);
          } else if (j === 0) {
              isDeleting = false;
          }
  
          if (isDeleting) {
              document.querySelector(".typing-animation").innerHTML = title.substring(0, j);
              j--;
          } else {
              document.querySelector(".typing-animation").innerHTML = title.substring(0, j+1);
              j++;
          }
  
          if (j === 0 && isDeleting) {
              i++;
              title = titles[i % titles.length];
              isDeleting = false;
          }
      } else {
          document.querySelector(".typing-animation").innerHTML = title;
      }
  
      setTimeout(typing, 200);
  }

  const nav = document.getElementById('nav');
  const openBtn = document.getElementById('openBtn');
  const closeBtn = document.getElementById('closeBtn');
  const dropdown = document.querySelector('.absolute.inset-x-0.z-20.w-full.px-6.py-4.transition-all.duration-300.ease-in-out.bg-white.md\\:mt-0.md\\:p-0.md\\:top-0.md\\:relative.md\\:bg-transparent.md\\:w-auto.md\\:opacity-100.md\\:translate-x-0.md\\:flex.md\\:items-center');

  openBtn.addEventListener('click', () => {
    dropdown.classList.remove('opacity-0', '-translate-x-full');
    dropdown.classList.add('translate-x-0', 'opacity-100');
    openBtn.classList.add('hidden');
    closeBtn.classList.remove('hidden');
  });

  closeBtn.addEventListener('click', () => {
    dropdown.classList.remove('translate-x-0', 'opacity-100');
    dropdown.classList.add('opacity-0', '-translate-x-full');
    closeBtn.classList.add('hidden');
    openBtn.classList.remove('hidden');
  });

  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !dropdown.classList.contains('opacity-0')) {
      dropdown.classList.remove('translate-x-0', 'opacity-100');
      dropdown.classList.add('opacity-0', '-translate-x-full');
      closeBtn.classList.add('hidden');
      openBtn.classList.remove('hidden');
    }
  });

typing();


const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');

    menuToggle.addEventListener('click', () => {
      menu.classList.toggle('hidden');
     });


updateBubbleColors();