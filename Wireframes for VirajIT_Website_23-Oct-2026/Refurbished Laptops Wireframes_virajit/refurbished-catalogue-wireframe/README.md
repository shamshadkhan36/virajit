# Viraj IT — Refurbished Laptop Catalogue and Product Page Wireframes

Open `product.html` directly to preview the first sample laptop, or open `index.html` and select any listing. The return link retains catalogue filters and sorting. These are local wireframes. No live website or backend has been changed.

## Catalogue behaviour

- Brand, price, warranty, processor, RAM, storage and screen-size filters.
- Values within a multi-select group use OR; different filter groups use AND.
- Brand and budget shortcuts, sort, active-filter removal, clear-all and empty-state recovery.
- URL query parameters retain selections when returning from a product page.
- Mobile filter drawer supports Escape, backdrop close and keyboard focus containment.

## Product page structure

1. Gallery with three explicit angles: front, left side and right side. Thumbnail buttons, previous/next controls and keyboard arrows work. The visual placeholders can display real photos once `photos.front`, `photos.left` and `photos.right` are provided in the product record. Use photographs of the exact unit, showing ports and visible wear. Export optimised WebP or AVIF with suitable responsive sizes and useful alt text.
2. At-a-glance buying panel: exact model, configuration, price, stock, warranty, WhatsApp enquiry and store visit.
3. Long-form overview with subheadings for the configuration, suitable uses, exact-unit checks and local store context. Current text demonstrates the required space and hierarchy only. Write original copy for each product; do not reuse identical copy across model variants.
4. Detailed specifications, condition and warranty blocks. Replace every “to be confirmed” field with checked details or omit it.
5. Three related products selected in the wireframe by same brand, matching processor/RAM/warranty and price proximity. Production should use only relevant available records and a verified business ranking rule.

## Inventory and SEO handoff

All values in `products.js` are illustrative data from the earlier local prototype, not verified live stock. Do not publish the sample prices, status, warranty or generic description as claims. Each real unit needs a unique ID/SKU, exact model, configuration, final price, actual stock state, condition notes, warranty terms, three unit-specific photos, and its own description. Replace sold or archived products according to the site's inventory policy.

For production SEO, give each product a stable descriptive slug URL rather than the wireframe's `product.html?id=...` query URL. Render the H1, original overview, title tag, meta description, canonical URL, image alt text and Product structured data from the approved record on the server or at build time. The current client-rendered wireframe demonstrates layout, not crawl-ready SEO. Redirect or mark an unavailable unit clearly when stock changes.

The catalogue's *Recommended* order currently puts sample in-stock items first, then `rank` ascending; *Newest Listings* uses the sample `added` sequence. Replace with agreed production rules and real timestamps. Proposed budget ranges are under ₹25,000, ₹25,000–₹40,000 and above ₹40,000; keep homepage shortcuts aligned.

Visual identity follows the existing Viraj IT wireframes: Manrope and Space Grotesk, plum and magenta, pill buttons, rounded cards, and the same header/footer pattern. Intended production catalogue route: `/refurbished-laptops-catalogue`.

