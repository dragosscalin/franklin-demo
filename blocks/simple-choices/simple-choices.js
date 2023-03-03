const recordOption = (text) => {
  const payload = {
    data: {
      timestamp: new Date(),
      context: new URL(window.location.href).searchParams.get('context'),
      feature: document.querySelector('meta[name="feature"]').content,
      feedback: text,
    },
  };

  fetch('/feedback-form', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  window.parent.postMessage(payload, '*');

  return false;
};

export default function decorate(block) {
  block.querySelectorAll(':scope div a').forEach((child) => {
    child.href = '#';
    child.addEventListener('click', () => {
      let hiddenDivs = document.getElementsByClassName("hidden");
      if (hiddenDivs.length > 0) {
        hiddenDivs[0].style.display = 'block';
      }
      recordOption(child.text);
    });
  });
}
