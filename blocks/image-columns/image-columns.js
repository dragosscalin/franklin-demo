export default function decorate(block) {
    const cols = [...block.firstElementChild.children];
    block.classList.add(`columns-${cols.length}-cols`);
    const rows = Array.from(block.children);
    rows.forEach((row) => {
        const columns = Array.from(row.children);
        columns[0].classList.add('check-image');
        console.log(columns[0]);
    })
}
