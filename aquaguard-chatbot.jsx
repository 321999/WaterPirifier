import { useState, useRef, useEffect } from "react";

// ═══════════════════════════════════════════════════════
//  MASTER DATABASE
// ═══════════════════════════════════════════════════════

const PRODUCT_CATALOGUE = {
  "Aquaguard Enrich Nexen 2X RO+UV": {
    technology: "RO + UV + MTDS", price: "₹18,999",
    features: ["8L storage", "Active Copper", "10L/hr flow", "Digital display"],
  },
  "Aquaguard Enrich Marvel RO+UV Stainless Steel Copper": {
    technology: "RO + UV + Copper Infusion", price: "₹22,499",
    features: ["SS tank 8L", "Copper charge", "Mineral Guard", "Auto shut-off"],
  },
  "Aquaguard Aspire Blaze 2X RO+UV Stainless Steel": {
    technology: "RO + UV + Taste Adjuster", price: "₹16,999",
    features: ["SS 7L tank", "Taste Adjuster", "LED indicator", "Wall mount"],
  },
  "Aquaguard Designo UTC RO+UV 2X": {
    technology: "RO + UV + UF", price: "₹27,999",
    features: ["Under-counter", "10L SS tank", "Zero splash", "Smart alerts"],
  },
  "Aquaguard Aspire Nova 2X RO+UV Copper": {
    technology: "RO + UV + Copper + Mineral", price: "₹19,499",
    features: ["Copper infusion", "8L tank", "Mineral boost", "Easy filter"],
  },
  "Aquaguard Aspire Spark RO+UV Hot & Ambient": {
    technology: "RO + UV + Hot & Cold", price: "₹31,999",
    features: ["Hot & ambient", "Instant hot", "6L tank", "Child lock"],
  },
};

// Registered users — keyed by 10-digit phone number
const USER_DB = {
  "9876543210": {
    name: "Rajesh Sharma",
    products: [
      { name: "Aquaguard Enrich Nexen 2X RO+UV", amc_price: "₹2,499/year", amc_expiry: "15 Mar 2025", amc_status: "Expiring Soon" },
      { name: "Aquaguard Aspire Spark RO+UV Hot & Ambient", amc_price: "₹3,499/year", amc_expiry: "30 Jul 2026", amc_status: "Active" },
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
      { name: "Aquaguard Enrich Marvel RO+UV Stainless Steel Copper", amc_price: "₹2,799/year", amc_expiry: "22 Apr 2026", amc_status: "Active" },
      { name: "Aquaguard Aspire Nova 2X RO+UV Copper", amc_price: "₹2,599/year", amc_expiry: "18 May 2025", amc_status: "Expiring Soon" },
    ],
  },
};

// Pre-seeded complaint/ticket database
const TICKET_DB = {
  "AQ123456": { mobile: "9876543210", product: "Aquaguard Enrich Nexen 2X RO+UV", issue: "Water flow is very slow", status: "🔧 Assigned to a technician — resolution within **24 hours**.", date: "20 Feb 2026" },
  "AQ234567": { mobile: "8765432109", product: "Aquaguard Designo UTC RO+UV 2X", issue: "Display not working", status: "🚗 Technician is **on the way** to your location.", date: "23 Feb 2026" },
  "AQ345678": { mobile: "7654321098", product: "Aquaguard Aspire Nova 2X RO+UV Copper", issue: "Leakage from bottom panel", status: "✅ Issue **resolved**. Please rate your experience.", date: "18 Feb 2026" },
};

// Session tickets grow at runtime
let SESSION_TICKETS = {};

function genTicket() { return "AQ" + Math.floor(100000 + Math.random() * 900000); }
function cleanPhone(str) { return str.replace(/\D/g, "").slice(-10); }

// ═══════════════════════════════════════════════════════
//  OUT-OF-SCOPE DETECTOR
// ═══════════════════════════════════════════════════════
const ALLOWED = [
  "amc","renew","complaint","register","status","ticket","buy","product","demo","purchase",
  "yes","no","ok","okay","sure","back","menu","home","help","hi","hello","hey","start","restart",
  "aquaguard","enrich","marvel","aspire","blaze","designo","nova","spark","nexen","1","2","3","4",
];
function isOutOfScope(txt) {
  return !ALLOWED.some((kw) => txt.toLowerCase().includes(kw));
}

// ═══════════════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════════════
const MAIN_OPTIONS = ["1. AMC Renewal", "2. Register New Complaint", "3. Check Complaint Status", "4. Buy New Product"];

function menuPrompt() {
  return { from: "bot", text: "What else can I help you with?", options: MAIN_OPTIONS };
}
function mainMenu() {
  return { msgs: [{ from: "bot", text: "Please choose an option:", options: MAIN_OPTIONS }], next: { flow: "menu" } };
}
function fallback() {
  return {
    msgs: [{ from: "bot", text: "I'm not sure I understood that. Let me bring you back to the main menu! 😊\n\nPlease choose an option:", options: MAIN_OPTIONS }],
    next: { flow: "menu" },
  };
}

// Match a user's registered product by index or keyword
function matchUserProduct(userProducts, txt) {
  return userProducts.findIndex((p, i) =>
    txt.includes(String(i + 1)) ||
    p.name.toLowerCase().split(" ").some((w) => w.length > 3 && txt.includes(w))
  );
}

// Match catalogue product by index or keyword
function matchCatalogueProduct(txt) {
  const all = Object.keys(PRODUCT_CATALOGUE);
  return all.find((p, i) =>
    txt.includes(String(i + 1)) ||
    p.toLowerCase().split(" ").some((w) => w.length > 3 && txt.includes(w))
  );
}

// ═══════════════════════════════════════════════════════
//  MAIN CHAT ENGINE
// ═══════════════════════════════════════════════════════
function getResponse(state, input) {
  const txt = input.trim().toLowerCase();
  const raw = input.trim();
  const FREE_TEXT_FLOWS = ["complaint_issue", "buy_mobile_collect"];

  // Out-of-scope guard — reset to home
  if (!FREE_TEXT_FLOWS.includes(state.flow) && isOutOfScope(txt)) return fallback();

  // ── IDLE ──
  if (state.flow === "idle") {
    return {
      msgs: [
        { from: "bot", text: "Hello! 👋 Welcome to **Aquaguard Support**. How may I help you today?" },
        { from: "bot", text: "Please choose an option:", options: MAIN_OPTIONS },
      ],
      next: { flow: "menu" },
    };
  }

  // ── MENU ──
  if (state.flow === "menu") {
    if (txt.includes("1") || txt.includes("amc") || txt.includes("renew"))
      return { msgs: [{ from: "bot", text: "Sure! Please enter your **registered mobile number** to continue:" }], next: { flow: "amc_phone" } };
    if (txt.includes("2") || txt.includes("register") || (txt.includes("new") && txt.includes("complaint")))
      return { msgs: [{ from: "bot", text: "Please enter your **registered mobile number**:" }], next: { flow: "complaint_mobile" } };
    if (txt.includes("3") || txt.includes("status") || txt.includes("check"))
      return { msgs: [{ from: "bot", text: "Please enter your **complaint / ticket number** (e.g. AQ123456):" }], next: { flow: "status_ask" } };
    if (txt.includes("4") || txt.includes("buy") || txt.includes("product"))
      return startBuy();
    return fallback();
  }

  // ════════════════════════════════
  //  FLOW 1 — AMC RENEWAL
  // ════════════════════════════════
  if (state.flow === "amc_phone") {
    const phone = cleanPhone(raw);
    if (phone.length === 10) {
      const user = USER_DB[phone];
      if (!user) return { msgs: [{ from: "bot", text: `❌ No registered account found for **${phone}**.\nPlease check your number or contact our helpline.` }], next: state };
      return {
        msgs: [{ from: "bot", text: `✅ Welcome, **${user.name}**! We found **${user.products.length}** registered product(s).\n\nSelect a product to view AMC details:`, options: user.products.map((p, i) => `${i + 1}. ${p.name}`) }],
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
          text: `📋 **AMC Details**\n\n🔧 Product: ${p.name}\n💰 AMC Price: ${p.amc_price}\n📅 Expiry: ${p.amc_expiry}\n${emoji} Status: **${p.amc_status}**\n\nWould you like to renew this AMC?`,
          options: ["✅ Yes, Renew Now", "❌ No, Go Back"],
        }],
        next: { ...state, flow: "amc_confirm", selectedProduct: p },
      };
    }
    return { msgs: [{ from: "bot", text: "Please select a valid product.", options: state.user.products.map((p, i) => `${i + 1}. ${p.name}`) }], next: state };
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

  // ════════════════════════════════
  //  FLOW 2 — REGISTER COMPLAINT
  // ════════════════════════════════
  if (state.flow === "complaint_mobile") {
    const phone = cleanPhone(raw);
    if (phone.length === 10) {
      const user = USER_DB[phone];
      if (!user) return { msgs: [{ from: "bot", text: `❌ No registered account found for **${phone}**.\nPlease check your number or contact our helpline.` }], next: state };
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
    return { msgs: [{ from: "bot", text: "Please select a valid product.", options: state.userProducts.map((p, i) => `${i + 1}. ${p.name}`) }], next: state };
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

  // ════════════════════════════════
  //  FLOW 3 — CHECK STATUS (ticket only)
  // ════════════════════════════════
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
    return {
      msgs: [{ from: "bot", text: `❌ No complaint found for ticket **${ticketNo}**.\n\nPlease check the number and try again:` }],
      next: state,
    };
  }

  // ════════════════════════════════
  //  FLOW 4 — BUY NEW PRODUCT
  // ════════════════════════════════
  if (state.flow === "buy_select") {
    const match = matchCatalogueProduct(txt);
    if (match) {
      const p = PRODUCT_CATALOGUE[match];
      return {
        msgs: [{
          from: "bot",
          text: `🛒 **${match}**\n\n⚙️ Technology: ${p.technology}\n💰 Price: ${p.price}\n✨ Features:\n${p.features.map((f) => `  • ${f}`).join("\n")}\n\nWould you like to schedule a **demo** or **purchase** this product?`,
          options: ["📅 Schedule Demo", "🛍️ Purchase Now", "⬅️ Back to Menu"],
        }],
        next: { flow: "buy_confirm", selectedProduct: match },
      };
    }
    return { msgs: [{ from: "bot", text: "Please select a valid product.", options: Object.keys(PRODUCT_CATALOGUE).map((p, i) => `${i + 1}. ${p}`) }], next: state };
  }

  if (state.flow === "buy_confirm") {
    if (txt.includes("back") || txt.includes("menu")) return mainMenu();
    if (txt.includes("demo") || txt.includes("purchase") || txt.includes("🛍") || txt.includes("📅")) {
      const action = (txt.includes("demo") || txt.includes("📅")) ? "demo" : "purchase";
      return {
        msgs: [{ from: "bot", text: `Great choice! Please enter your **mobile number** to schedule your ${action === "demo" ? "free demo" : "purchase callback"}:` }],
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
          { from: "bot", text: `📞 Perfect! Our executive will call **${phone}** within **2 hours** to assist with:\n\n🛒 **${state.selectedProduct}**\n\nThank you for choosing Aquaguard! 💧` },
          menuPrompt(),
        ],
        next: { flow: "menu" },
      };
    }
    return { msgs: [{ from: "bot", text: "Please enter a valid **10-digit mobile number**." }], next: state };
  }

  return fallback();
}

function startBuy() {
  return {
    msgs: [{ from: "bot", text: "Here are our products. Please select one to view details:", options: Object.keys(PRODUCT_CATALOGUE).map((p, i) => `${i + 1}. ${p}`) }],
    next: { flow: "buy_select" },
  };
}

// ═══════════════════════════════════════════════════════
//  MARKDOWN-LITE RENDERER
// ═══════════════════════════════════════════════════════
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

// ═══════════════════════════════════════════════════════
//  UI COMPONENTS
// ═══════════════════════════════════════════════════════
function TypingIndicator() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "12px 16px", background: "#f0f9ff", borderRadius: "18px 18px 18px 4px", width: "fit-content", marginBottom: 8 }}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "#0ea5e9", animation: "bounce 1.2s infinite", animationDelay: `${i * 0.2}s` }} />
      ))}
    </div>
  );
}

function Message({ msg }) {
  const isBot = msg.from === "bot";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: isBot ? "flex-start" : "flex-end", marginBottom: 12, animation: "fadeSlide 0.3s ease" }}>
      {isBot ? (
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#0ea5e9,#0284c7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>💧</div>
          <div style={{ maxWidth: 340, background: "#f0f9ff", color: "#0c4a6e", padding: "12px 16px", borderRadius: "18px 18px 18px 4px", fontSize: 14, lineHeight: 1.65, boxShadow: "0 1px 4px rgba(14,165,233,0.15)" }}>
            {renderText(msg.text)}
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: 280, background: "linear-gradient(135deg,#0ea5e9,#0369a1)", color: "#fff", padding: "12px 16px", borderRadius: "18px 18px 4px 18px", fontSize: 14, lineHeight: 1.65, boxShadow: "0 2px 8px rgba(14,165,233,0.3)" }}>
          {msg.text}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//  MAIN APP
// ═══════════════════════════════════════════════════════
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
    }, 700);
  }

  function sendMessage(text) {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { from: "user", text: text.trim() }]);
    setInput("");
    setQuickOptions([]);
    setTimeout(() => triggerBot(text.trim()), 250);
  }

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
        .opt-btn{background:#fff;color:#0369a1;border:1.5px solid #7dd3fc;border-radius:20px;padding:6px 12px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;transition:all 0.15s;white-space:nowrap}
        .opt-btn:hover{background:#0ea5e9;color:#fff;border-color:#0ea5e9}
        .send-btn{width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#0369a1,#0ea5e9);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:18px;box-shadow:0 2px 8px rgba(14,165,233,0.4);transition:transform 0.15s;flex-shrink:0}
        .send-btn:hover{transform:scale(1.08)}
      `}</style>

      <div style={{ width: 430, height: 720, display: "flex", flexDirection: "column", background: "#fff", borderRadius: 24, overflow: "hidden", boxShadow: "0 20px 60px rgba(14,165,233,0.25),0 4px 20px rgba(0,0,0,0.1)" }}>

        {/* HEADER */}
        <div style={{ background: "linear-gradient(135deg,#0369a1 0%,#0ea5e9 100%)", padding: "18px 20px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, border: "2px solid rgba(255,255,255,0.4)" }}>💧</div>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 16, letterSpacing: 0.3 }}>Aquaguard Support</div>
            <div style={{ color: "#bae6fd", fontSize: 12, display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", display: "inline-block", animation: "pulse 2s infinite" }} />
              Online — Typically replies instantly
            </div>
          </div>
          <div style={{ marginLeft: "auto", color: "rgba(255,255,255,0.75)", fontSize: 11, textAlign: "right", lineHeight: 1.7 }}>
            <div>🔒 Secure Chat</div>
            <div>24 / 7 Support</div>
          </div>
        </div>

        {/* DEMO HINT BANNER */}
        <div style={{ background: "#fffbeb", borderBottom: "1px solid #fde68a", padding: "7px 14px", fontSize: 11, color: "#92400e", lineHeight: 1.5 }}>
          📌 <strong>Test phones:</strong> 9876543210 · 8765432109 · 7654321098&nbsp;&nbsp;|&nbsp;&nbsp;<strong>Test tickets:</strong> AQ123456 · AQ234567 · AQ345678
        </div>

        {/* MESSAGES */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 8px", background: "#f8fcff" }}>
          {messages.map((msg, i) => <Message key={i} msg={msg} />)}
          {typing && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>

        {/* QUICK OPTIONS */}
        {quickOptions.length > 0 && (
          <div style={{ padding: "8px 14px", display: "flex", flexWrap: "wrap", gap: 6, background: "#f8fcff", borderTop: "1px solid #e0f2fe" }}>
            {quickOptions.map((opt, i) => (
              <button key={i} className="opt-btn" onClick={() => sendMessage(opt)}>{opt}</button>
            ))}
          </div>
        )}

        {/* INPUT */}
        <div style={{ padding: "12px 16px", display: "flex", gap: 10, alignItems: "center", background: "#fff", borderTop: "1px solid #e0f2fe", flexShrink: 0 }}>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Type a message or tap an option above…"
            style={{ flex: 1, border: "1.5px solid #bae6fd", borderRadius: 24, padding: "10px 16px", fontSize: 14, fontFamily: "inherit", color: "#0c4a6e", background: "#f0f9ff", transition: "border 0.2s" }}
            onFocus={(e) => (e.target.style.borderColor = "#0ea5e9")}
            onBlur={(e) => (e.target.style.borderColor = "#bae6fd")}
          />
          <button className="send-btn" onClick={() => sendMessage(input)}>➤</button>
        </div>
      </div>
    </>
  );
}
