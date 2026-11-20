window.vertiportData = {
  cities: [
    {
      slug: "hong-kong",
      name: "Hong Kong",
      status: "Primary Demo",
      summary: "Five operationally-grounded candidates spanning rooftop heliport conversion, open-surface campus node, urban marina floating platform, waterfront logistics wharf, and a remote island medical node — covering the full typology spectrum in one dense, regulation-mature environment.",
      coverage: "148 candidate sites identified",
      recommended: "Priority corridors: HKCEC CBD → Pak Shek Kok, Cyberport → Cheung Chau medical chain"
    },
    {
      slug: "shenzhen",
      name: "Shenzhen",
      status: "Phase 2",
      summary: "Strong fit for GBA expansion: tech campuses, headquarters clusters and cross-border commuter demand.",
      coverage: "96 pre-configured sites",
      recommended: "Best paired with Hong Kong for cross-city network analysis"
    },
    {
      slug: "gba-corridor",
      name: "GBA Corridor",
      status: "Route Demo",
      summary: "Regional network lens — illustrates alternate-site coverage, energy relay and inter-city corridor value.",
      coverage: "12 cross-city anchor nodes",
      recommended: "Suitable for investment and regional-partnership briefings"
    }
  ],

  recentAnalyses: [
    {
      title: "HKCEC CBD Passenger Hub",
      city: "Hong Kong",
      status: "Recommended for Advancement",
      note: "Existing shared-use heliport makes HKCEC the most realistic near-term CBD passenger node. FAA EB 105A explicitly supports existing helicopter facility conversion — regulatory pathway is shorter than a greenfield rooftop.",
      siteId: "hkcec-wanchai",
      plan: "standard"
    },
    {
      title: "Pak Shek Kok Cargo & Research Node",
      city: "Hong Kong",
      status: "Priority Due-Diligence",
      note: "AIP Supplement lists Pak Shek Kok / HKSTP as an operationalised BVLOS sandbox zone. Active drone delivery to Tai Po Waterfront Pier already running. Ideal open-surface medium vertiport for phased cargo-to-passenger upgrade.",
      siteId: "science-park-pak-shek-kok",
      plan: "lean"
    },
    {
      title: "Cyberport Cross-Sea Medical Link",
      city: "Hong Kong",
      status: "Demo-Ready",
      note: "AIP-listed sandbox zone. Active Cyberport–Cheung Chau delivery ops including medical supplies to St. John Hospital. South HK Island's critical maritime logistics and emergency node.",
      siteId: "cyberport-east-lamma",
      plan: "lean"
    }
  ],

  workflow: [
    {
      title: "Project Modelling",
      text: "Define city, budget, use-case, aircraft type assumptions and risk appetite to set project boundaries."
    },
    {
      title: "Site Screening",
      text: "Overlay airspace rules, obstacles, wind environment, connectivity and energy access to filter viable candidates."
    },
    {
      title: "Site Assessment",
      text: "Output hard-gate status, composite score, key risks and recommended scheme tier for each candidate."
    },
    {
      title: "Module Configuration",
      text: "Assemble flight, energy, passenger, safety and digital modules on the rooftop or ground plan."
    },
    {
      title: "Route Simulation",
      text: "Link range, charging, turnaround, fleet size, alternates, weather and airspace to verify operational viability."
    },
    {
      title: "Investment Decision",
      text: "Compare CAPEX, OPEX, throughput and payback across multiple sites, schemes and scenarios."
    }
  ],

  scoringDimensions: [
    {
      label: "Safety & Airspace",
      value: "25 pts",
      detail: "Obstacle clearance, approach/departure surfaces, wind & turbulence, downwash impact, emergency landing & alternate support"
    },
    {
      label: "Implementation Feasibility",
      value: "20 pts",
      detail: "Structural retrofit difficulty, construction complexity, equipment access, disruption to existing tenants"
    },
    {
      label: "Regulatory Readiness",
      value: "20 pts",
      detail: "Applicable guidance compliance, approval pathway clarity, night ops / automation / high-frequency requirements"
    },
    {
      label: "Operational Fit",
      value: "15 pts",
      detail: "Aircraft compatibility, stand organisation, charging & turnaround efficiency, time-slot capacity"
    },
    {
      label: "Connectivity & Network",
      value: "10 pts",
      detail: "Ground transport links, connection value to airports, CBD, campuses, hospitals and waterfront nodes"
    },
    {
      label: "Investment Attractiveness",
      value: "10 pts",
      detail: "Per-capacity CAPEX, construction timeline, revenue potential and risk-adjusted return"
    }
  ],

  modules: {
    fato_tlof: {
      name: "FATO / TLOF Dual Zone",
      category: "flight",
      description: "Provides the basic geometry for touchdown, lift-off and the required safety/protection area per EASA PTS-VPT-DSN and FAA AC 150/5390-3.",
      capex: 420,
      opex: 16,
      throughput: 12,
      feasibility: 5,
      power: 0
    },
    stands: {
      name: "Dual Aircraft Stands",
      category: "flight",
      description: "Adds taxi-through / parking / parallel-turnaround flexibility. Increases throughput without proportional energy cost.",
      capex: 260,
      opex: 10,
      throughput: 8,
      feasibility: 3,
      power: 0
    },
    passenger_lounge: {
      name: "Passenger Processing",
      category: "passenger",
      description: "Integrates check-in, security screening, holding lounge and boarding interface. Required for commercial passenger operations.",
      capex: 180,
      opex: 18,
      throughput: 5,
      feasibility: 2,
      power: 20
    },
    cargo_bay: {
      name: "Light Cargo Module",
      category: "passenger",
      description: "Supports cargo loading / unloading physically segregated from passenger flow. Adds UAV and last-mile delivery capability.",
      capex: 140,
      opex: 14,
      throughput: 4,
      feasibility: 1,
      power: 14
    },
    fast_charge: {
      name: "Megawatt Fast Charging",
      category: "energy",
      description: "Reduces turnaround charging time significantly but raises peak demand and requires dedicated cooling and fire separation (per FAA EB 105A).",
      capex: 390,
      opex: 26,
      throughput: 10,
      feasibility: 2,
      power: 950
    },
    overnight_charge: {
      name: "Overnight AC Charging",
      category: "energy",
      description: "Lowers daytime peak load. Suited to overnight balancing and lower-frequency operations.",
      capex: 120,
      opex: 8,
      throughput: 2,
      feasibility: 2,
      power: 220
    },
    ess_backup: {
      name: "ESS + Backup Power",
      category: "energy",
      description: "Energy storage for peak shaving, black-start support and resilient operations. Aligns with FAA EB 105A backup power guidance.",
      capex: 310,
      opex: 20,
      throughput: 3,
      feasibility: 4,
      power: 480
    },
    cooling_loop: {
      name: "Battery Cooling Loop",
      category: "energy",
      description: "Mandatory safety ancillary for high-frequency fast-charging environments. Reduces fire risk and extends cell life.",
      capex: 95,
      opex: 7,
      throughput: 2,
      feasibility: 2,
      power: 80
    },
    weather_sensor: {
      name: "Micro-Weather & Turbulence Sensing",
      category: "safety",
      description: "Wind environment monitoring suited to rooftop and waterfront sites. Feeds real-time data to RMSS and pilot decision support.",
      capex: 65,
      opex: 6,
      throughput: 1,
      feasibility: 4,
      power: 12
    },
    fire_system: {
      name: "Battery Fire & Emergency Egress",
      category: "safety",
      description: "Covers battery fire suppression, access control, egress routes and first-responder interface. Required for all commercial schemes.",
      capex: 150,
      opex: 12,
      throughput: 0,
      feasibility: 5,
      power: 15
    },
    rmss: {
      name: "RMSS — Resource Scheduler",
      category: "digital",
      description: "Handles reservation, resource allocation, turnaround coordination and contingency management (per ConOps AAM guidance).",
      capex: 110,
      opex: 24,
      throughput: 6,
      feasibility: 3,
      power: 25
    },
    situational_awareness: {
      name: "VAS / Situational Awareness",
      category: "digital",
      description: "Fuses FATO occupancy, weather feeds, sensor health and aircraft state into an operational picture for controllers.",
      capex: 170,
      opex: 22,
      throughput: 5,
      feasibility: 4,
      power: 35
    }
  },

  aircraftTypes: [
    { id: "evtol-pax-med", label: "eVTOL Passenger (Medium)", rangKm: 60, cruiseKph: 220, pax: 4, chargeMin: 15, takeoffKwh: 8 },
    { id: "evtol-pax-light", label: "eVTOL Passenger (Light)", rangKm: 40, cruiseKph: 160, pax: 2, chargeMin: 10, takeoffKwh: 5 },
    { id: "uav-cargo-heavy", label: "UAV Cargo (Heavy)", rangKm: 35, cruiseKph: 120, pax: 0, chargeMin: 12, takeoffKwh: 4 },
    { id: "uav-cargo-light", label: "UAV Cargo (Light)", rangKm: 20, cruiseKph: 90, pax: 0, chargeMin: 8, takeoffKwh: 2 }
  ],

  sites: [
    /* ══════════════════════════════════════════════════════════
       1. HKCEC / WAN CHAI WATERFRONT  —  R-M  (Rooftop Medium)
          Existing shared-use heliport conversion. Prime CBD
          passenger + emergency node. FAA EB 105A §1.3 explicitly
          covers existing helicopter facility upgrades.
       ══════════════════════════════════════════════════════════ */
    {
      city: "hong-kong",
      approved: false,
      id: "hkcec-wanchai",
      shortName: "HKCEC",
      name: "HKCEC / Wan Chai Waterfront Vertiport",
      district: "Wan Chai / CBD",
      type: "R-M · Rooftop Medium",
      nodeType: "R-M",
      assetClass: "Existing Shared-Use Heliport Conversion",
      lat: 22.2815,
      lng: 114.1718,
      mapPosition: { x: 28, y: 40 },
      tagline: "Hong Kong's most realistic early-stage CBD node — conversion of an existing shared-use heliport into a fully-compliant vertiport under FAA EB 105A guidance.",
      summary: "The HKCEC rooftop already hosts a shared-use heliport, giving this site the shortest regulatory pathway of any CBD candidate. Situated at the Wan Chai waterfront with direct MTR access 4 minutes away, it is the natural first-phase passenger and emergency hub for the CBD–airport corridor.",
      heroMetrics: {
        area: "~1,850 sqm rooftop",
        grid: "11 kV building feeder — expandable",
        access: "4 min — Wan Chai MTR / 6 min — Admiralty MTR",
        alternate: "Pak Shek Kok & China Merchants Wharf both within network"
      },
      scores: {
        safety: 80,
        implementation: 74,
        regulation: 79,
        operations: 82,
        network: 91,
        investment: 77,
        power: 78,
        structural: 72,
        ground: 92,
        weather: 71,
        comms: 88
      },
      hardGates: [
        {
          name: "FATO + Safety Area Envelope",
          status: "pass",
          note: "Existing helipad geometry is compliant with 1-FATO Lean layout. Standard tier (2 FATOs) requires edge-clearance optimisation confirmed by survey."
        },
        {
          name: "Approach / Departure Obstacle Constraint",
          status: "warning",
          note: "CBD tower cluster to the south constrains preferred approach bearing. Procedure design and FATO orientation must account for the Central–Admiralty skyline."
        },
        {
          name: "Wind & Turbulence Conditions",
          status: "warning",
          note: "Waterfront corner-flow and adjacent tower downwash require a dedicated CFD wind study per EASA PTS-VPT-DSN §7.2 before commercial approval."
        },
        {
          name: "Emergency Egress & Fire Access",
          status: "pass",
          note: "Convention centre infrastructure includes independent vertical circulation and direct Fire Services access; egress design is above baseline requirements."
        }
      ],
      evidence: [
        "FAA EB 105A §1.3 explicitly states guidance applies to existing helicopter landing facilities proposed for conversion to vertiport use.",
        "Bluenest UAM typology classifies R-M nodes as ideal for business/commercial areas carrying combined passenger and emergency functions.",
        "HKCEC is listed in CAD's shared-use heliport register — regulatory baseline exists; amendment pathway is defined, not novel."
      ],
      risks: [
        {
          title: "Convention Centre Operational Conflict",
          level: "Medium",
          text: "Major events fill the building and roof access routes; flight scheduling must be coordinated with HKCEC event calendar to avoid peak conflicts."
        },
        {
          title: "CBD Tower Turbulence",
          level: "High",
          text: "High-rise canyon effect in Wan Chai creates variable wind conditions at rooftop level. Mandatory pre-approval CFD study and real-time monitoring required."
        },
        {
          title: "Structural Load Certification",
          level: "Medium",
          text: "Existing helipad load rating must be independently recertified for eVTOL MTOW and battery charging equipment per FAA EB 105A §5.3."
        }
      ],
      plans: {
        lean: {
          label: "Lean",
          capex: 5.2,
          opex: 0.80,
          throughput: 28,
          turnaround: 16,
          feasibility: 76,
          power: 1.6,
          modules: ["fato_tlof", "passenger_lounge", "overnight_charge", "fire_system", "weather_sensor"]
        },
        standard: {
          label: "Standard",
          capex: 8.4,
          opex: 1.22,
          throughput: 46,
          turnaround: 12,
          feasibility: 82,
          power: 3.4,
          modules: [
            "fato_tlof", "stands", "passenger_lounge",
            "fast_charge", "overnight_charge",
            "fire_system", "weather_sensor", "rmss"
          ]
        },
        enhanced: {
          label: "Enhanced",
          capex: 12.1,
          opex: 1.60,
          throughput: 65,
          turnaround: 10,
          feasibility: 87,
          power: 5.0,
          modules: [
            "fato_tlof", "stands", "passenger_lounge",
            "fast_charge", "overnight_charge", "ess_backup", "cooling_loop",
            "fire_system", "weather_sensor", "rmss", "situational_awareness"
          ]
        }
      },
      routes: [
        {
          id: "hkcec-airport",
          name: "CBD–Airport Business Shuttle",
          destination: "HKIA SkyCity",
          distanceKm: 29,
          flightMin: 11,
          reservePct: 20,
          alternates: ["Pak Shek Kok Node", "China Merchants Wharf"],
          chargingMin: 15,
          loadFactor: 0.74
        },
        {
          id: "hkcec-pakshekkok",
          name: "CBD–New Territories Express",
          destination: "Pak Shek Kok / HKSTP",
          distanceKm: 22,
          flightMin: 9,
          reservePct: 18,
          alternates: ["China Merchants Wharf", "Cyberport"],
          chargingMin: 13,
          loadFactor: 0.70
        }
      ],
      finance: {
        revenueIndex: 1.14,
        permitReadiness: 0.82,
        deliveryMonths: 12
      },
      recommendedConfig: {
        plan: "standard",
        evtolPads: 2,
        uavPads: 0,
        typeLabel: "Rooftop Medium — Heliport Conversion",
        rationale: "A 2-FATO Standard configuration is the recommended entry point. The ~1,850 sqm rooftop accommodates two FATO pads with required safety areas within the existing structural envelope. UAV operations are not recommended at this stage: the dense CBD approach environment prioritises passenger eVTOL over cargo UAV. Phased upgrade to Enhanced is achievable within 24 months upon demand confirmation.",
        keyConstraints: [
          "Structural recertification for eVTOL MTOW — FAA EB 105A §5.3 live-load compliance",
          "CFD wind study mandatory — corner-flow and tower downwash assessment",
          "FATO orientation procedure required — CBD tower cluster constrains south-east approach"
        ],
        immediateActions: [
          "Commission structural survey and load recertification for eVTOL equipment",
          "Engage specialist for rooftop CFD wind simulation and FATO orientation study",
          "Apply to Buildings Department for rooftop alteration permit"
        ],
        references: [
          "FAA EB 105A §1.3 — Scope: existing helicopter landing facility conversion",
          "EASA PTS-VPT-DSN §7.2 — Elevated FATO wind environment assessment",
          "CAD Shared-Use Heliport Register — HKCEC existing registration"
        ]
      }
    },

    /* ══════════════════════════════════════════════════════════
       2. PAK SHEK KOK / HKSTP WATERFRONT  —  O-M  (Open-Surface Medium)
          Official AIP sandbox zone. Active BVLOS drone delivery
          already running Pak Shek Kok Promenade → Tai Po Waterfront.
          Phased cargo-first, passenger-ready upgrade path.
       ══════════════════════════════════════════════════════════ */
    {
      city: "hong-kong",
      approved: false,
      id: "science-park-pak-shek-kok",
      shortName: "Pak Shek Kok",
      name: "HKSTP / Pak Shek Kok Waterfront Node",
      district: "New Territories East",
      type: "O-M · Open-Surface Medium",
      nodeType: "O-M",
      assetClass: "R&D Campus + Waterfront Open Ground",
      lat: 22.4295,
      lng: 114.2038,
      mapPosition: { x: 70, y: 30 },
      tagline: "Hong Kong's most operationally-proven site — AIP-listed BVLOS sandbox with active drone delivery runs already validating this exact corridor.",
      summary: "HKSTP's Pak Shek Kok Promenade is one of very few sites in Hong Kong with AIP-acknowledged drone operations currently running. The open waterfront surface offers the lowest implementation complexity of any medium-scale node and is structured for a cargo-first, passenger-ready upgrade model aligned with Bluenest O-M typology.",
      heroMetrics: {
        area: "~2,600 sqm open waterfront",
        grid: "Campus power infrastructure — high redundancy",
        access: "Campus shuttle + Road + Tai Po Waterfront Pier",
        alternate: "HKCEC Wan Chai & Cyberport within network range"
      },
      scores: {
        safety: 86,
        implementation: 89,
        regulation: 82,
        operations: 79,
        network: 74,
        investment: 84,
        power: 84,
        structural: 88,
        ground: 70,
        weather: 77,
        comms: 82
      },
      hardGates: [
        {
          name: "FATO + Safety Area Envelope",
          status: "pass",
          note: "Open waterfront ground surface is generous. Full Standard layout (3 FATOs + 4 UAV pads) fits without edge constraints."
        },
        {
          name: "Approach / Departure Obstacle Constraint",
          status: "pass",
          note: "Lower surrounding building density than CBD. Sea-facing approach corridor over Tolo Harbour is operationally excellent."
        },
        {
          name: "Wind & Turbulence Conditions",
          status: "warning",
          note: "Valley wind channelling from Ma On Shan requires seasonal micro-weather analysis and monitoring. Better than any CBD rooftop."
        },
        {
          name: "Emergency Egress & Fire Access",
          status: "pass",
          note: "Ground-level open surface. Road access for fire appliances and emergency vehicles is unobstructed."
        }
      ],
      evidence: [
        "AIP Supplement lists Pak Shek Kok / HKSTP as an operationalised BVLOS sandbox zone — regulatory baseline is established.",
        "Active drone delivery project runs Pak Shek Kok Promenade to Tai Po Waterfront Pier, validating the corridor operationally.",
        "Bluenest typology: O-M nodes suit intermodal/logistics hubs and business/research campuses — open ground preferred over rooftop for expandability."
      ],
      risks: [
        {
          title: "Standalone Demand Depth",
          level: "Medium",
          text: "Campus-only catchment limits ticket volume in Phase 1; a confirmed CBD route (HKCEC or Central) is required to justify the Standard-tier economics."
        },
        {
          title: "Campus Land Use Approval",
          level: "Medium",
          text: "HKSTPC development approval required. Phased construction timeline needed to avoid tenant disruption in adjacent R&D buildings."
        },
        {
          title: "Tolo Harbour Marine Coordination",
          level: "Low",
          text: "Sea-facing approach requires coordination with Marine Department for harbour traffic separation, though complexity is lower than Victoria Harbour."
        }
      ],
      plans: {
        lean: {
          label: "Lean",
          capex: 3.6,
          opex: 0.58,
          throughput: 22,
          turnaround: 18,
          feasibility: 84,
          power: 1.2,
          modules: ["fato_tlof", "cargo_bay", "overnight_charge", "fire_system", "weather_sensor"]
        },
        standard: {
          label: "Standard",
          capex: 5.8,
          opex: 0.86,
          throughput: 40,
          turnaround: 13,
          feasibility: 88,
          power: 2.8,
          modules: [
            "fato_tlof", "stands", "passenger_lounge", "cargo_bay",
            "fast_charge", "overnight_charge",
            "weather_sensor", "fire_system", "rmss"
          ]
        },
        enhanced: {
          label: "Enhanced",
          capex: 8.4,
          opex: 1.18,
          throughput: 57,
          turnaround: 11,
          feasibility: 91,
          power: 4.0,
          modules: [
            "fato_tlof", "stands", "passenger_lounge", "cargo_bay",
            "fast_charge", "overnight_charge", "ess_backup", "cooling_loop",
            "weather_sensor", "fire_system", "rmss", "situational_awareness"
          ]
        }
      },
      routes: [
        {
          id: "psk-hkcec",
          name: "Science Park–CBD Commuter",
          destination: "HKCEC / Wan Chai",
          distanceKm: 22,
          flightMin: 9,
          reservePct: 18,
          alternates: ["Cyberport", "China Merchants Wharf"],
          chargingMin: 13,
          loadFactor: 0.71
        },
        {
          id: "psk-taipodrone",
          name: "UAV Cargo: Pak Shek Kok → Tai Po",
          destination: "Tai Po Waterfront Pier",
          distanceKm: 3,
          flightMin: 6,
          reservePct: 10,
          alternates: [],
          chargingMin: 8,
          loadFactor: 0.85
        }
      ],
      finance: {
        revenueIndex: 0.97,
        permitReadiness: 0.89,
        deliveryMonths: 9
      },
      recommendedConfig: {
        plan: "lean",
        evtolPads: 2,
        uavPads: 4,
        typeLabel: "Open-Surface Medium — Campus / Waterfront",
        rationale: "Begin with a Lean 2-FATO + 4-UAV pad configuration. The cargo-first model matches the existing sandbox activity and generates early operational data with minimal capital. Upgrade to Standard with passenger lounge after first 12–18 months of UAV cargo validation. Open surface allows modular expansion without structural constraints.",
        keyConstraints: [
          "HKSTPC site access and development approval required pre-construction",
          "CAD UAV operator permit — BVLOS sandbox extension to vertiport ops",
          "Marine approach procedure coordination with Marine Department (Tolo Harbour)"
        ],
        immediateActions: [
          "Secure HKSTPC site access agreement and development approval",
          "Submit CAD UAV operator permit application for enhanced vertiport operations",
          "Commission power supply upgrade design for cargo drone charging arrays"
        ],
        references: [
          "CAD AIP Supplement — Pak Shek Kok / HKSTP BVLOS sandbox zone",
          "Bluenest UAM — O-M typology: open-surface medium vertiport at logistics/research nodes",
          "UKRI Future Flight — Campus vertiport Lean-to-Standard scale-up model"
        ]
      }
    },

    /* ══════════════════════════════════════════════════════════
       3. CYBERPORT / EAST LAMMA CHANNEL  —  F-S2  (Urban Marina Floating)
          AIP-listed sandbox zone. Active Cyberport–Cheung Chau
          drone delivery including medical supplies to St. John Hospital.
          South HK Island's cross-sea logistics and emergency node.
       ══════════════════════════════════════════════════════════ */
    {
      city: "hong-kong",
      approved: false,
      id: "cyberport-east-lamma",
      shortName: "Cyberport",
      name: "Cyberport / East Lamma Channel Node",
      district: "South HK Island",
      type: "F-S2 · Urban Marina Floating",
      nodeType: "F-S2",
      assetClass: "Urban Marina Floating Vertistop",
      lat: 22.2605,
      lng: 114.1293,
      mapPosition: { x: 22, y: 52 },
      tagline: "South HK Island's cross-sea medical and logistics gateway — an AIP-listed sandbox node with active Cheung Chau–St. John Hospital drone delivery already running.",
      summary: "Cyberport's marina faces the East Lamma Channel with direct operational access to the outer islands. The AIP Supplement designates Cyberport / East Lamma Channel as an operationalised BVLOS sandbox area. An F-S2 urban marina floating vertistop leverages the existing pontoon infrastructure while keeping approach paths over water, away from residential areas.",
      heroMetrics: {
        area: "~900 sqm floating pontoon deck",
        grid: "Marina shore-power grid — seabed cable route",
        access: "Cyberport waterfront + bus / ferry interchange",
        alternate: "China Merchants Wharf (6 km) + HKCEC (12 km) both within range"
      },
      scores: {
        safety: 74,
        implementation: 60,
        regulation: 70,
        operations: 76,
        network: 86,
        investment: 63,
        power: 62,
        structural: 55,
        ground: 60,
        weather: 68,
        comms: 76
      },
      hardGates: [
        {
          name: "FATO + Safety Area Envelope",
          status: "pass",
          note: "~900 sqm pontoon supports a 1-FATO Lean layout. Standard tier requires pontoon extension or second pontoon barge; structural certification essential."
        },
        {
          name: "Approach / Departure Obstacle Constraint",
          status: "pass",
          note: "Water-facing approach over East Lamma Channel is unobstructed. 270° open approach sector — one of the best in HK outside Victoria Harbour."
        },
        {
          name: "Wind & Turbulence Conditions",
          status: "warning",
          note: "Exposed channel position; typhoon season requires strict weather minimums and operational shutdown protocol identical to marine offshore platforms."
        },
        {
          name: "Emergency Egress & Fire Access",
          status: "warning",
          note: "Marine egress requires dedicated rescue tender on standby per Marine Department requirements — significantly higher OPEX than any land-based site."
        }
      ],
      evidence: [
        "AIP Supplement lists Cyberport / East Lamma Channel as an operationalised BVLOS sandbox area — regulatory baseline is active.",
        "Cyberport–Cheung Chau drone delivery is publicly documented, including medical supply runs to St. John Hospital on the island.",
        "Bluenest typology: F-S2 urban marina floating vertistop suits coastal, space-constrained urban waterfronts with strong cross-sea connectivity demand."
      ],
      risks: [
        {
          title: "Marine Regulatory Dual Jurisdiction",
          level: "High",
          text: "Concurrent approval required from CAD (aviation) and Marine Department (navigable waters). Pontoon works also trigger Environmental Impact Assessment for marine ecology."
        },
        {
          title: "Pontoon Motion & Structural",
          level: "High",
          text: "FAA EB 105A §5.5 specifies FATO motion tolerances for floating structures. East Lamma Channel ferry wash and swell require independent marine engineering certification."
        },
        {
          title: "Marine Emergency Response",
          level: "Medium",
          text: "Fire and medical emergency response involves Marine Department rescue vessels — adds response time and OPEX compared to all land-based candidates."
        }
      ],
      plans: {
        lean: {
          label: "Lean",
          capex: 6.5,
          opex: 1.10,
          throughput: 18,
          turnaround: 22,
          feasibility: 64,
          power: 1.2,
          modules: ["fato_tlof", "cargo_bay", "overnight_charge", "fire_system", "weather_sensor"]
        },
        standard: {
          label: "Standard",
          capex: 10.8,
          opex: 1.72,
          throughput: 30,
          turnaround: 17,
          feasibility: 70,
          power: 2.6,
          modules: [
            "fato_tlof", "stands", "passenger_lounge", "cargo_bay",
            "fast_charge", "overnight_charge",
            "fire_system", "weather_sensor", "rmss"
          ]
        },
        enhanced: {
          label: "Enhanced",
          capex: 15.2,
          opex: 2.40,
          throughput: 44,
          turnaround: 14,
          feasibility: 76,
          power: 3.8,
          modules: [
            "fato_tlof", "stands", "passenger_lounge", "cargo_bay",
            "fast_charge", "overnight_charge", "ess_backup", "cooling_loop",
            "weather_sensor", "fire_system", "rmss", "situational_awareness"
          ]
        }
      },
      routes: [
        {
          id: "cyber-cheungchau-med",
          name: "Cyberport–Cheung Chau Medical Chain",
          destination: "Cheung Chau / St. John Hospital",
          distanceKm: 16,
          flightMin: 12,
          reservePct: 20,
          alternates: ["China Merchants Wharf"],
          chargingMin: 14,
          loadFactor: 0.78
        },
        {
          id: "cyber-chinawharf",
          name: "South Island–West Harbour Link",
          destination: "China Merchants Wharf",
          distanceKm: 6,
          flightMin: 5,
          reservePct: 15,
          alternates: ["HKCEC Wan Chai"],
          chargingMin: 10,
          loadFactor: 0.65
        }
      ],
      finance: {
        revenueIndex: 0.92,
        permitReadiness: 0.58,
        deliveryMonths: 16
      },
      recommendedConfig: {
        plan: "lean",
        evtolPads: 1,
        uavPads: 2,
        typeLabel: "Floating Medium — Urban Marina",
        rationale: "A conservative Lean entry is mandatory: 1 FATO pad and 2 UAV cargo pads, calm-weather windows only. The active medical delivery precedent (Cheung Chau St. John Hospital) justifies the marine engineering investment. A full pontoon motion study per FAA EB 105A §5.5 must precede any investment commitment. Upgrade to Standard requires a second pontoon or barge extension certified by a marine structural engineer.",
        keyConstraints: [
          "CAD + Marine Department joint pre-application consultation — dual jurisdiction",
          "Marine structural feasibility study — FAA EB 105A §5.5 pontoon motion tolerance",
          "Environmental Impact Assessment for pontoon works (marine ecology)",
          "Dedicated rescue tender on standby — mandatory for all commercial operations"
        ],
        immediateActions: [
          "Initiate CAD/Marine Department joint pre-application consultation",
          "Commission marine structural feasibility study (pontoon motion vs. FAA EB 105A §5.5)",
          "Scope Environmental Impact Assessment for East Lamma Channel pontoon works",
          "Confirm shore-power capacity and seabed cable route for charging infrastructure"
        ],
        references: [
          "CAD AIP Supplement — Cyberport / East Lamma Channel BVLOS sandbox zone",
          "FAA EB 105A §5.5 — Marine/floating FATO structural and motion requirements",
          "Bluenest UAM — F-S2 urban marina floating vertistop typology"
        ]
      }
    },

    /* ══════════════════════════════════════════════════════════
       4. CHINA MERCHANTS WHARF / WEST VICTORIA HARBOUR  —  O-S / F-S2
          AIP-listed BVLOS sandbox zone. West harbour cargo
          and logistics node. Waterfront / wharf barge approach
          minimises CBD obstacle and noise issues.
       ══════════════════════════════════════════════════════════ */
    {
      city: "hong-kong",
      approved: false,
      id: "china-merchants-wharf",
      shortName: "C.M. Wharf",
      name: "China Merchants Wharf / West Victoria Harbour",
      district: "Kennedy Town / Western",
      type: "O-S · Open-Surface Small / F-S2",
      nodeType: "O-S",
      assetClass: "Waterfront Wharf / Logistics Pier",
      lat: 22.2856,
      lng: 114.1255,
      mapPosition: { x: 18, y: 42 },
      tagline: "West Victoria Harbour's cargo and logistics node — an AIP-listed sandbox site where approach paths run over water, away from residential and CBD zones.",
      summary: "China Merchants Wharf sits at the western end of Victoria Harbour. The AIP Supplement designates this area as an operationalised BVLOS sandbox. The wharf geometry allows approach paths over the harbour, reducing noise and obstacle issues associated with the dense CBD. Best positioned as a cargo-oriented small node rather than a first-phase passenger hub.",
      heroMetrics: {
        area: "~1,300 sqm wharf surface",
        grid: "Wharf utility connection — moderate capacity",
        access: "Kennedy Town MTR + waterfront road",
        alternate: "HKCEC Wan Chai (5 km) + Cyberport (6 km)"
      },
      scores: {
        safety: 79,
        implementation: 76,
        regulation: 73,
        operations: 76,
        network: 81,
        investment: 72,
        power: 74,
        structural: 76,
        ground: 73,
        weather: 70,
        comms: 82
      },
      hardGates: [
        {
          name: "FATO + Safety Area Envelope",
          status: "pass",
          note: "Wharf surface supports 1 FATO + multiple UAV pads in a Lean cargo configuration. Standard tier requires wharf extension or floating barge supplement."
        },
        {
          name: "Approach / Departure Obstacle Constraint",
          status: "pass",
          note: "Victoria Harbour westward bearing offers unobstructed approach over water — better than any CBD rooftop for obstacle clearance."
        },
        {
          name: "Wind & Turbulence Conditions",
          status: "warning",
          note: "Harbour surface exposure and tidal wind effects. Kennedy Town residential towers to the east create a partial wake zone on eastward departure bearing."
        },
        {
          name: "Emergency Egress & Fire Access",
          status: "pass",
          note: "Ground-level wharf with road vehicle access. Fire appliance staging is straightforward; marine egress standby required for floating extension only."
        }
      ],
      evidence: [
        "AIP Supplement designates China Merchants Wharf / Victoria Harbour as an operationalised BVLOS sandbox zone.",
        "Uber Elevate and Bluenest both identify waterfront/wharf sites as preferred for cargo-first operations where harbour approach paths reduce residential noise exposure.",
        "ConOps AAM document recommends physically segregated cargo and passenger zones at wharf-type nodes — achievable here within current footprint."
      ],
      risks: [
        {
          title: "Cargo-Only Positioning Limitation",
          level: "Medium",
          text: "First-phase cargo orientation limits passenger revenue; upgrade to combined passenger/cargo requires separate terminal structure and additional approval."
        },
        {
          title: "Wharf Access Rights",
          level: "Medium",
          text: "Existing wharf operations and lease terms may constrain available area; legal due diligence on access rights required before any site investment."
        },
        {
          title: "Kennedy Town Residential Noise",
          level: "Low",
          text: "Residential towers within 200 m require community engagement. Eastward departure procedure must be optimised to minimise overflight of Kennedy Town."
        }
      ],
      plans: {
        lean: {
          label: "Lean",
          capex: 4.0,
          opex: 0.62,
          throughput: 20,
          turnaround: 20,
          feasibility: 74,
          power: 1.1,
          modules: ["fato_tlof", "cargo_bay", "overnight_charge", "fire_system", "weather_sensor"]
        },
        standard: {
          label: "Standard",
          capex: 7.2,
          opex: 1.02,
          throughput: 35,
          turnaround: 15,
          feasibility: 79,
          power: 2.4,
          modules: [
            "fato_tlof", "stands", "cargo_bay",
            "fast_charge", "overnight_charge",
            "weather_sensor", "fire_system", "rmss"
          ]
        },
        enhanced: {
          label: "Enhanced",
          capex: 10.5,
          opex: 1.42,
          throughput: 50,
          turnaround: 12,
          feasibility: 83,
          power: 3.6,
          modules: [
            "fato_tlof", "stands", "passenger_lounge", "cargo_bay",
            "fast_charge", "overnight_charge", "ess_backup", "cooling_loop",
            "weather_sensor", "fire_system", "rmss", "situational_awareness"
          ]
        }
      },
      routes: [
        {
          id: "cmw-hkcec",
          name: "West Harbour–CBD Express",
          destination: "HKCEC / Wan Chai",
          distanceKm: 5,
          flightMin: 4,
          reservePct: 15,
          alternates: ["Cyberport"],
          chargingMin: 9,
          loadFactor: 0.68
        },
        {
          id: "cmw-cyberport",
          name: "West Harbour–South Island Cargo",
          destination: "Cyberport / East Lamma",
          distanceKm: 6,
          flightMin: 5,
          reservePct: 15,
          alternates: ["HKCEC Wan Chai"],
          chargingMin: 9,
          loadFactor: 0.72
        }
      ],
      finance: {
        revenueIndex: 0.93,
        permitReadiness: 0.74,
        deliveryMonths: 11
      },
      recommendedConfig: {
        plan: "lean",
        evtolPads: 1,
        uavPads: 3,
        typeLabel: "Open-Surface Small — Wharf / Logistics Pier",
        rationale: "Lean tier with 1 FATO and 3 UAV cargo pads is the appropriate first phase. The cargo-first model matches the AIP sandbox classification and the wharf's existing logistics character. Passenger lounge is deferred to Enhanced; first-phase focus is cross-harbour cargo and last-mile UAV delivery. Legal due diligence on wharf access rights must precede any capital commitment.",
        keyConstraints: [
          "Wharf access rights and lease due diligence — legal prerequisite",
          "CAD BVLOS sandbox amendment for vertiport-grade operations",
          "Kennedy Town departure procedure design — residential overflight minimisation"
        ],
        immediateActions: [
          "Legal due diligence on China Merchants Wharf lease and access rights",
          "CAD pre-application consultation for BVLOS sandbox upgrade to vertiport ops",
          "Power supply assessment — confirm wharf utility capacity for cargo drone charging"
        ],
        references: [
          "CAD AIP Supplement — China Merchants Wharf / Victoria Harbour BVLOS sandbox",
          "ConOps AAM §4.1 — Cargo-first wharf vertiport model",
          "Uber Elevate 2016 — Waterfront cargo node as preferred Phase 1 deployment"
        ]
      }
    },

    /* ══════════════════════════════════════════════════════════
       5. CHEUNG CHAU / ST. JOHN HOSPITAL  —  F-S1  (Remote Coastal Floating)
          End-node of the Cyberport–Cheung Chau medical corridor.
          Active medical supply delivery already documented.
          Highest per-flight social value in the network.
       ══════════════════════════════════════════════════════════ */
    {
      city: "hong-kong",
      approved: false,
      id: "cheung-chau-stjohn",
      shortName: "Cheung Chau",
      name: "Cheung Chau / St. John Hospital Node",
      district: "Outlying Islands",
      type: "F-S1 · Remote Coastal Floating",
      nodeType: "F-S1",
      assetClass: "Island Medical & Emergency Vertistop",
      lat: 22.2103,
      lng: 114.0300,
      mapPosition: { x: 10, y: 62 },
      tagline: "The terminal node that proves the network's social value — an island medical and emergency vertistop serving a community that cannot be reached by road.",
      summary: "Cheung Chau is a car-free island with a single hospital, St. John Hospital, that depends on ferry services for medical supply resupply and emergency transfers. Active drone delivery from Cyberport is publicly documented. An F-S1 remote coastal floating vertistop near the ferry pier gives the island its first fast-response, weather-independent medical logistics link.",
      heroMetrics: {
        area: "~650 sqm floating / pier deck",
        grid: "Island shore power — limited, upgrade needed",
        access: "Ferry pier (Central 35 min) · Car-free island",
        alternate: "Cyberport as mainland gateway (16 km)"
      },
      scores: {
        safety: 71,
        implementation: 57,
        regulation: 74,
        operations: 75,
        network: 85,
        investment: 61,
        power: 38,
        structural: 64,
        ground: 22,
        weather: 62,
        comms: 44
      },
      hardGates: [
        {
          name: "FATO + Safety Area Envelope",
          status: "pass",
          note: "~650 sqm floating deck supports a minimal 1-FATO configuration with 2 UAV pads. No expansion to Standard tier is planned; site function is terminal node, not throughput hub."
        },
        {
          name: "Approach / Departure Obstacle Constraint",
          status: "pass",
          note: "Open sea approach from the west. Ferry pier location provides excellent approach sector with minimal obstacle interference."
        },
        {
          name: "Wind & Turbulence Conditions",
          status: "warning",
          note: "Exposed island position with full typhoon exposure. Strict weather minimums and automatic operational shutdown protocol mandatory."
        },
        {
          name: "Emergency Egress & Fire Access",
          status: "warning",
          note: "Car-free island severely limits conventional fire and emergency response. Marine rescue vessel standby is the primary emergency mechanism."
        }
      ],
      evidence: [
        "Cyberport–Cheung Chau drone delivery is publicly documented, with medical supply runs to St. John Hospital explicitly cited in official project records.",
        "Bluenest typology: F-S1 remote coastal floating vertistop is the defined class for isolated, high-value low-frequency island medical and emergency nodes.",
        "CAD / Marine Department joint framework applies to any aviation infrastructure adjacent to or over navigable water near the island pier area."
      ],
      risks: [
        {
          title: "Dual Regulatory Marine Jurisdiction",
          level: "High",
          text: "CAD aviation + Marine Department navigable water approvals both required. Small island community and environmental sensitivity may add EIA scope."
        },
        {
          title: "Island Power & Logistics Constraint",
          level: "High",
          text: "Shore power capacity on Cheung Chau is limited. Charging infrastructure upgrade requires HKPF (HK Power) grid extension — potentially the longest lead item."
        },
        {
          title: "Typhoon Closure Frequency",
          level: "Medium",
          text: "High typhoon exposure means significantly more weather-related closures than any mainland site; redundancy in the medical supply chain remains essential."
        }
      ],
      plans: {
        lean: {
          label: "Lean",
          capex: 3.8,
          opex: 0.72,
          throughput: 12,
          turnaround: 25,
          feasibility: 60,
          power: 0.8,
          modules: ["fato_tlof", "cargo_bay", "overnight_charge", "fire_system", "weather_sensor"]
        },
        standard: {
          label: "Standard",
          capex: 6.5,
          opex: 1.14,
          throughput: 22,
          turnaround: 20,
          feasibility: 67,
          power: 1.6,
          modules: [
            "fato_tlof", "passenger_lounge", "cargo_bay",
            "fast_charge", "overnight_charge",
            "weather_sensor", "fire_system", "rmss"
          ]
        },
        enhanced: {
          label: "Enhanced",
          capex: 9.8,
          opex: 1.60,
          throughput: 34,
          turnaround: 16,
          feasibility: 73,
          power: 2.8,
          modules: [
            "fato_tlof", "stands", "passenger_lounge", "cargo_bay",
            "fast_charge", "overnight_charge", "ess_backup",
            "weather_sensor", "fire_system", "rmss", "situational_awareness"
          ]
        }
      },
      routes: [
        {
          id: "cc-cyberport-med",
          name: "Cheung Chau–Cyberport Medical Return",
          destination: "Cyberport / East Lamma",
          distanceKm: 16,
          flightMin: 12,
          reservePct: 22,
          alternates: [],
          chargingMin: 15,
          loadFactor: 0.82
        },
        {
          id: "cc-cmwharf",
          name: "Island–Mainland Cargo Supply",
          destination: "China Merchants Wharf",
          distanceKm: 19,
          flightMin: 14,
          reservePct: 22,
          alternates: ["Cyberport"],
          chargingMin: 16,
          loadFactor: 0.70
        }
      ],
      finance: {
        revenueIndex: 0.82,
        permitReadiness: 0.55,
        deliveryMonths: 18
      },
      recommendedConfig: {
        plan: "lean",
        evtolPads: 1,
        uavPads: 2,
        typeLabel: "Remote Coastal Floating — Island Medical",
        rationale: "The Lean configuration is the only appropriate entry: 1 FATO and 2 UAV cargo pads, calm-weather windows only. This site is a terminal node — throughput is deliberately low, per-flight social value is high. Power grid upgrade (shore power expansion) is the longest lead item and must be confirmed before any other works. The Cyberport–Cheung Chau medical corridor gives this site a pre-built operational justification that no other candidate has.",
        keyConstraints: [
          "CAD + Marine Department joint pre-application consultation required",
          "Shore power capacity upgrade — HKPF grid extension prerequisite",
          "Environmental review for floating structure near island ecology",
          "Marine rescue tender standby for all commercial operations"
        ],
        immediateActions: [
          "Confirm shore power upgrade capacity with HKPF",
          "Initiate CAD/Marine Department joint pre-application consultation",
          "Coordinate with Islands District Council and St. John Hospital management",
          "Scope Environmental Impact Assessment for floating structure"
        ],
        references: [
          "Bluenest UAM — F-S1 remote coastal floating vertistop typology for island medical nodes",
          "CAD AIP Supplement — Cyberport / East Lamma Channel sandbox (source corridor)",
          "FAA EB 105A §5.5 — Marine FATO structural and motion requirements"
        ]
      }
    },
    /* ══════════════════════════════════════════════════════════
       MAINLAND CHINA — SHENZHEN (10 sites)
       ══════════════════════════════════════════════════════════ */

    /* SZ-01 · 前海国际枢纽 — O-M Cross-Border ★★★★★ */
    {
      city: "shenzhen", approved: false,
      id: "qianhai-hub", shortName: "前海枢纽",
      name: "前海国际低空枢纽", district: "南山区 · 前海合作区",
      type: "O-M · 开放地面中型", nodeType: "O-M",
      assetClass: "滨海广场开放地面", currency: "RMB",
      lat: 22.5177, lng: 113.8927,
      mapPosition: { x: 20, y: 35 },
      tagline: "唯一叠加市级＋前海管理局双层跨境补贴的节点——深港跨境航线最高可获¥300万/条一次性奖励，GBA 西端核心走廊。",
      summary: "前海-蛇口已列为深圳低空先导区，38条eVTOL专用航线规划起点之一。桂湾公园滨海广场具备硬化地面直接改造条件，与香港HKCEC直线距离约25km，是目前最具商业可行性的深港eVTOL走廊入口。",
      heroMetrics: { area: "~3,200 sqm 滨海广场", grid: "前海变电站直供，高冗余", access: "前海湾地铁站 3 分钟", alternate: "宝安机场＆蛇口邮轮母港均在网络半径内" },
      scores: { safety: 82, implementation: 86, regulation: 80, operations: 78, network: 92, investment: 88, power: 88, structural: 82, ground: 90, weather: 74, comms: 88 },
      hardGates: [
        { name: "空域规划兼容性", status: "pass", note: "前海先导区已列入深圳38条eVTOL专用航线规划，空域协调路径明确。" },
        { name: "深港跨境监管协议", status: "warning", note: "深港双边空域协议仍在推进中，预计2026年完成框架协议。" },
        { name: "地面承载与净空", status: "pass", note: "桂湾广场为硬化地面，无需大型结构改造，净空环境良好。" }
      ],
      evidence: [
        "前海管理局低空经济政策：境内eVTOL商业航线¥100万/条，深港跨境¥200万/条，合计可达¥300万/条。",
        "深圳市《低空基础设施高质量建设方案（2024-2026）》：前海-蛇口列为低空先导区核心节点。",
        "中央空管委已将深圳纳入'空中的士'试点城市，前海为首批候选场景。"
      ],
      risks: [
        { title: "深港跨境空域协议进度", level: "Medium", text: "双边协议谈判周期存在不确定性，可能影响跨境航线开通时间。建议同步推进境内航线作为过渡收入来源。" },
        { title: "航线补贴政策连续性", level: "Low", text: "一次性补贴已明确，但长期运营补贴政策尚待区级细化，建议与前海管理局提前签订框架合作协议。" },
        { title: "高峰时段空域拥塞", level: "Medium", text: "宝安机场繁忙空域邻近，前海上方航班密度将随商业化提升，需精细化时隙管理。" }
      ],
      plans: {
        lean:     { label: "Lean",     capex: 10, opex: 1.8, throughput: 22, turnaround: 18, feasibility: 78, power: 0.8, modules: ["evtol_fato","ev_charger","wind_mast"] },
        standard: { label: "Standard", capex: 22, opex: 3.8, throughput: 42, turnaround: 13, feasibility: 84, power: 1.8, modules: ["evtol_fato","evtol_stand","ev_charger","wind_mast","terminal"] },
        enhanced: { label: "Enhanced", capex: 38, opex: 6.4, throughput: 68, turnaround: 10, feasibility: 88, power: 3.2, modules: ["evtol_fato","evtol_stand","ev_charger","uav_charger","wind_mast","terminal"] }
      },
      routes: [
        { id: "qianhai-hkcec", name: "深港跨境商务快线", destination: "香港 HKCEC / 湾仔", distanceKm: 25, flightMin: 8, reservePct: 20, alternates: ["蛇口邮轮母港", "宝安机场"], chargingMin: 13, loadFactor: 0.72 },
        { id: "qianhai-airport", name: "前海–宝安机场接驳", destination: "深圳宝安国际机场", distanceKm: 14, flightMin: 5, reservePct: 15, alternates: ["大铲湾物流港"], chargingMin: 10, loadFactor: 0.68 }
      ],
      finance: { revenueIndex: 1.28, permitReadiness: 0.78, deliveryMonths: 14 },
      subsidies: { buildingGrant: 0, routeBonus: 300, ongoingPerFlight: 0, note: "深港跨境航线：市级¥100万＋前海¥200万＝¥300万/条" },
      recommendedConfig: {
        plan: "standard", evtolPads: 2, uavPads: 0, typeLabel: "开放地面中型 — 跨境枢纽",
        rationale: "Standard方案（2×FATO）是首期最优入口：滨海广场面积充裕，无结构改造限制，净建设成本在补贴后估算约¥28M。深港跨境¥300万/条一次性奖励可覆盖约8%建设成本，配合境内航线¥130万/条补贴，首年补贴叠加约¥560万。",
        keyConstraints: ["深港空域协议需双边谈判，建议提前6个月启动", "桂湾广场使用需与前海管理局签订20年土地使用协议", "eVTOL飞行人员执照互认（CAAC↔CAD）需提前申请"],
        immediateActions: ["向前海管理局提交低空先导区节点申请", "委托低空空域规划单位开展航线预研", "与香港HKCEC启动跨境航线意向磋商"],
        references: ["前海管理局低空经济政策（2024）", "深圳市低空基础设施高质量建设方案（2024-2026）", "CAAC AC-91-FS-2023-34 无人驾驶航空器运行规则"]
      }
    },

    /* SZ-02 · 宝安大铲湾物流港 — O-L 已建成 ★★★★ */
    {
      city: "shenzhen", approved: true,
      id: "baoan-dachawan", shortName: "大铲湾",
      name: "宝安大铲湾智慧物流港", district: "宝安区 · 大铲湾港区",
      type: "O-L · 开放地面大型", nodeType: "O-L",
      assetClass: "港区开放物流用地", currency: "RMB",
      lat: 22.5698, lng: 113.8633,
      mapPosition: { x: 14, y: 28 },
      tagline: "深圳市规划'低空运营总部基地'核心区，已建成eVTOL起降点，港口末公里货运需求明确，ROI 全网络最快。",
      summary: "大铲湾是深圳市《低空基础设施建设方案》明确点名的'低空运营总部基地'聚集地，宝安区已示范建成华乐湾、大铲湾等批次eVTOL起降点。毗邻深中通道门户区，港口货运与国际物流链整合价值明确，回收期为所有节点中最短。",
      heroMetrics: { area: "~5,000 sqm 港区配套用地", grid: "港区工业电网直供，容量充足", access: "大铲湾港区内部道路", alternate: "前海枢纽＆宝安机场均在15km内" },
      scores: { safety: 80, implementation: 84, regulation: 76, operations: 85, network: 78, investment: 82, power: 82, structural: 85, ground: 78, weather: 73, comms: 84 },
      hardGates: [
        { name: "港区用地协调", status: "pass", note: "国企港区，已有低空运营总部基地规划背书，用地协调路径清晰。" },
        { name: "货运UAV适航认证", status: "pass", note: "CAAC货运无人机法规已成熟，大中型货运UAV型号合格证申请路径明确。" },
        { name: "eVTOL与港口船运协调", status: "warning", note: "港口塔吊、龙门吊产生局部障碍，FATO位置需规避设备作业区。" }
      ],
      evidence: [
        "深圳市低空方案明确：宝安大铲湾片区为'低空运营总部基地'核心空间聚集地。",
        "宝安区已建成华乐湾、大铲湾等eVTOL起降点（2024年示范建设完成）。",
        "深圳市级物流重型新航线补贴¥35万/条，首条eVTOL商业航线¥100万。"
      ],
      risks: [
        { title: "港区安全净空管理", level: "Medium", text: "塔吊、船桅等障碍物需纳入净空评估，FATO位置需避开作业影响区。" },
        { title: "货运量季节性波动", level: "Low", text: "港口货运量与全球供应链周期相关，需设定最低保障运营量以维持现金流。" }
      ],
      plans: {
        lean:     { label: "Lean",     capex: 14, opex: 2.5, throughput: 80,  turnaround: 8,  feasibility: 82, power: 0.5, modules: ["uav_pad","uav_charger","wind_mast"] },
        standard: { label: "Standard", capex: 30, opex: 5.2, throughput: 140, turnaround: 6,  feasibility: 86, power: 1.4, modules: ["evtol_fato","uav_pad","uav_charger","ev_charger","wind_mast"] },
        enhanced: { label: "Enhanced", capex: 52, opex: 9.0, throughput: 220, turnaround: 5,  feasibility: 90, power: 2.8, modules: ["evtol_fato","evtol_stand","uav_pad","uav_charger","ev_charger","wind_mast"] }
      },
      routes: [
        { id: "dachawan-qianhai", name: "大铲湾–前海物流快线", destination: "前海商务区", distanceKm: 12, flightMin: 5, reservePct: 15, alternates: ["宝安机场"], chargingMin: 8, loadFactor: 0.82 },
        { id: "dachawan-airport", name: "大铲湾–机场货运接驳", destination: "深圳宝安国际机场", distanceKm: 10, flightMin: 4, reservePct: 15, alternates: ["前海枢纽"], chargingMin: 8, loadFactor: 0.78 }
      ],
      finance: { revenueIndex: 1.12, permitReadiness: 0.88, deliveryMonths: 8 },
      subsidies: { buildingGrant: 0, routeBonus: 135, ongoingPerFlight: 0, note: "市级物流重型航线¥35万＋首条eVTOL¥100万" },
      recommendedConfig: {
        plan: "standard", evtolPads: 1, uavPads: 3, typeLabel: "开放地面大型 — 货运枢纽",
        rationale: "Standard方案（1×eVTOL FATO＋3×UAV Pad）最优：货运优先配置，日140次吞吐量，配合港口班期实现高负荷率（82%）。回收期约3.8年，为所有节点最短。",
        keyConstraints: ["FATO位置需绕避塔吊作业区，与港务公司协调排班", "UAV机型需完成CAAC货运适航认证"],
        immediateActions: ["向宝安区发改局提交'低空运营总部基地'节点申请", "与深圳港务集团商谈港区用地合作协议", "委托评估机构开展港区净空障碍评估"],
        references: ["深圳市低空基础设施高质量建设方案（2024-2026）宝安章节", "CAAC AC-92-FS 货运无人机运行规则", "深圳市级物流航线补贴细则"]
      }
    },

    /* SZ-03 · 南山蛇口邮轮母港 — R-M ★★★ */
    {
      city: "shenzhen", approved: true,
      id: "shekou-cruise", shortName: "蛇口邮轮港",
      name: "南山蛇口邮轮母港屋顶节点", district: "南山区 · 蛇口太子湾",
      type: "R-M · 屋顶中型", nodeType: "R-M",
      assetClass: "停车楼屋顶改建", currency: "RMB",
      lat: 22.4880, lng: 113.9008,
      mapPosition: { x: 22, y: 42 },
      tagline: "深圳市2025年新建低空示范点名单内，国际旅游客流为商务快线和机场接驳提供天然基础客群。",
      summary: "蛇口邮轮母港已明确列入深圳2025年新建低空应用示范点计划，停车楼顶层具备改建条件。国际邮轮旅客、前海商务客群双驱动，旅游＋机场接驳构成稳定收入组合。",
      heroMetrics: { area: "~2,200 sqm 停车楼顶层", grid: "邮轮港工业电网", access: "太子湾码头徒步3分钟", alternate: "前海枢纽15分钟eVTOL可达" },
      scores: { safety: 78, implementation: 75, regulation: 79, operations: 80, network: 85, investment: 79, power: 80, structural: 72, ground: 83, weather: 74, comms: 87 },
      hardGates: [
        { name: "屋顶结构载荷认证", status: "warning", note: "停车楼顶层需独立结构鉴定，确认eVTOL MTOW及充电设备附加荷载满足要求。" },
        { name: "邮轮烟囱排气评估", status: "warning", note: "大型邮轮停靠时烟囱排气影响FATO上方气流，需评估进港高峰时段飞行限制区间。" },
        { name: "前海先导区政策覆盖", status: "pass", note: "太子湾属前海-蛇口先导区范围，政策保障完整。" }
      ],
      evidence: [
        "深圳市低空基础设施方案（2025年名单）：蛇口邮轮母港明确为新建低空应用示范点。",
        "前海管理局：蛇口-前海区域列为低空特色园区、低空客运枢纽示范范围。",
        "宝安机场–蛇口直线约25km，eVTOL直达约8分钟，高度替代地面交通1.5小时。"
      ],
      risks: [
        { title: "屋顶改造协调难度", level: "Medium", text: "停车楼改造涉及消防、结构、物业多方审批，周期约8-12个月。" },
        { title: "邮轮班期冲突", level: "Low", text: "大型邮轮靠泊高峰期需暂停飞行操作，影响日通量约15%。" }
      ],
      plans: {
        lean:     { label: "Lean",     capex: 8,  opex: 1.4, throughput: 24, turnaround: 16, feasibility: 76, power: 0.8, modules: ["evtol_fato","ev_charger","wind_mast"] },
        standard: { label: "Standard", capex: 18, opex: 3.0, throughput: 44, turnaround: 12, feasibility: 82, power: 1.6, modules: ["evtol_fato","evtol_stand","ev_charger","wind_mast","terminal"] },
        enhanced: { label: "Enhanced", capex: 30, opex: 5.0, throughput: 62, turnaround: 10, feasibility: 86, power: 2.8, modules: ["evtol_fato","evtol_stand","ev_charger","uav_charger","wind_mast","terminal"] }
      },
      routes: [
        { id: "shekou-airport", name: "蛇口–宝安机场快线", destination: "深圳宝安国际机场", distanceKm: 25, flightMin: 8, reservePct: 18, alternates: ["前海枢纽"], chargingMin: 13, loadFactor: 0.70 },
        { id: "shekou-qianhai", name: "蛇口–前海商务线", destination: "前海商务区", distanceKm: 8, flightMin: 4, reservePct: 15, alternates: ["大铲湾"], chargingMin: 8, loadFactor: 0.65 }
      ],
      finance: { revenueIndex: 1.06, permitReadiness: 0.76, deliveryMonths: 16 },
      subsidies: { buildingGrant: 0, routeBonus: 130, ongoingPerFlight: 0, note: "前海境内航线¥100万＋市级首条¥30万" },
      recommendedConfig: {
        plan: "standard", evtolPads: 2, uavPads: 0, typeLabel: "屋顶中型 — 旅游商务双功能",
        rationale: "Standard方案适配停车楼顶层面积，2×FATO日通量44次，结合邮轮旅客与商务客，年收入估算约¥1,850万（票价¥350–600/人）。",
        keyConstraints: ["结构改造需完成独立安全鉴定", "邮轮靠泊期间飞行限制需纳入运营手册"],
        immediateActions: ["委托结构工程师进行屋顶荷载鉴定", "向南山区提交低空示范节点申请", "与邮轮公司商讨旅客增值接送服务合作"],
        references: ["深圳市低空基础设施方案2025年新建节点名单", "前海管理局低空特色园区政策", "CAAC AP-21 改装类型合格证申请指引"]
      }
    },

    /* SZ-04 · 光明科学城 — O-M 最高建设补贴 ★★★★ */
    {
      city: "shenzhen", approved: true,
      id: "guangming-science", shortName: "光明科学城",
      name: "光明科学城北区低空节点", district: "光明区 · 光明科学城",
      type: "O-M · 开放地面中型", nodeType: "O-M",
      assetClass: "科研园区配套广场", currency: "RMB",
      lat: 22.7561, lng: 113.9332,
      mapPosition: { x: 25, y: 18 },
      tagline: "光明区拥有全市最完整的区级平台建设补贴（30%，最高¥100万），叠加首条商业航线¥100万，净建设成本最低之一。",
      summary: "光明科学城汇聚大量国家级科研院所，高价值研究人员城际出行需求旺盛。光明区政策提供真金白银建设补贴（30%，≤100万），叠加市级首条eVTOL商业航线¥100万，首年补贴组合约¥235万，是所有深圳节点中补贴可达性最高的落地方案。",
      heroMetrics: { area: "~2,800 sqm 科学城配套广场", grid: "科学城专用变电站", access: "光明城地铁站10分钟车程", alternate: "与前海/宝安机场均在主干航廊上" },
      scores: { safety: 84, implementation: 90, regulation: 83, operations: 76, network: 72, investment: 85, power: 90, structural: 88, ground: 74, weather: 78, comms: 83 },
      hardGates: [
        { name: "区级补贴资格审核", status: "pass", note: "光明区政策：单个项目实际建设投入≥100万元，建成运营后申请，路径明确。" },
        { name: "科学城园区配合度", status: "pass", note: "光明科学城管委会主动推进低空基础设施，政府配合度极高。" },
        { name: "北部空域协调", status: "pass", note: "科学城位置偏北，远离机场繁忙空域，空域协调相对简单。" }
      ],
      evidence: [
        "深圳市低空基础设施方案（2025建设名单）：光明科学城列为新建低空应用示范点。",
        "光明区低空政策：实际建设投入≥100万且建成运营，补贴30%、最高¥100万/项目，企业年度上限¥500万。",
        "光明区载人跨区航线¥10万/条，大中型物流¥25万/条，叠加市级首条eVTOL商业航线¥100万。"
      ],
      risks: [
        { title: "位置偏北，网络连通性受限", level: "Medium", text: "光明科学城距主干航廊（前海-宝安-福田轴线）偏北，需与龙华、福田等节点联网才能发挥枢纽价值。" },
        { title: "科研客群出行频次相对有限", level: "Low", text: "科研人员城际出行需求真实但高峰集中（周一/周五），日通量稳定性不如商业区节点。" }
      ],
      plans: {
        lean:     { label: "Lean",     capex: 12, opex: 2.1, throughput: 20, turnaround: 16, feasibility: 80, power: 0.7, modules: ["evtol_fato","ev_charger","wind_mast"] },
        standard: { label: "Standard", capex: 26, opex: 4.5, throughput: 38, turnaround: 12, feasibility: 86, power: 1.4, modules: ["evtol_fato","uav_pad","ev_charger","uav_charger","wind_mast","terminal"] },
        enhanced: { label: "Enhanced", capex: 44, opex: 7.5, throughput: 60, turnaround: 9,  feasibility: 89, power: 2.4, modules: ["evtol_fato","evtol_stand","uav_pad","ev_charger","uav_charger","wind_mast","terminal"] }
      },
      routes: [
        { id: "guangming-airport", name: "科学城–宝安机场班机", destination: "深圳宝安国际机场", distanceKm: 28, flightMin: 10, reservePct: 18, alternates: ["前海枢纽"], chargingMin: 13, loadFactor: 0.66 },
        { id: "guangming-futian", name: "光明–福田CBD通勤", destination: "福田CBD", distanceKm: 35, flightMin: 12, reservePct: 20, alternates: ["龙华樟坑径"], chargingMin: 15, loadFactor: 0.62 }
      ],
      finance: { revenueIndex: 1.04, permitReadiness: 0.84, deliveryMonths: 10 },
      subsidies: { buildingGrant: 100, routeBonus: 135, ongoingPerFlight: 0, note: "光明区建设¥100万＋市级首条¥100万＋跨区航线¥10万＋物流¥25万" },
      recommendedConfig: {
        plan: "standard", evtolPads: 1, uavPads: 2, typeLabel: "开放地面中型 — 科研园区节点",
        rationale: "Standard方案（1×FATO＋2×UAV Pad）最优：光明区建设补贴¥100万直接抵扣，净建设成本约¥16M RMB，首年补贴叠加约¥235万，IRR测算显著优于市场均值。",
        keyConstraints: ["建设完工后需向光明区发改局提交运营凭证方可领取补贴", "UAV机型需CAAC型号合格证"],
        immediateActions: ["向光明区发改局提交低空节点建设申请", "完成项目建设预算，确认补贴30%计算基数", "启动空域使用申请流程"],
        references: ["深圳市光明区低空经济扶持政策（2024）", "深圳市低空基础设施方案2025年建设名单", "CAAC AC-91-FS 无人驾驶航空器运行规则"]
      }
    },

    /* SZ-05 · 福田CBD — R-S 标杆节点 ★★★ */
    {
      city: "shenzhen", approved: false,
      id: "futian-cbd", shortName: "福田CBD",
      name: "福田CBD平安中心空中节点", district: "福田区 · 深圳CBD",
      type: "R-S · 屋顶小型", nodeType: "R-S",
      assetClass: "裙楼屋顶改建", currency: "RMB",
      lat: 22.5374, lng: 114.0563,
      mapPosition: { x: 38, y: 36 },
      tagline: "深圳CBD战略标杆节点——中央空管委'空中的士'试点覆盖区域，金融客群高支付意愿，机场快线溢价最高。",
      summary: "福田CBD是深圳金融核心，已被纳入中央空管委'空中的士'试点城市首批候选场景。高净值商务客群出行频次高、支付意愿强，机场快线（福田→宝安约32km）是大湾区内商业价值最高的单条eVTOL航线之一。",
      heroMetrics: { area: "~1,100 sqm 裙楼顶层", grid: "超高层建筑供电系统", access: "福田地铁站地下直连", alternate: "罗湖口岸＆前海枢纽形成三角网络" },
      scores: { safety: 72, implementation: 68, regulation: 78, operations: 83, network: 90, investment: 77, power: 76, structural: 68, ground: 94, weather: 76, comms: 92 },
      hardGates: [
        { name: "CBD高楼湍流评估", status: "warning", note: "周边超高层（平安金融中心600m等）产生强烈下洗气流，需专项CFD研究，是所有节点中难度最高的气象评估。" },
        { name: "裙楼结构改造协调", status: "warning", note: "裙楼主体结构改造涉及物业、消防、规划等多方，审批周期预计18个月。" },
        { name: "'空中的士'试点资格", status: "pass", note: "深圳已列入中央空管委试点城市，福田CBD为首批候选场景，政策背书已获。" }
      ],
      evidence: [
        "中央空管委将深圳纳入'空中的士'试点城市，福田CBD列为首批候选场景。",
        "深圳市级首条eVTOL商业航线补贴¥100万，福田区执行市级底线，可申报试点专项。",
        "福田CBD是深圳金融总部密度最高区域，高净值商务客群出行意愿指数位居全市首位。"
      ],
      risks: [
        { title: "超高楼湍流安全风险", level: "High", text: "平安金融中心等600m级建筑产生极强下洗效应，CFD验证成本高昂（预计¥200-400万），且结果可能限制FATO朝向。" },
        { title: "多方审批协调复杂度", level: "High", text: "裙楼所有权分散，涉及物业公司、消防局、深圳规划局等多个机构，建议配备专业政府关系团队。" }
      ],
      plans: {
        lean:     { label: "Lean",     capex: 6,  opex: 1.1, throughput: 18, turnaround: 18, feasibility: 68, power: 0.7, modules: ["evtol_fato","ev_charger","wind_mast"] },
        standard: { label: "Standard", capex: 14, opex: 2.4, throughput: 34, turnaround: 14, feasibility: 74, power: 1.4, modules: ["evtol_fato","evtol_stand","ev_charger","wind_mast","terminal"] },
        enhanced: { label: "Enhanced", capex: 24, opex: 4.0, throughput: 52, turnaround: 11, feasibility: 80, power: 2.4, modules: ["evtol_fato","evtol_stand","ev_charger","uav_charger","wind_mast","terminal"] }
      },
      routes: [
        { id: "futian-airport", name: "福田–宝安机场商务快线", destination: "深圳宝安国际机场", distanceKm: 32, flightMin: 11, reservePct: 20, alternates: ["前海枢纽", "蛇口邮轮港"], chargingMin: 14, loadFactor: 0.75 },
        { id: "futian-guangzhou", name: "福田–广州南站城际", destination: "广州南站/天河CBD", distanceKm: 105, flightMin: 28, reservePct: 25, alternates: ["南沙枢纽"], chargingMin: 20, loadFactor: 0.62 }
      ],
      finance: { revenueIndex: 1.22, permitReadiness: 0.65, deliveryMonths: 22 },
      subsidies: { buildingGrant: 0, routeBonus: 100, ongoingPerFlight: 0, note: "市级首条eVTOL¥100万，可申报'空中的士'试点专项" },
      recommendedConfig: {
        plan: "standard", evtolPads: 1, uavPads: 0, typeLabel: "屋顶小型 — CBD战略标杆",
        rationale: "Standard方案作为战略标杆，回收期约6.2年略长于其他节点，但CBD场景的品牌溢价和媒体曝光不可量化。建议作为网络初步建成后（2027年后）的第二批节点推进。",
        keyConstraints: ["CFD研究必须先于FATO选址确定", "裙楼产权需提前理清，确认改造主体"],
        immediateActions: ["委托气象工程单位开展CBD风环境评估", "启动福田裙楼顶层产权与使用权调查", "向深圳市发改局申报'空中的士'试点专项资金"],
        references: ["中央空管委城市低空试点方案（2024）", "EASA PTS-VPT-DSN §7.2 城市屋顶风环境评估", "深圳市级eVTOL首条商业航线补贴政策"]
      }
    },

    /* SZ-06 · 龙华樟坑径直升机场改建 — R-M 已批准 ★★★★ */
    {
      city: "shenzhen", approved: true,
      id: "longhua-heliport", shortName: "龙华樟坑径",
      name: "龙华樟坑径直升机场 eVTOL 改建", district: "龙华区 · 樟坑径",
      type: "R-M · 直升机场改建", nodeType: "R-M",
      assetClass: "既有直升机起降场改建", currency: "RMB",
      lat: 22.6783, lng: 114.0268,
      mapPosition: { x: 36, y: 22 },
      tagline: "深圳109个eVTOL适应性改建名单之一，已有空域批准＋消防＋气象基础设施，工期最短（约6个月），是验证改建路径的最优标杆项目。",
      summary: "樟坑径直升机场已获CAAC空域批准，现有消防、气象监测、导航等基础设施保留可用，改建成本远低于新建。龙华区是深圳内陆交通枢纽，连通东莞、惠州末端需求，为GBA北向走廊补全关键节点。",
      heroMetrics: { area: "~3,600 sqm 现有机坪", grid: "已接入电网，可扩容", access: "龙华线上塘站15分钟", alternate: "与光明科学城形成北向双节点" },
      scores: { safety: 86, implementation: 92, regulation: 88, operations: 75, network: 70, investment: 83, power: 84, structural: 82, ground: 83, weather: 78, comms: 86 },
      hardGates: [
        { name: "eVTOL适应性改建资格", status: "pass", note: "已列入深圳市109个eVTOL适应性改建直升机场名单，改建政策路径明确。" },
        { name: "空域许可延续", status: "pass", note: "现有直升机场空域许可可作为eVTOL改建基础，延续路径比新建短60%。" },
        { name: "结构荷载复核", status: "warning", note: "需对eVTOL MTOW和充电设备附加荷载进行独立复核，确认现有机坪结构满足要求。" }
      ],
      evidence: [
        "深圳市低空基础设施方案：对109个既有直升机起降场开展eVTOL适应性改造，樟坑径在列。",
        "直升机场改建参照FAA EB 105A §1.3路径，中国CAAC改建规范CCAR-139对应适用。",
        "龙华区位处深圳-东莞-惠州走廊核心，GBA北向货运与通勤需求量大。"
      ],
      risks: [
        { title: "客流量低于CBD节点", level: "Medium", text: "龙华非商业核心，旅客基础客群较少，需配合东莞/惠州跨城需求验证市场。" },
        { title: "北部空域协调", level: "Low", text: "龙华上方空域较为开阔，主要协调点是与龙华通用航空培训机构的时隙分配。" }
      ],
      plans: {
        lean:     { label: "Lean",     capex: 5,  opex: 0.9, throughput: 20, turnaround: 16, feasibility: 86, power: 0.6, modules: ["evtol_fato","ev_charger","wind_mast"] },
        standard: { label: "Standard", capex: 11, opex: 1.9, throughput: 38, turnaround: 12, feasibility: 90, power: 1.2, modules: ["evtol_fato","evtol_stand","ev_charger","wind_mast","terminal"] },
        enhanced: { label: "Enhanced", capex: 19, opex: 3.2, throughput: 58, turnaround: 9,  feasibility: 92, power: 2.2, modules: ["evtol_fato","evtol_stand","uav_pad","ev_charger","wind_mast","terminal"] }
      },
      routes: [
        { id: "longhua-shenzheibei", name: "樟坑径–深圳北站城际", destination: "深圳北站", distanceKm: 10, flightMin: 4, reservePct: 15, alternates: ["光明科学城"], chargingMin: 8, loadFactor: 0.60 },
        { id: "longhua-dongguan", name: "龙华–东莞城区快线", destination: "东莞南城/长安", distanceKm: 35, flightMin: 12, reservePct: 18, alternates: ["坪山新能源城"], chargingMin: 14, loadFactor: 0.55 }
      ],
      finance: { revenueIndex: 0.98, permitReadiness: 0.90, deliveryMonths: 6 },
      subsidies: { buildingGrant: 0, routeBonus: 130, ongoingPerFlight: 0, note: "市级首条eVTOL¥100万＋境内短途¥30万，改建成本最低" },
      recommendedConfig: {
        plan: "standard", evtolPads: 2, uavPads: 0, typeLabel: "直升机场改建 — 北部通勤枢纽",
        rationale: "Standard方案最优：改建基础好，工期仅6个月，是所有节点中最快实现首飞的方案。作为全网络最早运营节点，可积累eVTOL商业运营数据，为后续节点扩展提供监管经验。净改建成本约¥14M（补贴后），为最低建设成本节点之一。",
        keyConstraints: ["荷载复核完成后才能确定设备布局", "CAAC eVTOL适应性改建批复预计6-8个月"],
        immediateActions: ["向CAAC申请eVTOL适应性改建批复（樟坑径列入名单，绿色通道）", "委托结构工程师进行eVTOL MTOW荷载复核", "与龙华区政府商谈低空节点配套支持"],
        references: ["深圳市低空基础设施方案：109个eVTOL适应性改建名单", "CAAC CCAR-139改建规范", "FAA EB 105A §1.3直升机场eVTOL改建指引"]
      }
    },

    /* SZ-07 · 大鹏坝光海岸节点 — F-S2 已运营 ★★★★ */
    {
      city: "shenzhen", approved: true,
      id: "dapeng-bagua", shortName: "大鹏坝光",
      name: "大鹏坝光滨海低空节点", district: "大鹏新区 · 坝光片区",
      type: "F-S2 · 滨海平台小型", nodeType: "F-S2",
      assetClass: "滨海新建平台 + 测试基地毗邻", currency: "RMB",
      lat: 22.5328, lng: 114.5178,
      mapPosition: { x: 62, y: 38 },
      tagline: "大鹏新区区级单体补贴最高（¥150万/个），毗邻已运营无人机测试基地，深港东部医疗急救通道唯一节点。",
      summary: "大鹏坝光新区已建成深圳市'1+5+4'体系中的4个测试场之一，由深城交低空运营公司投资运营。区级补贴体系全市最完整，载人eVTOL起降场最高补贴¥150万/个。坝光滨海节点可共享测试基地气象、指挥、维保设施，实际建设成本大幅降低。",
      heroMetrics: { area: "~1,800 sqm 滨海平台", grid: "新区电网，测试基地电力共享", access: "坝光片区内部道路，距大亚湾1km", alternate: "与香港新界东部（大埔/西贡）直线<25km" },
      scores: { safety: 82, implementation: 80, regulation: 79, operations: 77, network: 75, investment: 86, power: 62, structural: 75, ground: 54, weather: 72, comms: 70 },
      hardGates: [
        { name: "大鹏区级补贴资格", status: "pass", note: "载人eVTOL起降场在大鹏新区建成并实际运营，可申请¥150万区级补贴。" },
        { name: "测试基地共享协议", status: "pass", note: "深城交低空运营公司已运营坝光测试基地，商业共享协议可快速推进。" },
        { name: "深港东部跨境空域", status: "warning", note: "深港东部跨境空域协调路径与前海西部不同，需向CAD单独申请，周期可能较长。" }
      ],
      evidence: [
        "大鹏新区无人机测试基地已启用（坝光片区），由深城交低空运营公司投资建设并运营——深圳'1+5+4'低空创新基础设施体系4个测试场之一。",
        "大鹏新区政策：载人eVTOL/直升机起降场每个最高补贴¥150万，eVTOL商业运行按票价收入比例补贴，企业年度上限500万元。",
        "坝光–香港大埔直线约22km，医疗急救航线（飞行约8分钟）可显著提升东部屿岛区域应急响应效率。"
      ],
      risks: [
        { title: "旅游季节性波动", level: "Medium", text: "大鹏湾旅游高峰集中在5-9月，淡季日通量可能下降40-50%，需医疗/政府合同弥补基础收入。" },
        { title: "离岸气象条件", level: "Medium", text: "海湾气象变化快，台风季（6-9月）飞行限制天数约15-20天，需纳入运营保险计划。" }
      ],
      plans: {
        lean:     { label: "Lean",     capex: 4,  opex: 0.7, throughput: 16, turnaround: 18, feasibility: 78, power: 0.5, modules: ["evtol_fato","ev_charger","wind_mast"] },
        standard: { label: "Standard", capex: 9,  opex: 1.5, throughput: 28, turnaround: 14, feasibility: 83, power: 1.0, modules: ["evtol_fato","uav_pad","ev_charger","uav_charger","wind_mast"] },
        enhanced: { label: "Enhanced", capex: 16, opex: 2.6, throughput: 44, turnaround: 11, feasibility: 86, power: 1.8, modules: ["evtol_fato","evtol_stand","uav_pad","ev_charger","uav_charger","wind_mast","terminal"] }
      },
      routes: [
        { id: "dapeng-tourism", name: "大鹏湾旅游观光航线", destination: "葵涌/东冲旅游区", distanceKm: 18, flightMin: 7, reservePct: 15, alternates: ["盐田港节点"], chargingMin: 10, loadFactor: 0.72 },
        { id: "dapeng-hk-medical", name: "坝光–香港大埔医疗急救", destination: "香港大埔医院", distanceKm: 22, flightMin: 8, reservePct: 20, alternates: ["盐田港"], chargingMin: 12, loadFactor: 0.35 }
      ],
      finance: { revenueIndex: 1.08, permitReadiness: 0.80, deliveryMonths: 10 },
      subsidies: { buildingGrant: 150, routeBonus: 0, ongoingPerFlight: 0, note: "大鹏区载人eVTOL起降场补贴¥150万＋票价收入比例补贴（年度¥500万上限）" },
      recommendedConfig: {
        plan: "standard", evtolPads: 1, uavPads: 1, typeLabel: "滨海平台小型 — 旅游＋医疗双功能",
        rationale: "Standard方案（1×FATO＋1×UAV Pad）最优：大鹏区¥150万补贴后净建设成本约¥10.5M，ROI测算优于市场均值。旅游+医疗双功能分散季节性风险，政府医疗应急合同可锁定基础收入约¥120万/年。",
        keyConstraints: ["医疗急救航线需与深圳急救中心（120）及香港消防处签订服务协议", "台风季运营中断保险需专项购买"],
        immediateActions: ["向大鹏新区政府提交载人eVTOL起降场建设申请（¥150万补贴资格）", "与深城交低空运营公司洽谈坝光测试基地共享协议", "向深圳市卫健委提交医疗应急航线合作建议"],
        references: ["大鹏新区低空经济政策（2024）", "深圳'1+5+4'低空创新基础设施体系", "深港医疗应急合作框架协议"]
      }
    },

    /* SZ-08 · 罗湖口岸枢纽 — R-S 跨境东通道 ★★ */
    {
      city: "shenzhen", approved: false,
      id: "luohu-border", shortName: "罗湖口岸",
      name: "罗湖综合交通枢纽空中节点", district: "罗湖区 · 罗湖口岸",
      type: "R-S · 屋顶小型", nodeType: "R-S",
      assetClass: "口岸综合枢纽楼顶改建", currency: "RMB",
      lat: 22.5354, lng: 114.1199,
      mapPosition: { x: 42, y: 37 },
      tagline: "深港日均25万人次陆路口岸，东部跨境eVTOL通道补全前海西端，覆盖九龙半岛腹地。",
      summary: "罗湖是深港日均旅客量最大的陆路口岸。2024年规划在罗湖区建立城市空中交通运营中心。eVTOL直连九龙城/启德，提供地面排队的替代方案，时间价值溢价显著。罗湖与前海构成深港双跨境通道网络，覆盖香港东西两端。",
      heroMetrics: { area: "~1,000 sqm 口岸枢纽楼顶", grid: "口岸大楼供电系统", access: "罗湖地铁站楼上直达", alternate: "与前海枢纽形成深港东西双通道" },
      scores: { safety: 74, implementation: 70, regulation: 75, operations: 82, network: 88, investment: 72, power: 78, structural: 66, ground: 89, weather: 76, comms: 86 },
      hardGates: [
        { name: "口岸安全净空评估", status: "warning", note: "罗湖高密度建筑群（万象城等超高层）产生强烈下洗，需CFD研究。" },
        { name: "多主体审批协调", status: "warning", note: "涉及铁路、口岸管理、深圳规划局等多个机构，协调周期预计18个月以上。" },
        { name: "深港双边跨境协议", status: "warning", note: "罗湖→香港九龙跨境航线需独立谈判，不可直接套用前海协议。" }
      ],
      evidence: [
        "深圳市级深港跨境eVTOL航线补贴¥100万/条（一次性）。",
        "罗湖区2024年规划：在罗湖体育休闲公园建立城市空中交通运营中心。",
        "罗湖口岸日均旅客25万人次，是所有深港口岸中客流量最大的陆路通道。"
      ],
      risks: [
        { title: "高密度城区实施难度", level: "High", text: "罗湖旧城区建筑密集，施工空间极为有限，屋顶改造协调方最多，建议谨慎评估可行性。" },
        { title: "独立跨境协议谈判周期", level: "High", text: "与前海路径不同，罗湖→九龙跨境需独立协议，谈判周期和结果存在不确定性。" }
      ],
      plans: {
        lean:     { label: "Lean",     capex: 5,  opex: 1.0, throughput: 16, turnaround: 18, feasibility: 68, power: 0.6, modules: ["evtol_fato","ev_charger","wind_mast"] },
        standard: { label: "Standard", capex: 12, opex: 2.0, throughput: 30, turnaround: 14, feasibility: 74, power: 1.2, modules: ["evtol_fato","evtol_stand","ev_charger","wind_mast","terminal"] },
        enhanced: { label: "Enhanced", capex: 20, opex: 3.4, throughput: 48, turnaround: 11, feasibility: 78, power: 2.2, modules: ["evtol_fato","evtol_stand","ev_charger","wind_mast","terminal"] }
      },
      routes: [
        { id: "luohu-hk-kowloon", name: "罗湖–九龙城跨境商务", destination: "香港九龙城/启德", distanceKm: 5, flightMin: 3, reservePct: 20, alternates: ["福田CBD"], chargingMin: 8, loadFactor: 0.68 },
        { id: "luohu-futian", name: "罗湖–福田CBD接驳", destination: "福田CBD", distanceKm: 8, flightMin: 4, reservePct: 15, alternates: [], chargingMin: 8, loadFactor: 0.55 }
      ],
      finance: { revenueIndex: 1.10, permitReadiness: 0.58, deliveryMonths: 28 },
      subsidies: { buildingGrant: 0, routeBonus: 100, ongoingPerFlight: 0, note: "市级深港跨境¥100万，仅执行市级底线，无区级加码" },
      recommendedConfig: {
        plan: "lean", evtolPads: 1, uavPads: 0, typeLabel: "屋顶小型 — 跨境东通道战略节点",
        rationale: "建议以Lean方案试点：降低实施风险，验证罗湖跨境航线市场需求后再考虑升级。优先级低于前海，建议作为第二批跨境节点（2027年后）推进。",
        keyConstraints: ["建议在前海跨境航线成功运营后，以其为参照模板申请罗湖跨境协议", "口岸楼顶使用权需铁路总公司、海关总署双重授权"],
        immediateActions: ["研究前海跨境协议框架，评估罗湖独立谈判可行性", "向罗湖区政府提交城市空中交通运营中心参与意向"],
        references: ["深圳市深港跨境eVTOL航线补贴政策", "罗湖区城市空中交通运营中心规划（2024）"]
      }
    },

    /* SZ-09 · 盐田国际集装箱港 — O-S 货运专属 ★★★ */
    {
      city: "shenzhen", approved: false,
      id: "yantian-port", shortName: "盐田港",
      name: "盐田国际集装箱港物流节点", district: "盐田区 · 盐田港区",
      type: "O-S · 开放地面小型", nodeType: "O-S",
      assetClass: "港区配套货运用地", currency: "RMB",
      lat: 22.5589, lng: 114.2538,
      mapPosition: { x: 54, y: 34 },
      tagline: "全球十大繁忙港口之一，eVTOL末公里货运场景需求最真实，回收期约3.8年为所有节点最快。",
      summary: "盐田港年吞吐约1,600万标箱，港区末公里货运（港区→保税仓→清关中心）时间敏感性高。eVTOL货运可将现有地面转运时间从60分钟压缩至8分钟，附加价值直接可量化。深圳220条无人机航线规划已覆盖盐田港区。",
      heroMetrics: { area: "~1,500 sqm 港区配套用地", grid: "港区工业电网直供", access: "盐田港区内部道路", alternate: "与大鹏坝光形成东部双节点" },
      scores: { safety: 83, implementation: 87, regulation: 78, operations: 88, network: 72, investment: 84, power: 85, structural: 82, ground: 71, weather: 70, comms: 78 },
      hardGates: [
        { name: "港区UAV安全净空", status: "pass", note: "港区空域相对独立，起重机净空数据可获取，FATO选位可规避作业区。" },
        { name: "货运UAV适航认证", status: "pass", note: "CAAC货运无人机适航规则已成熟，主流机型均已完成认证。" },
        { name: "盐田港国企配合", status: "pass", note: "招商局港口集团（盐田国际运营商）已有低空物流研究，配合意愿强。" }
      ],
      evidence: [
        "深圳市220条以上无人机航线规划覆盖盐田港区，货运无人机业务纳入港口智能化提升方案。",
        "深圳市级物流重型新航线补贴¥35万/条，盐田港→前海/福田走廊符合申报条件。",
        "招商局港口集团已在国内多个港口试点无人机物流，盐田港推进条件成熟。"
      ],
      risks: [
        { title: "起重机和船桅障碍", level: "Low", text: "塔吊高度有限（多为40-50m级），合理规划FATO位置可完全规避，影响可控。" },
        { title: "全球供应链周期影响", level: "Medium", text: "全球贸易量波动影响港口吞吐，需在服务协议中设置最低保障量条款。" }
      ],
      plans: {
        lean:     { label: "Lean",     capex: 5,  opex: 0.9, throughput: 60,  turnaround: 5, feasibility: 84, power: 0.4, modules: ["uav_pad","uav_charger","wind_mast"] },
        standard: { label: "Standard", capex: 12, opex: 2.0, throughput: 120, turnaround: 4, feasibility: 88, power: 1.0, modules: ["evtol_fato","uav_pad","uav_charger","ev_charger","wind_mast"] },
        enhanced: { label: "Enhanced", capex: 20, opex: 3.4, throughput: 200, turnaround: 3, feasibility: 91, power: 2.0, modules: ["evtol_fato","uav_pad","uav_charger","ev_charger","wind_mast"] }
      },
      routes: [
        { id: "yantian-futian", name: "盐田港–福田保税区快件", destination: "福田综合保税区", distanceKm: 28, flightMin: 10, reservePct: 15, alternates: ["大鹏坝光"], chargingMin: 8, loadFactor: 0.85 },
        { id: "yantian-hk-kwaitung", name: "盐田–香港葵涌港跨境货运", destination: "香港葵涌货柜码头", distanceKm: 40, flightMin: 14, reservePct: 20, alternates: [], chargingMin: 10, loadFactor: 0.70 }
      ],
      finance: { revenueIndex: 1.15, permitReadiness: 0.88, deliveryMonths: 8 },
      subsidies: { buildingGrant: 0, routeBonus: 35, ongoingPerFlight: 0, note: "市级物流重型航线¥35万/条" },
      recommendedConfig: {
        plan: "standard", evtolPads: 0, uavPads: 4, typeLabel: "开放地面小型 — 港口货运专属",
        rationale: "货运优先Standard方案（4×UAV Pad）：盐田港场景以UAV货运为主，eVTOL用于高值货物接驳。日120次吞吐量，负荷率85%，回收期约3.8年，为全网络ROI最快节点，建议作为纯商业项目独立推进。",
        keyConstraints: ["与招商局港口集团签订港区土地使用协议", "货运服务定价需与港口清关流程对接"],
        immediateActions: ["与招商局港口集团（盐田国际）商谈低空物流合作框架", "向盐田区提交港区低空货运节点申请", "评估盐田→香港葵涌跨境货运航线可行性"],
        references: ["深圳市220条无人机航线规划", "深圳市级物流重型航线补贴政策", "招商局港口集团低空物流试点报告"]
      }
    },

    /* SZ-10 · 坪山新能源汽车城 — O-M eVTOL展示 ★★ */
    {
      city: "shenzhen", approved: false,
      id: "pingshan-ev", shortName: "坪山新能源城",
      name: "坪山新能源汽车城低空展示基地", district: "坪山区 · 坪山高新区",
      type: "O-M · 开放地面中型", nodeType: "O-M",
      assetClass: "产业园区展示广场", currency: "RMB",
      lat: 22.6905, lng: 114.3552,
      mapPosition: { x: 56, y: 24 },
      tagline: "深圳eVTOL试点区之一，毗邻比亚迪总部，产-研-展-运一体化场景，是eVTOL整机厂商最理想的商业化验证基地。",
      summary: "坪山2024年被确定为深圳eVTOL试点区（坪山新能源汽车城配套'天空之城'展示场景），比亚迪、中航无人机等eVTOL产业链巨头已布局坪山。产业展示+工厂间物料调配+出口前整机测试三场景融合，适合eVTOL整机厂商联合投资。",
      heroMetrics: { area: "~2,400 sqm 展示广场", grid: "新能源产业园专用变电站", access: "坪山地铁站8分钟", alternate: "与大鹏坝光形成东部双节点" },
      scores: { safety: 82, implementation: 85, regulation: 80, operations: 73, network: 68, investment: 76, power: 92, structural: 88, ground: 68, weather: 81, comms: 82 },
      hardGates: [
        { name: "eVTOL试点区政策背书", status: "pass", note: "坪山2024年已被深圳确定为eVTOL试点区，政府支持力度强。" },
        { name: "整机厂商配合意愿", status: "pass", note: "比亚迪/中航等已在坪山布局，整机厂商联合投资意愿强，可降低建设成本。" },
        { name: "东部空域协调", status: "pass", note: "坪山位处深圳东部边缘，空域环境相对宽松，协调难度低。" }
      ],
      evidence: [
        "深圳坪山2024年eVTOL试点区定位确认，配套'天空之城'展示场景规划。",
        "深圳市首条eVTOL商业航线补贴¥100万，坪山区可申报试点专项支持。",
        "坪山新能源汽车产业集群：比亚迪（整车）＋中航无人机（eVTOL）布局坪山，产业协同机会强。"
      ],
      risks: [
        { title: "位置偏东，网络孤立风险", level: "Medium", text: "坪山不在深圳西部主干航廊上，需通过龙华/大鹏联网，否则孤立节点财务表现有限。" },
        { title: "商业收入规模偏小", level: "Medium", text: "产业展示和整机测试收入相对有限，需配合政府补贴和整机厂商联合投资才能实现合理回报。" }
      ],
      plans: {
        lean:     { label: "Lean",     capex: 7,  opex: 1.2, throughput: 15, turnaround: 18, feasibility: 78, power: 0.6, modules: ["evtol_fato","ev_charger","wind_mast"] },
        standard: { label: "Standard", capex: 16, opex: 2.7, throughput: 32, turnaround: 13, feasibility: 84, power: 1.2, modules: ["evtol_fato","uav_pad","ev_charger","uav_charger","wind_mast","terminal"] },
        enhanced: { label: "Enhanced", capex: 28, opex: 4.7, throughput: 55, turnaround: 10, feasibility: 88, power: 2.2, modules: ["evtol_fato","evtol_stand","uav_pad","ev_charger","uav_charger","wind_mast","terminal"] }
      },
      routes: [
        { id: "pingshan-dapeng", name: "坪山–大鹏东部走廊", destination: "大鹏坝光新区", distanceKm: 22, flightMin: 8, reservePct: 15, alternates: [], chargingMin: 10, loadFactor: 0.55 },
        { id: "pingshan-longhua", name: "坪山–龙华城际接驳", destination: "龙华区/深圳北站", distanceKm: 38, flightMin: 13, reservePct: 18, alternates: ["大鹏坝光"], chargingMin: 14, loadFactor: 0.50 }
      ],
      finance: { revenueIndex: 0.94, permitReadiness: 0.80, deliveryMonths: 12 },
      subsidies: { buildingGrant: 0, routeBonus: 100, ongoingPerFlight: 0, note: "市级首条eVTOL¥100万，坪山试点专项（额度待定）" },
      recommendedConfig: {
        plan: "standard", evtolPads: 1, uavPads: 1, typeLabel: "开放地面中型 — 产业展示基地",
        rationale: "Standard方案（1×FATO＋1×UAV Pad）：以整机厂商联合投资模式推进，将建设成本分摊给比亚迪/中航等产业伙伴，实质建设投入可降低40-50%。建议优先推动厂商联合体申报，而非独立资本投入。",
        keyConstraints: ["整机厂商联合投资协议需提前谈判", "展示飞行需CAAC公开飞行许可（表演类）"],
        immediateActions: ["与坪山区政府确认eVTOL试点区节点申报流程", "与比亚迪/中航无人机洽谈联合投资意向", "评估'产业展示飞行'商业模式税务处理"],
        references: ["深圳坪山eVTOL试点区政策（2024）", "深圳市低空基础设施方案东部节点规划", "CAAC 航空表演类飞行许可规则"]
      }
    },

    /* ══════════════════════════════════════════════════════════
       MAINLAND CHINA — GUANGZHOU (2 sites)
       ══════════════════════════════════════════════════════════ */

    /* GZ-01 · 南沙自贸区明珠湾 — O-L GBA枢纽 ★★★★★ */
    {
      city: "guangzhou", approved: false,
      id: "nansha-mingzhubay", shortName: "南沙明珠湾",
      name: "广州南沙自贸区明珠湾低空枢纽", district: "广州南沙区 · 明珠湾起步区",
      type: "O-L · 开放地面大型", nodeType: "O-L",
      assetClass: "自贸区规划预留地", currency: "RMB",
      lat: 22.7258, lng: 113.5238,
      mapPosition: { x: 8, y: 20 },
      tagline: "GBA走廊南端枢纽，广州市'1+5+100'规划5个枢纽型垂直起降场之一候选地，市级载人航线持续补贴¥100万/条/年（按年兑付，最稳定补贴结构）。",
      summary: "广州南沙是粤港澳大湾区几何中心，《广州市低空经济发展实施方案》提出建成5个以上枢纽型垂直起降场，南沙/明珠湾是最具条件的候选地。广州市级按年持续补贴结构（载人¥100万/条/年）在所有城市中最稳定，是长期运营IRR最优的城市。",
      heroMetrics: { area: "~4,500 sqm 规划预留用地", grid: "南沙自贸区专用变电站", access: "庆盛高铁站10分钟", alternate: "广深珠三城均在55km内" },
      scores: { safety: 85, implementation: 82, regulation: 80, operations: 83, network: 90, investment: 86, power: 86, structural: 84, ground: 72, weather: 75, comms: 84 },
      hardGates: [
        { name: "广州'1+5+100'枢纽资格", status: "pass", note: "南沙明珠湾具备枢纽型垂直起降场选址条件，纳入规划可获政府用地支持。" },
        { name: "eVTOL运营合格证", status: "pass", note: "广州已获全球首个eVTOL运营合格证（EH216），广州eVTOL监管生态全国最成熟。" },
        { name: "GBA多城空域协调", status: "warning", note: "南沙→深圳/珠海跨城走廊涉及多省市空域主管，需民航局协调，周期约12-18个月。" }
      ],
      evidence: [
        "广州《低空经济发展实施方案》：2027年建成5个以上枢纽型垂直起降场，覆盖全市11区100个常态化起降点。",
        "广州市级载人无人驾驶航线补贴：最高¥100万/条/年（持续兑付，条件：常态运营）——全国最稳定的航线补贴结构。",
        "全球首个eVTOL运营合格证（EH216）将落地广州，监管生态成熟度全国领先。"
      ],
      risks: [
        { title: "GBA跨城空域协调复杂度", level: "Medium", text: "广州→深圳→香港纵深走廊涉及三地监管机构，多边协调周期长，建议分步推进：先开通广州境内航线，再申请跨城走廊。" },
        { title: "竞争对手布局加速", level: "Low", text: "广州多区竞争低空枢纽资源（天河、黄埔等），需尽快锁定南沙枢纽资格。" }
      ],
      plans: {
        lean:     { label: "Lean",     capex: 14, opex: 2.5, throughput: 35, turnaround: 14, feasibility: 78, power: 1.2, modules: ["evtol_fato","uav_pad","ev_charger","wind_mast","terminal"] },
        standard: { label: "Standard", capex: 32, opex: 5.5, throughput: 68, turnaround: 11, feasibility: 84, power: 2.4, modules: ["evtol_fato","evtol_stand","uav_pad","ev_charger","uav_charger","wind_mast","terminal"] },
        enhanced: { label: "Enhanced", capex: 55, opex: 9.5, throughput: 110, turnaround: 8,  feasibility: 88, power: 4.0, modules: ["evtol_fato","evtol_stand","uav_pad","ev_charger","uav_charger","wind_mast","terminal"] }
      },
      routes: [
        { id: "nansha-guangzhou-cbd", name: "南沙–天河CBD商务班机", destination: "广州天河CBD/珠江新城", distanceKm: 48, flightMin: 15, reservePct: 20, alternates: ["黄埔知识城"], chargingMin: 18, loadFactor: 0.72 },
        { id: "nansha-shenzhen", name: "南沙–深圳前海GBA城际", destination: "深圳前海商务区", distanceKm: 55, flightMin: 18, reservePct: 22, alternates: ["黄埔知识城"], chargingMin: 20, loadFactor: 0.65 }
      ],
      finance: { revenueIndex: 1.24, permitReadiness: 0.78, deliveryMonths: 16 },
      subsidies: { buildingGrant: 0, routeBonus: 100, ongoingPerFlight: 0, note: "广州市级载人航线¥100万/条/年（持续），自贸区税收优惠＋政策性金融工具" },
      recommendedConfig: {
        plan: "standard", evtolPads: 2, uavPads: 2, typeLabel: "开放地面大型 — GBA南端枢纽",
        rationale: "Standard方案最优：广州市级¥100万/条/年持续补贴是最稳定的航线补贴结构，按2条主航线计算，年持续补贴¥200万可覆盖约31%年运营成本。GBA纵深走廊（广州–深圳–香港）战略价值最高，是所有节点中长期IRR最优的方案之一。",
        keyConstraints: ["需向广州空港委申请纳入'1+5+100'枢纽型垂直起降场规划", "用地需通过南沙自贸区划拨流程"],
        immediateActions: ["向广州空港委提交南沙枢纽节点申请", "与广州市发改局对接GBA低空走廊专项", "启动广州境内首条载人航线申请（南沙→天河CBD）"],
        references: ["广州市低空经济发展实施方案（2024）", "广州市低空垂直起降设施场址选择及建设技术指引（2025年4月）", "广州市载人无人驾驶航线补贴政策"]
      }
    },

    /* GZ-02 · 黄埔知识城 — O-M 最高区级补贴 ★★★★★ */
    {
      city: "guangzhou", approved: true,
      id: "huangpu-knowledge", shortName: "黄埔知识城",
      name: "广州黄埔中新知识城低空基地", district: "黄埔区 · 中新广州知识城",
      type: "O-M · 开放地面中型", nodeType: "O-M",
      assetClass: "产业园区配套广场 + 试飞跑道", currency: "RMB",
      lat: 23.5048, lng: 113.4731,
      mapPosition: { x: 12, y: 10 },
      tagline: "广州公开政策中补贴条款最细、单体上限最高（¥300万）的区级节点，综保区智能通关航线已运营，全国首个综保区低空物流示范基地。",
      summary: "黄埔区/广州开发区拥有全广州最完整的eVTOL建设补贴政策（实际投入50%，≤¥300万/个），配合广州市级持续航线补贴（¥100万/条/年）和运营费用补贴（50%），首年综合补贴估算约¥900万，净IRR为所有节点最高测算值。知识城低空产业园（10万㎡）和800米试飞跑道已建成。",
      heroMetrics: { area: "~3,000 sqm 知识城广场", grid: "产业园专用变电站，高冗余", access: "知识城南站地铁15分钟", alternate: "白云机场35km，可开通机场班机" },
      scores: { safety: 84, implementation: 91, regulation: 85, operations: 80, network: 77, investment: 90, power: 85, structural: 85, ground: 76, weather: 78, comms: 83 },
      hardGates: [
        { name: "黄埔区¥300万建设补贴资格", status: "pass", note: "已纳入区低空航线和起降点规划，进入常态化运营后申请，路径完全明确。" },
        { name: "低空产业园配套成熟度", status: "pass", note: "知识城10万㎡低空产业园已建成，800米试飞跑道已运营，基础设施共享可大幅降低OPEX。" },
        { name: "综保区通关合规", status: "pass", note: "全国首个综保区低空智能通关配送航线已在黄埔运营，监管合规路径已有成例。" }
      ],
      evidence: [
        "广州黄埔区/广州开发区政策：eVTOL起降场实际建设投入50%，最高¥300万/个，每家企业年度上限¥600万。",
        "黄埔区载人示范运营补贴：实际运营费用最高50%，≤¥300万/项目/年。",
        "广州市级航线补贴：¥100万/条/年（持续）；黄埔知识城已建成10万㎡低空产业园＋800m试飞跑道，全国首条综保区低空智能通关配送航线已运营，黄埔2025年上半年低空飞行活动已突破万架次。"
      ],
      risks: [
        { title: "位置偏离广州CBD，客流有限", level: "Medium", text: "知识城距天河CBD约55km，旅客自行前往乘机成本高，需强化企业定制包机和接驳服务，覆盖产业园B2B客群。" },
        { title: "补贴池竞争", level: "Low", text: "黄埔区补贴总池有上限，多家企业竞争同一池子，需尽早确认节点纳入规划名单。" }
      ],
      plans: {
        lean:     { label: "Lean",     capex: 7,  opex: 1.2, throughput: 28, turnaround: 14, feasibility: 84, power: 0.8, modules: ["evtol_fato","uav_pad","ev_charger","uav_charger","wind_mast"] },
        standard: { label: "Standard", capex: 16, opex: 2.7, throughput: 52, turnaround: 11, feasibility: 89, power: 1.6, modules: ["evtol_fato","evtol_stand","uav_pad","ev_charger","uav_charger","wind_mast","terminal"] },
        enhanced: { label: "Enhanced", capex: 28, opex: 4.7, throughput: 80, turnaround: 9,  feasibility: 92, power: 2.8, modules: ["evtol_fato","evtol_stand","uav_pad","ev_charger","uav_charger","wind_mast","terminal"] }
      },
      routes: [
        { id: "huangpu-airport", name: "知识城–白云机场商务班机", destination: "广州白云国际机场", distanceKm: 35, flightMin: 11, reservePct: 18, alternates: ["南沙明珠湾"], chargingMin: 14, loadFactor: 0.70 },
        { id: "huangpu-tianhe", name: "知识城–天河CBD企业直连", destination: "广州天河CBD", distanceKm: 52, flightMin: 16, reservePct: 20, alternates: ["南沙明珠湾"], chargingMin: 18, loadFactor: 0.65 }
      ],
      finance: { revenueIndex: 1.18, permitReadiness: 0.86, deliveryMonths: 10 },
      subsidies: { buildingGrant: 300, routeBonus: 100, ongoingPerFlight: 0, note: "黄埔建设¥300万＋运营50%（≤300万/年）＋市级航线¥100万/条/年，首年总补贴估算约¥900万" },
      recommendedConfig: {
        plan: "standard", evtolPads: 2, uavPads: 2, typeLabel: "开放地面中型 — 产研运一体化基地",
        rationale: "Standard方案最优：黄埔区¥300万建设补贴＋运营50%补贴后，净建设成本约¥19.7M，净运营成本约¥2.1M/年。结合广州市级¥100万/年持续航线补贴，测算IRR约为所有节点最高，建议作为广州首批落地节点。",
        keyConstraints: ["需向黄埔区提交低空航线规划纳入申请以确认补贴资格", "运营补贴需按年提交实际运营凭证"],
        immediateActions: ["向黄埔区发改局/招商局提交低空节点建设申请（¥300万补贴通道）", "与知识城低空产业园签署基础设施共享协议", "向民航局申请知识城→白云机场载人eVTOL试点航线"],
        references: ["广州黄埔区/广州开发区低空经济政策（2024）", "广州市载人无人驾驶航线补贴细则", "广州黄埔综保区低空智能通关配送航线案例"]
      }
    },

    /* ══════════════════════════════════════════════════════════
       MAINLAND CHINA — ZHUHAI (3 sites)
       ══════════════════════════════════════════════════════════ */

    /* ZH-01 · 横琴粤澳深度合作区 — F-S2 最高IRR ★★★★★ */
    {
      city: "zhuhai", approved: false,
      id: "hengqin-macao", shortName: "横琴粤澳",
      name: "横琴粤澳深度合作区跨境低空节点", district: "珠海横琴新区 · 粤澳合作区",
      type: "F-S2 · 滨海平台小型", nodeType: "F-S2",
      assetClass: "横琴口岸北岸水岸平台", currency: "RMB",
      lat: 22.1218, lng: 113.5442,
      mapPosition: { x: 10, y: 58 },
      tagline: "珠海最高建设补贴（50%，≤¥500万）＋横琴文旅奖励（¥3万/100人次）＋澳门跨境客流，净建设成本极低，IRR全体系最优。",
      summary: "横琴是唯一同时叠加珠海市级eVTOL补贴（50%建设成本）和横琴合作区低空文旅航线奖励（¥3万/100人次，≤300万/年）的区域。横琴→澳门直线约4km，是GBA内最短的跨境城市飞行路线。澳门年均旅游人次超2,800万，为跨境eVTOL提供巨大客流基础。",
      heroMetrics: { area: "~1,600 sqm 口岸北岸平台", grid: "横琴合作区专用变电站", access: "横琴口岸徒步5分钟", alternate: "珠海拱北口岸＆澳门国际机场均在网络内" },
      scores: { safety: 81, implementation: 84, regulation: 82, operations: 86, network: 88, investment: 91, power: 84, structural: 82, ground: 78, weather: 70, comms: 86 },
      hardGates: [
        { name: "澳门–内地跨境空域协议", status: "warning", note: "澳门空域由葡管CAM（澳门民航局）管理，需与CAAC签署双边备忘录，预计需12-24个月谈判。" },
        { name: "珠海市级50%建设补贴", status: "pass", note: "实际固定资产投入50%，运营满1年后申请，¥500万企业年度上限，路径明确。" },
        { name: "横琴文旅航线奖励资格", status: "pass", note: "起点或终点在横琴、公开售票、飞行距离>5km、每100人次奖励¥3万。" }
      ],
      evidence: [
        "珠海市政策：eVTOL起降场实际固定资产投入50%，≤¥500万/企业/年，运营满1年后申请。",
        "横琴合作区：低空载人观光航线奖励¥3万/100人次，≤¥300万/企业/年（起/终点之一在横琴，飞行>5km，公开售票）。",
        "澳门年均旅游人次超2800万（2023年数据），横琴→澳门4km航程是GBA最短跨境飞行，飞行时间约2分钟。"
      ],
      risks: [
        { title: "澳门跨境空域谈判周期", level: "Medium", text: "澳门民航局体系独立，谈判周期存在不确定性。建议在谈判期间先开通横琴文旅观光内线（横琴内部），已可触发文旅奖励收入。" },
        { title: "澳门政策协调配合度", level: "Medium", text: "澳门方面需同步建设配套起降设施，需与澳门特区政府提前对接。" }
      ],
      plans: {
        lean:     { label: "Lean",     capex: 9,  opex: 1.6, throughput: 20, turnaround: 14, feasibility: 80, power: 0.5, modules: ["evtol_fato","ev_charger","wind_mast"] },
        standard: { label: "Standard", capex: 20, opex: 3.4, throughput: 38, turnaround: 11, feasibility: 86, power: 1.0, modules: ["evtol_fato","uav_pad","ev_charger","wind_mast","terminal"] },
        enhanced: { label: "Enhanced", capex: 35, opex: 5.9, throughput: 58, turnaround: 8,  feasibility: 90, power: 1.8, modules: ["evtol_fato","evtol_stand","uav_pad","ev_charger","wind_mast","terminal"] }
      },
      routes: [
        { id: "hengqin-macao-tourism", name: "横琴–澳门跨境旅游快线", destination: "澳门路氹城/氹仔", distanceKm: 4, flightMin: 2, reservePct: 20, alternates: ["珠海拱北"], chargingMin: 8, loadFactor: 0.80 },
        { id: "hengqin-zhuhai", name: "横琴–珠海市区文旅观光", destination: "珠海长隆/情侣路", distanceKm: 12, flightMin: 5, reservePct: 15, alternates: [], chargingMin: 8, loadFactor: 0.70 }
      ],
      finance: { revenueIndex: 1.32, permitReadiness: 0.80, deliveryMonths: 12 },
      subsidies: { buildingGrant: 500, routeBonus: 0, ongoingPerFlight: 100, note: "珠海建设50%≤¥500万＋横琴文旅奖励¥3万/100人次（≤300万/年）＋市级观光¥100元/架次" },
      recommendedConfig: {
        plan: "standard", evtolPads: 1, uavPads: 1, typeLabel: "滨海平台小型 — 跨境旅游＋商务",
        rationale: "Standard方案（1×FATO＋1×UAV Pad）最优：珠海¥500万建设补贴后净成本仅¥9M RMB，是全体系净建设成本最低节点之一。横琴文旅奖励（300人次/年即可达¥9万，1000人次即达¥30万）叠加持续架次奖励，IRR测算全网络最高。",
        keyConstraints: ["跨境航线在澳门协议完成前先开内线，内线已可触发文旅补贴", "横琴口岸北岸平台用地需向横琴执委会申请"],
        immediateActions: ["向横琴粤澳深度合作区执委会提交低空节点建设申请", "启动珠海¥500万建设补贴资格申报", "与澳门特区政府交通事务局提前沟通跨境低空飞行意向"],
        references: ["珠海市低空经济政策条例（2024）", "横琴粤澳深度合作区低空文旅航线奖励政策", "CAAC–澳门CAM双边空域合作框架"]
      }
    },

    /* ZH-02 · 金湾航空城空港枢纽 — O-L 机场枢纽 ★★★ */
    {
      city: "zhuhai", approved: false,
      id: "jinwan-aviation", shortName: "金湾航空城",
      name: "珠海金湾航空城空港低空枢纽", district: "珠海金湾区 · 珠海机场配套区",
      type: "O-L · 开放地面大型", nodeType: "O-L",
      assetClass: "机场配套开放用地", currency: "RMB",
      lat: 22.0071, lng: 113.3763,
      mapPosition: { x: 6, y: 62 },
      tagline: "大湾区西端机场枢纽接驳节点，城市轨道覆盖不足地区eVTOL价值最高，航展期间VIP接驳溢价显著。",
      summary: "珠海机场是GBA西端重要门户，城市公共交通覆盖不足（距市区约45分钟地面）。eVTOL接驳可将机场→市区时间压缩至10分钟，时间价值溢价极高。珠海市级按架次补贴（城际¥300元/架次）为运营期提供持续现金流支持。",
      heroMetrics: { area: "~4,000 sqm 机场配套用地", grid: "机场电力系统直供", access: "珠海机场T1航站楼5分钟", alternate: "横琴节点20km可达，形成西部双节点" },
      scores: { safety: 83, implementation: 80, regulation: 82, operations: 82, network: 85, investment: 80, power: 88, structural: 86, ground: 74, weather: 76, comms: 82 },
      hardGates: [
        { name: "机场净空区协调", status: "warning", note: "机场附近需与民航局空中交通管理局协调eVTOL飞行区隔离，是所有节点中净空协调最复杂的类型。" },
        { name: "珠海市级补贴资格", status: "pass", note: "机场配套用地符合珠海市'交通枢纽'类起降设施优先布设场景，50%建设补贴路径明确。" },
        { name: "航展期间特殊安保协调", status: "warning", note: "珠海航展（两年一次）期间需配合空军航展安全管控，该期间可能需暂停商业飞行。" }
      ],
      evidence: [
        "珠海市政策：交通枢纽类eVTOL起降场实际固定资产投入50%，≤¥500万，运营满1年申请。",
        "珠海市城际eVTOL架次奖励¥300元/架次，金湾→珠海市区/中山路线符合申报。",
        "珠海机场扩建方案（T2航站楼）已含低空配套设施预留，为建设创造有利条件。"
      ],
      risks: [
        { title: "民航净空区限制", level: "High", text: "机场净空区eVTOL飞行高度受严格限制，需单独申请隔离运行程序，批复周期长达18-24个月。" },
        { title: "航展期间运营中断", level: "Medium", text: "珠海国际航展期间（约2周）全面限制飞行，对年度收入有2-3%的影响。" }
      ],
      plans: {
        lean:     { label: "Lean",     capex: 13, opex: 2.2, throughput: 30, turnaround: 13, feasibility: 76, power: 1.0, modules: ["evtol_fato","ev_charger","wind_mast","terminal"] },
        standard: { label: "Standard", capex: 28, opex: 4.8, throughput: 60, turnaround: 10, feasibility: 82, power: 2.0, modules: ["evtol_fato","evtol_stand","ev_charger","wind_mast","terminal"] },
        enhanced: { label: "Enhanced", capex: 48, opex: 8.2, throughput: 96, turnaround: 8,  feasibility: 86, power: 3.2, modules: ["evtol_fato","evtol_stand","uav_pad","ev_charger","uav_charger","wind_mast","terminal"] }
      },
      routes: [
        { id: "jinwan-zhuhai-city", name: "金湾机场–珠海市区接驳", destination: "珠海香洲/拱北", distanceKm: 28, flightMin: 9, reservePct: 18, alternates: ["横琴粤澳"], chargingMin: 12, loadFactor: 0.72 },
        { id: "jinwan-zhongshan", name: "金湾–中山商务城际", destination: "中山市区/南区", distanceKm: 35, flightMin: 11, reservePct: 18, alternates: ["横琴粤澳"], chargingMin: 14, loadFactor: 0.60 }
      ],
      finance: { revenueIndex: 1.10, permitReadiness: 0.74, deliveryMonths: 18 },
      subsidies: { buildingGrant: 500, routeBonus: 0, ongoingPerFlight: 300, note: "珠海建设50%≤¥500万＋城际架次¥300元/架次" },
      recommendedConfig: {
        plan: "standard", evtolPads: 2, uavPads: 0, typeLabel: "开放地面大型 — 机场枢纽接驳",
        rationale: "Standard方案（2×FATO）：机场接驳是eVTOL最高价值、最易商业化的场景，日60次吞吐量，按机场旅客渗透率3%估算即可实现约¥1,800万年收入。建议作为横琴商业化验证后的第二期珠海节点（约2027年）推进。",
        keyConstraints: ["机场净空隔离程序需民航局专项审批，是最长审批周期节点"],
        immediateActions: ["向珠海机场管理集团提出低空枢纽合作意向", "向民航空管局申请机场净空区eVTOL隔离程序预审", "向珠海金湾区申请'交通枢纽'类补贴资格"],
        references: ["珠海市低空经济政策条例（2024）", "民航局机场净空区eVTOL运行规范（征求意见稿）", "珠海机场T2扩建低空配套预留方案"]
      }
    },

    /* ZH-03 · 万山群岛海岛旅游节点 — F-S1 已开通 ★★★ */
    {
      city: "zhuhai", approved: true,
      id: "wanshan-islands", shortName: "万山群岛",
      name: "珠海万山群岛离岛低空节点", district: "珠海万山区 · 万山岛",
      type: "F-S1 · 离岛平台微型", nodeType: "F-S1",
      assetClass: "海岛礁石平台新建", currency: "RMB",
      lat: 21.9583, lng: 114.2583,
      mapPosition: { x: 60, y: 66 },
      tagline: "全国首条无人驾驶载人eVTOL观光航线已在万山区开通，海岛旅游＋离岛医疗急救双场景，珠海市级架次补贴持续兑付。",
      summary: "EH216-S（5架）已在珠海万山区开通全国首条无人驾驶载人航空器观光航线。万山群岛距珠海主岛20-55km，现有船运需2-3小时，eVTOL可压缩至15-30分钟。医疗急救价值极高——离岛居民就医时间将大幅缩短。珠海市级按架次补贴（观光¥100元/架次）持续兑付。",
      heroMetrics: { area: "~900 sqm 海岛平台", grid: "海岛离网储能系统", access: "珠海九洲港快艇45分钟（eVTOL后直达15分钟）", alternate: "金湾机场在50km半径内备降" },
      scores: { safety: 79, implementation: 72, regulation: 80, operations: 84, network: 78, investment: 82, power: 34, structural: 62, ground: 22, weather: 58, comms: 40 },
      hardGates: [
        { name: "EH216-S运营合格证延伸", status: "pass", note: "广州已获EH216-S全球首个eVTOL运营合格证，万山区观光航线已开通，监管路径已有成例。" },
        { name: "离岛施工条件", status: "warning", note: "海岛建材运输附加成本约30-40%，平台地基需抗台风设计（17级标准），施工周期较长。" },
        { name: "海岛离网供电方案", status: "warning", note: "主岛电网未延伸至万山岛，需配置储能+光伏系统，初期CAPEX增加约¥250万。" }
      ],
      evidence: [
        "EH216-S（5架）已在珠海万山区开通全国首条无人驾驶载人航空器观光航线（2024年启动），直接验证了该航线的商业可行性。",
        "珠海市级：观光eVTOL¥100元/架次，市内交通¥200元/架次，城际¥300元/架次，企业年度上限¥500万。",
        "珠海市政策明确：海岛为eVTOL基础设施优先布设场景，离岛医疗应急接入为政府采购优先项目。"
      ],
      risks: [
        { title: "离岛施工成本溢价", level: "Medium", text: "海岛建设物料全靠水运，施工成本较主岛高30-40%，是所有节点中建设成本增幅最大的因素。" },
        { title: "台风季运营中断", level: "Medium", text: "6-9月台风季平均影响15-20天，需配套航班取消保险和旅客改签机制。" },
        { title: "海岛旅游竞争", level: "Low", text: "大屿山、长洲岛等本地海岛旅游竞争，差异化需靠eVTOL本身的体验属性定价。" }
      ],
      plans: {
        lean:     { label: "Lean",     capex: 4,  opex: 0.7, throughput: 12, turnaround: 18, feasibility: 72, power: 0.3, modules: ["evtol_fato","ev_charger","wind_mast"] },
        standard: { label: "Standard", capex: 8,  opex: 1.4, throughput: 22, turnaround: 14, feasibility: 78, power: 0.6, modules: ["evtol_fato","uav_pad","ev_charger","wind_mast"] },
        enhanced: { label: "Enhanced", capex: 14, opex: 2.3, throughput: 36, turnaround: 11, feasibility: 82, power: 1.2, modules: ["evtol_fato","evtol_stand","uav_pad","ev_charger","wind_mast","terminal"] }
      },
      routes: [
        { id: "wanshan-tourism", name: "万山岛–珠海市区旅游快线", destination: "珠海九洲港/情侣路", distanceKm: 28, flightMin: 11, reservePct: 18, alternates: ["金湾航空城"], chargingMin: 13, loadFactor: 0.75 },
        { id: "wanshan-medical", name: "万山离岛医疗急救专线", destination: "珠海人民医院", distanceKm: 32, flightMin: 12, reservePct: 20, alternates: ["金湾航空城"], chargingMin: 14, loadFactor: 0.30 }
      ],
      finance: { revenueIndex: 1.14, permitReadiness: 0.84, deliveryMonths: 14 },
      subsidies: { buildingGrant: 500, routeBonus: 0, ongoingPerFlight: 100, note: "珠海建设50%≤¥500万＋观光¥100元/架次＋医疗政府采购合同" },
      recommendedConfig: {
        plan: "standard", evtolPads: 1, uavPads: 1, typeLabel: "离岛平台微型 — 旅游＋医疗急救",
        rationale: "Standard方案（1×FATO＋1×UAV Pad）：建设补贴¥500万覆盖约28%建设成本（Standard¥18M），旅游高峰季（5-9月）日22次吞吐量，票价¥400-600/人，旺季月收入约¥660万。政府医疗采购合同提供淡季基础现金流约¥90万/年。",
        keyConstraints: ["离网储能系统设计需满足台风17级标准", "EH216-S型号选择需与珠海既有运营资质对接"],
        immediateActions: ["向珠海万山区政府申请离岛低空节点建设补贴（¥500万）", "与亿航智能（EH216-S运营商）洽谈万山岛运营合作协议", "向珠海卫健委申请离岛医疗急救eVTOL采购合同"],
        references: ["珠海市低空经济政策条例（2024）", "亿航智能万山区观光航线运营资质（2024）", "EH216-S全球首个eVTOL运营合格证（广州/珠海）"]
      }
    }

  ],

  investmentScenarios: {
    base: {
      label: "Base Case",
      demand: 1,
      capex: 1,
      opex: 1,
      risk: 1
    },
    growth: {
      label: "Growth Case",
      demand: 1.18,
      capex: 0.96,
      opex: 0.97,
      risk: 0.94
    },
    cautious: {
      label: "Conservative Case",
      demand: 0.86,
      capex: 1.08,
      opex: 1.07,
      risk: 1.12
    }
  },

  personas: [
    {
      name: "Operator",
      weights: {
        safety: 0.19, implementation: 0.09, regulation: 0.12,
        operations: 0.18, network: 0.14, investment: 0.06,
        power: 0.05, structural: 0.03, ground: 0.05, weather: 0.05, comms: 0.04
      }
    },
    {
      name: "Asset Owner",
      weights: {
        safety: 0.14, implementation: 0.19, regulation: 0.12,
        operations: 0.11, network: 0.07, investment: 0.17,
        power: 0.06, structural: 0.07, ground: 0.03, weather: 0.02, comms: 0.02
      }
    },
    {
      name: "Government",
      weights: {
        safety: 0.20, implementation: 0.13, regulation: 0.17,
        operations: 0.09, network: 0.12, investment: 0.09,
        power: 0.04, structural: 0.03, ground: 0.06, weather: 0.03, comms: 0.04
      }
    },
    {
      name: "Investor",
      weights: {
        safety: 0.13, implementation: 0.15, regulation: 0.11,
        operations: 0.11, network: 0.08, investment: 0.24,
        power: 0.04, structural: 0.04, ground: 0.04, weather: 0.04, comms: 0.02
      }
    }
  ]
};
