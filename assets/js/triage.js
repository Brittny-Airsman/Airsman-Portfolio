(function () {
  const demoExamples = [
    'Bathroom ceiling in apartment 205 is leaking at Gravois Avenue',
    'Front door key is getting stuck in the lock at Gravois Avenue',
    'Cockroach problem in apartment 2B at Winona Avenue',
    "Clogged toilet that won't flush in apartment A at Schirmer Street",
    'Tenant moved out of #22 Crosswinds Drive and left trash, holes in walls, flooring needs replaced, and walls repainted for occupancy inspection'
  ];

  const el = (id) => document.getElementById(id);

  const requestEl = el("request");
  const outputSection = el("outputSection");

  const priorityEl = el("priority");
  const categoryEl = el("category");
  const actionsEl = el("actions");
  const safetyEl = el("safety");
  const toolsEl = el("tools");
  const docsEl = el("docs");
  const workorderEl = el("workorder");

  function clearList(ul) {
    while (ul.firstChild) ul.removeChild(ul.firstChild);
  }

  function addItems(ul, items) {
    clearList(ul);
    items.forEach((t) => {
      const li = document.createElement("li");
      li.textContent = t;
      ul.appendChild(li);
    });
  }

  function normalize(text) {
    return (text || "").toLowerCase().trim();
  }

  function detectSignals(text) {
    const t = normalize(text);

    const signals = {
      waterLeak: /leak|drip|ceiling.*water|water.*ceiling|pipe|plumbing leak/.test(t),
      roaches: /roach|cockroach|bugs|infestation|pest/.test(t),
      toiletClog: /toilet|clog|won't flush|backing up|sewage/.test(t),
      lockKey: /key|lock|deadbolt|door.*stuck|stuck.*lock/.test(t),
      turnover: /moved out|turnover|trash|holes in walls|flooring|repaint|occupancy inspection|make ready/.test(t)
    };

    return signals;
  }

  function triage(text) {
    const s = detectSignals(text);

    // Default output
    let priority = "Routine (Schedule)";
    let category = "General maintenance";
    let actions = [
      "Confirm unit/address and preferred access method.",
      "Create work order with clear scope and photos requested.",
      "Schedule during standard maintenance hours."
    ];
    let safety = [
      "Ask tenant to keep pets secured for entry.",
      "If electrical hazard is mentioned, shut off breaker and escalate."
    ];
    let tools = ["Basic hand tools", "Phone/camera for documentation"];
    let docs = ["Before photos", "After photos", "Notes on materials used", "Time on site"];

    // Water leak
    if (s.waterLeak) {
      priority = "Emergency / Urgent";
      category = "Plumbing / Water intrusion";
      actions = [
        "Call tenant immediately: confirm active leak status and location.",
        "If active: instruct tenant to contain water (bucket/towels) and avoid affected electrical fixtures.",
        "Dispatch maintenance ASAP. Identify source (above unit? roof? supply line?).",
        "If ceiling is saturated: assess for collapse risk and consider opening access to dry."
      ];
      safety = [
        "Do NOT use lights/outlets near the leak until confirmed safe.",
        "If water near electrical: shut off circuit at breaker before inspection.",
        "Wear eye protection if cutting drywall. Watch for mold."
      ];
      tools = [
        "Moisture meter (if available)",
        "Drywall knife/saw",
        "Bucket/tarps",
        "Plumbing basics (wrenches, tape)",
        "Fan/dehumidifier (if available)"
      ];
      docs = [
        "Photos/video of leak and affected area",
        "Where water appears + suspected source",
        "Meter readings (if available)",
        "Dry-out plan and follow-up date"
      ];
    }

    // Toilet clog/back-up
    if (s.toiletClog) {
      priority = "Urgent (Same day if possible)";
      category = "Plumbing / Drain";
      actions = [
        "Ask tenant: is there overflow or sewage? If yes, treat as emergency.",
        "Advise tenant to stop using the toilet until cleared.",
        "Attempt plunge/auger. If recurring: inspect main line and venting.",
        "If multiple fixtures affected: escalate as possible mainline blockage."
      ];
      safety = [
        "Use gloves and sanitize surfaces after work.",
        "If sewage present: PPE and consider professional drain service."
      ];
      tools = ["Plunger", "Toilet auger", "Gloves", "Disinfectant", "Shop towels"];
      docs = [
        "Tenant report (duration, frequency)",
        "Work performed (plunge/auger/service)",
        "Outcome + recommendation if recurring"
      ];
    }

    // Roaches/pests
    if (s.roaches) {
      priority = "Urgent (Within 24–72 hours)";
      category = "Pest control / Habitability";
      actions = [
        "Confirm scope: where seen, how often, any neighboring units affected.",
        "Provide tenant prep instructions (clear under sink, remove clutter, food sealed).",
        "Place baits/IGR as appropriate or schedule professional treatment.",
        "Consider adjacent unit checks if recurring."
      ];
      safety = [
        "Use products per label instructions.",
        "Keep baits away from pets/children; document placement."
      ];
      tools = [
        "Glue traps",
        "Gel bait stations",
        "IGR (if using)",
        "Vacuum (for egg casings if needed)"
      ];
      docs = [
        "Tenant symptom report + locations",
        "Photos if available",
        "Treatment plan + date",
        "Follow-up inspection schedule"
      ];
    }

    // Lock/key issue
    if (s.lockKey) {
      priority = "Routine → Urgent if lockout risk";
      category = "Entry / Hardware";
      actions = [
        "Confirm whether tenant can reliably enter/exit right now.",
        "Lubricate lock cylinder and inspect key condition.",
        "If issue persists: re-key/replace cylinder or adjust strike plate alignment."
      ];
      safety = [
        "Ensure door still latches securely after adjustment.",
        "If lock failure risks security, treat as urgent."
      ];
      tools = ["Graphite or lock lubricant", "Screwdrivers", "Strike plate shims", "Spare cylinder/key set"];
      docs = ["Photo of hardware", "What was adjusted/replaced", "Key test results"];
    }

    // Turnover/make-ready
    if (s.turnover) {
      priority = "Scheduled (Project)";
      category = "Turnover / Make-ready";
      actions = [
        "Perform move-out inspection with photos and damage notes.",
        "Estimate scope: trash-out, patch/texture, paint, flooring, cleaning.",
        "Build a work plan and timeline aligned to occupancy inspection.",
        "Order materials and schedule any vendors (flooring, hauling)."
      ];
      safety = [
        "Use PPE for trash-out (gloves, mask).",
        "Check for sharps, pests, and structural hazards before work."
      ];
      tools = [
        "Trash bags/hauling plan",
        "Drywall patch kit",
        "Paint + supplies",
        "Flooring tools/vendor contacts"
      ];
      docs = [
        "Move-out inspection photos (all rooms)",
        "Damage list with measurements",
        "Material list + receipts",
        "Before/after photos for inspection"
      ];
    }

    // Work order draft
    const workOrder = [
      "WORK ORDER DRAFT",
      "----------------",
      `Request: ${text || "(none provided)"}`,
      `Category: ${category}`,
      `Priority: ${priority}`,
      "",
      "Site notes:",
      "- Address/Unit: (fill in)",
      "- Contact/Access: (fill in)",
      "- Pets present?: (yes/no)",
      "",
      "Scope of work:",
      actions.map(a => `- ${a}`).join("\n"),
      "",
      "Safety checks:",
      safety.map(s => `- ${s}`).join("\n"),
      "",
      "Documentation required:",
      docs.map(d => `- ${d}`).join("\n")
    ].join("\n");

    return { priority, category, actions, safety, tools, docs, workOrder };
  }

  function run() {
    const text = requestEl.value.trim();
    const result = triage(text);

    outputSection.style.display = "block";
    priorityEl.textContent = result.priority;
    categoryEl.textContent = result.category;

    addItems(actionsEl, result.actions);
    addItems(safetyEl, result.safety);
    addItems(toolsEl, result.tools);
    addItems(docsEl, result.docs);

    workorderEl.textContent = result.workOrder;

    // Scroll to output for mobile sanity
    outputSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  el("triageBtn").addEventListener("click", run);

  el("clearBtn").addEventListener("click", function () {
    requestEl.value = "";
    outputSection.style.display = "none";
  });

  el("demoBtn").addEventListener("click", function () {
    requestEl.value = demoExamples.join("\n\n");
  });
})();
