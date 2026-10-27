const form = document.getElementById('rental-form');
const useField = document.getElementById('rental-use');

document.querySelectorAll('[data-use]').forEach((button) => {
  button.addEventListener('click', () => {
    useField.value = button.dataset.use;
    document.getElementById('enquiry').scrollIntoView({ behavior: 'smooth' });
    window.setTimeout(() => useField.focus({ preventScroll: true }), 420);
  });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = String(data.get('name') || '').trim();
  const organisation = String(data.get('organisation') || '').trim();
  const quantity = String(data.get('quantity') || '').trim();
  const use = String(data.get('use') || '').trim();
  const duration = String(data.get('duration') || '').trim();
  const location = String(data.get('location') || '').trim();
  const requirements = String(data.get('requirements') || '').trim();

  const lines = [
    'Hi Viraj IT, I would like to discuss a paid laptop rental quotation.',
    '',
    'Name: ' + name,
    'Organisation: ' + (organisation || 'Not specified'),
    'Number of laptops: ' + quantity,
    'Use case: ' + use,
    'Expected duration: ' + duration,
    'Use location: ' + location,
    'Specifications / software: ' + (requirements || 'Please advise'),
    '',
    'Please let me know what options and terms are available.'
  ];
  window.location.href = 'https://wa.me/918928715729?text=' + encodeURIComponent(lines.join('\n'));
});

document.querySelectorAll('.mobile-menu nav a').forEach((link) => {
  link.addEventListener('click', () => {
    const menu = link.closest('details');
    if (menu) menu.open = false;
  });
});