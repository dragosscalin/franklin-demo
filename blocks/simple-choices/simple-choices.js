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

  return false;
};

export default function decorate(block) {
  block.querySelectorAll(':scope div a').forEach((child) => {
    child.href = '#';
    child.addEventListener('click', () => recordOption(child.text));
  });
}
