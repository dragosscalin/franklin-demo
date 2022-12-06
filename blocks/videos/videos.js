export default function decorate(block) {
    const cols = [...block.firstElementChild.children];
    const rows = Array.from(block.children);
    let numberOfColumns = 0;
    if (rows[0]) {
      numberOfColumns = rows[0].children.length;
    }
    if (numberOfColumns > 0) {
      block.classList.add(`col-${numberOfColumns}-columns`);
    }
  
    rows.forEach((row) => {
      row.classList.add('columns-row');
      const columns = Array.from(row.children);
      columns.forEach((column) => {
        column.classList.add('column');
        const a = column.querySelector('a');
        if ((a && a.href.endsWith('.mp4'))) {
          transformLinkToAnimation(a);
        } 
      });
    });
  
  }

export function transformLinkToAnimation(animation) {
    if (!animation || !animation.href.includes('.mp4')) {
      return null;
    }
    const params = new URL(animation.href).searchParams;
    const attribs = {};
    ['playsinline', 'loop', 'muted', 'controls'].forEach((p) => {
      if (params.get(p) !== 'false') attribs[p] = '';
    });
    // use closest picture as poster
    const $poster = animation.closest('div').querySelector('picture source');
    if ($poster) {
      attribs.poster = $poster.srcset;
      $poster.parentNode.remove();
    }
    // replace anchor with video element
    const videoUrl = new URL(animation.href);
    const helixId = videoUrl.hostname.includes('hlx.blob.core') ? videoUrl.pathname.split('/')[2] : videoUrl.pathname.split('media_')[1].split('.')[0];
    const videoHref = `./media_${helixId}.mp4`;
    const demoVideo = createTag('video', attribs);
    demoVideo.innerHTML = `<source src="${videoHref}" type="video/mp4">`;
    const $innerDiv = animation.closest('div');
    $innerDiv.prepend(demoVideo);
    $innerDiv.classList.add('hero-animation-overlay');
    animation.replaceWith(demoVideo);
    // autoplay animation
    demoVideo.addEventListener('canplay', () => {
      demoVideo.muted = true;
      demoVideo.play();
    });
    return demoVideo;
}
  
export function createTag(name, attrs) {
    const el = document.createElement(name);
    if (typeof attrs === 'object') {
        for (const [key, value] of Object.entries(attrs)) {
        el.setAttribute(key, value);
        }
    }
    return el;
}