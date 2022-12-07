const recordOption = (text) => {
  console.log(text);
  return false;
};

export default function decorate(block) {
  block.querySelectorAll(':scope div a').forEach((child) => {
    child.href = '#';
    child.addEventListener('click',() => recordOption(child.text));
  });
}
