const STORE_ADDRESS = 'Shop no 31, Ground Floor, Shreeji Darshan Building, Shantilal Modi Road, Near Bata Showroom, Kandivali, Bhagat Colony, Kandivali West, Mumbai, Maharashtra 400067.';

const copyButton = document.getElementById('copy-address');
const copyStatus = document.querySelector('.copy-status');

if (copyButton) {
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(STORE_ADDRESS);
      copyStatus.textContent = 'Store address copied to clipboard!';
      setTimeout(() => {
        if (copyStatus) copyStatus.textContent = '';
      }, 4000);
    } catch (error) {
      copyStatus.textContent = 'Please select and copy the address text manually.';
    }
  });
}

document.querySelectorAll('.mobile-menu nav a').forEach((link) => {
  link.addEventListener('click', () => {
    const menu = link.closest('details');
    if (menu) menu.open = false;
  });
});
