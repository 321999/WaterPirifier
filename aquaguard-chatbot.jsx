import { useState, useRef, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════════
//  CATALOGUE DB  →  Category  →  Sub-category  →  Products[]
// ═══════════════════════════════════════════════════════════════════
const CATALOGUE = {
  "💧 Water Purifiers": {
    icon: "💧",
    subcategories: {
      "Active Copper Purifiers": {
        icon: "🟤",
        products: {
          "Aquaguard Copper Boost RO+UV": {
            technology: "RO + UV + Active Copper Charge",
            price: "₹22,499",
            features: ["Active copper infusion", "8L SS tank", "Auto shut-off", "Mineral Guard tech"],
          },
          "Aquaguard Enrich Marvel RO+UV Copper": {
            technology: "RO + UV + Copper Infusion",
            price: "₹19,999",
            features: ["SS tank 8L", "Copper charge daily", "Mineral Guard", "LED alerts"],
          },
        },
      },
      "Alkaline Boost Purifiers": {
        icon: "⚗️",
        products: {
          "Aquaguard Alkaline NXT RO+UV+UF": {
            technology: "RO + UV + UF + Alkaline Boost",
            price: "₹24,999",
            features: ["pH balanced water", "7-stage purification", "8L tank", "Digital display"],
          },
          "Aquaguard Enrich Nexen 2X RO+UV": {
            technology: "RO + UV + MTDS + Alkaline",
            price: "₹18,999",
            features: ["8L storage", "Active Copper", "10L/hr flow", "Mineral retention"],
          },
        },
      },
      "Under Counter Purifiers": {
        icon: "🔧",
        products: {
          "Aquaguard Designo UTC RO+UV 2X": {
            technology: "RO + UV + UF",
            price: "₹27,999",
            features: ["Under-counter install", "10L SS tank", "Zero splash faucet", "Smart filter alerts"],
          },
          "Aquaguard UTC Pro RO+UV+UF": {
            technology: "RO + UV + UF + Mineral",
            price: "₹31,499",
            features: ["Concealed unit", "12L tank", "Hot & ambient", "Child-safe lock"],
          },
        },
      },
      "Non-Electric Purifiers": {
        icon: "🌿",
        products: {
          "Aquaguard Amrit UF Non-Electric": {
            technology: "UF + Carbon Block",
            price: "₹3,999",
            features: ["No electricity needed", "5L capacity", "Wall mountable", "Gravity-fed filtration"],
          },
          "Aquaguard Superb Non-Electric": {
            technology: "UF + Activated Carbon",
            price: "₹2,799",
            features: ["Zero electricity", "4L storage", "Compact design", "Easy filter change"],
          },
        },
      },
    },
  },

  "🌀 Vacuum Cleaners": {
    icon: "🌀",
    subcategories: {
      "Robotic Vacuum Cleaner": {
        icon: "🤖",
        products: {
          "Forbes Robo Clean 1200": {
            technology: "Auto-mapping + Gyroscope navigation",
            price: "₹18,999",
            features: ["Auto mapping", "2-hr battery", "App control", "Anti-tangle brush"],
          },
          "Forbes Robo Smart Pro": {
            technology: "LiDAR Navigation + AI Obstacle Avoidance",
            price: "₹28,999",
            features: ["LiDAR mapping", "3-hr runtime", "Wi-Fi + Alexa", "Self-charging dock"],
          },
        },
      },
      "Wet and Dry Vacuum Cleaner": {
        icon: "💦",
        products: {
          "Forbes Wet & Dry Cyclone 1600W": {
            technology: "Cyclone suction + HEPA filter",
            price: "₹8,499",
            features: ["20L capacity", "1600W motor", "Wet & dry mode", "Blower function"],
          },
          "Forbes WD Pro 2000W": {
            technology: "2000W brushless motor",
            price: "₹11,999",
            features: ["30L drum", "Stainless steel", "HEPA filtration", "Foam filter + cloth filter"],
          },
        },
      },
      "Dry / Canister Vacuum Cleaner": {
        icon: "🧹",
        products: {
          "Forbes Classique 1600W": {
            technology: "1600W suction + HEPA filter",
            price: "₹5,999",
            features: ["2L dust bag", "Multiple attachments", "Cord rewind", "Lightweight 4.2 kg"],
          },
          "Forbes Trendy Zip 1200W": {
            technology: "Compact cyclone suction",
            price: "₹3,999",
            features: ["Bagless 1.5L", "Washable filter", "360° swivel", "Easy empty bin"],
          },
        },
      },
      "Handheld Vacuum Cleaner": {
        icon: "✋",
        products: {
          "Forbes Handy Mini 600W": {
            technology: "Compact suction with HEPA",
            price: "₹2,499",
            features: ["600W powerful suction", "Cordless ready", "Lightweight 1.2 kg", "Crevice & brush tools"],
          },
          "Forbes Handy Pro Duo": {
            technology: "2-in-1 stick & handheld",
            price: "₹4,499",
            features: ["2-in-1 detachable", "HEPA H13 filter", "Wall mount charging", "Allergy-safe filtration"],
          },
        },
      },
      "Cordless Vacuum Cleaner": {
        icon: "🔋",
        products: {
          "Forbes Bolt Cordless 22.2V": {
            technology: "22.2V Li-ion + Cyclone suction",
            price: "₹9,999",
            features: ["45-min battery", "0.6L dustbin", "Flexible tube", "LED floor light"],
          },
          "Forbes Zip Cordless Pro": {
            technology: "25.2V Li-ion + Motorised brush",
            price: "₹13,499",
            features: ["60-min runtime", "Digital power control", "HEPA filter", "Quick-release wand"],
          },
        },
      },
      "Pet Grooming Vacuum": {
        icon: "🐾",
        products: {
          "Forbes PetCare Grooming Kit": {
            technology: "Low-noise suction + grooming head",
            price: "₹5,499",
            features: ["5 grooming tools", "Low 60dB noise", "Tangle-free brush", "1L pet hair bin"],
          },
          "Forbes PetPro 2.0": {
            technology: "Anti-allergen HEPA + grooming suction",
            price: "₹7,999",
            features: ["HEPA H13 filter", "Self-cleaning brush", "Cordless option", "Large 1.5L bin"],
          },
        },
      },
    },
  },

  "💨 Air Purifiers": {
    icon: "💨",
    subcategories: {
      "Eureka Forbes Air Purifiers": {
        icon: "🌬️",
        products: {
          "Eureka Forbes Aeroguard AP 500": {
            technology: "HEPA + Activated Carbon + UV",
            price: "₹12,999",
            features: ["HEPA H13 filter", "500 sq.ft coverage", "Air quality display", "Sleep mode"],
          },
          "Eureka Forbes Aeroguard SCPR 800": {
            technology: "Smart HEPA + Carbon + Ionizer",
            price: "₹18,499",
            features: ["800 sq.ft coverage", "Auto sensor mode", "App control", "Filter life indicator"],
          },
        },
      },
      "230 Surround Air Purifiers": {
        icon: "🔄",
        products: {
          "Forbes 230 Surround Air Purifier": {
            technology: "360° HEPA + Carbon surround filtration",
            price: "₹9,999",
            features: ["360° air intake", "230 sq.ft room coverage", "3-stage filtration", "Silent night mode"],
          },
          "Forbes 230 Surround Pro+": {
            technology: "360° HEPA H13 + UV sterilisation",
            price: "₹13,499",
            features: ["UV sterilisation", "Wi-Fi enabled", "PM2.5 real-time sensor", "Auto fan speed"],
          },
        },
      },
    },
  },
};

// ── Flatten catalogue for keyword matching ──────────────────────────
function buildFlatIndex() {
  const index = {};
  Object.entries(CATALOGUE).forEach(([cat, catVal]) => {
    Object.entries(catVal.subcategories).forEach(([sub, subVal]) => {
      Object.entries(subVal.products).forEach(([prod, prodVal]) => {
        index[prod] = { ...prodVal, category: cat, subcategory: sub };
      });
    });
  });
  return index;
}
const FLAT_PRODUCTS = buildFlatIndex();

// ═══════════════════════════════════════════════════════════════════
//  USER DATABASE  (registered customers, keyed by phone)
// ═══════════════════════════════════════════════════════════════════
const USER_DB = {
  "9876543210": {
    name: "Rajesh Sharma",
    products: [
      { name: "Aquaguard Enrich Nexen 2X RO+UV", amc_price: "₹2,499/year", amc_expiry: "15 Mar 2025", amc_status: "Expiring Soon" },
      { name: "Aquaguard Designo UTC RO+UV 2X",   amc_price: "₹3,199/year", amc_expiry: "30 Jul 2026", amc_status: "Active" },
    ],
  },
  "8765432109": {
    name: "Priya Mehta",
    products: [
      { name: "Aquaguard Designo UTC RO+UV 2X", amc_price: "₹3,199/year", amc_expiry: "05 Jun 2025", amc_status: "Expiring Soon" },
    ],
  },
  "7654321098": {
    name: "Amit Verma",
    products: [
      { name: "Aquaguard Enrich Marvel RO+UV Copper",  amc_price: "₹2,799/year", amc_expiry: "22 Apr 2026", amc_status: "Active" },
      { name: "Aquaguard Alkaline NXT RO+UV+UF",       amc_price: "₹2,999/year", amc_expiry: "18 May 2025", amc_status: "Expiring Soon" },
    ],
  },
};

// ═══════════════════════════════════════════════════════════════════
//  TICKET DATABASE
// ═══════════════════════════════════════════════════════════════════
const TICKET_DB = {
  "AQ123456": { mobile: "9876543210", product: "Aquaguard Enrich Nexen 2X RO+UV",    issue: "Water flow is very slow",    status: "🔧 Assigned to a technician — resolution within **24 hours**.", date: "20 Feb 2026" },
  "AQ234567": { mobile: "8765432109", product: "Aquaguard Designo UTC RO+UV 2X",      issue: "Display not working",        status: "🚗 Technician is **on the way** to your location.",             date: "23 Feb 2026" },
  "AQ345678": { mobile: "7654321098", product: "Aquaguard Alkaline NXT RO+UV+UF",     issue: "Leakage from bottom panel",  status: "✅ Issue **resolved**. Please rate your experience.",           date: "18 Feb 2026" },
};

let SESSION_TICKETS = {};

// ═══════════════════════════════════════════════════════════════════
//  UTILS
// ═══════════════════════════════════════════════════════════════════
function genTicket() { return "AQ" + Math.floor(100000 + Math.random() * 900000); }
function cleanPhone(str) { return str.replace(/\D/g, "").slice(-10); }

function matchByIndex(list, txt) {
  // Accept "1", "1.", "option 1", etc.
  for (let i = 0; i < list.length; i++) {
    if (txt.includes(String(i + 1))) return i;
  }
  return -1;
}

function matchByKeyword(list, txt) {
  return list.findIndex((item) =>
    item.toLowerCase().split(/[\s,+&/-]+/).some((w) => w.length > 3 && txt.includes(w))
  );
}

function matchItem(list, txt) {
  const byIdx = matchByIndex(list, txt);
  if (byIdx !== -1) return byIdx;
  return matchByKeyword(list, txt);
}

// Out-of-scope guard
const GLOBAL_KEYWORDS = [
  "amc","renew","complaint","register","status","ticket","buy","product","demo","purchase",
  "yes","no","ok","okay","sure","back","menu","home","help","hi","hello","hey","start",
  "water","purifier","vacuum","air","cleaner","aquaguard","forbes","eureka","copper","alkaline",
  "robotic","cordless","handheld","pet","surround","under","counter","electric",
  "1","2","3","4","5","6",
];
function isOutOfScope(txt) {
  return !GLOBAL_KEYWORDS.some((kw) => txt.toLowerCase().includes(kw));
}

// ═══════════════════════════════════════════════════════════════════
//  SHARED PROMPT HELPERS
// ═══════════════════════════════════════════════════════════════════
const MAIN_OPTIONS = ["1. AMC Renewal", "2. Register New Complaint", "3. Check Complaint Status", "4. Buy New Product"];
function menuPrompt() { return { from: "bot", text: "Is there anything else I can help you with?", options: MAIN_OPTIONS }; }
function mainMenu() { return { msgs: [{ from: "bot", text: "Please choose an option:", options: MAIN_OPTIONS }], next: { flow: "menu" } }; }
function fallback() {
  return {
    msgs: [{ from: "bot", text: "Hmm, I didn't quite catch that. Let me take you back to the main menu! 😊\n\nPlease choose an option:", options: MAIN_OPTIONS }],
    next: { flow: "menu" },
  };
}

function matchUserProduct(userProducts, txt) {
  const byIdx = matchByIndex(userProducts.map((p) => p.name), txt);
  if (byIdx !== -1) return byIdx;
  return matchByKeyword(userProducts.map((p) => p.name), txt);
}

// ═══════════════════════════════════════════════════════════════════
//  MAIN CHAT ENGINE
// ═══════════════════════════════════════════════════════════════════
function getResponse(state, input) {
  const txt   = input.trim().toLowerCase();
  const raw   = input.trim();
  const FREE_TEXT_FLOWS = ["complaint_issue", "buy_mobile_collect"];

  if (!FREE_TEXT_FLOWS.includes(state.flow) && isOutOfScope(txt)) return fallback();

  // ── IDLE ──────────────────────────────────────────────────────────
  if (state.flow === "idle") {
    return {
      msgs: [
        { from: "bot", text: "Hello! 👋 Welcome to **Aquaguard Support**. How may I help you today?" },
        { from: "bot", text: "Please choose an option:", options: MAIN_OPTIONS },
      ],
      next: { flow: "menu" },
    };
  }

  // ── MAIN MENU ──────────────────────────────────────────────────────
  if (state.flow === "menu") {
    if (txt.includes("1") || txt.includes("amc") || txt.includes("renew"))
      return { msgs: [{ from: "bot", text: "Sure! Please enter your **registered mobile number** to continue:" }], next: { flow: "amc_phone" } };
    if (txt.includes("2") || (txt.includes("register") && !txt.includes("amc")) || txt.includes("new complaint"))
      return { msgs: [{ from: "bot", text: "Please enter your **registered mobile number**:" }], next: { flow: "complaint_mobile" } };
    if (txt.includes("3") || txt.includes("status") || txt.includes("check"))
      return { msgs: [{ from: "bot", text: "Please enter your **complaint / ticket number** (e.g. AQ123456):" }], next: { flow: "status_ask" } };
    if (txt.includes("4") || txt.includes("buy") || txt.includes("new product"))
      return startBuyCategoryStep();
    return fallback();
  }

  // ══════════════════════════════════════════
  //  FLOW 1 — AMC RENEWAL
  // ══════════════════════════════════════════
  if (state.flow === "amc_phone") {
    const phone = cleanPhone(raw);
    if (phone.length === 10) {
      const user = USER_DB[phone];
      if (!user) return { msgs: [{ from: "bot", text: `❌ No account found for **${phone}**. Please check the number or contact our helpline.` }], next: state };
      return {
        msgs: [{ from: "bot", text: `✅ Welcome back, **${user.name}**! We found **${user.products.length}** registered product(s).\n\nSelect a product to view AMC details:`, options: user.products.map((p, i) => `${i + 1}. ${p.name}`) }],
        next: { flow: "amc_select", phone, user },
      };
    }
    return { msgs: [{ from: "bot", text: "Please enter a valid **10-digit mobile number**." }], next: state };
  }

  if (state.flow === "amc_select") {
    const idx = matchUserProduct(state.user.products, txt);
    if (idx !== -1) {
      const p = state.user.products[idx];
      const emoji = p.amc_status === "Active" ? "🟢" : "🟡";
      return {
        msgs: [{
          from: "bot",
          text: `📋 **AMC Details**\n\n🔧 Product: ${p.name}\n💰 AMC Price: ${p.amc_price}\n📅 Expiry Date: ${p.amc_expiry}\n${emoji} Status: **${p.amc_status}**\n\nWould you like to renew this AMC?`,
          options: ["✅ Yes, Renew Now", "❌ No, Go Back"],
        }],
        next: { ...state, flow: "amc_confirm", selectedProduct: p },
      };
    }
    const opts = state.user.products.map((p, i) => `${i + 1}. ${p.name}`);
    return { msgs: [{ from: "bot", text: "Please select a valid product from your list:", options: opts }], next: state };
  }

  if (state.flow === "amc_confirm") {
    if (txt.includes("yes") || txt.includes("renew") || txt.includes("✅")) {
      return {
        msgs: [
          { from: "bot", text: `🎉 **AMC Renewal Initiated!**\n\nA secure payment link for **${state.selectedProduct.amc_price}** has been sent to your registered mobile via SMS.\n\nThank you for choosing Aquaguard! 💧` },
          menuPrompt(),
        ],
        next: { flow: "menu" },
      };
    }
    return { msgs: [{ from: "bot", text: "No problem! We're here whenever you're ready. 😊" }, menuPrompt()], next: { flow: "menu" } };
  }

  // ══════════════════════════════════════════
  //  FLOW 2 — REGISTER COMPLAINT
  // ══════════════════════════════════════════
  if (state.flow === "complaint_mobile") {
    const phone = cleanPhone(raw);
    if (phone.length === 10) {
      const user = USER_DB[phone];
      if (!user) return { msgs: [{ from: "bot", text: `❌ No account found for **${phone}**. Please check the number or contact our helpline.` }], next: state };
      return {
        msgs: [{ from: "bot", text: `✅ Hi **${user.name}**! Which product would you like to raise a complaint for?`, options: user.products.map((p, i) => `${i + 1}. ${p.name}`) }],
        next: { flow: "complaint_product", phone, userName: user.name, userProducts: user.products },
      };
    }
    return { msgs: [{ from: "bot", text: "Please enter a valid **10-digit mobile number**." }], next: state };
  }

  if (state.flow === "complaint_product") {
    const idx = matchUserProduct(state.userProducts, txt);
    if (idx !== -1) {
      return {
        msgs: [{ from: "bot", text: `Got it! Please describe your issue with **${state.userProducts[idx].name}**:` }],
        next: { ...state, flow: "complaint_issue", selectedProduct: state.userProducts[idx].name },
      };
    }
    return { msgs: [{ from: "bot", text: "Please select a valid product:", options: state.userProducts.map((p, i) => `${i + 1}. ${p.name}`) }], next: state };
  }

  if (state.flow === "complaint_issue") {
    const ticket = genTicket();
    const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    SESSION_TICKETS[ticket] = { mobile: state.phone, product: state.selectedProduct, issue: raw, status: "⏳ Under review by our technical team.", date: today };
    return {
      msgs: [
        { from: "bot", text: `✅ **Complaint Registered Successfully!**\n\n🎫 Ticket No: **${ticket}**\n👤 Name: ${state.userName}\n📱 Mobile: ${state.phone}\n🔧 Product: ${state.selectedProduct}\n📝 Issue: ${raw}\n\n⏱️ Our team will contact you within **24 hours**.` },
        menuPrompt(),
      ],
      next: { flow: "menu" },
    };
  }

  // ══════════════════════════════════════════
  //  FLOW 3 — CHECK STATUS
  // ══════════════════════════════════════════
  if (state.flow === "status_ask") {
    const ticketNo = raw.toUpperCase().replace(/\s/g, "");
    const ticket = SESSION_TICKETS[ticketNo] || TICKET_DB[ticketNo];
    if (ticket) {
      return {
        msgs: [
          { from: "bot", text: `📊 **Complaint Status**\n\n🎫 Ticket: **${ticketNo}**\n🔧 Product: ${ticket.product}\n📅 Date: ${ticket.date}\n📝 Issue: ${ticket.issue}\n\n${ticket.status}` },
          menuPrompt(),
        ],
        next: { flow: "menu" },
      };
    }
    return { msgs: [{ from: "bot", text: `❌ No complaint found for ticket **${ticketNo}**.\n\nPlease check the number and try again:` }], next: state };
  }

  // ══════════════════════════════════════════
  //  FLOW 4 — BUY NEW PRODUCT  (3-level)
  // ══════════════════════════════════════════

  // Step 1 — pick category
  if (state.flow === "buy_category") {
    const cats = Object.keys(CATALOGUE);
    const idx = matchItem(cats, txt);
    if (idx !== -1) {
      const cat = cats[idx];
      const subs = Object.keys(CATALOGUE[cat].subcategories);
      return {
        msgs: [{
          from: "bot",
          text: `Great choice! Here are the **${cat}** sub-categories:\n\nPlease select one:`,
          options: subs.map((s, i) => `${i + 1}. ${CATALOGUE[cat].subcategories[s].icon} ${s}`),
        }],
        next: { flow: "buy_subcategory", selectedCategory: cat },
      };
    }
    return { msgs: [{ from: "bot", text: "Please select a valid category:", options: Object.keys(CATALOGUE).map((c, i) => `${i + 1}. ${CATALOGUE[c].icon} ${c.replace(/^.\s/, "")}`) }], next: state };
  }

  // Step 2 — pick sub-category
  if (state.flow === "buy_subcategory") {
    const cat = CATALOGUE[state.selectedCategory];
    const subs = Object.keys(cat.subcategories);
    const idx = matchItem(subs, txt);
    if (idx !== -1) {
      const sub = subs[idx];
      const prods = Object.keys(cat.subcategories[sub].products);
      return {
        msgs: [{
          from: "bot",
          text: `Here are the **${sub}** products:\n\nPlease select one to view details:`,
          options: prods.map((p, i) => `${i + 1}. ${p}`),
        }],
        next: { flow: "buy_product", selectedCategory: state.selectedCategory, selectedSubcategory: sub },
      };
    }
    return {
      msgs: [{ from: "bot", text: "Please select a valid sub-category:", options: subs.map((s, i) => `${i + 1}. ${cat.subcategories[s].icon} ${s}`) }],
      next: state,
    };
  }

  // Step 3 — pick product → show details
  if (state.flow === "buy_product") {
    const sub = CATALOGUE[state.selectedCategory].subcategories[state.selectedSubcategory];
    const prods = Object.keys(sub.products);
    const idx = matchItem(prods, txt);
    if (idx !== -1) {
      const prodName = prods[idx];
      const p = sub.products[prodName];
      return {
        msgs: [{
          from: "bot",
          text: `🛒 **${prodName}**\n\n📂 Category: ${state.selectedCategory}\n🏷️ Sub-category: ${state.selectedSubcategory}\n⚙️ Technology: ${p.technology}\n💰 Price: ${p.price}\n\n✨ Key Features:\n${p.features.map((f) => `  • ${f}`).join("\n")}\n\nWould you like to schedule a **demo** or **purchase** this product?`,
          options: ["📅 Schedule Demo", "🛍️ Purchase Now", "⬅️ Back to Sub-categories", "🏠 Main Menu"],
        }],
        next: { flow: "buy_confirm", selectedCategory: state.selectedCategory, selectedSubcategory: state.selectedSubcategory, selectedProduct: prodName },
      };
    }
    return { msgs: [{ from: "bot", text: "Please select a valid product:", options: prods.map((p, i) => `${i + 1}. ${p}`) }], next: state };
  }

  // Step 4 — demo / purchase / back
  if (state.flow === "buy_confirm") {
    if (txt.includes("main menu") || txt.includes("🏠") || txt.includes("home")) return mainMenu();
    if (txt.includes("back") || txt.includes("sub-categor") || txt.includes("⬅")) {
      const cat = CATALOGUE[state.selectedCategory];
      const subs = Object.keys(cat.subcategories);
      return {
        msgs: [{ from: "bot", text: `Back to **${state.selectedCategory}** sub-categories. Please select one:`, options: subs.map((s, i) => `${i + 1}. ${cat.subcategories[s].icon} ${s}`) }],
        next: { flow: "buy_subcategory", selectedCategory: state.selectedCategory },
      };
    }
    if (txt.includes("demo") || txt.includes("📅") || txt.includes("purchase") || txt.includes("🛍")) {
      const action = (txt.includes("demo") || txt.includes("📅")) ? "demo" : "purchase";
      return {
        msgs: [{ from: "bot", text: `Please enter your **mobile number** to schedule your ${action === "demo" ? "free demo" : "purchase callback"}:` }],
        next: { ...state, flow: "buy_mobile_collect", buyAction: action },
      };
    }
    return { msgs: [{ from: "bot", text: "Please choose an option above." }], next: state };
  }

  // Step 5 — collect mobile for demo/purchase
  if (state.flow === "buy_mobile_collect") {
    const phone = cleanPhone(raw);
    if (phone.length === 10) {
      return {
        msgs: [
          { from: "bot", text: `📞 Perfect! Our executive will call **${phone}** within **2 hours** regarding:\n\n🛒 **${state.selectedProduct}**\n💰 ${FLAT_PRODUCTS[state.selectedProduct]?.price || ""}\n\nThank you for choosing Aquaguard / Forbes! 💧` },
          menuPrompt(),
        ],
        next: { flow: "menu" },
      };
    }
    return { msgs: [{ from: "bot", text: "Please enter a valid **10-digit mobile number**." }], next: state };
  }

  return fallback();
}

function startBuyCategoryStep() {
  const cats = Object.keys(CATALOGUE);
  return {
    msgs: [{
      from: "bot",
      text: "Great! Please select a **product category** to explore:",
      options: cats.map((c, i) => `${i + 1}. ${c}`),
    }],
    next: { flow: "buy_category" },
  };
}

// ═══════════════════════════════════════════════════════════════════
//  MARKDOWN-LITE RENDERER
// ═══════════════════════════════════════════════════════════════════
function renderText(text) {
  return text.split("\n").map((line, i, arr) => (
    <span key={i}>
      {line.split(/(\*\*[^*]+\*\*)/g).map((p, j) =>
        p.startsWith("**") && p.endsWith("**")
          ? <strong key={j}>{p.slice(2, -2)}</strong>
          : <span key={j}>{p}</span>
      )}
      {i < arr.length - 1 && <br />}
    </span>
  ));
}

// ═══════════════════════════════════════════════════════════════════
//  UI COMPONENTS
// ═══════════════════════════════════════════════════════════════════
function TypingIndicator() {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:6, padding:"12px 16px", background:"#f0f9ff", borderRadius:"18px 18px 18px 4px", width:"fit-content", marginBottom:8 }}>
      {[0,1,2].map((i) => (
        <span key={i} style={{ width:8, height:8, borderRadius:"50%", background:"#0ea5e9", animation:"bounce 1.2s infinite", animationDelay:`${i*0.2}s` }} />
      ))}
    </div>
  );
}

function Breadcrumb({ state }) {
  const parts = [];
  if (state.selectedCategory)    parts.push(state.selectedCategory.replace(/^.\s/, ""));
  if (state.selectedSubcategory) parts.push(state.selectedSubcategory);
  if (!parts.length) return null;
  return (
    <div style={{ padding:"5px 14px", background:"#e0f2fe", fontSize:11, color:"#0369a1", fontWeight:600, letterSpacing:0.2 }}>
      🗂 {parts.join(" › ")}
    </div>
  );
}

function Message({ msg }) {
  const isBot = msg.from === "bot";
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems: isBot ? "flex-start" : "flex-end", marginBottom:12, animation:"fadeSlide 0.3s ease" }}>
      {isBot ? (
        <div style={{ display:"flex", alignItems:"flex-end", gap:8 }}>
          <div style={{ width:32, height:32, borderRadius:"50%", background:"linear-gradient(135deg,#0ea5e9,#0284c7)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, flexShrink:0 }}>💧</div>
          <div style={{ maxWidth:345, background:"#f0f9ff", color:"#0c4a6e", padding:"12px 16px", borderRadius:"18px 18px 18px 4px", fontSize:13.5, lineHeight:1.65, boxShadow:"0 1px 4px rgba(14,165,233,0.15)" }}>
            {renderText(msg.text)}
          </div>
        </div>
      ) : (
        <div style={{ maxWidth:280, background:"linear-gradient(135deg,#0ea5e9,#0369a1)", color:"#fff", padding:"12px 16px", borderRadius:"18px 18px 4px 18px", fontSize:13.5, lineHeight:1.65, boxShadow:"0 2px 8px rgba(14,165,233,0.3)" }}>
          {msg.text}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  MAIN APP
// ═══════════════════════════════════════════════════════════════════
export default function AquaguardChat() {
  const [messages,     setMessages]     = useState([]);
  const [chatState,    setChatState]    = useState({ flow: "idle" });
  const [input,        setInput]        = useState("");
  const [typing,       setTyping]       = useState(false);
  const [quickOptions, setQuickOptions] = useState([]);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => { triggerBot("hi", { flow: "idle" }); }, []);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  function triggerBot(userInput, forcedState) {
    const currentState = forcedState || chatState;
    const { msgs, next } = getResponse(currentState, userInput);
    setTyping(true);
    setQuickOptions([]);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, ...msgs]);
      setChatState(next);
      const lastWithOpts = [...msgs].reverse().find((m) => m.options);
      setQuickOptions(lastWithOpts?.options || []);
      inputRef.current?.focus();
    }, 650);
  }

  function sendMessage(text) {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { from: "user", text: text.trim() }]);
    setInput("");
    setQuickOptions([]);
    setTimeout(() => triggerBot(text.trim()), 220);
  }

  const buyFlows = ["buy_category","buy_subcategory","buy_product","buy_confirm","buy_mobile_collect"];
  const showBreadcrumb = buyFlows.includes(chatState.flow);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Plus Jakarta Sans',sans-serif;background:#dbeafe;min-height:100vh;display:flex;align-items:center;justify-content:center}
        @keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}
        @keyframes fadeSlide{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:#bae6fd;border-radius:4px}
        input:focus{outline:none}
        .opt-btn{background:#fff;color:#0369a1;border:1.5px solid #7dd3fc;border-radius:20px;padding:6px 14px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;transition:all 0.15s;white-space:nowrap;line-height:1.5}
        .opt-btn:hover{background:#0ea5e9;color:#fff;border-color:#0ea5e9}
        .send-btn{width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#0369a1,#0ea5e9);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:18px;box-shadow:0 2px 8px rgba(14,165,233,0.4);transition:transform 0.15s;flex-shrink:0}
        .send-btn:hover{transform:scale(1.08)}
      `}</style>

      <div style={{ width:432, height:740, display:"flex", flexDirection:"column", background:"#fff", borderRadius:24, overflow:"hidden", boxShadow:"0 20px 60px rgba(14,165,233,0.25),0 4px 20px rgba(0,0,0,0.1)" }}>

        {/* HEADER */}
        <div style={{ background:"linear-gradient(135deg,#0369a1 0%,#0ea5e9 100%)", padding:"16px 20px", display:"flex", alignItems:"center", gap:12, flexShrink:0 }}>
          <div style={{ width:46, height:46, borderRadius:"50%", background:"rgba(255,255,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, border:"2px solid rgba(255,255,255,0.4)" }}>💧</div>
          <div>
            <div style={{ color:"#fff", fontWeight:700, fontSize:15.5, letterSpacing:0.3 }}>Aquaguard / Forbes Support</div>
            <div style={{ color:"#bae6fd", fontSize:11.5, display:"flex", alignItems:"center", gap:5, marginTop:2 }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:"#4ade80", display:"inline-block", animation:"pulse 2s infinite" }} />
              Online — Typically replies instantly
            </div>
          </div>
          <div style={{ marginLeft:"auto", color:"rgba(255,255,255,0.75)", fontSize:11, textAlign:"right", lineHeight:1.7 }}>
            <div>🔒 Secure</div><div>24/7 Support</div>
          </div>
        </div>

        {/* DEMO HINT BANNER */}
        <div style={{ background:"#fffbeb", borderBottom:"1px solid #fde68a", padding:"6px 14px", fontSize:10.5, color:"#92400e", lineHeight:1.6 }}>
          📌 <strong>Test phones:</strong> 9876543210 · 8765432109 · 7654321098&nbsp;&nbsp;|&nbsp;&nbsp;<strong>Test tickets:</strong> AQ123456 · AQ234567 · AQ345678
        </div>

        {/* BREADCRUMB (buy flow only) */}
        {showBreadcrumb && <Breadcrumb state={chatState} />}

        {/* MESSAGES */}
        <div style={{ flex:1, overflowY:"auto", padding:"16px 16px 8px", background:"#f8fcff" }}>
          {messages.map((msg, i) => <Message key={i} msg={msg} />)}
          {typing && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>

        {/* QUICK OPTIONS */}
        {quickOptions.length > 0 && (
          <div style={{ padding:"8px 14px", display:"flex", flexWrap:"wrap", gap:6, background:"#f8fcff", borderTop:"1px solid #e0f2fe", maxHeight:110, overflowY:"auto" }}>
            {quickOptions.map((opt, i) => (
              <button key={i} className="opt-btn" onClick={() => sendMessage(opt)}>{opt}</button>
            ))}
          </div>
        )}

        {/* INPUT */}
        <div style={{ padding:"12px 16px", display:"flex", gap:10, alignItems:"center", background:"#fff", borderTop:"1px solid #e0f2fe", flexShrink:0 }}>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Type a message or tap an option above…"
            style={{ flex:1, border:"1.5px solid #bae6fd", borderRadius:24, padding:"10px 16px", fontSize:13.5, fontFamily:"inherit", color:"#0c4a6e", background:"#f0f9ff", transition:"border 0.2s" }}
            onFocus={(e) => (e.target.style.borderColor = "#0ea5e9")}
            onBlur={(e)  => (e.target.style.borderColor = "#bae6fd")}
          />
          <button className="send-btn" onClick={() => sendMessage(input)}>➤</button>
        </div>
      </div>
    </>
  );
}
