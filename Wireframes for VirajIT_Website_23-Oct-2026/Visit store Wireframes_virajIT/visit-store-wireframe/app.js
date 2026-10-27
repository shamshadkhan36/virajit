const STORE_ADDRESS = 'Viraj Infotech, Shop no 31, Ground Floor, Shanti lal, Shreeji Darshan Building, Shantilal Modi Road, Near Bata Showroom, Kandivali, Bhagat Colony, Kandivali West, Mumbai, Maharashtra 400067.';

const copyButton = document.getElementById('copy-address');
const copyStatus = document.querySelector('.copy-status');
copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(STORE_ADDRESS);
    copyStatus.textContent = 'Store address copied.';
  } catch (error) {
    copyStatus.textContent = 'Copy is unavailable in this preview. Please select the address text above.';
  }
});

document.querySelectorAll('.mobile-menu nav a').forEach((link) => {
  link.addEventListener('click', () => {
    const menu = link.closest('details');
    if (menu) menu.open = false;
  });
});