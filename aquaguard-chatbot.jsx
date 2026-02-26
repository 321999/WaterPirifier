import { useState, useRef, useEffect } from "react";

// ─── DATABASE ────────────────────────────────────────────────────────────────
const PRODUCTS = {
  "Aquaguard Enrich Nexen 2X RO+UV": {
    amc_price: "₹2,499/year",
    amc_expiry: "15 Mar 2025",
    technology: "RO + UV + MTDS",
    price: "₹18,999",
    features: ["8L storage", "Active Copper", "10L/hr flow", "Digital display"],
  },
  "Aquaguard Enrich Marvel RO+UV Stainless Steel Copper": {
    amc_price: "₹2,799/year",
    amc_expiry: "22 Apr 2025",
    technology: "RO + UV + Copper Infusion",
    price: "₹22,499",
    features: ["SS tank 8L", "Copper charge", "Mineral Guard", "Auto shut-off"],
  },
  "Aquaguard Aspire Blaze 2X RO+UV Stainless Steel": {
    amc_price: "₹2,299/year",
    amc_expiry: "10 Feb 2025",
    technology: "RO + UV + Taste Adjuster",
    price: "₹16,999",
    features: ["SS 7L tank", "Taste Adjuster", "LED indicator", "Wall mount"],
  },
  "Aquaguard Designo UTC RO+UV 2X": {
    amc_price: "₹3,199/year",
    amc_expiry: "05 Jun 2025",
    technology: "RO + UV + UF",
    price: "₹27,999",
    features: ["Under-counter", "10L SS tank", "Zero splash", "Smart alerts"],
  },
  "Aquaguard Aspire Nova 2X RO+UV Copper": {
    amc_price: "₹2,599/year",
    amc_expiry: "18 May 2025",
    technology: "RO + UV + Copper + Mineral",
    price: "₹19,499",
    features: ["Copper infusion", "8L tank", "Mineral boost", "Easy filter"],
  },
  "Aquaguard Aspire Spark RO+UV Hot & Ambient": {
    amc_price: "₹3,499/year",
    amc_expiry: "30 Jul 2025",
    technology: "RO + UV + Hot & Cold",
    price: "₹31,999",
    features: ["Hot & ambient", "Instant hot", "6L tank", "Child lock"],
  },
};

const PRODUCT_NAMES = Object.keys(PRODUCTS);

function genTicket() {
  return "AQ" + Math.floor(100000 + Math.random() * 900000);
}

// ─── CHAT ENGINE ─────────────────────────────────────────────────────────────
function getResponse(state, input) {
  const txt = input.trim().toLowerCase();

  // ── IDLE / GREETING ──
  if (state.flow === "idle") {
    return {
      msgs: [
        { from: "bot", text: "Hello! 👋 Welcome to **Aquaguard Support**. How may I help you today?" },
        {
          from: "bot",
          text: "Please choose an option:",
          options: ["1. AMC Renewal", "2. Register New Complaint", "3. Check Complaint Status", "4. Buy New Product"],
        },
      ],
      next: { flow: "menu" },
    };
  }

  // ── MAIN MENU ──
  if (state.flow === "menu") {
    if (txt.includes("1") || txt.includes("amc")) return startAMC();
    if (txt.includes("2") || txt.includes("complaint") || txt.includes("register"))
      return startComplaint();
    if (txt.includes("3") || txt.includes("status") || txt.includes("check"))
      return startStatus();
    if (txt.includes("4") || txt.includes("buy") || txt.includes("product"))
      return startBuy();
    return fallback();
  }

  // ── AMC ──
  if (state.flow === "amc_select") {
    const match = PRODUCT_NAMES.find((p, i) =>
      txt.includes(String(i + 1)) || p.toLowerCase().includes(txt.split(" ")[0])
    );
    if (match) {
      const p = PRODUCTS[match];
      return {
        msgs: [
          {
            from: "bot",
            text: `📋 **AMC Details for ${match}**\n\n💰 Price: ${p.amc_price}\n📅 Expiry: ${p.amc_expiry}\n\nYour AMC is expiring soon. Would you like to renew it?`,
            options: ["✅ Yes, Renew Now", "❌ No, Not Now"],
          },
        ],
        next: { flow: "amc_confirm", product: match },
      };
    }
    return { msgs: [{ from: "bot", text: "Please select a valid product from the list." }], next: state };
  }

  if (state.flow === "amc_confirm") {
    if (txt.includes("yes") || txt.includes("renew") || txt.includes("✅")) {
      return {
        msgs: [
          { from: "bot", text: "🎉 Great! We will send you a **secure payment link** via SMS shortly. Thank you for renewing your AMC!" },
          menuPrompt(),
        ],
        next: { flow: "menu" },
      };
    }
    return {
      msgs: [
        { from: "bot", text: "No problem! Feel free to reach out anytime. 😊" },
        menuPrompt(),
      ],
      next: { flow: "menu" },
    };
  }

  // ── COMPLAINT ──
  if (state.flow === "complaint_mobile") {
    if (txt.replace(/\D/g, "").length >= 10) {
      return {
        msgs: [{ from: "bot", text: "Thank you! Which product is this complaint for?", options: PRODUCT_NAMES.map((p, i) => `${i + 1}. ${p}`) }],
        next: { flow: "complaint_product", mobile: input.trim() },
      };
    }
    return { msgs: [{ from: "bot", text: "Please enter a valid 10-digit mobile number." }], next: state };
  }

  if (state.flow === "complaint_product") {
    const match = PRODUCT_NAMES.find((p, i) =>
      txt.includes(String(i + 1)) || p.toLowerCase().includes(txt.split(" ")[0])
    );
    if (match) {
      return {
        msgs: [{ from: "bot", text: `Got it! Please describe your issue with **${match}**:` }],
        next: { ...state, flow: "complaint_issue", product: match },
      };
    }
    return { msgs: [{ from: "bot", text: "Please select a valid product." }], next: state };
  }

  if (state.flow === "complaint_issue") {
    const ticket = genTicket();
    return {
      msgs: [
        {
          from: "bot",
          text: `✅ **Complaint Registered Successfully!**\n\n🎫 Ticket No: **${ticket}**\n📱 Mobile: ${state.mobile}\n🔧 Product: ${state.product}\n📝 Issue: ${input.trim()}\n\nOur team will contact you within **24 hours**.`,
        },
        menuPrompt(),
      ],
      next: { flow: "menu" },
    };
  }

  // ── STATUS ──
  if (state.flow === "status_ask") {
    if (input.trim().length > 4) {
      const statuses = [
        "🔧 Assigned to a technician — resolution within **24 hours**.",
        "🚗 Technician is **on the way** to your location.",
        "✅ Issue **resolved**. Please rate your experience.",
        "⏳ Under review by our technical team.",
      ];
      const s = statuses[Math.floor(Math.random() * statuses.length)];
      return {
        msgs: [
          { from: "bot", text: `📊 **Status for Ticket ${input.trim().toUpperCase()}:**\n\n${s}` },
          menuPrompt(),
        ],
        next: { flow: "menu" },
      };
    }
    return { msgs: [{ from: "bot", text: "Please enter a valid ticket number." }], next: state };
  }

  // ── BUY ──
  if (state.flow === "buy_select") {
    const match = PRODUCT_NAMES.find((p, i) =>
      txt.includes(String(i + 1)) || p.toLowerCase().includes(txt.split(" ")[0])
    );
    if (match) {
      const p = PRODUCTS[match];
      return {
        msgs: [
          {
            from: "bot",
            text: `🛒 **${match}**\n\n⚙️ Technology: ${p.technology}\n💰 Price: ${p.price}\n✨ Features:\n${p.features.map((f) => `  • ${f}`).join("\n")}\n\nWould you like to **schedule a demo** or **purchase** this product?`,
            options: ["📅 Schedule Demo", "🛍️ Purchase Now", "⬅️ Back to Menu"],
          },
        ],
        next: { flow: "buy_confirm", product: match },
      };
    }
    return { msgs: [{ from: "bot", text: "Please select a valid product from the list." }], next: state };
  }

  if (state.flow === "buy_confirm") {
    if (txt.includes("back") || txt.includes("menu")) {
      return { msgs: [menuPrompt()], next: { flow: "menu" } };
    }
    if (txt.includes("demo") || txt.includes("purchase") || txt.includes("yes")) {
      return {
        msgs: [{ from: "bot", text: "Please share your **registered mobile number** so we can schedule a callback:" }],
        next: { ...state, flow: "buy_mobile" },
      };
    }
    return { msgs: [{ from: "bot", text: "Please choose an option above." }], next: state };
  }

  if (state.flow === "buy_mobile") {
    if (txt.replace(/\D/g, "").length >= 10) {
      return {
        msgs: [
          { from: "bot", text: `📞 Thank you! Our executive will call **${input.trim()}** within **2 hours** to assist you with **${state.product}**. 🎉` },
          menuPrompt(),
        ],
        next: { flow: "menu" },
      };
    }
    return { msgs: [{ from: "bot", text: "Please enter a valid 10-digit mobile number." }], next: state };
  }

  return fallback();
}

function startAMC() {
  return {
    msgs: [
      {
        from: "bot",
        text: "Sure! Please select your registered product:",
        options: PRODUCT_NAMES.map((p, i) => `${i + 1}. ${p}`),
      },
    ],
    next: { flow: "amc_select" },
  };
}

function startComplaint() {
  return {
    msgs: [{ from: "bot", text: "I'll help you register a complaint. Please provide your **registered mobile number**:" }],
    next: { flow: "complaint_mobile" },
  };
}

function startStatus() {
  return {
    msgs: [{ from: "bot", text: "Please enter your **complaint/ticket number**:" }],
    next: { flow: "status_ask" },
  };
}

function startBuy() {
  return {
    msgs: [
      {
        from: "bot",
        text: "Here are our products. Please select one to view details:",
        options: PRODUCT_NAMES.map((p, i) => `${i + 1}. ${p}`),
      },
    ],
    next: { flow: "buy_select" },
  };
}

function menuPrompt() {
  return {
    from: "bot",
    text: "What else can I help you with?",
    options: ["1. AMC Renewal", "2. Register New Complaint", "3. Check Complaint Status", "4. Buy New Product"],
  };
}

function fallback() {
  return {
    msgs: [
      {
        from: "bot",
        text: "I can help you with AMC renewal, complaints, product purchase, or status tracking. Please choose an option:",
        options: ["1. AMC Renewal", "2. Register New Complaint", "3. Check Complaint Status", "4. Buy New Product"],
      },
    ],
    next: { flow: "menu" },
  };
}

// ─── MARKDOWN-LITE RENDERER ───────────────────────────────────────────────────
function renderText(text) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <span key={i}>
        {parts.map((p, j) =>
          p.startsWith("**") && p.endsWith("**") ? (
            <strong key={j}>{p.slice(2, -2)}</strong>
          ) : (
            <span key={j}>{p}</span>
          )
        )}
        {i < lines.length - 1 && <br />}
      </span>
    );
  });
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "12px 16px", background: "#f0f9ff", borderRadius: "18px 18px 18px 4px", width: "fit-content", marginBottom: 8 }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 8, height: 8, borderRadius: "50%", background: "#0ea5e9",
            animation: "bounce 1.2s infinite",
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}

function Message({ msg }) {
  const isBot = msg.from === "bot";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: isBot ? "flex-start" : "flex-end", marginBottom: 12, animation: "fadeSlide 0.3s ease" }}>
      {isBot && (
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#0ea5e9,#0284c7)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0,
          }}>💧</div>
          <div style={{
            maxWidth: 340, background: "#f0f9ff", color: "#0c4a6e", padding: "12px 16px",
            borderRadius: "18px 18px 18px 4px", fontSize: 14, lineHeight: 1.6,
            boxShadow: "0 1px 4px rgba(14,165,233,0.15)",
          }}>
            {renderText(msg.text)}
          </div>
        </div>
      )}
      {!isBot && (
        <div style={{
          maxWidth: 280, background: "linear-gradient(135deg,#0ea5e9,#0369a1)", color: "#fff",
          padding: "12px 16px", borderRadius: "18px 18px 4px 18px", fontSize: 14, lineHeight: 1.6,
          boxShadow: "0 2px 8px rgba(14,165,233,0.3)",
        }}>
          {msg.text}
        </div>
      )}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function AquaguardChat() {
  const [messages, setMessages] = useState([]);
  const [chatState, setChatState] = useState({ flow: "idle" });
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [quickOptions, setQuickOptions] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    // Initial greeting
    triggerBot("hi", { flow: "idle" });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  function triggerBot(userInput, forcedState) {
    const currentState = forcedState || chatState;
    const { msgs, next } = getResponse(currentState, userInput);

    setTyping(true);
    setQuickOptions([]);

    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, ...msgs]);
      setChatState(next);
      const lastMsg = msgs[msgs.length - 1];
      if (lastMsg?.options) setQuickOptions(lastMsg.options);
    }, 800);
  }

  function sendMessage(text) {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { from: "user", text }]);
    setInput("");
    setQuickOptions([]);
    setTimeout(() => triggerBot(text), 300);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: #e0f2fe; min-height: 100vh; display: flex; align-items: center; justify-content: center; }
        @keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
        @keyframes fadeSlide { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #bae6fd; border-radius: 4px; }
        input:focus { outline: none; }
      `}</style>

      <div style={{
        width: 420, height: 680, display: "flex", flexDirection: "column",
        background: "#fff", borderRadius: 24, overflow: "hidden",
        boxShadow: "0 20px 60px rgba(14,165,233,0.25), 0 4px 20px rgba(0,0,0,0.1)",
      }}>
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg,#0369a1 0%,#0ea5e9 100%)",
          padding: "18px 20px", display: "flex", alignItems: "center", gap: 12,
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
            border: "2px solid rgba(255,255,255,0.4)",
          }}>💧</div>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>Aquaguard Support</div>
            <div style={{ color: "#bae6fd", fontSize: 12, display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", display: "inline-block", animation: "pulse 2s infinite" }} />
              Online — Typically replies instantly
            </div>
          </div>
          <div style={{ marginLeft: "auto", color: "rgba(255,255,255,0.7)", fontSize: 12, textAlign: "right" }}>
            <div>🔒 Secure</div>
            <div>24/7 Support</div>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 8px", background: "#f8fcff" }}>
          {messages.map((msg, i) => <Message key={i} msg={msg} />)}
          {typing && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>

        {/* Quick Options */}
        {quickOptions.length > 0 && (
          <div style={{ padding: "8px 16px", display: "flex", flexWrap: "wrap", gap: 6, background: "#f8fcff", borderTop: "1px solid #e0f2fe" }}>
            {quickOptions.map((opt, i) => (
              <button
                key={i}
                onClick={() => sendMessage(opt)}
                style={{
                  background: "#fff", color: "#0369a1", border: "1.5px solid #7dd3fc",
                  borderRadius: 20, padding: "6px 12px", fontSize: 12, fontWeight: 500,
                  cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => { e.target.style.background = "#0ea5e9"; e.target.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.target.style.background = "#fff"; e.target.style.color = "#0369a1"; }}
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div style={{
          padding: "12px 16px", display: "flex", gap: 10, alignItems: "center",
          background: "#fff", borderTop: "1px solid #e0f2fe",
        }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Type a message..."
            style={{
              flex: 1, border: "1.5px solid #bae6fd", borderRadius: 24, padding: "10px 16px",
              fontSize: 14, fontFamily: "inherit", color: "#0c4a6e", background: "#f0f9ff",
              transition: "border 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#0ea5e9")}
            onBlur={(e) => (e.target.style.borderColor = "#bae6fd")}
          />
          <button
            onClick={() => sendMessage(input)}
            style={{
              width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#0369a1,#0ea5e9)",
              border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, boxShadow: "0 2px 8px rgba(14,165,233,0.4)", transition: "transform 0.15s",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            ➤
          </button>
        </div>
      </div>
    </>
  );
}
