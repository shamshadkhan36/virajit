# Viraj IT — Visit Our Store page wireframe

Open `index.html` locally. This folder includes its own `shared.css` and `styles.css`. Keep it beside the other Viraj IT wireframe folders if you want the local navigation links to work. This is a design source for the existing `/virajit-laptop-store-kandivali-west` route, not a live-site update.

## Page journey

Recognise Viraj IT → see Kandivali West location and contact actions immediately → open directions → view genuine store photographs → understand reasons to visit → read verified customer feedback → visit.

## Confirmed by user for this wireframe

- Store address: Shop no 31, Ground Floor, Shanti lal, Shreeji Darshan Building, Shantilal Modi Road, Near Bata Showroom, Kandivali, Bhagat Colony, Kandivali West, Mumbai, Maharashtra 400067.
- Google Maps listing: https://maps.app.goo.gl/Ct4ewUbax8xj9UaB8
- Every Get Directions action and the map card use this exact listing. Copy Address copies the full supplied address.

## Still needed before publication

- Reconfirm current opening hours, holiday exceptions, phone/WhatsApp number and business name. The brief supplies Mon–Sat 10:00 AM–8:30 PM, Sun 11:00 AM–6:00 PM, and +91 89287 15729; no dynamic “Open Now” status is shown.
- Add a genuine storefront image with signboard, plus available real interior, display and consent-cleared customer photographs. Do not substitute AI-generated store or customer images. Create a real 1200 × 630 storefront Open Graph image and add its public URL as `og:image` in production.
- Populate only verified Google rating/count, original review wording, direct review link and confirmed partner/retailer credentials. Current cards are explicit content slots.
- Add LocalBusiness/Store JSON-LD after business name, hours, phone and all details are reconfirmed.
- Integrate into the production site using its shared header/footer, tracking and responsive image pipeline.

The local `Copy Address` control uses the clipboard API. A browser may restrict clipboard access when the file is opened directly; it will display a fallback message if that happens.