function hideChildren() {
  const blockDom = document.querySelectorAll('.block');
  blockDom.forEach((block) => {
    const itemId = block.getAttribute('id');
    const itemIcon = `${itemId}-icon`;
    const itemChildId = `${itemId}-child`;

    const itemDom = document.getElementById(itemId);
    const itemIconDom = document.getElementById(itemIcon);
    const itemChildDom = document.getElementById(itemChildId);

    itemChildDom.style.display = 'none';
    itemIconDom.style.visibility = 'hidden';
  });
}

const blockDom = document.querySelectorAll('.block');
blockDom.forEach((block) => {
  block.addEventListener('mouseover', (e) => {
    e.stopPropagation();
    hideChildren();
    const itemId = block.getAttribute('id');
    const itemIcon = `${itemId}-icon`;
    const itemChildId = `${itemId}-child`;

    const itemDom = document.getElementById(itemId);
    const itemChildDom = document.getElementById(itemChildId);
    const itemIconDom = document.getElementById(itemIcon);
    const { height } = itemDom.getBoundingClientRect();

    itemIconDom.style.visibility = 'visible';
    itemChildDom.style.top = `${height + 4}px`;
    itemChildDom.style.display = 'block';
  });
});


const containerDom = document.querySelector('.container');
containerDom.addEventListener('click', (e) => {
  hideChildren();
});
