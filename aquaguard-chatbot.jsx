
import { useState, useRef, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════════
//  CATALOGUE DB  →  Category  →  Sub-category  →  Products[]
// ═══════════════════════════════════════════════════════════════════
/*




*/


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

  "9664162569": {
    name: "Prakash",
    products: [
      { name: "Aquaguard Enrich Nexen 2X RO+UV", amc_price: "₹2,499/year", amc_expiry: "15 Mar 2026", amc_status: "Expiring Soon" },
      { name: "Aquaguard Designo UTC RO+UV 2X",   amc_price: "₹3,199/year", amc_expiry: "30 Jul 2026", amc_status: "Active" },
    ],
  },
  "8765432109": {
    name: "Priya Mehta",
    products: [
      { name: "Aquaguard Designo UTC RO+UV 2X", amc_price: "₹3,199/year", amc_expiry: "05 Jun 2026", amc_status: "Expiring Soon" },
    ],
  },
  "7654321098": {
    name: "Amit Verma",
    products: [
      { name: "Aquaguard Enrich Marvel RO+UV Copper",  amc_price: "₹2,799/year", amc_expiry: "22 Apr 2026", amc_status: "Active" },
      { name: "Aquaguard Alkaline NXT RO+UV+UF",       amc_price: "₹2,999/year", amc_expiry: "18 May 2026", amc_status: "Expiring Soon" },
    ],
  },
};

const OTP={
  "9664162569":["1105","2213"]
}

// amc plan ka database 
const AMC_PLANS = {
  "Base": {
    "price": "₹1999/year",
    "details": [
      "Unlimited breakdown visits",
      "25% discount on Consumable filter kit",
    ],
  },
  "Silver": {
    "price": "₹2999/year",
    "details": [  
      "Unlimited breakdown visits",
      "1 maintenance visit",
      "Free UV kit replacement",
      "50% discount on RO filter",
      "10% discount on electronic repair",
    ],
  },
  "Gold": {
    "price": "₹3999/year",
    "details": [
      "Unlimited breakdown visits",
      "2 maintenance visits",
      "Free consumable filter kit yearly",
      "Free electronic damage repair",
    ],
  },
  "Platinum": {
    "price": "₹4999/year",
    "details": [
      "3 maintenance visits",
      "Unlimited breakdown visits",
      "Free consumable filter kit yearly",
      "Free electronic damage repair",
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

// to know hw many dats remain from know 
function getDaysRemaining(expiryDate) {
  const today = new Date();
  const expiry = new Date(expiryDate);

  // time remove (midnight compare)
  today.setHours(0,0,0,0);
  expiry.setHours(0,0,0,0);

  const diffTime = expiry - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}
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
  "amc","renew","confirm","cancel","complaint","register","status","ticket","buy","product","demo","purchase",
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
function mainMenu() { return { msgs: [{ from: "bot", text: "Please choose an option:", options: MAIN_OPTIONS }], next: { flow: "menu",cancelCount:0 } }; }
function fallback() {
  return {
   ai:true
    // msgs: [{ from: "bot", text: "Hmm, I didn't quite catch that. Let me take you back to the main menu! 😊\n\nPlease choose an option:", options: MAIN_OPTIONS }],
    // next: { flow: "menu" },
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
    // 🔥 GLOBAL MENU HANDLER
  if (
    txt.includes("menu") ||
    txt.includes("main menu") ||
    txt.includes("home") ||
    txt.includes("back")
  ) {
    return mainMenu();
  }

// global handler 
  if (
    txt==="nothing" ||
    txt==="no"||
    txt==="nope" ||
    txt==="exit"||
    txt==="that's all" ||
    txt==="thats all"
  ) {
      const menu = mainMenu(); // 👈 get full menu response
    return {
      msgs: [{
        from: "bot",
        text: `👍 You're all set${state.user ? ", " + state.user.name : ""}!

If you need any help in future:
• Complaint Status
• AMC Renewal
• Service Request

Just type *Hi* anytime 💧

Have a great day! 😊`
      },
            ...menu.msgs   // 👈 spread menu messages properly
  ],  // next: { flow: "menu" }\
    next: menu.next

    };
  }



  const FREE_TEXT_FLOWS = ["complaint_issue", "buy_mobile_collect", "buy_name_collect",
  "buy_otp_verify",
  "buy_pincode_collect",];

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
    // if (state.flow === "amc_phone") {
    //   const phone = cleanPhone(raw);
    //   // when phone number send it will say to enter the otp 

    //   if (phone.length === 10) {
    //     const user = USER_DB[phone];
        
    //     if (!user) return { msgs: [{ from: "bot", text: `❌ No account found for **${phone}**. Please check the number or contact our helpline.` }], next: state };

    //     return {
    //       msgs: [{ from: "bot", text: `✅ Welcome back, **${user.name}**! We found **${user.products.length}** registered product(s).\n\nSelect a product to view AMC details:`, options: user.products.map((p, i) => `${i + 1}. ${p.name}`) }],
    //       next: { flow: "amc_select", phone, user },
    //     };
    //   }
    //   return { msgs: [{ from: "bot", text: "Please enter a valid **10-digit mobile number**." }], next: state };
    // }
// for otp sending after geeting the phone number 
const AMC_FLOWS = [
  "amc_phone",
  "amc_otp",
  "amc_select",
  "amc_plan",
  "amc_plan_select",
  "amc_payment"
];
if (state.flow === "amc_phone") {
  const phone = cleanPhone(raw);
  
  if (phone.length === 10) {
    const user = USER_DB[phone];
    if (!user)
      return { msgs: [{ from: "bot", text: `❌ No account found for ${phone}` }], next: state };
    
    return {
      msgs: [{ from: "bot", text: "📲 OTP sent to your mobile. Please enter OTP." }],
      next: { flow: "amc_otp", phone, user },
    };
  }
  
  return { msgs: [{ from: "bot", text: "Enter valid 10-digit number" }], next: state };
}

// to verify the otp selection 
if (state.flow === "amc_otp") {
  const validOtps = OTP[state.phone] || [];
  
  if (validOtps.includes(txt)) {
        const productCount = state.user.products.length;

    return {
      msgs: [{
        from: "bot",
        text: `✅ OTP Verified!\n\nHi **${state.user.name}** 👋  
We have your **${productCount} registered product${productCount > 1 ? "s" : ""}** with us.  
Please select a product for renewal 👇`,
        // text: `✅ OTP Verified!\n\nWelcome ${productCount}  **${state.user.name}**. Select product for AMC:`,
        options: state.user.products.map((p, i) => `${i + 1}. ${p.name}    ...... exp ${getDaysRemaining(p.amc_expiry)} days`),
      }],
      next: { flow: "amc_select", phone: state.phone, user: state.user },
    };
  }
  
  return { msgs: [{ from: "bot", text: "❌ Invalid OTP. Try again." }], next: state };
}


// amc select 
if (state.flow === "amc_select") {
  const idx = matchUserProduct(state.user.products, txt);

  if (idx !== -1) {
    const p = state.user.products[idx];

    return {
      msgs: [{
        from: "bot",
        // text: `📋 **AMC Details**\n\n🔧 Product: ${p.name}\n💰 AMC Price: ${p.amc_price}\n📅 Expiry Date: ${p.amc_expiry}\n${emoji} Status: **${p.amc_status}**\n\nWould you like to renew this AMC?`,

        text: `📋 Product Selected: **${p.name}**\n\n📅 Expiry Date: **${p.amc_expiry}**\n\nTo avoid service delays, choose your AMC plan now 👇:`,
        options: Object.keys(AMC_PLANS).map((p,i)=>`${i+1}. ${p}`),
      }],
      next: { ...state, flow: "amc_plan_select", selectedProduct: p },
    };
  }

  return {
    msgs: [{
      from: "bot",
      text: "Please select valid product",
      options: state.user.products.map((p, i) => `${i + 1}. ${p.name}`)
    }],
    next: state
  };

}

// to select amc plan 
// if (state.flow === "amc_plan_select") {
//   const plans = Object.keys(AMC_PLANS);

//   // match by index OR keyword
//   const idx = matchItem(plans, txt);

//   if (idx !== -1) {
//     const plan = plans[idx];
//     const p = AMC_PLANS[plan];

//     return {
//       msgs: [{
//         from: "bot",
//         text:
//           `📋 **${plan} Plan**\n💰 Price: ${p.price}\n\n` +
//           p.details.map(d => `✔ ${d}`).join("\n") +
//           "\n\nConfirm purchase?",
//         options: ["✅ Confirm", "❌ Cancel"],
//       }],
//       next: { ...state, flow: "amc_payment", selectedPlan: plan },
//     };
//   }

//   return {
//     msgs: [{
//       from: "bot",
//       text: "Please select a valid AMC plan:",
//       options: plans.map((p, i) => `${i + 1}. ${p}`)
//     }],
//     next: state
//   };
// }
if (state.flow === "amc_plan_select") {
  const plans = Object.keys(AMC_PLANS);

  // 1️⃣ Match by number
  let idx = matchByIndex(plans, txt);

  // 2️⃣ Direct keyword match (MOST reliable)
  if (idx === -1) {
    const foundPlan = plans.find(p =>
      txt.includes(p.toLowerCase()) ||
      txt.includes(p.toLowerCase() + " plan") ||
      txt.includes(p.toLowerCase() + " amc")
    );
    if (foundPlan) idx = plans.indexOf(foundPlan);
  }

  if (idx !== -1) {
    const plan = plans[idx];
    const p = AMC_PLANS[plan]; 

    return {
      msgs: [{
        from: "bot",
        text:
          `📋 **${plan} Plan**\n💰 Price: ${p.price}\n\n` +   
          p.details.map(d => `✔ ${d}`).join("\n") +
          "\n\nConfirm renewal?",
        options: ["✅ confirm", "❌ Cancel"],
      }],
next: { 
  ...state, 
  flow: "amc_payment", 
  selectedPlan: plan,
  cancelCount: state.cancelCount ?? 0
  // cancelCount:   // cancel count initialise to 0 
},    };
  }

  return {
    msgs: [{
      from: "bot",
      text: "Please type Base, Silver, Gold, or Platinum:",
      options: plans.map((p, i) => `${i + 1}. ${p}`)
    }],
    next: state
  };
}

// for amc payment
// if (state.flow === "amc_payment") {
//   if (txt.includes("confirm") || txt.includes("yes") || txt.includes("renew") || txt.includes("✅")) {
//     return {
//       msgs: [
//         { from: "bot", text: `🎉 **AMC Renewal Initiated!**\n\nA secure payment link for **${state.selectedProduct.amc_price}** has been sent to your registered mobile via SMS.\n\nThank you for choosing Aquaguard! 💧` },
//         menuPrompt(),
//       ],
//       next: { flow: "menu" },
//     };
//   }
//   else if(txt.includes("cancel") || txt.includes("next option")){
        
//   }
  
//   return { msgs: [{ from: "bot", text: "Cancelled." }, menuPrompt()], next: { flow: "menu" } };
// }

if (state.flow === "amc_payment") {

  // ✅ CONFIRM
  if (
    txt.includes("confirm") ||
    txt.includes("yes") ||
    txt.includes("renew") ||
    txt.includes("✅")
  ) {
    return {
      msgs: [
        {
          from: "bot",
          text: `🎉 **AMC Renewal Initiated!**
A secure payment link for **${AMC_PLANS[state.selectedPlan].price}** has been sent to your registered mobile via SMS.

Thank you for choosing Aquaguard! 💧`
        },
        menuPrompt(),
      ],
      next: { flow: "menu" },
    };
  }

  // ❌ CANCEL → Show Plans Again (Max 3 Times)
  // if (txt.includes("cancel") || txt.includes("❌")) {

  //   const newCancelCount = (state.cancelCount || 0) + 1;

  //   // If less than 3 attempts → show plans again
  //   if (newCancelCount < 3) {
  //     const plans = Object.keys(AMC_PLANS);

  //     return {
  //       msgs: [{
  //         from: "bot",
  //         text: `No worries 😊 You can choose another plan below 👇`,
  //         options: plans.map((p, i) => `${i + 1}. ${p}`)
  //       }],
  //       next: { 
  //         ...state, 
  //         flow: "amc_plan_select", 
  //         cancelCount: newCancelCount 
  //       },
  //     };
  //   }

  //   // After 3 cancels → Exit
  //   return {
  //     msgs: [
  //       { from: "bot", text: "No problem 👍 You can renew AMC anytime from the main menu." },
  //       menuPrompt(),
  //     ],
  //     next: { flow: "menu" },
  //   };
  // }
if (txt.includes("cancel") || txt.includes("❌")) {

  const newCancelCount = (state.cancelCount || 0) + 1;

  // Less than 3 attempts
  if (newCancelCount < 3) {
    const plans = Object.keys(AMC_PLANS);

    return {
      msgs: [{
        from: "bot",
        text: `No worries 😊 You can choose another plan below 👇`,
        options: plans.map((p, i) => `${i + 1}. ${p}`)
      }],
      next: { 
        ...state,
        flow: "amc_plan_select",
        cancelCount: newCancelCount
      }
    };
  }

  // After 3 cancels → Exit properly
  return {
    msgs: [
      { 
        from: "bot", 
        text: "No problem 👍 You can renew AMC anytime from the main menu." 
      },
      menuPrompt()
    ],
    next: { 
      flow: "menu",
      cancelCount: 0   // ✅ RESET IT HERE
    }
  };
}






  return {
    msgs: [{ from: "bot", text: "Please choose Confirm or Cancel." }],
    next: state
  };



}


  //   if (txt.includes("yes") || txt.includes("renew") || txt.includes("✅")) {
        //     return {
          //       msgs: [
            //         { from: "bot", text: `🎉 **AMC Renewal Initiated!**\n\nA secure payment link for **${state.selectedProduct.amc_price}** has been sent to your registered mobile via SMS.\n\nThank you for choosing Aquaguard! 💧` },
            //         menuPrompt(),
            //       ],
            //       next: { flow: "menu" },
            //     };
            //   }
            //   return { msgs: [{ from: "bot", text: "No problem! We're here whenever you're ready. 😊" }, menuPrompt()], next: { flow: "menu" } };
            // }
            
// for amc plan 
// if (state.flow === "amc_plan") {
//   return {
//     msgs: [{
//       from: "bot",
//       text: `🛠 Choose AMC plan for **${state.selectedProduct.name}**`,
//       options: Object.keys(AMC_PLANS),
//     }],
//     next: { ...state, flow: "amc_plan_select" },
//   };
// }






// if (state.flow === "amc_select") {
//   const idx = matchUserProduct(state.user.products, txt);
//   if (idx !== -1) {
//     const p = state.user.products[idx];
//     const emoji = p.amc_status === "Active" ? "🟢" : "🟡";
//     return {
//           msgs: [{
//             from: "bot",
//             text: `📋 **AMC Details**\n\n🔧 Product: ${p.name}\n💰 AMC Price: ${p.amc_price}\n📅 Expiry Date: ${p.amc_expiry}\n${emoji} Status: **${p.amc_status}**\n\nWould you like to renew this AMC?`,
//             options: ["✅ Yes, Renew Now", "❌ No, Go Back"],
//           }],
//           next: { ...state, flow: "amc_plan", selectedProduct: p },
//         };
//       }
//       const opts = state.user.products.map((p, i) => `${i + 1}. ${p.name}`);
//       return { msgs: [{ from: "bot", text: "Please select a valid product from your list:", options: opts }], next: state };
//     }

    
  // if (!AMC_FLOWS.includes(state.flow) && FLAT_PRODUCTS[txt]) {
  //      return productDetails()
  //   }
    
    // if (state.flow === "amc_confirm") {
      //   if (txt.includes("yes") || txt.includes("renew") || txt.includes("✅")) {
        //     return {
          //       msgs: [
            //         { from: "bot", text: `🎉 **AMC Renewal Initiated!**\n\nA secure payment link for **${state.selectedProduct.amc_price}** has been sent to your registered mobile via SMS.\n\nThank you for choosing Aquaguard! 💧` },
            //         menuPrompt(),
            //       ],
            //       next: { flow: "menu" },
            //     };
            //   }
            //   return { msgs: [{ from: "bot", text: "No problem! We're here whenever you're ready. 😊" }, menuPrompt()], next: { flow: "menu" } };
            // }
            
 // ══════════════════════════════════════════
/*

 const phone = cleanPhone(raw);
  
  if (phone.length === 10) {
    const user = USER_DB[phone];
    if (!user)
      return { msgs: [{ from: "bot", text: `❌ No account found for ${phone}` }], next: state };
    
    return {
      msgs: [{ from: "bot", text: "📲 OTP sent to your mobile. Please enter OTP." }],
      next: { flow: "amc_otp", phone, user },
    };
  }

========================

===============
*/


 //  FLOW 2 — REGISTER COMPLAINT
  //           // ══════════════════════════════════════════
  //           if (state.flow === "complaint_mobile") {
  //             const phone = cleanPhone(raw);
  //             if (phone.length === 10) {
  //     const user = USER_DB[phone];
  //     if (!user) return { msgs: [{ from: "bot", text: `❌ No account found for **${phone}**. Please check the number or contact our helpline.` }], next: state };
  //     return {
  //       msgs: [{ from: "bot", text: `✅ Hi **${user.name}**! Which product would you like to raise a complaint for?`, options: user.products.map((p, i) => `${i + 1}. ${p.name}`) }],
  //       next: { flow: "complaint_product", phone, userName: user.name, userProducts: user.products },
  //     };
  //   }
  //   return { msgs: [{ from: "bot", text: "Please enter a valid **10-digit mobile number**." }], next: state };
  // }

// complaint mobile
if (state.flow === "complaint_mobile") {
  const phone = cleanPhone(raw);

  if (phone.length === 10) {
    const user = USER_DB[phone];

    if (!user)
      return {
        msgs: [{ from: "bot", text: `❌ No account found for ${phone}` }],
        next: state
      };

    return {
      msgs: [{ from: "bot", text: "📲 OTP sent to your mobile. Please enter OTP." }],
      next: { flow: "complaint_otp", phone, user },
    };
  }

  return {
    msgs: [{ from: "bot", text: "Enter valid 10-digit number" }],
    next: state
  };
}


// complaint otp
if (state.flow === "complaint_otp") {
  const validOtps = OTP[state.phone] || [];

  if (validOtps.includes(txt.trim())) {
    const productCount = state.user.products.length;
      return {
      msgs: [{
        from: "bot",
        text: `✅ OTP Verified!\n\nHi **${state.user.name}** 👋  
We have your **${productCount} registered product${productCount > 1 ? "s" : ""}** with us.  
Please select a product for complaint 👇`,
        // text: `✅ OTP Verified!\n\nHi **${state.user.name}**. U  have ${productCount>1?} Select product for complaint:`,
        options: state.user.products.map((p, i) => `${i + 1}. ${p.name}`),
      }],
      next: { 
        flow: "complaint_product", 
        phone: state.phone, 
        user: state.user 
      },
    };
  }

  return {
    msgs: [{ from: "bot", text: "❌ Invalid OTP. Try again." }],
    next: state
  };
}


// complaint product
if (state.flow === "complaint_product") {
  const idx = matchUserProduct(state.user.products, txt);

  if (idx !== -1) {
    return {
      msgs: [{
        from: "bot",
        text: `Got it! Please describe your issue with **${state.user.products[idx].name}**:`
      }],
      next: {
        ...state,
        flow: "complaint_issue",
        selectedProduct: state.user.products[idx].name
      },
    };
  }

  return {
    msgs: [{
      from: "bot",
      text: "Please select a valid product:",
      options: state.user.products.map((p, i) => `${i + 1}. ${p.name}`)
    }],
    next: state
  };
}


// complaint issue
if (state.flow === "complaint_issue") {
  const ticket = genTicket();
  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  SESSION_TICKETS[ticket] = {
    mobile: state.phone,
    product: state.selectedProduct,
    issue: raw,
    status: "⏳ Under review by our technical team.",
    date: today
  };

  return {
    msgs: [
      {
        from: "bot",
        text: `✅ **Complaint Registered Successfully!**
        
🎫 Ticket No: **${ticket}**
👤 Name: ${state.user.name}
📱 Mobile: ${"xxxxxx"+state.phone.slice(-4)}
🔧 Product: ${state.selectedProduct}
📝 Issue: ${raw}

⏱️ Our team will contact you within **24 hours**.`
      },
      menuPrompt(),
    ],
    next: { flow: "menu" },
  };
}


// 
// if (state.flow === "complaint_mobile") {
//   const phone = cleanPhone(raw);

//   if (phone.length === 10) {
//     const user = USER_DB[phone];

//     if (!user)
//       return { 
//         msgs: [{ from: "bot", text: `❌ No account found for ${phone}` }],
//         next: state 
//       };

//     return {
//       msgs: [{ from: "bot", text: "📲 OTP sent to your mobile. Please enter OTP." }],
//       next: { flow: "complaint_otp", phone, user },  // ✅ store full user
//     };
//   }

//   return { 
//     msgs: [{ from: "bot", text: "Enter valid 10-digit number" }],
//     next: state 
//   };
// }
// // complaint otp 
// if (state.flow === "complaint_otp") {
//   const validOtps = OTP[state.phone] || [];

//   if (validOtps.includes(txt)) {
//     return {
//       msgs: [{
//         from: "bot",
//         text: `✅ OTP Verified!\n\nWelcome **${state.user.name}**. Select product for complaint:`,
//         options: state.user.products.map((p, i) => `${i + 1}. ${p.name}`),
//       }],
//       next: { flow: "complaint_product", phone: state.phone, user: state.user },
//     };
//   }

//   return { 
//     msgs: [{ from: "bot", text: "❌ Invalid OTP. Try again." }],
//     next: state 
//   };
// }


//   if (state.flow === "complaint_product") {
//     const idx = matchUserProduct(state.userProducts, txt);
//     if (idx !== -1) {
//       return {
//         msgs: [{ from: "bot", text: `Got it! Please describe your issue with **${state.userProducts[idx].name}**:` }],
//         next: { ...state, flow: "complaint_issue", selectedProduct: state.userProducts[idx].name },
//       };
//     }
//     return { msgs: [{ from: "bot", text: "Please select a valid product:", options: state.userProducts.map((p, i) => `${i + 1}. ${p.name}`) }], next: state };
//   }

//   if (state.flow === "complaint_issue") {
//     const ticket = genTicket();
//     const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
//     SESSION_TICKETS[ticket] = { mobile: state.phone, product: state.selectedProduct, issue: raw, status: "⏳ Under review by our technical team.", date: today };
//     return {
//       msgs: [
//         { from: "bot", text: `✅ **Complaint Registered Successfully!**\n\n🎫 Ticket No: **${ticket}**\n👤 Name: ${state.userName}\n📱 Mobile: ${state.phone}\n🔧 Product: ${state.selectedProduct}\n📝 Issue: ${raw}\n\n⏱️ Our team will contact you within **24 hours**.` },
//         menuPrompt(),
//       ],
//       next: { flow: "menu" },
//     };
//   }

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

  // ask phone and name at beginning 

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
        next: { ...state,flow: "buy_subcategory", selectedCategory: cat },
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
        next: { ...state,flow: "buy_product", selectedCategory: state.selectedCategory, selectedSubcategory: sub },
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
        next: { ...state,flow: "buy_confirm", selectedCategory: state.selectedCategory, selectedSubcategory: state.selectedSubcategory, selectedProduct: prodName },
      };
    }
    return { msgs: [{ from: "bot", text: "Please select a valid product:", options: prods.map((p, i) => `${i + 1}. ${p}`) }], next: state };
  }

  // Step 4 — demo / purchase / back
  if (state.flow === "buy_confirm") {
    if (txt.includes("main menu") || txt.includes("🏠") || txt.includes("home")) return mainMenu();
    else if (txt.includes("back") || txt.includes("sub-categor") || txt.includes("⬅")) {
      const cat = CATALOGUE[state.selectedCategory];
      const subs = Object.keys(cat.subcategories);
      return {
        msgs: [{ from: "bot", text: `Back to **${state.selectedCategory}** sub-categories. Please select one:`, options: subs.map((s, i) => `${i + 1}. ${cat.subcategories[s].icon} ${s}`) }],
        next: {...state,flow: "buy_subcategory", selectedCategory: state.selectedCategory },
      };
    }
    else if (txt.includes("demo") || txt.includes("📅") || txt.includes("purchase") || txt.includes("🛍")) {

  const action =
    (txt.includes("demo") || txt.includes("📅"))
      ? "demo"
      : "purchase";

  return {
    msgs: [{
      from: "bot",
      text: `Great! Please enter your **full name** to continue:`
    }],
    next: {
      ...state,
      flow: "buy_name_collect",
      buyAction: action
    }
  };
}
    return { msgs: [{ from: "bot", text: "Please choose an option above." }], next: state };
  }

// get the name 
if (state.flow === "buy_name_collect") {

  const name = raw.trim();

  if (/^[a-zA-Z\s]{2,}$/.test(name)) {
    return {
      msgs: [{
        from: "bot",
        text: `Thanks **${name}** 😊\n\nPlease enter your **10-digit mobile number**:`
      }],
      next: {
        ...state,
        flow: "buy_mobile_collect",
        customerName: name
      }
    };
  }

  return {
    msgs: [{ from: "bot", text: "Please enter a valid name." }],
    next: state
  };
}


// verify the mobile otp to answer
if (state.flow === "buy_mobile_collect") {

  const phone = cleanPhone(raw);

  if (phone.length === 10) {

    const generatedOtp = "1105"; // temporary static for testing

    return {
      msgs: [{
        from: "bot",
        text: `📲 OTP has been sent to **${phone}**.\n\nPlease enter the **4-digit OTP** to verify your number is working:`
      }],
      next: {
        ...state,
        flow: "buy_otp_verify",
        customerPhone: phone,
        generatedOtp
      }
    };
  }

  return {
    msgs: [{ from: "bot", text: "Please enter a valid 10-digit mobile number." }],
    next: state
  };
}

// otpverify
if (state.flow === "buy_otp_verify") {

  if (raw.trim() === state.generatedOtp) {
    return {
      msgs: [{
        from: "bot",
        text: `✅ Mobile number verified successfully!\n\nPlease enter your **6-digit pincode** to locate your address:`
      }],
      next: {
        ...state,
        flow: "buy_pincode_collect"
      }
    };
  }

  return {
    msgs: [{ from: "bot", text: "❌ Incorrect OTP. Please try again." }],
    next: state
  };
}
// collect the pincode to verify the location
if (state.flow === "buy_pincode_collect") {

  const pin = raw.trim();

  if (/^\d{6}$/.test(pin)) {
    return {
      msgs: [
        {
          from: "bot",
          text:
`🎉 Thank you **${state.customerName}**!

Our executive will reach to you within **2-4 hours** regarding:
            **Demo**

🛒 **${state.selectedProduct}**
📞 ${state.customerPhone}
📍 Pincode: ${pin}

We appreciate your interest in Aquaguard 💧`
        },
        menuPrompt()
      ],
      next: { flow: "menu" }
    };
  }

  return {
    msgs: [{ from: "bot", text: "Please enter a valid 6-digit pincode." }],
    next: state
  };
}


  // Step 5 — collect mobile for demo/purchase
  if (state.flow === "buy_mobile_collect") {
    const phone = cleanPhone(raw);
    if (phone.length === 10) {
      return {
        msgs: [
          { from: "bot", text: `📞 Perfect! Our executivereach You **${phone}** within **2 hours** regarding:\n\n🛒 **${state.selectedProduct}**\n💰 ${FLAT_PRODUCTS[state.selectedProduct]?.price || ""}\n\nThank you for choosing Aquaguard / Forbes! 💧` },
          menuPrompt(),
        ],
        next: {flow: "menu" },
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

/*

curl https://api.groq.com/openai/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer " \
  -d '{
    "model": "llama-3.1-8b-instant",
    "messages": [
      {"role": "user", "content": "Say hello"}
    ]
  }'

*/
const prompt_msg=`
You are strictly an Aquaguard (Eureka Forbes) Sales & Service Assistant.
You are allowed to answer ONLY about:
- AMC Renewal
- Complaint Registration
- Complaint Status
- Product Purchase / Enquiry

If the user asks anything unrelated:
1. Reply in maximum 2 sentences.
2. Politely say you only assist with Aquaguard services.
3. Redirect to the 4 main options.

Do NOT:
- Give general knowledge
- Answer unrelated questions
- Provide coding help
- Discuss politics or entertainment
- Continue off-topic conversations

Keep responses:
- Under 80 words
- Clear
- Professional
- Focused on closing the task
`;
async function askAI(userMessage) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer ",
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: prompt_msg },
        // { role: "system", content: "You are Aquaguard support assistant. answer user query and politely redirect it ." },
        { role: "user", content: userMessage }
      ],
    }),
  });

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "Sorry, AI failed.";
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

  // function triggerBot(userInput, forcedState) {
  //   const currentState = forcedState || chatState;
  //   const { msgs, next } = getResponse(currentState, userInput);
  //   setTyping(true);
  //   setQuickOptions([]);
  //   setTimeout(() => {
  //     setTyping(false);
  //     setMessages((prev) => [...prev, ...msgs]);
  //     setChatState(next);
  //     const lastWithOpts = [...msgs].reverse().find((m) => m.options);
  //     setQuickOptions(lastWithOpts?.options || []);
  //     inputRef.current?.focus();
  //   }, 650);
  // }


function triggerBot(userInput, forcedState) {
  const currentState = forcedState || chatState;
  const response = getResponse(currentState, userInput);

  setTyping(true);
  setQuickOptions([]);

  // ⭐ AI fallback
  if (response?.ai) {
    askAI(userInput).then((aiText) => {
      setTyping(false);

      // const aiMsg = [{ from: "bot", text: aiText }];
          const aiMsg = [
      {
        from: "bot",
        text:
          aiText +
          "\n\nMain Aquaguard support assistant hoon.  👇",
        options: MAIN_OPTIONS,
      },
    ];
      setMessages((prev) => [...prev, ...aiMsg]);
      setChatState({ flow: "menu" });
      // setQuickOptions([]);
          setQuickOptions(MAIN_OPTIONS);
      inputRef.current?.focus();
    });
    return;
  }

  // ⭐ Normal flow (unchanged)
  const { msgs, next } = response;

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
          {/* 📌 <strong>Test phones:</strong> 9876543210 · 8765432109 · 7654321098&nbsp;&nbsp;|&nbsp;&nbsp;<strong>Test tickets:</strong> AQ123456 · AQ234567 · AQ345678 */}
  
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

777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
import { useState, useRef, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════════
//  CATALOGUE DB  →  Category  →  Sub-category  →  Products[]
// ═══════════════════════════════════════════════════════════════════
/*




*/


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

  "9664162569": {
    name: "Prakash",
    products: [
      { name: "Aquaguard Enrich Nexen 2X RO+UV", amc_price: "₹2,499/year", amc_expiry: "15 Mar 2026", amc_status: "Expiring Soon" },
      { name: "Aquaguard Designo UTC RO+UV 2X",   amc_price: "₹3,199/year", amc_expiry: "30 Jul 2026", amc_status: "Active" },
    ],
  },
  "8765432109": {
    name: "Priya Mehta",
    products: [
      { name: "Aquaguard Designo UTC RO+UV 2X", amc_price: "₹3,199/year", amc_expiry: "05 Jun 2026", amc_status: "Expiring Soon" },
    ],
  },
  "7654321098": {
    name: "Amit Verma",
    products: [
      { name: "Aquaguard Enrich Marvel RO+UV Copper",  amc_price: "₹2,799/year", amc_expiry: "22 Apr 2026", amc_status: "Active" },
      { name: "Aquaguard Alkaline NXT RO+UV+UF",       amc_price: "₹2,999/year", amc_expiry: "18 May 2026", amc_status: "Expiring Soon" },
    ],
  },
};

const OTP={
  "9664162569":["1105","2213"]
}

// amc plan ka database 
const AMC_PLANS = {
  "Base": {
    "price": "₹1999/year",
    "details": [
      "Unlimited breakdown visits",
      "25% discount on Consumable filter kit",
    ],
  },
  "Silver": {
    "price": "₹2999/year",
    "details": [  
      "Unlimited breakdown visits",
      "1 maintenance visit",
      "Free UV kit replacement",
      "50% discount on RO filter",
      "10% discount on electronic repair",
    ],
  },
  "Gold": {
    "price": "₹3999/year",
    "details": [
      "Unlimited breakdown visits",
      "2 maintenance visits",
      "Free consumable filter kit yearly",
      "Free electronic damage repair",
    ],
  },
  "Platinum": {
    "price": "₹4999/year",
    "details": [
      "3 maintenance visits",
      "Unlimited breakdown visits",
      "Free consumable filter kit yearly",
      "Free electronic damage repair",
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

// to know hw many dats remain from know 
function getDaysRemaining(expiryDate) {
  const today = new Date();
  const expiry = new Date(expiryDate);

  // time remove (midnight compare)
  today.setHours(0,0,0,0);
  expiry.setHours(0,0,0,0);

  const diffTime = expiry - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}
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
  "amc","renew","confirm","cancel","complaint","register","status","ticket","buy","product","demo","purchase",
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
   ai:true
    // msgs: [{ from: "bot", text: "Hmm, I didn't quite catch that. Let me take you back to the main menu! 😊\n\nPlease choose an option:", options: MAIN_OPTIONS }],
    // next: { flow: "menu" },
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
    // if (state.flow === "amc_phone") {
    //   const phone = cleanPhone(raw);
    //   // when phone number send it will say to enter the otp 

    //   if (phone.length === 10) {
    //     const user = USER_DB[phone];
        
    //     if (!user) return { msgs: [{ from: "bot", text: `❌ No account found for **${phone}**. Please check the number or contact our helpline.` }], next: state };

    //     return {
    //       msgs: [{ from: "bot", text: `✅ Welcome back, **${user.name}**! We found **${user.products.length}** registered product(s).\n\nSelect a product to view AMC details:`, options: user.products.map((p, i) => `${i + 1}. ${p.name}`) }],
    //       next: { flow: "amc_select", phone, user },
    //     };
    //   }
    //   return { msgs: [{ from: "bot", text: "Please enter a valid **10-digit mobile number**." }], next: state };
    // }
// for otp sending after geeting the phone number 
const AMC_FLOWS = [
  "amc_phone",
  "amc_otp",
  "amc_select",
  "amc_plan",
  "amc_plan_select",
  "amc_payment"
];
if (state.flow === "amc_phone") {
  const phone = cleanPhone(raw);
  
  if (phone.length === 10) {
    const user = USER_DB[phone];
    if (!user)
      return { msgs: [{ from: "bot", text: `❌ No account found for ${phone}` }], next: state };
    
    return {
      msgs: [{ from: "bot", text: "📲 OTP sent to your mobile. Please enter OTP." }],
      next: { flow: "amc_otp", phone, user },
    };
  }
  
  return { msgs: [{ from: "bot", text: "Enter valid 10-digit number" }], next: state };
}

// to verify the otp selection 
if (state.flow === "amc_otp") {
  const validOtps = OTP[state.phone] || [];
  
  if (validOtps.includes(txt)) {
    return {
      msgs: [{
        from: "bot",
        text: `✅ OTP Verified!\n\nWelcome **${state.user.name}**. Select product for AMC:`,
        options: state.user.products.map((p, i) => `${i + 1}. ${p.name}    ...... exp ${getDaysRemaining(p.amc_expiry)} days`),
      }],
      next: { flow: "amc_select", phone: state.phone, user: state.user },
    };
  }
  
  return { msgs: [{ from: "bot", text: "❌ Invalid OTP. Try again." }], next: state };
}


// amc select 
if (state.flow === "amc_select") {
  const idx = matchUserProduct(state.user.products, txt);

  if (idx !== -1) {
    const p = state.user.products[idx];

    return {
      msgs: [{
        from: "bot",
        // text: `📋 **AMC Details**\n\n🔧 Product: ${p.name}\n💰 AMC Price: ${p.amc_price}\n📅 Expiry Date: ${p.amc_expiry}\n${emoji} Status: **${p.amc_status}**\n\nWould you like to renew this AMC?`,

        text: `📋 Product Selected: **${p.name}**\n\n📅 Expiry Date: **${p.amc_expiry}**\n\nTo avoid service delays, choose your AMC plan now 👇:`,
        options: Object.keys(AMC_PLANS).map((p,i)=>`${i+1}. ${p}`),
      }],
      next: { ...state, flow: "amc_plan_select", selectedProduct: p },
    };
  }

  return {
    msgs: [{
      from: "bot",
      text: "Please select valid product",
      options: state.user.products.map((p, i) => `${i + 1}. ${p.name}`)
    }],
    next: state
  };

}

// to select amc plan 
// if (state.flow === "amc_plan_select") {
//   const plans = Object.keys(AMC_PLANS);

//   // match by index OR keyword
//   const idx = matchItem(plans, txt);

//   if (idx !== -1) {
//     const plan = plans[idx];
//     const p = AMC_PLANS[plan];

//     return {
//       msgs: [{
//         from: "bot",
//         text:
//           `📋 **${plan} Plan**\n💰 Price: ${p.price}\n\n` +
//           p.details.map(d => `✔ ${d}`).join("\n") +
//           "\n\nConfirm purchase?",
//         options: ["✅ Confirm", "❌ Cancel"],
//       }],
//       next: { ...state, flow: "amc_payment", selectedPlan: plan },
//     };
//   }

//   return {
//     msgs: [{
//       from: "bot",
//       text: "Please select a valid AMC plan:",
//       options: plans.map((p, i) => `${i + 1}. ${p}`)
//     }],
//     next: state
//   };
// }
if (state.flow === "amc_plan_select") {
  const plans = Object.keys(AMC_PLANS);

  // 1️⃣ Match by number
  let idx = matchByIndex(plans, txt);

  // 2️⃣ Direct keyword match (MOST reliable)
  if (idx === -1) {
    const foundPlan = plans.find(p =>
      txt.includes(p.toLowerCase()) ||
      txt.includes(p.toLowerCase() + " plan") ||
      txt.includes(p.toLowerCase() + " amc")
    );
    if (foundPlan) idx = plans.indexOf(foundPlan);
  }

  if (idx !== -1) {
    const plan = plans[idx];
    const p = AMC_PLANS[plan]; 

    return {
      msgs: [{
        from: "bot",
        text:
          `📋 **${plan} Plan**\n💰 Price: ${p.price}\n\n` +   
          p.details.map(d => `✔ ${d}`).join("\n") +
          "\n\nConfirm renewal?",
        options: ["✅ confirm", "❌ Cancel"],
      }],
next: { 
  ...state, 
  flow: "amc_payment", 
  selectedPlan: plan,
  cancelCount: 0  // cancel count initialise to 0 
},    };
  }

  return {
    msgs: [{
      from: "bot",
      text: "Please type Base, Silver, Gold, or Platinum:",
      options: plans.map((p, i) => `${i + 1}. ${p}`)
    }],
    next: state
  };
}

// for amc payment
// if (state.flow === "amc_payment") {
//   if (txt.includes("confirm") || txt.includes("yes") || txt.includes("renew") || txt.includes("✅")) {
//     return {
//       msgs: [
//         { from: "bot", text: `🎉 **AMC Renewal Initiated!**\n\nA secure payment link for **${state.selectedProduct.amc_price}** has been sent to your registered mobile via SMS.\n\nThank you for choosing Aquaguard! 💧` },
//         menuPrompt(),
//       ],
//       next: { flow: "menu" },
//     };
//   }
//   else if(txt.includes("cancel") || txt.includes("next option")){
        
//   }
  
//   return { msgs: [{ from: "bot", text: "Cancelled." }, menuPrompt()], next: { flow: "menu" } };
// }

if (state.flow === "amc_payment") {

  // ✅ CONFIRM
  if (
    txt.includes("confirm") ||
    txt.includes("yes") ||
    txt.includes("renew") ||
    txt.includes("✅")
  ) {
    return {
      msgs: [
        {
          from: "bot",
          text: `🎉 **AMC Renewal Initiated!**
A secure payment link for **${AMC_PLANS[state.selectedPlan].price}** has been sent to your registered mobile via SMS.

Thank you for choosing Aquaguard! 💧`
        },
        menuPrompt(),
      ],
      next: { flow: "menu" },
    };
  }

  // ❌ CANCEL → Show Plans Again (Max 3 Times)
  if (txt.includes("cancel") || txt.includes("❌")) {

    const newCancelCount = (state.cancelCount || 0) + 1;

    // If less than 3 attempts → show plans again
    if (newCancelCount < 3) {
      const plans = Object.keys(AMC_PLANS);

      return {
        msgs: [{
          from: "bot",
          text: `No worries 😊 You can choose another plan below 👇`,
          options: plans.map((p, i) => `${i + 1}. ${p}`)
        }],
        next: { 
          ...state, 
          flow: "amc_plan_select", 
          cancelCount: newCancelCount 
        },
      };
    }

    // After 3 cancels → Exit
    return {
      msgs: [
        { from: "bot", text: "No problem 👍 You can renew AMC anytime from the main menu." },
        menuPrompt(),
      ],
      next: { flow: "menu" },
    };
  }

  return {
    msgs: [{ from: "bot", text: "Please choose Confirm or Cancel." }],
    next: state
  };
}


  //   if (txt.includes("yes") || txt.includes("renew") || txt.includes("✅")) {
        //     return {
          //       msgs: [
            //         { from: "bot", text: `🎉 **AMC Renewal Initiated!**\n\nA secure payment link for **${state.selectedProduct.amc_price}** has been sent to your registered mobile via SMS.\n\nThank you for choosing Aquaguard! 💧` },
            //         menuPrompt(),
            //       ],
            //       next: { flow: "menu" },
            //     };
            //   }
            //   return { msgs: [{ from: "bot", text: "No problem! We're here whenever you're ready. 😊" }, menuPrompt()], next: { flow: "menu" } };
            // }
            
// for amc plan 
if (state.flow === "amc_plan") {
  return {
    msgs: [{
      from: "bot",
      text: `🛠 Choose AMC plan for **${state.selectedProduct.name}**`,
      options: Object.keys(AMC_PLANS),
    }],
    next: { ...state, flow: "amc_plan_select" },
  };
}






// if (state.flow === "amc_select") {
//   const idx = matchUserProduct(state.user.products, txt);
//   if (idx !== -1) {
//     const p = state.user.products[idx];
//     const emoji = p.amc_status === "Active" ? "🟢" : "🟡";
//     return {
//           msgs: [{
//             from: "bot",
//             text: `📋 **AMC Details**\n\n🔧 Product: ${p.name}\n💰 AMC Price: ${p.amc_price}\n📅 Expiry Date: ${p.amc_expiry}\n${emoji} Status: **${p.amc_status}**\n\nWould you like to renew this AMC?`,
//             options: ["✅ Yes, Renew Now", "❌ No, Go Back"],
//           }],
//           next: { ...state, flow: "amc_plan", selectedProduct: p },
//         };
//       }
//       const opts = state.user.products.map((p, i) => `${i + 1}. ${p.name}`);
//       return { msgs: [{ from: "bot", text: "Please select a valid product from your list:", options: opts }], next: state };
//     }

    
  // if (!AMC_FLOWS.includes(state.flow) && FLAT_PRODUCTS[txt]) {
  //      return productDetails()
  //   }
    
    // if (state.flow === "amc_confirm") {
      //   if (txt.includes("yes") || txt.includes("renew") || txt.includes("✅")) {
        //     return {
          //       msgs: [
            //         { from: "bot", text: `🎉 **AMC Renewal Initiated!**\n\nA secure payment link for **${state.selectedProduct.amc_price}** has been sent to your registered mobile via SMS.\n\nThank you for choosing Aquaguard! 💧` },
            //         menuPrompt(),
            //       ],
            //       next: { flow: "menu" },
            //     };
            //   }
            //   return { msgs: [{ from: "bot", text: "No problem! We're here whenever you're ready. 😊" }, menuPrompt()], next: { flow: "menu" } };
            // }
            
 // ══════════════════════════════════════════
/*

 const phone = cleanPhone(raw);
  
  if (phone.length === 10) {
    const user = USER_DB[phone];
    if (!user)
      return { msgs: [{ from: "bot", text: `❌ No account found for ${phone}` }], next: state };
    
    return {
      msgs: [{ from: "bot", text: "📲 OTP sent to your mobile. Please enter OTP." }],
      next: { flow: "amc_otp", phone, user },
    };
  }

========================

===============
*/


 //  FLOW 2 — REGISTER COMPLAINT
  //           // ══════════════════════════════════════════
  //           if (state.flow === "complaint_mobile") {
  //             const phone = cleanPhone(raw);
  //             if (phone.length === 10) {
  //     const user = USER_DB[phone];
  //     if (!user) return { msgs: [{ from: "bot", text: `❌ No account found for **${phone}**. Please check the number or contact our helpline.` }], next: state };
  //     return {
  //       msgs: [{ from: "bot", text: `✅ Hi **${user.name}**! Which product would you like to raise a complaint for?`, options: user.products.map((p, i) => `${i + 1}. ${p.name}`) }],
  //       next: { flow: "complaint_product", phone, userName: user.name, userProducts: user.products },
  //     };
  //   }
  //   return { msgs: [{ from: "bot", text: "Please enter a valid **10-digit mobile number**." }], next: state };
  // }

// complaint mobile
if (state.flow === "complaint_mobile") {
  const phone = cleanPhone(raw);

  if (phone.length === 10) {
    const user = USER_DB[phone];

    if (!user)
      return {
        msgs: [{ from: "bot", text: `❌ No account found for ${phone}` }],
        next: state
      };

    return {
      msgs: [{ from: "bot", text: "📲 OTP sent to your mobile. Please enter OTP." }],
      next: { flow: "complaint_otp", phone, user },
    };
  }

  return {
    msgs: [{ from: "bot", text: "Enter valid 10-digit number" }],
    next: state
  };
}


// complaint otp
if (state.flow === "complaint_otp") {
  const validOtps = OTP[state.phone] || [];

  if (validOtps.includes(txt.trim())) {
    return {
      msgs: [{
        from: "bot",
        text: `✅ OTP Verified!\n\nWelcome **${state.user.name}**. Select product for complaint:`,
        options: state.user.products.map((p, i) => `${i + 1}. ${p.name}`),
      }],
      next: { 
        flow: "complaint_product", 
        phone: state.phone, 
        user: state.user 
      },
    };
  }

  return {
    msgs: [{ from: "bot", text: "❌ Invalid OTP. Try again." }],
    next: state
  };
}


// complaint product
if (state.flow === "complaint_product") {
  const idx = matchUserProduct(state.user.products, txt);

  if (idx !== -1) {
    return {
      msgs: [{
        from: "bot",
        text: `Got it! Please describe your issue with **${state.user.products[idx].name}**:`
      }],
      next: {
        ...state,
        flow: "complaint_issue",
        selectedProduct: state.user.products[idx].name
      },
    };
  }

  return {
    msgs: [{
      from: "bot",
      text: "Please select a valid product:",
      options: state.user.products.map((p, i) => `${i + 1}. ${p.name}`)
    }],
    next: state
  };
}


// complaint issue
if (state.flow === "complaint_issue") {
  const ticket = genTicket();
  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  SESSION_TICKETS[ticket] = {
    mobile: state.phone,
    product: state.selectedProduct,
    issue: raw,
    status: "⏳ Under review by our technical team.",
    date: today
  };

  return {
    msgs: [
      {
        from: "bot",
        text: `✅ **Complaint Registered Successfully!**
        
🎫 Ticket No: **${ticket}**
👤 Name: ${state.user.name}
📱 Mobile: ${"xxxxxx"+state.phone.slice(-4)}
🔧 Product: ${state.selectedProduct}
📝 Issue: ${raw}

⏱️ Our team will contact you within **24 hours**.`
      },
      menuPrompt(),
    ],
    next: { flow: "menu" },
  };
}


// 
// if (state.flow === "complaint_mobile") {
//   const phone = cleanPhone(raw);

//   if (phone.length === 10) {
//     const user = USER_DB[phone];

//     if (!user)
//       return { 
//         msgs: [{ from: "bot", text: `❌ No account found for ${phone}` }],
//         next: state 
//       };

//     return {
//       msgs: [{ from: "bot", text: "📲 OTP sent to your mobile. Please enter OTP." }],
//       next: { flow: "complaint_otp", phone, user },  // ✅ store full user
//     };
//   }

//   return { 
//     msgs: [{ from: "bot", text: "Enter valid 10-digit number" }],
//     next: state 
//   };
// }
// // complaint otp 
// if (state.flow === "complaint_otp") {
//   const validOtps = OTP[state.phone] || [];

//   if (validOtps.includes(txt)) {
//     return {
//       msgs: [{
//         from: "bot",
//         text: `✅ OTP Verified!\n\nWelcome **${state.user.name}**. Select product for complaint:`,
//         options: state.user.products.map((p, i) => `${i + 1}. ${p.name}`),
//       }],
//       next: { flow: "complaint_product", phone: state.phone, user: state.user },
//     };
//   }

//   return { 
//     msgs: [{ from: "bot", text: "❌ Invalid OTP. Try again." }],
//     next: state 
//   };
// }


//   if (state.flow === "complaint_product") {
//     const idx = matchUserProduct(state.userProducts, txt);
//     if (idx !== -1) {
//       return {
//         msgs: [{ from: "bot", text: `Got it! Please describe your issue with **${state.userProducts[idx].name}**:` }],
//         next: { ...state, flow: "complaint_issue", selectedProduct: state.userProducts[idx].name },
//       };
//     }
//     return { msgs: [{ from: "bot", text: "Please select a valid product:", options: state.userProducts.map((p, i) => `${i + 1}. ${p.name}`) }], next: state };
//   }

//   if (state.flow === "complaint_issue") {
//     const ticket = genTicket();
//     const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
//     SESSION_TICKETS[ticket] = { mobile: state.phone, product: state.selectedProduct, issue: raw, status: "⏳ Under review by our technical team.", date: today };
//     return {
//       msgs: [
//         { from: "bot", text: `✅ **Complaint Registered Successfully!**\n\n🎫 Ticket No: **${ticket}**\n👤 Name: ${state.userName}\n📱 Mobile: ${state.phone}\n🔧 Product: ${state.selectedProduct}\n📝 Issue: ${raw}\n\n⏱️ Our team will contact you within **24 hours**.` },
//         menuPrompt(),
//       ],
//       next: { flow: "menu" },
//     };
//   }

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

/*

curl https://api.groq.com/openai/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer " \
  -d '{
    "model": "llama-3.1-8b-instant",
    "messages": [
      {"role": "user", "content": "Say hello"}
    ]
  }'

*/
const prompt_msg=`
You are strictly an Aquaguard (Eureka Forbes) Sales & Service Assistant.
You are allowed to answer ONLY about:
- AMC Renewal
- Complaint Registration
- Complaint Status
- Product Purchase / Enquiry

If the user asks anything unrelated:
1. Reply in maximum 2 sentences.
2. Politely say you only assist with Aquaguard services.
3. Redirect to the 4 main options.

Do NOT:
- Give general knowledge
- Answer unrelated questions
- Provide coding help
- Discuss politics or entertainment
- Continue off-topic conversations

Keep responses:
- Under 80 words
- Clear
- Professional
- Focused on closing the task
`;
async function askAI(userMessage) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer ",
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: prompt_msg },
        // { role: "system", content: "You are Aquaguard support assistant. answer user query and politely redirect it ." },
        { role: "user", content: userMessage }
      ],
    }),
  });

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "Sorry, AI failed.";
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

  // function triggerBot(userInput, forcedState) {
  //   const currentState = forcedState || chatState;
  //   const { msgs, next } = getResponse(currentState, userInput);
  //   setTyping(true);
  //   setQuickOptions([]);
  //   setTimeout(() => {
  //     setTyping(false);
  //     setMessages((prev) => [...prev, ...msgs]);
  //     setChatState(next);
  //     const lastWithOpts = [...msgs].reverse().find((m) => m.options);
  //     setQuickOptions(lastWithOpts?.options || []);
  //     inputRef.current?.focus();
  //   }, 650);
  // }


function triggerBot(userInput, forcedState) {
  const currentState = forcedState || chatState;
  const response = getResponse(currentState, userInput);

  setTyping(true);
  setQuickOptions([]);

  // ⭐ AI fallback
  if (response?.ai) {
    askAI(userInput).then((aiText) => {
      setTyping(false);

      // const aiMsg = [{ from: "bot", text: aiText }];
          const aiMsg = [
      {
        from: "bot",
        text:
          aiText +
          "\n\nMain Aquaguard support assistant hoon.  👇",
        options: MAIN_OPTIONS,
      },
    ];
      setMessages((prev) => [...prev, ...aiMsg]);
      setChatState({ flow: "menu" });
      // setQuickOptions([]);
          setQuickOptions(MAIN_OPTIONS);
      inputRef.current?.focus();
    });
    return;
  }

  // ⭐ Normal flow (unchanged)
  const { msgs, next } = response;

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
          {/* 📌 <strong>Test phones:</strong> 9876543210 · 8765432109 · 7654321098&nbsp;&nbsp;|&nbsp;&nbsp;<strong>Test tickets:</strong> AQ123456 · AQ234567 · AQ345678 */}
  
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



88888888888888888888888888888888888888888888888888888888888888888888
import { useState, useRef, useEffect } from "react";

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

const USER_DB = {
  "9664162569": {
    name: "Prakash",
    products: [
      { name: "Aquaguard Enrich Nexen 2X RO+UV", amc_price: "₹2,499/year", amc_expiry: "15 Mar 2025", amc_status: "Expiring Soon" },
      { name: "Aquaguard Designo UTC RO+UV 2X", amc_price: "₹3,199/year", amc_expiry: "30 Jul 2026", amc_status: "Active" },
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
      { name: "Aquaguard Enrich Marvel RO+UV Copper", amc_price: "₹2,799/year", amc_expiry: "22 Apr 2026", amc_status: "Active" },
      { name: "Aquaguard Alkaline NXT RO+UV+UF", amc_price: "₹2,999/year", amc_expiry: "18 May 2025", amc_status: "Expiring Soon" },
    ],
  },
};

const OTP = {
  "9664162569": ["1105", "2213"],
  "8765432109": ["4321"],
  "7654321098": ["9876"],
};

const AMC_PLANS = {
  "Base": {
    price: "₹1999/year",
    details: ["Unlimited breakdown visits", "25% discount on Consumable filter kit"],
  },
  "Silver": {
    price: "₹2999/year",
    details: ["Unlimited breakdown visits", "1 maintenance visit", "Free UV kit replacement", "50% discount on RO filter", "10% discount on electronic repair"],
  },
  "Gold": {
    price: "₹3999/year",
    details: ["Unlimited breakdown visits", "2 maintenance visits", "Free consumable filter kit yearly", "Free electronic damage repair"],
  },
  "Platinum": {
    price: "₹4999/year",
    details: ["3 maintenance visits", "Unlimited breakdown visits", "Free consumable filter kit yearly", "Free electronic damage repair"],
  },
};

const TICKET_DB = {
  "AQ123456": { mobile: "9876543210", product: "Aquaguard Enrich Nexen 2X RO+UV", issue: "Water flow is very slow", status: "🔧 Assigned to a technician — resolution within **24 hours**.", date: "20 Feb 2026" },
  "AQ234567": { mobile: "8765432109", product: "Aquaguard Designo UTC RO+UV 2X", issue: "Display not working", status: "🚗 Technician is **on the way** to your location.", date: "23 Feb 2026" },
  "AQ345678": { mobile: "7654321098", product: "Aquaguard Alkaline NXT RO+UV+UF", issue: "Leakage from bottom panel", status: "✅ Issue **resolved**. Please rate your experience.", date: "18 Feb 2026" },
};

let SESSION_TICKETS = {};

function genTicket() { return "AQ" + Math.floor(100000 + Math.random() * 900000); }
function cleanPhone(str) { return str.replace(/\D/g, "").slice(-10); }

function matchByIndex(list, txt) {
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

const AMC_FLOWS = ["amc_phone","amc_otp","amc_select","amc_plan","amc_plan_select","amc_payment"];

function getResponse(state, input) {
  const txt = input.trim().toLowerCase();
  const raw = input.trim();
  const FREE_TEXT_FLOWS = ["complaint_issue", "buy_mobile_collect", "amc_otp", "complaint_otp"];

  if (!FREE_TEXT_FLOWS.includes(state.flow) && isOutOfScope(txt)) return fallback();

  if (state.flow === "idle") {
    return {
      msgs: [
        { from: "bot", text: "Hello! 👋 Welcome to **Aquaguard Support**. How may I help you today?" },
        { from: "bot", text: "Please choose an option:", options: MAIN_OPTIONS },
      ],
      next: { flow: "menu" },
    };
  }

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

  // FLOW 1 — AMC
  if (state.flow === "amc_phone") {
    const phone = cleanPhone(raw);
    if (phone.length === 10) {
      const user = USER_DB[phone];
      if (!user) return { msgs: [{ from: "bot", text: `❌ No account found for **${phone}**. Please check the number or contact our helpline.` }], next: state };
      return {
        msgs: [{ from: "bot", text: `📲 OTP sent to **${phone}**. Please enter the OTP to verify:\n\n_(Demo OTPs: 9664162569 → 1105, 8765432109 → 4321, 7654321098 → 9876)_` }],
        next: { flow: "amc_otp", phone, user },
      };
    }
    return { msgs: [{ from: "bot", text: "Please enter a valid **10-digit mobile number**." }], next: state };
  }

  if (state.flow === "amc_otp") {
    const validOtps = OTP[state.phone] || [];
    if (validOtps.includes(txt)) {
      // Build product list with AMC status badges
      const productOptions = state.user.products.map((p, i) => {
        const statusEmoji = p.amc_status === "Active" ? "🟢" : p.amc_status === "Expiring Soon" ? "🟡" : "🔴";
        return `${i + 1}. ${p.name} — ${statusEmoji} ${p.amc_status} (Exp: ${p.amc_expiry})`;
      });
      return {
        msgs: [{
          from: "bot",
          text: `✅ OTP Verified! Welcome back, **${state.user.name}**! 👋\n\nHere are your registered products. Which one would you like to renew AMC for?`,
          options: productOptions,
        }],
        next: { flow: "amc_select", phone: state.phone, user: state.user },
      };
    }
    return { msgs: [{ from: "bot", text: "❌ Invalid OTP. Please try again:" }], next: state };
  }

  if (state.flow === "amc_select") {
    const idx = matchUserProduct(state.user.products, txt);
    if (idx !== -1) {
      const p = state.user.products[idx];
      const statusEmoji = p.amc_status === "Active" ? "🟢" : p.amc_status === "Expiring Soon" ? "🟡" : "🔴";
      const planOptions = Object.keys(AMC_PLANS).map((name, i) => `${i + 1}. ${name} — ${AMC_PLANS[name].price}`);
      return {
        msgs: [{
          from: "bot",
          text: `Got it! Here are the AMC details for:\n\n🔧 **${p.name}**\n💰 Current AMC: ${p.amc_price}\n📅 Expiry: ${p.amc_expiry}\n${statusEmoji} Status: **${p.amc_status}**\n\nPlease choose a plan to renew:`,
          options: planOptions,
        }],
        next: { ...state, flow: "amc_plan_select", selectedProduct: p },
      };
    }
    return {
      msgs: [{ from: "bot", text: "Please select a valid product from the list:", options: state.user.products.map((p, i) => {
        const statusEmoji = p.amc_status === "Active" ? "🟢" : "🟡";
        return `${i + 1}. ${p.name} — ${statusEmoji} ${p.amc_status}`;
      }) }],
      next: state,
    };
  }

  if (state.flow === "amc_plan_select") {
    const plans = Object.keys(AMC_PLANS);
    let idx = matchByIndex(plans, txt);
    // Conversational keyword matching — handles "i want silver", "give me gold", "platinum please" etc.
    if (idx === -1) {
      const foundPlan = plans.find(p => txt.includes(p.toLowerCase()));
      if (foundPlan) idx = plans.indexOf(foundPlan);
    }
    if (idx !== -1) {
      const plan = plans[idx];
      const p = AMC_PLANS[plan];
      return {
        msgs: [{
          from: "bot",
          text: `📋 **${plan} Plan** — ${p.price}\n\nHere's what's included:\n` + p.details.map(d => `  ✔ ${d}`).join("\n") + `\n\nWould you like to **renew** with this plan?`,
          options: ["✅ Renew Now", "❌ Cancel"],
        }],
        next: { ...state, flow: "amc_payment", selectedPlan: plan },
      };
    }
    const planOptions = plans.map((p, i) => `${i + 1}. ${p} — ${AMC_PLANS[p].price}`);
    return {
      msgs: [{ from: "bot", text: "Just tell me which plan you'd like — Base, Silver, Gold, or Platinum:", options: planOptions }],
      next: state,
    };
  }

  if (state.flow === "amc_payment") {
    if (txt.includes("renew") || txt.includes("yes") || txt.includes("✅")) {
      return {
        msgs: [
          { from: "bot", text: `🎉 **AMC Renewal Initiated!**\n\n🔧 Product: ${state.selectedProduct.name}\n📦 Plan: **${state.selectedPlan}** — ${AMC_PLANS[state.selectedPlan].price}\n\n💳 A secure payment link has been sent to your registered mobile **${state.phone}** via SMS.\n\nThank you for choosing Aquaguard! 💧` },
          menuPrompt(),
        ],
        next: { flow: "menu" },
      };
    }
    // Cancel — show 4 AMC plans again so user can pick another
    if (txt.includes("cancel") || txt.includes("❌") || txt.includes("no")) {
      const planOptions = Object.keys(AMC_PLANS).map((p, i) => `${i + 1}. ${p} — ${AMC_PLANS[p].price}`);
      return {
        msgs: [{ from: "bot", text: "No problem! Here are the available plans again. Which one would you prefer?", options: planOptions }],
        next: { ...state, flow: "amc_plan_select" },
      };
    }
    return { msgs: [{ from: "bot", text: "Please tap **Renew Now** to proceed or **Cancel** to go back." }], next: state };
  }

  // FLOW 2 — COMPLAINT (with OTP verification)
  if (state.flow === "complaint_mobile") {
    const phone = cleanPhone(raw);
    if (phone.length === 10) {
      const user = USER_DB[phone];
      if (!user) return { msgs: [{ from: "bot", text: `❌ No account found for **${phone}**. Please check the number or contact our helpline.` }], next: state };
      return {
        msgs: [{ from: "bot", text: `📲 OTP sent to **${phone}**. Please enter the OTP to verify:\n\n_(Demo OTPs: 9664162569 → 1105, 8765432109 → 4321, 7654321098 → 9876)_` }],
        next: { flow: "complaint_otp", phone, user },
      };
    }
    return { msgs: [{ from: "bot", text: "Please enter a valid **10-digit mobile number**." }], next: state };
  }

  if (state.flow === "complaint_otp") {
    const validOtps = OTP[state.phone] || [];
    if (validOtps.includes(txt)) {
      return {
        msgs: [{ from: "bot", text: `✅ Verified! Hi **${state.user.name}**! Which product would you like to raise a complaint for?`, options: state.user.products.map((p, i) => `${i + 1}. ${p.name}`) }],
        next: { flow: "complaint_product", phone: state.phone, userName: state.user.name, userProducts: state.user.products },
      };
    }
    return { msgs: [{ from: "bot", text: "❌ Invalid OTP. Please try again:" }], next: state };
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

  // FLOW 3 — STATUS
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

  // FLOW 4 — BUY
  if (state.flow === "buy_category") {
    const cats = Object.keys(CATALOGUE);
    const idx = matchItem(cats, txt);
    if (idx !== -1) {
      const cat = cats[idx];
      const subs = Object.keys(CATALOGUE[cat].subcategories);
      return {
        msgs: [{ from: "bot", text: `Great choice! Here are the **${cat}** sub-categories:\n\nPlease select one:`, options: subs.map((s, i) => `${i + 1}. ${CATALOGUE[cat].subcategories[s].icon} ${s}`) }],
        next: { flow: "buy_subcategory", selectedCategory: cat },
      };
    }
    return { msgs: [{ from: "bot", text: "Please select a valid category:", options: Object.keys(CATALOGUE).map((c, i) => `${i + 1}. ${CATALOGUE[c].icon} ${c.replace(/^.\s/, "")}`) }], next: state };
  }

  if (state.flow === "buy_subcategory") {
    const cat = CATALOGUE[state.selectedCategory];
    const subs = Object.keys(cat.subcategories);
    const idx = matchItem(subs, txt);
    if (idx !== -1) {
      const sub = subs[idx];
      const prods = Object.keys(cat.subcategories[sub].products);
      return {
        msgs: [{ from: "bot", text: `Here are the **${sub}** products:\n\nPlease select one to view details:`, options: prods.map((p, i) => `${i + 1}. ${p}`) }],
        next: { flow: "buy_product", selectedCategory: state.selectedCategory, selectedSubcategory: sub },
      };
    }
    return {
      msgs: [{ from: "bot", text: "Please select a valid sub-category:", options: subs.map((s, i) => `${i + 1}. ${cat.subcategories[s].icon} ${s}`) }],
      next: state,
    };
  }

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
    msgs: [{ from: "bot", text: "Great! Please select a **product category** to explore:", options: cats.map((c, i) => `${i + 1}. ${c}`) }],
    next: { flow: "buy_category" },
  };
}

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
  if (state.selectedCategory) parts.push(state.selectedCategory.replace(/^.\s/, ""));
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

export default function AquaguardChat() {
  const [messages, setMessages] = useState([]);
  const [chatState, setChatState] = useState({ flow: "idle" });
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [quickOptions, setQuickOptions] = useState([]);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { triggerBot("hi", { flow: "idle" }); }, []);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  function triggerBot(userInput, forcedState) {
    const currentState = forcedState || chatState;
    const response = getResponse(currentState, userInput);
    setTyping(true);
    setQuickOptions([]);
    const { msgs, next } = response;
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

        <div style={{ background:"#fffbeb", borderBottom:"1px solid #fde68a", padding:"6px 14px", fontSize:10.5, color:"#92400e", lineHeight:1.6 }}>
          📌 <strong>Test phones:</strong> 9664162569 · 8765432109 · 7654321098&nbsp;&nbsp;|&nbsp;&nbsp;<strong>Test tickets:</strong> AQ123456 · AQ234567 · AQ345678
        </div>

        {showBreadcrumb && <Breadcrumb state={chatState} />}

        <div style={{ flex:1, overflowY:"auto", padding:"16px 16px 8px", background:"#f8fcff" }}>
          {messages.map((msg, i) => <Message key={i} msg={msg} />)}
          {typing && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>

        {quickOptions.length > 0 && (
          <div style={{ padding:"8px 14px", display:"flex", flexWrap:"wrap", gap:6, background:"#f8fcff", borderTop:"1px solid #e0f2fe", maxHeight:110, overflowY:"auto" }}>
            {quickOptions.map((opt, i) => (
              <button key={i} className="opt-btn" onClick={() => sendMessage(opt)}>{opt}</button>
            ))}
          </div>
        )}

        <div style={{ padding:"12px 16px", display:"flex", gap:10, alignItems:"center", background:"#fff", borderTop:"1px solid #e0f2fe", flexShrink:0 }}>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Type a message or tap an option above…"
            style={{ flex:1, border:"1.5px solid #bae6fd", borderRadius:24, padding:"10px 16px", fontSize:13.5, fontFamily:"inherit", color:"#0c4a6e", background:"#f0f9ff", transition:"border 0.2s" }}
            onFocus={(e) => (e.target.style.borderColor = "#0ea5e9")}
            onBlur={(e) => (e.target.style.borderColor = "#bae6fd")}
          />
          <button className="send-btn" onClick={() => sendMessage(input)}>➤</button>
        </div>
      </div>
    </>
  );
}


1111111111111111111111111111111111111111111111111
import { useState, useRef, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════════
//  CATALOGUE DB  →  Category  →  Sub-category  →  Products[]
// ═══════════════════════════════════════════════════════════════════
/*




*/


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

  "9664162569": {
    name: "Prakash",
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

const OTP={
  "9664162569":["1105","2213"]
}

// amc plan ka database 
const AMC_PLANS = {
  "Base": {
    "price": "₹1999/year",
    "details": [
      "Unlimited breakdown visits",
      "25% discount on Consumable filter kit",
    ],
  },
  "Silver": {
    "price": "₹2999/year",
    "details": [  
      "Unlimited breakdown visits",
      "1 maintenance visit",
      "Free UV kit replacement",
      "50% discount on RO filter",
      "10% discount on electronic repair",
    ],
  },
  "Gold": {
    "price": "₹3999/year",
    "details": [
      "Unlimited breakdown visits",
      "2 maintenance visits",
      "Free consumable filter kit yearly",
      "Free electronic damage repair",
    ],
  },
  "Platinum": {
    "price": "₹4999/year",
    "details": [
      "3 maintenance visits",
      "Unlimited breakdown visits",
      "Free consumable filter kit yearly",
      "Free electronic damage repair",
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
   ai:true
    // msgs: [{ from: "bot", text: "Hmm, I didn't quite catch that. Let me take you back to the main menu! 😊\n\nPlease choose an option:", options: MAIN_OPTIONS }],
    // next: { flow: "menu" },
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
    // if (state.flow === "amc_phone") {
    //   const phone = cleanPhone(raw);
    //   // when phone number send it will say to enter the otp 

    //   if (phone.length === 10) {
    //     const user = USER_DB[phone];
        
    //     if (!user) return { msgs: [{ from: "bot", text: `❌ No account found for **${phone}**. Please check the number or contact our helpline.` }], next: state };

    //     return {
    //       msgs: [{ from: "bot", text: `✅ Welcome back, **${user.name}**! We found **${user.products.length}** registered product(s).\n\nSelect a product to view AMC details:`, options: user.products.map((p, i) => `${i + 1}. ${p.name}`) }],
    //       next: { flow: "amc_select", phone, user },
    //     };
    //   }
    //   return { msgs: [{ from: "bot", text: "Please enter a valid **10-digit mobile number**." }], next: state };
    // }
// for otp sending after geeting the phone number 
const AMC_FLOWS = [
  "amc_phone",
  "amc_otp",
  "amc_select",
  "amc_plan",
  "amc_plan_select",
  "amc_payment"
];
if (state.flow === "amc_phone") {
  const phone = cleanPhone(raw);
  
  if (phone.length === 10) {
    const user = USER_DB[phone];
    if (!user)
      return { msgs: [{ from: "bot", text: `❌ No account found for ${phone}` }], next: state };
    
    return {
      msgs: [{ from: "bot", text: "📲 OTP sent to your mobile. Please enter OTP." }],
      next: { flow: "amc_otp", phone, user },
    };
  }
  
  return { msgs: [{ from: "bot", text: "Enter valid 10-digit number" }], next: state };
}

// to verify the otp selection 
if (state.flow === "amc_otp") {
  const validOtps = OTP[state.phone] || [];
  
  if (validOtps.includes(txt)) {
    return {
      msgs: [{
        from: "bot",
        text: `✅ OTP Verified!\n\nWelcome **${state.user.name}**. Select product for AMC:`,
        options: state.user.products.map((p, i) => `${i + 1}. ${p.name}`),
      }],
      next: { flow: "amc_select", phone: state.phone, user: state.user },
    };
  }
  
  return { msgs: [{ from: "bot", text: "❌ Invalid OTP. Try again." }], next: state };
}


// amc select 
if (state.flow === "amc_select") {
  const idx = matchUserProduct(state.user.products, txt);

  if (idx !== -1) {
    const p = state.user.products[idx];

    return {
      msgs: [{
        from: "bot",
        text: `📋 Product Selected: **${p.name}**\n\nNow choose AMC plan:`,
        options: Object.keys(AMC_PLANS).map((p,i)=>`${i+1}. ${p}`),
      }],
      next: { ...state, flow: "amc_plan_select", selectedProduct: p },
    };
  }

  return {
    msgs: [{
      from: "bot",
      text: "Please select valid product",
      options: state.user.products.map((p, i) => `${i + 1}. ${p.name}`)
    }],
    next: state
  };

}

// to select amc plan 
// if (state.flow === "amc_plan_select") {
//   const plans = Object.keys(AMC_PLANS);

//   // match by index OR keyword
//   const idx = matchItem(plans, txt);

//   if (idx !== -1) {
//     const plan = plans[idx];
//     const p = AMC_PLANS[plan];

//     return {
//       msgs: [{
//         from: "bot",
//         text:
//           `📋 **${plan} Plan**\n💰 Price: ${p.price}\n\n` +
//           p.details.map(d => `✔ ${d}`).join("\n") +
//           "\n\nConfirm purchase?",
//         options: ["✅ Confirm", "❌ Cancel"],
//       }],
//       next: { ...state, flow: "amc_payment", selectedPlan: plan },
//     };
//   }

//   return {
//     msgs: [{
//       from: "bot",
//       text: "Please select a valid AMC plan:",
//       options: plans.map((p, i) => `${i + 1}. ${p}`)
//     }],
//     next: state
//   };
// }
if (state.flow === "amc_plan_select") {
  const plans = Object.keys(AMC_PLANS);

  // 1️⃣ Match by number
  let idx = matchByIndex(plans, txt);

  // 2️⃣ Direct keyword match (MOST reliable)
  if (idx === -1) {
    const foundPlan = plans.find(p =>
      txt.includes(p.toLowerCase()) ||
      txt.includes(p.toLowerCase() + " plan") ||
      txt.includes(p.toLowerCase() + " amc")
    );
    if (foundPlan) idx = plans.indexOf(foundPlan);
  }

  if (idx !== -1) {
    const plan = plans[idx];
    const p = AMC_PLANS[plan];

    return {
      msgs: [{
        from: "bot",
        text:
          `📋 **${plan} Plan**\n💰 Price: ${p.price}\n\n` +
          p.details.map(d => `✔ ${d}`).join("\n") +
          "\n\nConfirm purchase?",
        options: ["✅ Confirm", "❌ Cancel"],
      }],
      next: { ...state, flow: "amc_payment", selectedPlan: plan },
    };
  }

  return {
    msgs: [{
      from: "bot",
      text: "Please type Base, Silver, Gold, or Platinum:",
      options: plans.map((p, i) => `${i + 1}. ${p}`)
    }],
    next: state
  };
}

// for amc payment
if (state.flow === "amc_payment") {
  if (txt.includes("confirm")) {
    return {
      msgs: [
        { from: "bot", text: `🎉 Payment link sent for **${state.selectedPlan} AMC**.\nThank you!` },
        menuPrompt(),
      ],
      next: { flow: "menu" },
    };
  }
  
  return { msgs: [{ from: "bot", text: "Cancelled." }, menuPrompt()], next: { flow: "menu" } };
}
// for amc plan 
if (state.flow === "amc_plan") {
  return {
    msgs: [{
      from: "bot",
      text: `🛠 Choose AMC plan for **${state.selectedProduct.name}**`,
      options: Object.keys(AMC_PLANS),
    }],
    next: { ...state, flow: "amc_plan_select" },
  };
}






// if (state.flow === "amc_select") {
//   const idx = matchUserProduct(state.user.products, txt);
//   if (idx !== -1) {
//     const p = state.user.products[idx];
//     const emoji = p.amc_status === "Active" ? "🟢" : "🟡";
//     return {
//           msgs: [{
//             from: "bot",
//             text: `📋 **AMC Details**\n\n🔧 Product: ${p.name}\n💰 AMC Price: ${p.amc_price}\n📅 Expiry Date: ${p.amc_expiry}\n${emoji} Status: **${p.amc_status}**\n\nWould you like to renew this AMC?`,
//             options: ["✅ Yes, Renew Now", "❌ No, Go Back"],
//           }],
//           next: { ...state, flow: "amc_plan", selectedProduct: p },
//         };
//       }
//       const opts = state.user.products.map((p, i) => `${i + 1}. ${p.name}`);
//       return { msgs: [{ from: "bot", text: "Please select a valid product from your list:", options: opts }], next: state };
//     }

    
  if (!AMC_FLOWS.includes(state.flow) && FLAT_PRODUCTS[txt]) {
       return productDetails()
    }
    
    // if (state.flow === "amc_confirm") {
      //   if (txt.includes("yes") || txt.includes("renew") || txt.includes("✅")) {
        //     return {
          //       msgs: [
            //         { from: "bot", text: `🎉 **AMC Renewal Initiated!**\n\nA secure payment link for **${state.selectedProduct.amc_price}** has been sent to your registered mobile via SMS.\n\nThank you for choosing Aquaguard! 💧` },
            //         menuPrompt(),
            //       ],
            //       next: { flow: "menu" },
            //     };
            //   }
            //   return { msgs: [{ from: "bot", text: "No problem! We're here whenever you're ready. 😊" }, menuPrompt()], next: { flow: "menu" } };
            // }
            
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

const prompt_msg=`# We use triple quotes to preserve the multi-line formatting
prompt_msg = """
You are strictly an Aquaguard (Eureka Forbes) Sales & Service Assistant.
You are allowed to answer ONLY about:
- AMC Renewal
- Complaint Registration
- Complaint Status
- Product Purchase / Enquiry

If the user asks anything unrelated:
1. Reply in maximum 2 sentences.
2. Politely say you only assist with Aquaguard services.
3. Redirect to the 4 main options.

Do NOT:
- Give general knowledge
- Answer unrelated questions
- Provide coding help
- Discuss politics or entertainment
- Continue off-topic conversations

Keep responses:
- Under 80 words
- Clear
- Professional
- Focused on closing the task

Always end with a service-oriented direction.
"""

# Example of how you would use it
print(prompt_msg)`;
async function askAI(userMessage) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer grok_api_key",
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: prompt_msg },
        // { role: "system", content: "You are Aquaguard support assistant. answer user query and politely redirect it ." },
        { role: "user", content: userMessage }
      ],
    }),
  });

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "Sorry, AI failed.";
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

  // function triggerBot(userInput, forcedState) {
  //   const currentState = forcedState || chatState;
  //   const { msgs, next } = getResponse(currentState, userInput);
  //   setTyping(true);
  //   setQuickOptions([]);
  //   setTimeout(() => {
  //     setTyping(false);
  //     setMessages((prev) => [...prev, ...msgs]);
  //     setChatState(next);
  //     const lastWithOpts = [...msgs].reverse().find((m) => m.options);
  //     setQuickOptions(lastWithOpts?.options || []);
  //     inputRef.current?.focus();
  //   }, 650);
  // }


function triggerBot(userInput, forcedState) {
  const currentState = forcedState || chatState;
  const response = getResponse(currentState, userInput);

  setTyping(true);
  setQuickOptions([]);

  // ⭐ AI fallback
  if (response?.ai) {
    askAI(userInput).then((aiText) => {
      setTyping(false);

      // const aiMsg = [{ from: "bot", text: aiText }];
          const aiMsg = [
      {
        from: "bot",
        text:
          aiText +
          "\n\nMain Aquaguard support assistant hoon.  👇",
        options: MAIN_OPTIONS,
      },
    ];
      setMessages((prev) => [...prev, ...aiMsg]);
      setChatState({ flow: "menu" });
      // setQuickOptions([]);
          setQuickOptions(MAIN_OPTIONS);
      inputRef.current?.focus();
    });
    return;
  }

  // ⭐ Normal flow (unchanged)
  const { msgs, next } = response;

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
          {/* 📌 <strong>Test phones:</strong> 9876543210 · 8765432109 · 7654321098&nbsp;&nbsp;|&nbsp;&nbsp;<strong>Test tickets:</strong> AQ123456 · AQ234567 · AQ345678 */}
  
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





****************************************************************************************************
import { useState, useRef, useEffect, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════════
//  CATALOGUE DB
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

// ── Flatten catalogue ──────────────────────────────────────────────
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
//  USER + TICKET DATABASE
// ═══════════════════════════════════════════════════════════════════
const USER_DB = {
  "9876543210": {
    name: "Rajesh Sharma",
    products: [
      { name: "Aquaguard Enrich Nexen 2X RO+UV",  amc_price: "₹2,499/year", amc_expiry: "15 Mar 2025", amc_status: "Expiring Soon" },
      { name: "Aquaguard Designo UTC RO+UV 2X",    amc_price: "₹3,199/year", amc_expiry: "30 Jul 2026", amc_status: "Active" },
    ],
  },
  "8765432109": {
    name: "Priya Mehta",
    products: [
      { name: "Aquaguard Designo UTC RO+UV 2X",    amc_price: "₹3,199/year", amc_expiry: "05 Jun 2025", amc_status: "Expiring Soon" },
    ],
  },
  "7654321098": {
    name: "Amit Verma",
    products: [
      { name: "Aquaguard Enrich Marvel RO+UV Copper", amc_price: "₹2,799/year", amc_expiry: "22 Apr 2026", amc_status: "Active" },
      { name: "Aquaguard Alkaline NXT RO+UV+UF",      amc_price: "₹2,999/year", amc_expiry: "18 May 2025", amc_status: "Expiring Soon" },
    ],
  },
};

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
function matchUserProduct(userProducts, txt) {
  const byIdx = matchByIndex(userProducts.map((p) => p.name), txt);
  if (byIdx !== -1) return byIdx;
  return matchByKeyword(userProducts.map((p) => p.name), txt);
}

const MAIN_OPTIONS = ["1. AMC Renewal", "2. Register New Complaint", "3. Check Complaint Status", "4. Buy New Product"];
function menuPrompt() { return { from: "bot", text: "Is there anything else I can help you with?", options: MAIN_OPTIONS }; }
function mainMenu() { return { msgs: [{ from: "bot", text: "How else can I help you?", options: MAIN_OPTIONS }], next: { flow: "menu" } }; }

// ═══════════════════════════════════════════════════════════════════
//  CATALOGUE CONTEXT STRING  (for AI system prompt)
// ═══════════════════════════════════════════════════════════════════
function buildCatalogueContext() {
  const lines = [];
  Object.entries(CATALOGUE).forEach(([cat, catVal]) => {
    Object.entries(catVal.subcategories).forEach(([sub, subVal]) => {
      Object.entries(subVal.products).forEach(([prod, p]) => {
        lines.push(`• ${prod} (${cat} > ${sub}) — ${p.technology} — ${p.price} — Features: ${p.features.join(", ")}`);
      });
    });
  });
  return lines.join("\n");
}

// ═══════════════════════════════════════════════════════════════════
//  CLAUDE AI  — INTENT DETECTION
// ═══════════════════════════════════════════════════════════════════
const INTENT_SYSTEM = `You are an intent classifier for Aquaguard / Forbes customer support chatbot.

Given a user message, classify it into ONE of these intents (return ONLY the intent key, nothing else):
- amc_renewal     → user wants to renew AMC / annual maintenance contract / service plan
- new_complaint   → user wants to register a complaint / report a problem / raise a ticket / something is broken/not working
- check_status    → user wants to check status of an existing complaint / ticket number
- buy_product     → user wants to buy / purchase / explore / get demo / know price of products
- greeting        → hello, hi, hey, good morning, how are you, thanks, bye, etc. (casual/social)
- main_menu       → user wants to go back to main menu / home / start over / see options
- unknown         → general knowledge questions, jokes, unrelated topics, small talk that needs a real answer

IMPORTANT: Use "greeting" for pure social messages. Use "unknown" when the user is asking a question that deserves a real answer (even if off-topic).

Product catalogue available: Water Purifiers (Aquaguard), Vacuum Cleaners (Forbes), Air Purifiers (Eureka Forbes).

Respond with ONLY the intent key. No explanation.`;

async function detectIntent(userMessage, conversationHistory) {
  try {
    const messages = [
      ...conversationHistory.slice(-6).map(m => ({
        role: m.from === "user" ? "user" : "assistant",
        content: m.text
      })),
      { role: "user", content: userMessage }
    ];

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 20,
        system: INTENT_SYSTEM,
        messages,
      }),
    });
    const data = await res.json();
    const intent = data.content?.[0]?.text?.trim().toLowerCase();
    const valid = ["amc_renewal","new_complaint","check_status","buy_product","greeting","main_menu","unknown"];
    return valid.includes(intent) ? intent : "unknown";
  } catch {
    return "unknown";
  }
}

// ═══════════════════════════════════════════════════════════════════
//  CLAUDE AI  — FREE CONVERSATION (for unknown / out-of-scope)
// ═══════════════════════════════════════════════════════════════════
const CONVO_SYSTEM = `You are Aqua, a warm and smart AI assistant for Aquaguard / Forbes (Eureka Forbes) customer support.

You help customers with:
1. AMC (Annual Maintenance Contract) renewal
2. Registering complaints / service tickets
3. Checking complaint / ticket status
4. Buying new products — water purifiers, vacuum cleaners, air purifiers

Available products in our catalogue:
${buildCatalogueContext()}

━━━ HOW TO HANDLE ALL QUESTIONS ━━━

For ANY message — related or unrelated — follow this exact pattern:

STEP 1 — Answer shortly (1-2 sentences max):
- If it's about our products/services → answer directly and helpfully
- If it's general knowledge → give a short, clear answer
- If it's completely off-topic (book flight, write essay, etc.) → say warmly in 1 sentence that you're specialized for Aquaguard/Forbes support
- If it's casual chat (how are you, good morning) → reply warmly in 1 sentence

STEP 2 — Always end with this exact line:
"Here's what I can help you with:"

Then list these 4 options on separate lines:
1. AMC Renewal
2. Register New Complaint
3. Check Complaint Status
4. Buy New Product

━━━ RULES ━━━
- Be warm and natural. Never robotic.
- Do NOT make up product prices or features not in the catalogue above.
- ALWAYS end every response with the 4 menu options as shown above — no exceptions.
- Keep the answer part SHORT — 1 to 2 sentences only.`;

async function askClaude(userMessage, conversationHistory) {
  try {
    const messages = conversationHistory
      .slice(-10)
      .filter(m => m.text)
      .map(m => ({
        role: m.from === "user" ? "user" : "assistant",
        content: m.text.replace(/\*\*/g, ""),
      }));

    // Ensure alternating roles
    const cleaned = [];
    for (const msg of messages) {
      if (cleaned.length === 0 || cleaned[cleaned.length - 1].role !== msg.role) {
        cleaned.push(msg);
      }
    }
    if (cleaned.length === 0 || cleaned[cleaned.length - 1].role !== "user") {
      cleaned.push({ role: "user", content: userMessage });
    } else {
      cleaned[cleaned.length - 1].content = userMessage;
    }

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: CONVO_SYSTEM,
        messages: cleaned,
      }),
    });
    const data = await res.json();
    return data.content?.[0]?.text || "I'm sorry, I couldn't process that. How can I help you?";
  } catch (err) {
    return "I'm having a bit of trouble right now. Please try again or choose an option below.";
  }
}

// ═══════════════════════════════════════════════════════════════════
//  RULE-BASED FLOWS  (fast, reliable for structured data)
// ═══════════════════════════════════════════════════════════════════
function getRuleBasedResponse(state, input) {
  const txt = input.trim().toLowerCase();
  const raw = input.trim();

  // ── AMC FLOW ──────────────────────────────────────────────────────
  if (state.flow === "amc_phone") {
    const phone = cleanPhone(raw);
    if (phone.length === 10) {
      const user = USER_DB[phone];
      if (!user) return { msgs: [{ from: "bot", text: `❌ No account found for **${phone}**. Please check the number or try a different one.` }], next: state };
      return {
        msgs: [{ from: "bot", text: `✅ Welcome back, **${user.name}**! Found **${user.products.length}** product(s). Which one would you like to check AMC for?`, options: user.products.map((p, i) => `${i + 1}. ${p.name}`) }],
        next: { flow: "amc_select", phone, userName: user.name, userProducts: user.products },
      };
    }
    return { msgs: [{ from: "bot", text: "Please enter a valid **10-digit mobile number**." }], next: state };
  }

  if (state.flow === "amc_select") {
    const idx = matchUserProduct(state.userProducts, txt);
    if (idx !== -1) {
      const p = state.userProducts[idx];
      const isExpiring = p.amc_status === "Expiring Soon";
      return {
        msgs: [
          {
            from: "bot",
            text: `📋 **AMC Details — ${p.name}**\n\n💰 Plan: ${p.amc_price}\n📅 Expiry: ${p.amc_expiry}\n📊 Status: ${isExpiring ? "⚠️" : "✅"} ${p.amc_status}\n\n${isExpiring ? "Your AMC is expiring soon! Would you like to renew it now?" : "Your AMC is active. No action needed right now."}`,
            options: isExpiring ? ["✅ Renew AMC", "⬅️ Back", "🏠 Main Menu"] : ["⬅️ Back", "🏠 Main Menu"],
          }
        ],
        next: { flow: "amc_action", phone: state.phone, userName: state.userName, userProducts: state.userProducts, selectedProduct: p },
      };
    }
    return { msgs: [{ from: "bot", text: "Please select a valid product:", options: state.userProducts.map((p, i) => `${i + 1}. ${p.name}`) }], next: state };
  }

  if (state.flow === "amc_action") {
    if (txt.includes("main menu") || txt.includes("🏠")) return mainMenu();
    if (txt.includes("back") || txt.includes("⬅")) {
      return {
        msgs: [{ from: "bot", text: "Which product would you like to check?", options: state.userProducts.map((p, i) => `${i + 1}. ${p.name}`) }],
        next: { flow: "amc_select", phone: state.phone, userName: state.userName, userProducts: state.userProducts },
      };
    }
    if (txt.includes("renew")) {
      return {
        msgs: [
          { from: "bot", text: `🎉 AMC renewed successfully for **${state.selectedProduct.name}**!\n\n✅ New expiry: **15 Mar 2027**\n💰 Amount: ${state.selectedProduct.amc_price}\n\nThank you, ${state.userName}! Our team will send a confirmation SMS shortly.` },
          menuPrompt(),
        ],
        next: { flow: "menu" },
      };
    }
    return null;
  }

  // ── COMPLAINT FLOW ────────────────────────────────────────────────
  if (state.flow === "complaint_mobile") {
    const phone = cleanPhone(raw);
    if (phone.length === 10) {
      const user = USER_DB[phone];
      if (!user) return { msgs: [{ from: "bot", text: `❌ No account found for **${phone}**. Please check the number.` }], next: state };
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
        msgs: [{ from: "bot", text: `Got it! Please describe the issue with **${state.userProducts[idx].name}** in a few words:` }],
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
        { from: "bot", text: `✅ **Complaint Registered!**\n\n🎫 Ticket No: **${ticket}**\n👤 Name: ${state.userName}\n📱 Mobile: ${state.phone}\n🔧 Product: ${state.selectedProduct}\n📝 Issue: ${raw}\n\n⏱️ Our team will contact you within **24 hours**.` },
        menuPrompt(),
      ],
      next: { flow: "menu" },
    };
  }

  // ── CHECK STATUS FLOW ─────────────────────────────────────────────
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
    return { msgs: [{ from: "bot", text: `❌ No complaint found for **${ticketNo}**. Please double-check and try again:` }], next: state };
  }

  // ── BUY FLOW ──────────────────────────────────────────────────────
  if (state.flow === "buy_category") {
    const cats = Object.keys(CATALOGUE);
    const idx = matchItem(cats, txt);
    if (idx !== -1) {
      const cat = cats[idx];
      const subs = Object.keys(CATALOGUE[cat].subcategories);
      return {
        msgs: [{ from: "bot", text: `Great choice! Here are the **${cat}** sub-categories:`, options: subs.map((s, i) => `${i + 1}. ${CATALOGUE[cat].subcategories[s].icon} ${s}`) }],
        next: { flow: "buy_subcategory", selectedCategory: cat },
      };
    }
    return { msgs: [{ from: "bot", text: "Please select a category:", options: Object.keys(CATALOGUE).map((c, i) => `${i + 1}. ${c}`) }], next: state };
  }

  if (state.flow === "buy_subcategory") {
    const cat = CATALOGUE[state.selectedCategory];
    const subs = Object.keys(cat.subcategories);
    const idx = matchItem(subs, txt);
    if (idx !== -1) {
      const sub = subs[idx];
      const prods = Object.keys(cat.subcategories[sub].products);
      return {
        msgs: [{ from: "bot", text: `Here are the **${sub}** products. Select one to see details:`, options: prods.map((p, i) => `${i + 1}. ${p}`) }],
        next: { flow: "buy_product", selectedCategory: state.selectedCategory, selectedSubcategory: sub },
      };
    }
    return { msgs: [{ from: "bot", text: "Please select a sub-category:", options: subs.map((s, i) => `${i + 1}. ${cat.subcategories[s].icon} ${s}`) }], next: state };
  }

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
          text: `🛒 **${prodName}**\n\n📂 ${state.selectedCategory}\n🏷️ ${state.selectedSubcategory}\n⚙️ Technology: ${p.technology}\n💰 Price: ${p.price}\n\n✨ Features:\n${p.features.map(f => `  • ${f}`).join("\n")}\n\nWould you like to schedule a **demo** or **purchase** this product?`,
          options: ["📅 Schedule Demo", "🛍️ Purchase Now", "⬅️ Back", "🏠 Main Menu"],
        }],
        next: { flow: "buy_confirm", selectedCategory: state.selectedCategory, selectedSubcategory: state.selectedSubcategory, selectedProduct: prodName },
      };
    }
    return { msgs: [{ from: "bot", text: "Please select a product:", options: prods.map((p, i) => `${i + 1}. ${p}`) }], next: state };
  }

  if (state.flow === "buy_confirm") {
    if (txt.includes("main menu") || txt.includes("🏠") || txt.includes("home")) return mainMenu();
    if (txt.includes("back") || txt.includes("⬅")) {
      const cat = CATALOGUE[state.selectedCategory];
      const subs = Object.keys(cat.subcategories);
      return {
        msgs: [{ from: "bot", text: `Back to **${state.selectedCategory}** sub-categories:`, options: subs.map((s, i) => `${i + 1}. ${cat.subcategories[s].icon} ${s}`) }],
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
    return null;
  }

  if (state.flow === "buy_mobile_collect") {
    const phone = cleanPhone(raw);
    if (phone.length === 10) {
      return {
        msgs: [
          { from: "bot", text: `📞 Our executive will call **${phone}** within **2 hours** for:\n\n🛒 **${state.selectedProduct}**\n💰 ${FLAT_PRODUCTS[state.selectedProduct]?.price || ""}\n\nThank you for choosing Aquaguard / Forbes! 💧` },
          menuPrompt(),
        ],
        next: { flow: "menu" },
      };
    }
    return { msgs: [{ from: "bot", text: "Please enter a valid **10-digit mobile number**." }], next: state };
  }

  return null;
}

function startBuyCategoryStep() {
  const cats = Object.keys(CATALOGUE);
  return {
    msgs: [{ from: "bot", text: "Great! Which product category are you interested in?", options: cats.map((c, i) => `${i + 1}. ${c}`) }],
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

function AIBadge() {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 3,
      background: "linear-gradient(135deg, #7c3aed, #a855f7)",
      color: "#fff", fontSize: 9.5, fontWeight: 700, letterSpacing: 0.5,
      padding: "2px 7px", borderRadius: 20, marginLeft: 6, verticalAlign: "middle"
    }}>
      ✦ AI
    </span>
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
            {msg.aiPowered && <div style={{ marginBottom: 4 }}><AIBadge /></div>}
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
  const bottomRef  = useRef(null);
  const inputRef   = useRef(null);
  const msgHistory = useRef([]);

  useEffect(() => { handleBotTurn("hi", { flow: "idle" }); }, []);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  // ── Core engine: tries rule-based first, falls back to AI ─────────
  async function handleBotTurn(userInput, forcedState) {
    const state = forcedState || chatState;
    setTyping(true);
    setQuickOptions([]);

    try {
      // 1) Structured flows that must NEVER go to AI
      const FREE_TEXT_FLOWS = ["complaint_issue", "buy_mobile_collect", "amc_phone", "complaint_mobile", "status_ask"];

      // 2) Try rule-based response first
      const ruled = getRuleBasedResponse(state, userInput);
      if (ruled) {
        await delay(550);
        commitBotResponse(ruled);
        return;
      }

      // 3) We're in a flow but rule-based returned null — try rule fallback nudge
      if (state.flow !== "idle" && state.flow !== "menu" && !FREE_TEXT_FLOWS.includes(state.flow)) {
        const ruled2 = getRuleBasedResponse(state, userInput);
        if (ruled2) { await delay(550); commitBotResponse(ruled2); return; }
      }

      // 4) For idle / menu or unknown in flow — use AI intent detection
      if (state.flow === "idle") {
        // Initial greeting — keep rule-based
        const initResponse = {
          msgs: [
            { from: "bot", text: "Hello! 👋 Welcome to **Aquaguard / Forbes Support**. How may I help you today?" },
            { from: "bot", text: "Please choose an option:", options: MAIN_OPTIONS },
          ],
          next: { flow: "menu" },
        };
        await delay(550);
        commitBotResponse(initResponse);
        return;
      }

      if (state.flow === "menu" || !state.flow) {
        // AI detects intent from natural language
        const intent = await detectIntent(userInput, msgHistory.current);
        await delay(350);

        if (intent === "amc_renewal") {
          commitBotResponse({ msgs: [{ from: "bot", text: "Sure! Please enter your **registered mobile number** to continue:" }], next: { flow: "amc_phone" } });
        } else if (intent === "new_complaint") {
          commitBotResponse({ msgs: [{ from: "bot", text: "I'll help you register a complaint. Please enter your **registered mobile number**:" }], next: { flow: "complaint_mobile" } });
        } else if (intent === "check_status") {
          commitBotResponse({ msgs: [{ from: "bot", text: "Please enter your **complaint / ticket number** (e.g. AQ123456):" }], next: { flow: "status_ask" } });
        } else if (intent === "buy_product") {
          commitBotResponse(startBuyCategoryStep());
        } else if (intent === "main_menu" || intent === "greeting") {
          commitBotResponse({
            msgs: [{ from: "bot", text: intent === "greeting" ? "Hello there! 👋 How can I help you today?" : "Sure, here's the main menu!", options: MAIN_OPTIONS }],
            next: { flow: "menu" },
          });
        } else {
          // Unknown → AI answers briefly, always returns with main menu buttons
          const aiReply = await askClaude(userInput, msgHistory.current);
          commitBotResponse({
            msgs: [{ from: "bot", text: aiReply, aiPowered: true, options: MAIN_OPTIONS }],
            next: { flow: "menu" },
          });
        }
        return;
      }

      // 5) In-flow unknown → AI answers briefly and brings back to menu with buttons
      const aiReply = await askClaude(userInput, msgHistory.current);
      commitBotResponse({
        msgs: [{ from: "bot", text: aiReply, aiPowered: true, options: MAIN_OPTIONS }],
        next: { flow: "menu" },
      });

    } catch (err) {
      await delay(400);
      commitBotResponse({
        msgs: [{ from: "bot", text: "Something went wrong on my end. Let me take you back to the menu.", options: MAIN_OPTIONS }],
        next: { flow: "menu" },
      });
    }
  }

  function commitBotResponse({ msgs, next }) {
    setTyping(false);
    setMessages(prev => {
      const updated = [...prev, ...msgs];
      msgHistory.current = updated;
      return updated;
    });
    setChatState(next);
    const lastWithOpts = [...msgs].reverse().find(m => m.options);
    setQuickOptions(lastWithOpts?.options || []);
    inputRef.current?.focus();
  }

  function sendMessage(text) {
    if (!text.trim()) return;
    const userMsg = { from: "user", text: text.trim() };
    setMessages(prev => {
      const updated = [...prev, userMsg];
      msgHistory.current = updated;
      return updated;
    });
    setInput("");
    setQuickOptions([]);
    setTimeout(() => handleBotTurn(text.trim()), 180);
  }

  function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

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
        .send-btn{width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#0369a1,#0ea5e9);border:none;cursor:pointer;display:flex;align-items:center;justifycontent:center;align-items:center;justify-content:center;font-size:18px;box-shadow:0 2px 8px rgba(14,165,233,0.4);transition:transform 0.15s;flex-shrink:0}
        .send-btn:hover{transform:scale(1.08)}
      `}</style>

      <div style={{ width:432, height:740, display:"flex", flexDirection:"column", background:"#fff", borderRadius:24, overflow:"hidden", boxShadow:"0 20px 60px rgba(14,165,233,0.25),0 4px 20px rgba(0,0,0,0.1)" }}>

        {/* HEADER */}
        <div style={{ background:"linear-gradient(135deg,#0369a1 0%,#0ea5e9 100%)", padding:"16px 20px", display:"flex", alignItems:"center", gap:12, flexShrink:0 }}>
          <div style={{ width:46, height:46, borderRadius:"50%", background:"rgba(255,255,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, border:"2px solid rgba(255,255,255,0.4)" }}>💧</div>
          <div>
            <div style={{ color:"#fff", fontWeight:700, fontSize:15.5, letterSpacing:0.3 }}>
              Aquaguard / Forbes Support
              <span style={{ background:"rgba(124,58,237,0.85)", color:"#fff", fontSize:9, fontWeight:700, padding:"2px 7px", borderRadius:20, marginLeft:8, letterSpacing:0.5 }}>✦ AI</span>
            </div>
            <div style={{ color:"#bae6fd", fontSize:11.5, display:"flex", alignItems:"center", gap:5, marginTop:2 }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:"#4ade80", display:"inline-block", animation:"pulse 2s infinite" }} />
              Online — AI-powered support
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

        {/* BREADCRUMB */}
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
            placeholder="Ask anything — I understand natural language…"
            style={{ flex:1, border:"1.5px solid #bae6fd", borderRadius:24, padding:"10px 16px", fontSize:13.5, fontFamily:"inherit", color:"#0c4a6e", background:"#f0f9ff", transition:"border 0.2s" }}
            onFocus={(e) => (e.target.style.borderColor = "#0ea5e9")}
            onBlur={(e) => (e.target.style.borderColor = "#bae6fd")}
          />
          <button className="send-btn" onClick={() => sendMessage(input)}>➤</button>
        </div>
      </div>
    </>
  );
}





--------------++-


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
