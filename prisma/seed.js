const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function makeSlug(brand, model, processor, display) {
  const raw = `${brand}-${model}-${processor}-${display}-refurbished`;
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const catalogueRows = [
  {
    brand: "Dell",
    model: "Latitude 7480",
    processor: "Intel Core i5 6th Gen",
    ram: "8GB",
    storage: "256GB SSD",
    screen: '14" FHD',
    touchScreen: "No",
    price: 22299,
    originalPrice: 44990,
    color: "Black",
    bestFor: "Office",
    warrantyText: "Warranty Included",
    warrantyDuration: "1 MONTH",
    warrantyMonths: 1,
    stock: 3,
    isFeatured: true, // Popular section (Row 1)
    isPremium: false,
    conditionGrade: "Grade A+ (Pristine)",
    batteryHealth: 94,
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=80",
    ],
  },
  {
    brand: "Dell",
    model: "Latitude 5580",
    processor: "Intel Core i5 6th Gen",
    ram: "8GB",
    storage: "256GB SSD",
    screen: '15.6" HD',
    touchScreen: "No",
    price: 23999,
    originalPrice: 46999,
    color: "Black",
    bestFor: "Office",
    warrantyText: "Warranty Included",
    warrantyDuration: "1 MONTH",
    warrantyMonths: 1,
    stock: 2,
    isFeatured: true, // Popular section (Row 1)
    isPremium: false,
    conditionGrade: "Grade A (Excellent)",
    batteryHealth: 92,
    images: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80",
    ],
  },
  {
    brand: "Dell",
    model: "Latitude 5490",
    processor: "Intel Core i5 8th Gen",
    ram: "8GB",
    storage: "256GB SSD",
    screen: '15.6" HD',
    touchScreen: "No",
    price: 25999,
    originalPrice: 48999,
    color: "Black",
    bestFor: "Office",
    warrantyText: "Warranty Included",
    warrantyDuration: "1 MONTH",
    warrantyMonths: 1,
    stock: 3,
    isFeatured: true, // Popular section (Row 1)
    isPremium: false,
    conditionGrade: "Grade A+ (Pristine)",
    batteryHealth: 95,
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1000&q=80",
    ],
  },
  {
    brand: "Dell",
    model: "Latitude 7420",
    processor: "Intel Core i7 11th Gen",
    ram: "32GB",
    storage: "256GB SSD",
    screen: '14" FHD - Touch Screen',
    touchScreen: "Yes",
    price: 48500,
    originalPrice: 79000,
    color: "Black",
    bestFor: "Office",
    warrantyText: "Warranty Included",
    warrantyDuration: "1 MONTH",
    warrantyMonths: 1,
    stock: 1,
    isFeatured: false,
    isPremium: true,
    conditionGrade: "Grade A+ (Pristine)",
    batteryHealth: 97,
    images: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1000&q=80",
    ],
  },
  {
    brand: "Dell",
    model: "Latitude 7420",
    processor: "Intel Core i5 11th Gen",
    ram: "16GB",
    storage: "256GB SSD",
    screen: '14" FHD - Touch Screen',
    touchScreen: "Yes",
    price: 37500,
    originalPrice: 65000,
    color: "Grey",
    bestFor: "Office",
    warrantyText: "Warranty Included",
    warrantyDuration: "1 MONTH",
    warrantyMonths: 1,
    stock: 2,
    isFeatured: true, // Marked Yes in "Feature Near Top of Catalogue"
    isPremium: true,
    conditionGrade: "Grade A+ (Pristine)",
    batteryHealth: 96,
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=80",
    ],
  },
  {
    brand: "Dell",
    model: "Latitude 5430",
    processor: "Intel Core i7 12th Gen",
    ram: "8GB",
    storage: "256GB SSD",
    screen: '14" FHD - Touch Screen',
    touchScreen: "Yes",
    price: 42500,
    originalPrice: 72500,
    color: "Grey",
    bestFor: "Office",
    warrantyText: "Warranty Included",
    warrantyDuration: "1 MONTH",
    warrantyMonths: 1,
    stock: 1,
    isFeatured: false,
    isPremium: true,
    conditionGrade: "Grade A+ (Pristine)",
    batteryHealth: 97,
    images: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=80",
    ],
  },
  {
    brand: "HP",
    model: "840 G7",
    processor: "Intel Core i5 10th Gen",
    ram: "8GB",
    storage: "256GB SSD",
    screen: '14" HD',
    touchScreen: "No",
    price: 31999,
    originalPrice: 57500,
    color: "Silver",
    bestFor: "Office",
    warrantyText: "Warranty Included",
    warrantyDuration: "1 MONTH",
    warrantyMonths: 1,
    stock: 2,
    isFeatured: true,
    isPremium: false,
    conditionGrade: "Grade A+ (Pristine)",
    batteryHealth: 94,
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=80",
    ],
  },
  {
    brand: "HP",
    model: "240 G7",
    processor: "Intel Core i3 7th Gen",
    ram: "8GB",
    storage: "256GB SSD",
    screen: '14" HD',
    touchScreen: "No",
    price: 30000,
    originalPrice: 55000,
    color: "Grey",
    bestFor: "Office",
    warrantyText: "Warranty Included",
    warrantyDuration: "36 MONTHS",
    warrantyMonths: 36,
    stock: 3,
    isFeatured: false,
    isPremium: false,
    conditionGrade: "Grade A (Excellent)",
    batteryHealth: 91,
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80",
    ],
  },
  {
    brand: "HP",
    model: "440 G5",
    processor: "Intel Core i3 7th Gen",
    ram: "8GB",
    storage: "512GB SSD",
    screen: '14" HD',
    touchScreen: "No",
    price: 31000,
    originalPrice: 56250,
    color: "Grey",
    bestFor: "Office",
    warrantyText: "Warranty Included",
    warrantyDuration: "36 MONTHS",
    warrantyMonths: 36,
    stock: 2,
    isFeatured: false,
    isPremium: false,
    conditionGrade: "Grade A (Excellent)",
    batteryHealth: 93,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=80",
    ],
  },
  {
    brand: "Dell",
    model: "Latitude 3491",
    processor: "Intel Core i3 10th Gen",
    ram: "8GB",
    storage: "512GB SSD",
    screen: '14" HD',
    touchScreen: "No",
    price: 34500,
    originalPrice: 62500,
    color: "Black",
    bestFor: "Office",
    warrantyText: "Warranty Included",
    warrantyDuration: "36 MONTHS",
    warrantyMonths: 36,
    stock: 2,
    isFeatured: false,
    isPremium: false,
    conditionGrade: "Grade A+ (Pristine)",
    batteryHealth: 94,
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=80",
    ],
  },
  {
    brand: "HP",
    model: "640 G2",
    processor: "Intel Core i5 6th Gen",
    ram: "8GB",
    storage: "256GB SSD",
    screen: '14" HD',
    touchScreen: "No",
    price: 36500,
    originalPrice: 65000,
    color: "Black",
    bestFor: "Office",
    warrantyText: "Warranty Included",
    warrantyDuration: "36 MONTHS",
    warrantyMonths: 36,
    stock: 2,
    isFeatured: true, // Marked Yes in "Feature Near Top of Catalogue"
    isPremium: false,
    conditionGrade: "Grade A+ (Pristine)",
    batteryHealth: 93,
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=80",
    ],
  },
  {
    brand: "HP",
    model: "840 G3",
    processor: "Intel Core i5 6th Gen",
    ram: "8GB",
    storage: "256GB SSD",
    screen: '14" HD',
    touchScreen: "No",
    price: 37000,
    originalPrice: 67500,
    color: "Black",
    bestFor: "Office",
    warrantyText: "Warranty Included",
    warrantyDuration: "36 MONTHS",
    warrantyMonths: 36,
    stock: 2,
    isFeatured: false,
    isPremium: true,
    conditionGrade: "Grade A+ (Pristine)",
    batteryHealth: 94,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=80",
    ],
  },
];

const sampleProducts = catalogueRows.map((row) => {
  const titleBrand = row.brand.toUpperCase();
  const name = `${titleBrand} ${row.model} | ${row.processor} | ${row.screen} | Refurbished`;
  const slug = makeSlug(row.brand, row.model, row.processor, row.screen);
  const saveAmount = row.originalPrice - row.price;
  const savePercent = Math.round((saveAmount / row.originalPrice) * 100);

  return {
    slug,
    name,
    brand: row.brand,
    model: row.model,
    processor: row.processor,
    ram: row.ram,
    storage: row.storage,
    screen: row.screen,
    gpu: "Intel HD / Iris Integrated Graphics",
    touchScreen: row.touchScreen,
    color: row.color,
    bestFor: row.bestFor,
    warrantyText: row.warrantyText,
    warrantyDuration: row.warrantyDuration,
    batteryHealth: row.batteryHealth,
    conditionGrade: row.conditionGrade,
    price: row.price,
    originalPrice: row.originalPrice,
    stock: row.stock,
    warrantyMonths: row.warrantyMonths,
    includedAccessories:
      "Original Adapter & Power Cord, Free Laptop Bag & Wireless Mouse, Viraj Infotech Warranty Card",
    description: `Certified refurbished ${row.brand} ${row.model} powered by ${row.processor} with ${row.ram} RAM and fast ${row.storage}. Features a crisp ${row.screen} display (${row.touchScreen === "Yes" ? "Touch Screen enabled" : "Anti-Glare panel"}) in ${row.color} finish. Ideal for ${row.bestFor}, business multitasking, and everyday productivity. Tested across 40+ quality checkpoints at Viraj Infotech, Kandivali West with ${row.warrantyText} (${row.warrantyDuration}) and instant savings of ₹${saveAmount.toLocaleString("en-IN")} (${savePercent}% OFF).`,
    images: JSON.stringify(row.images),
    isFeatured: row.isFeatured,
    isPremium: row.isPremium,
  };
});

const sampleBlogs = [
  {
    title: "The Ultimate Mumbai Guide to Buying Refurbished Laptops: Save up to 50% Safely",
    slug: "ultimate-refurbished-laptop-buying-guide",
    excerpt:
      "Learn how enterprise-grade Dell Latitude and HP EliteBook refurbished laptops compare to new budget laptops, and what to check before buying in Mumbai.",
    coverImage:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80",
    category: "Buying Guides",
    author: "Viraj Infotech Tech Team",
    readTime: "5 min read",
    isPublished: true,
    blocks: JSON.stringify([
      {
        id: "b1",
        type: "hero",
        data: {
          badge: "Viraj Infotech Buying Guide",
          title: "Laptop First-Class. Price Budget-Wala.",
          subtitle:
            "Why corporate-grade refurbished Dell Latitude & HP ProBook/EliteBook laptops outperform brand-new entry-level plastic laptops at half the price.",
        },
      },
      {
        id: "b2",
        type: "paragraph",
        data: {
          content:
            "At Viraj Infotech in Kandivali West, Mumbai, we have spent over two decades helping students, professionals, and businesses choose reliable computing hardware. Corporate laptops like the Dell Latitude 7480, 7420, and HP EliteBook 840 series are built to military-grade durability standards.\n\nWhen refurbished, tested by skilled technicians, and backed by our local store warranty and free accessories, you get first-class performance at a budget-friendly price starting from just ₹21,990.",
        },
      },
      {
        id: "b3",
        type: "laptop_showcase",
        data: {
          productId: "",
          title: "Popular Pick at Our Kandivali Store",
          caption: "Tested across 40+ quality parameters with Warranty Included and Free Accessories.",
        },
      },
      {
        id: "b4",
        type: "comparison_table",
        data: {
          title: "Refurbished Business Laptop vs Brand New Budget Laptop (₹22,000 - ₹38,000)",
          headers: ["Feature", "VirajIT Refurbished Business Series", "New Entry-Level Laptop"],
          rows: [
            ["Build Quality", "Magnesium Alloy / Business Chassis", "Thin Plastic Body"],
            ["Processor", "Intel Core i5 / i7 (Commercial Grade)", "Celeron / Pentium / Entry i3"],
            ["Support & Service", "Local Kandivali Store + Laptop on Loan", "Slow Service Center Queues"],
            ["Accessories", "Free Accessories Included", "Sold Separately"],
            ["Savings", "Save 45% to 50% off Original Price", "Full Retail MRP"],
          ],
        },
      },
      {
        id: "b5",
        type: "cta",
        data: {
          headline: "Visit Viraj Infotech in Kandivali West or Order Online",
          subtext:
            "Get delivery across Mumbai, free accessories, and warranty included on every refurbished laptop.",
          buttonText: "Browse Refurbished Catalogue",
          buttonLink: "/refurbished-laptops-catalogue",
          bgStyle: "gradient",
        },
      },
    ]),
  },
];

async function main() {
  console.log("Seeding VirajIT database with Catalogue_Refurbished_Laptop_VirajIT (3).xlsx...");
  await prisma.stockLock.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.blogPost.deleteMany({});

  const createdProducts = [];
  for (const product of sampleProducts) {
    const p = await prisma.product.create({
      data: product,
    });
    createdProducts.push(p);
  }
  console.log(`Created ${createdProducts.length} refurbished laptops from catalogue.`);

  for (const blog of sampleBlogs) {
    const parsedBlocks = JSON.parse(blog.blocks);
    parsedBlocks.forEach((b) => {
      if (b.type === "laptop_showcase" && createdProducts.length > 0) {
        b.data.productId = createdProducts[0].id;
      }
    });
    blog.blocks = JSON.stringify(parsedBlocks);

    await prisma.blogPost.create({
      data: blog,
    });
  }
  console.log("Created sample blog post.");
  console.log("Database seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
