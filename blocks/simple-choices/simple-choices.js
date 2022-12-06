export default function decorate(block) {
  console.log(block);
  block.querySelectorAll(':scope div div').forEach((child) => {
    console.log(child);
  });
}
