(function () {
  const data = window.vertiportData;
  const firstSite = data.sites[0];
  const pageFlow = [
    { key: "overview", label: "Project Overview" },
    { key: "map", label: "Site Screening" },
    { key: "detail", label: "Site Detail" },
    { key: "configurator", label: "Configurator" },
    { key: "simulation", label: "Route Simulation" },
    { key: "decision", label: "Investment Decision" }
  ];

  const state = {
    selectedSiteId: getQueryValue("site") || firstSite.id,
    selectedPlan: getQueryValue("plan") || "standard",
    selectedScenario: getQueryValue("scenario") || "base",
    selectedPersona: getQueryValue("persona") || "Investor",
    selectedRouteId: getQueryValue("route"),
    selectedCity: getQueryValue("city") || "hong-kong",
    selectedModules: new Set(),
    fleetCount: Number(getQueryValue("fleet")) || 4,
    turnaroundMinutes: Number(getQueryValue("turnaround")) || 14,
    weatherMode: getQueryValue("weather") || "normal",
    evtolPads: Math.min(4, Math.max(1, Number(getQueryValue("evtol")) || 2)),
    uavPads: Math.min(6, Math.max(0, Number(getQueryValue("uav")) || 2))
  };

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    if (!getSiteById(state.selectedSiteId)) {
      state.selectedSiteId = firstSite.id;
    }
    state.selectedRouteId = resolveRouteId(state.selectedRouteId, getSelectedSite());
    syncModuleSelection();
    setYear();
    setActiveNav();
    hydrateContextNavigation();
    syncUrl();
    renderJourneyRail();
    renderPageNavigator();

    const page = document.body.dataset.page;
    const handlers = {
      overview: initOverviewPage,
      map: initMapPage,
      detail: initDetailPage,
      configurator: initConfiguratorPage,
      simulation: initSimulationPage,
      decision: initDecisionPage
    };

    if (handlers[page]) handlers[page]();
  }

  /* ─────────────────────────────────────────────────────────────
     PAGE INITIALISERS
  ───────────────────────────────────────────────────────────── */

  function initOverviewPage() {
    renderCities();
    renderRecentAnalyses();
    renderWorkflow();
    renderScoringDimensions();
    renderOverviewHighlights();
  }

  function initMapPage() {
    renderSiteChooser("mapSiteList", true, handleSiteChange);
    renderPlanTabs("mapPlanTabs", handlePlanChange);
    renderMapMarkers();
    renderMapDetail();
    renderMapLegend();
    initMapLibre();
  }

  function initDetailPage() {
    renderSiteChooser("detailSiteTabs", false, handleSiteChange);
    renderDetailHero();
    renderInitialConfig();
    renderScoreBars("detailScoreBars");
    renderHardGates();
    renderEvidence();
    renderRisks();
    renderOperationsReadiness();
  }

  function initConfiguratorPage() {
    renderSiteChooser("configSiteTabs", false, handleSiteChange);
    renderPlanTabs("configPlanTabs", handlePlanChange);
    bindPadControls();
    renderConfiguratorModules();
    renderConfiguratorSummary();
    renderFloorPlan();
  }

  function initSimulationPage() {
    renderSiteChooser("simSiteTabs", false, handleSiteChange);
    renderPlanTabs("simPlanTabs", handlePlanChange);
    bindSimulationControls();
    renderSimulationRoutes();
    renderSimulationSummary();
    renderSimulationNetworkMap();
  }

  function initDecisionPage() {
    renderDecisionCityTabs();
    renderPlanTabs("decisionPlanTabs", handlePlanChange);
    renderScenarioTabs();
    renderPersonaTabs();
    renderDecisionBoard();
  }

  function renderDecisionCityTabs() {
    const host = document.getElementById("decisionCityTabs");
    if (!host) return;
    const cities = [
      { key:"hong-kong", label:"🇭🇰 Hong Kong" },
      { key:"shenzhen",  label:"🏙 Shenzhen" },
      { key:"guangzhou-zhuhai", label:"🌊 GZ · Zhuhai" }
    ];
    host.innerHTML = cities.map(function (c) {
      const active = c.key === state.selectedCity;
      return "<button class='tab-btn" + (active ? " active" : "") + "' data-city='" + c.key + "'>" + c.label + "</button>";
    }).join("");
    host.querySelectorAll("[data-city]").forEach(function (b) {
      b.addEventListener("click", function () {
        state.selectedCity = b.dataset.city;
        /* pick first site in new city as selected */
        const citySites = data.sites.filter(function (s) { return cityMatchApp(s, state.selectedCity); });
        if (citySites.length > 0) state.selectedSiteId = citySites[0].id;
        syncUrl();
        renderDecisionCityTabs();
        renderDecisionBoard();
      });
    });
  }

  /* ─────────────────────────────────────────────────────────────
     MAPLIBRE GL JS INTEGRATION
  ───────────────────────────────────────────────────────────── */

  function initMapLibre() {
    const mapContainer = document.getElementById("mapLibreContainer");
    if (!mapContainer || typeof maplibregl === "undefined") return;

    const map = new maplibregl.Map({
      container: "mapLibreContainer",
      style: "https://tiles.openfreemap.org/styles/bright",
      center: [114.17, 22.315],
      zoom: 12,
      pitch: 45,
      bearing: -10
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");

    map.on("load", function () {
      // Add 3D building extrusion layer
      if (map.getLayer("building")) {
        map.setPaintProperty("building", "fill-extrusion-height", [
          "interpolate", ["linear"], ["zoom"],
          10, 0,
          14, ["get", "height"]
        ]);
      }

      // Add airspace constraint circles
      data.sites.forEach(function (site) {
        const sourceId = "airspace-" + site.id;
        map.addSource(sourceId, {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [site.lng, site.lat]
            }
          }
        });
        map.addLayer({
          id: "circle-" + site.id,
          type: "circle",
          source: sourceId,
          paint: {
            "circle-radius": ["interpolate", ["linear"], ["zoom"], 10, 18, 14, 55],
            "circle-color": site.id === state.selectedSiteId
              ? "rgba(16,139,141,0.18)"
              : "rgba(227,196,142,0.12)",
            "circle-stroke-color": site.id === state.selectedSiteId
              ? "rgba(16,139,141,0.7)"
              : "rgba(227,196,142,0.50)",
            "circle-stroke-width": 2
          }
        });
      });

      // Add custom markers for each site
      data.sites.forEach(function (site) {
        const el = document.createElement("div");
        el.className = "map-lib-marker" + (site.id === state.selectedSiteId ? " active" : "");
        const composite = computeCompositeScore(site, getActivePersona().weights);
        el.innerHTML =
          "<span class='mlm-score'>" + composite.toFixed(0) + "</span>" +
          "<span class='mlm-name'>" + site.shortName + "</span>";
        el.addEventListener("click", function () {
          handleSiteChange(site.id);
          map.flyTo({ center: [site.lng, site.lat], zoom: 14, pitch: 55 });
        });
        new maplibregl.Marker({ element: el, anchor: "bottom" })
          .setLngLat([site.lng, site.lat])
          .addTo(map);
      });

      // Fly to selected site
      const sel = getSelectedSite();
      map.flyTo({ center: [sel.lng, sel.lat], zoom: 13, pitch: 50 });
    });

    window._vertiportMap = map;
  }

  /* ─────────────────────────────────────────────────────────────
     HOMEPAGE RENDERS
  ───────────────────────────────────────────────────────────── */

  function renderCities() {
    const host = document.getElementById("cityGrid");
    if (!host) return;
    host.innerHTML = data.cities
      .map(function (city) {
        const actionLabel = city.slug === "hong-kong" ? "Open Hong Kong Demo" : "View Framework";
        return (
          "<article class='city-card'>" +
            "<div class='eyebrow-row'>" +
              "<span class='eyebrow'>City Project</span>" +
              "<span class='status-pill'>" + city.status + "</span>" +
            "</div>" +
            "<h3>" + city.name + "</h3>" +
            "<p>" + city.summary + "</p>" +
            "<div class='stat-line'>" +
              "<span>" + city.coverage + "</span>" +
              "<strong>" + city.recommended + "</strong>" +
            "</div>" +
            "<div class='button-row card-actions'>" +
              "<a class='button button-primary' href='" + buildPageUrl("map", { site: firstSite.id, plan: "standard" }) + "'>" + actionLabel + "</a>" +
              "<a class='button button-secondary' href='" + buildPageUrl("decision", { site: firstSite.id, plan: "standard" }) + "'>Investment Ranking</a>" +
            "</div>" +
          "</article>"
        );
      })
      .join("");
  }

  function renderRecentAnalyses() {
    const host = document.getElementById("recentGrid");
    if (!host) return;
    host.innerHTML = data.recentAnalyses
      .map(function (item) {
        return (
          "<article class='recent-card'>" +
            "<div class='eyebrow-row'>" +
              "<span class='eyebrow'>" + item.city + "</span>" +
              "<span class='status-pill muted'>" + item.status + "</span>" +
            "</div>" +
            "<h3>" + item.title + "</h3>" +
            "<p>" + item.note + "</p>" +
            "<div class='button-row card-actions'>" +
              "<a class='button button-primary' href='" + buildPageUrl("detail", { site: item.siteId, plan: item.plan }) + "'>Open Site Detail</a>" +
              "<a class='button button-secondary' href='" + buildPageUrl("configurator", { site: item.siteId, plan: item.plan }) + "'>Continue Configuration</a>" +
            "</div>" +
          "</article>"
        );
      })
      .join("");
  }

  function renderWorkflow() {
    const host = document.getElementById("workflowGrid");
    if (!host) return;
    host.innerHTML = data.workflow
      .map(function (step, index) {
        return (
          "<article class='workflow-card'>" +
            "<span class='step-index'>0" + (index + 1) + "</span>" +
            "<h3>" + step.title + "</h3>" +
            "<p>" + step.text + "</p>" +
            "<div class='button-row card-actions'>" +
              "<a class='button button-secondary' href='" + buildPageUrl(pageFlow[index].key) + "'>Go to this step</a>" +
            "</div>" +
          "</article>"
        );
      })
      .join("");
  }

  function renderScoringDimensions() {
    const host = document.getElementById("scoringGrid");
    if (!host) return;
    host.innerHTML = data.scoringDimensions
      .map(function (dimension) {
        return (
          "<article class='score-card'>" +
            "<div class='eyebrow-row'>" +
              "<span class='eyebrow'>" + dimension.label + "</span>" +
              "<strong>" + dimension.value + "</strong>" +
            "</div>" +
            "<p>" + dimension.detail + "</p>" +
          "</article>"
        );
      })
      .join("");
  }

  function renderOverviewHighlights() {
    const host = document.getElementById("overviewHighlights");
    if (!host) return;
    const ranked = getRankedSites();
    const top = ranked[0];
    const site = getSiteById(top.siteId);
    host.innerHTML =
      "<article class='highlight-card'>" +
        "<div class='eyebrow-row'>" +
          "<span class='eyebrow'>Current Top Recommendation</span>" +
          "<span class='status-pill'>No. 1</span>" +
        "</div>" +
        "<h3>" + site.name + "</h3>" +
        "<p>" + site.tagline + "</p>" +
        "<div class='highlight-metrics'>" +
          "<div><span>Composite Score</span><strong>" + top.composite.toFixed(1) + "</strong></div>" +
          "<div><span>Recommended Scheme</span><strong>" + site.plans.standard.label + "</strong></div>" +
          "<div><span>Delivery Timeline</span><strong>" + site.finance.deliveryMonths + " months</strong></div>" +
        "</div>" +
        "<div class='button-row card-actions'>" +
          "<a class='button button-primary' href='" + buildPageUrl("detail", { site: site.id, plan: "standard" }) + "'>View Top Site</a>" +
          "<a class='button button-secondary' href='" + buildPageUrl("decision", { site: site.id, plan: "standard" }) + "'>Investment Decision</a>" +
        "</div>" +
      "</article>" +
      "<article class='highlight-card accent'>" +
        "<div class='eyebrow-row'>" +
          "<span class='eyebrow'>Platform Logic</span>" +
          "<span class='status-pill muted'>Decision System</span>" +
        "</div>" +
        "<h3>Screen, Configure, Simulate — Then Decide</h3>" +
        "<p>The homepage links site screening, assessment, module configuration, route validation and investment comparison into a single closed loop — not isolated sub-systems.</p>" +
        "<div class='button-row card-actions'>" +
          "<a class='button button-secondary' href='" + buildPageUrl("map") + "'>Start Site Screening</a>" +
        "</div>" +
      "</article>";
  }

  /* ─────────────────────────────────────────────────────────────
     SHARED COMPONENT RENDERS
  ───────────────────────────────────────────────────────────── */

  function renderSiteChooser(hostId, showScores, onClick) {
    const host = document.getElementById(hostId);
    if (!host) return;
    host.innerHTML = data.sites
      .map(function (site) {
        const isActive = site.id === state.selectedSiteId;
        const composite = computeCompositeScore(site, getActivePersona().weights);
        return (
          "<button class='site-switch " + (isActive ? "active" : "") + "' data-site-id='" + site.id + "'>" +
            "<span class='site-switch-title'>" + site.shortName + "</span>" +
            "<span class='site-switch-sub'>" + site.type + "</span>" +
            (showScores ? "<strong>" + composite.toFixed(1) + "</strong>" : "") +
          "</button>"
        );
      })
      .join("");

    host.querySelectorAll("[data-site-id]").forEach(function (button) {
      button.addEventListener("click", function () { onClick(button.dataset.siteId); });
    });
  }

  function renderPlanTabs(hostId, onClick) {
    const host = document.getElementById(hostId);
    if (!host) return;
    const planOrder = ["lean", "standard", "enhanced"];
    const planDescriptions = {
      lean: "Lean — Early demo, low-frequency",
      standard: "Standard — Stable commercial",
      enhanced: "Enhanced — High-capacity hub"
    };
    host.innerHTML = planOrder
      .map(function (plan) {
        return (
          "<button class='plan-tab " + (plan === state.selectedPlan ? "active" : "") + "' data-plan='" + plan + "'>" +
            planDescriptions[plan] +
          "</button>"
        );
      })
      .join("");

    host.querySelectorAll("[data-plan]").forEach(function (button) {
      button.addEventListener("click", function () { onClick(button.dataset.plan); });
    });
  }

  /* ─────────────────────────────────────────────────────────────
     MAP PAGE
  ───────────────────────────────────────────────────────────── */

  function renderMapMarkers() {
    const host = document.getElementById("mapStage");
    if (!host) return;
    host.innerHTML =
      "<div class='city-surface'>" +
        "<div class='surface-label'>Hong Kong 3D Screening Workspace</div>" +
        "<div class='surface-bands'></div>" +
        "<div class='surface-water'></div>" +
        "<div class='surface-grid'></div>" +
      "</div>" +
      data.sites.map(function (site) {
        const isActive = site.id === state.selectedSiteId;
        const composite = computeCompositeScore(site, getActivePersona().weights);
        const status = getFeasibilityLabel(site.plans[state.selectedPlan].feasibility);
        return (
          "<button class='map-marker " + (isActive ? "active" : "") + "' style='left:" + site.mapPosition.x + "%; top:" + site.mapPosition.y + "%;' data-marker='" + site.id + "'>" +
            "<span class='mm-score'>" + composite.toFixed(0) + "</span>" +
            "<span class='mm-name'>" + site.shortName + "</span>" +
            "<span class='mm-status'>" + status + "</span>" +
          "</button>"
        );
      }).join("");

    host.querySelectorAll("[data-marker]").forEach(function (marker) {
      marker.addEventListener("click", function () { handleSiteChange(marker.dataset.marker); });
    });
  }

  function renderMapDetail() {
    const host = document.getElementById("mapDetail");
    if (!host) return;
    const site = getSelectedSite();
    const plan = site.plans[state.selectedPlan];
    const composite = computeCompositeScore(site, getActivePersona().weights);
    host.innerHTML =
      "<div class='panel-header'>" +
        "<div>" +
          "<span class='eyebrow'>" + site.district + " · " + site.type + "</span>" +
          "<h2>" + site.name + "</h2>" +
        "</div>" +
        "<div class='big-score'>" + composite.toFixed(1) + "</div>" +
      "</div>" +
      "<p class='panel-lead'>" + site.summary + "</p>" +
      "<div class='metric-grid compact'>" +
        "<div class='metric-card'><span>Recommended Scheme</span><strong>" + plan.label + "</strong></div>" +
        "<div class='metric-card'><span>Throughput</span><strong>" + plan.throughput + " pax/h</strong></div>" +
        "<div class='metric-card'><span>CAPEX</span><strong>HK$ " + plan.capex.toFixed(1) + "M</strong></div>" +
        "<div class='metric-card'><span>Feasibility Status</span><strong>" + getFeasibilityLabel(plan.feasibility) + "</strong></div>" +
        "<div class='metric-card'><span>Delivery</span><strong>" + site.finance.deliveryMonths + " months</strong></div>" +
        "<div class='metric-card'><span>Permit Readiness</span><strong>" + Math.round(site.finance.permitReadiness * 100) + "%</strong></div>" +
      "</div>" +
      "<div class='score-stack'>" + renderScoreRows(tierAdjustedScores(site)) + "</div>" +
      "<div class='gate-grid'>" +
        site.hardGates.map(function (gate) {
          return (
            "<article class='gate-card " + gate.status + "'>" +
              "<div class='eyebrow-row'>" +
                "<span class='eyebrow'>" + gate.name + "</span>" +
                "<span class='status-pill " + gate.status + "'>" + getGateLabel(gate.status) + "</span>" +
              "</div>" +
              "<p>" + gate.note + "</p>" +
            "</article>"
          );
        }).join("") +
      "</div>" +
      "<div class='cta-row'>" +
        "<a class='button button-primary' href='" + buildPageUrl("detail", { site: site.id }) + "'>Site Detail</a>" +
        "<a class='button button-secondary' href='" + buildPageUrl("configurator", { site: site.id }) + "'>Configurator</a>" +
        "<a class='button button-secondary' href='" + buildPageUrl("simulation", { site: site.id, route: site.routes[0].id }) + "'>Route Simulation</a>" +
        "<a class='button button-secondary' href='" + buildPageUrl("decision", { site: site.id }) + "'>Investment Board</a>" +
      "</div>";
  }

  function renderMapLegend() {
    const host = document.getElementById("mapLegend");
    if (!host) return;
    host.innerHTML =
      "<div class='legend-chip'><span class='dot water'></span> Waterfront approach corridor</div>" +
      "<div class='legend-chip'><span class='dot zone'></span> Obstacle-constrained zone</div>" +
      "<div class='legend-chip'><span class='dot active'></span> Selected candidate</div>" +
      "<div class='legend-chip'><span class='dot metro'></span> Major intermodal node</div>" +
      "<div class='legend-chip'><span class='dot wind'></span> Wind / turbulence advisory</div>";
  }

  /* ─────────────────────────────────────────────────────────────
     SITE DETAIL PAGE
  ───────────────────────────────────────────────────────────── */

  function renderDetailHero() {
    const host = document.getElementById("detailHero");
    if (!host) return;
    const site = getSelectedSite();
    const plan = site.plans[state.selectedPlan];
    host.innerHTML =
      "<div class='panel-header'>" +
        "<div>" +
          "<span class='eyebrow'>" + site.district + " · " + site.assetClass + "</span>" +
          "<h1>" + site.name + "</h1>" +
        "</div>" +
        "<span class='status-pill strong'>" + plan.label + " · " + getFeasibilityLabel(plan.feasibility) + "</span>" +
      "</div>" +
      "<p class='panel-lead'>" + site.tagline + "</p>" +
      "<div class='metric-grid'>" +
        Object.entries(site.heroMetrics).map(function (entry) {
          return (
            "<div class='metric-card'>" +
              "<span>" + heroMetricLabel(entry[0]) + "</span>" +
              "<strong>" + entry[1] + "</strong>" +
            "</div>"
          );
        }).join("") +
      "</div>" +
      "<div class='plan-compare-row'>" +
        ["lean", "standard", "enhanced"].map(function (planKey) {
          const p = site.plans[planKey];
          const isActive = planKey === state.selectedPlan;
          return (
            "<div class='plan-compare-cell " + (isActive ? "active" : "") + "'>" +
              "<strong>" + p.label + "</strong>" +
              "<div><span>CAPEX</span><em>HK$ " + p.capex.toFixed(1) + "M</em></div>" +
              "<div><span>Throughput</span><em>" + p.throughput + " pax/h</em></div>" +
              "<div><span>Turnaround</span><em>" + p.turnaround + " min</em></div>" +
              "<div><span>Feasibility</span><em>" + getFeasibilityLabel(p.feasibility) + "</em></div>" +
            "</div>"
          );
        }).join("") +
      "</div>" +
      "<div class='cta-row'>" +
        "<a class='button button-primary' href='" + buildPageUrl("configurator", { site: site.id }) + "'>Open Configurator</a>" +
        "<a class='button button-secondary' href='" + buildPageUrl("simulation", { site: site.id, route: site.routes[0].id }) + "'>Validate Routes</a>" +
        "<a class='button button-secondary' href='" + buildPageUrl("map") + "'>Back to Map</a>" +
      "</div>";
  }

  function renderInitialConfig() {
    var host = document.getElementById("detailInitialConfig");
    if (!host) return;
    var site = getSelectedSite();
    var cfg = site.recommendedConfig;
    if (!cfg) { host.innerHTML = ""; return; }

    var recPlan = site.plans[cfg.plan];
    var padCapex = cfg.evtolPads * 2.8 + cfg.evtolPads * 0.8 + cfg.uavPads * 0.45;
    var totalCapex = recPlan.capex + padCapex;

    // Build pad icons (circles for eVTOL, hexagons for UAV)
    var padVis = "";
    for (var ep = 0; ep < cfg.evtolPads; ep++) {
      padVis += "<div class='initcfg-pad evtol'><span>V" + (ep + 1) + "</span></div>";
    }
    for (var up = 0; up < cfg.uavPads; up++) {
      padVis += "<div class='initcfg-pad uav'><span>U" + (up + 1) + "</span></div>";
    }

    host.innerHTML =
      "<div class='initcfg-banner'>" +
        "<div class='initcfg-banner-left'>" +
          "<span class='eyebrow'>Recommended Starting Configuration · " + cfg.typeLabel + "</span>" +
          "<h2 style='margin-top:6px;font-size:20px'>Initial Vertiport Layout Reference</h2>" +
          "<p class='panel-lead'>" + cfg.rationale + "</p>" +
        "</div>" +
        "<span class='status-pill strong initcfg-tier-pill'>" + recPlan.label + " Tier</span>" +
      "</div>" +

      "<div class='initcfg-body'>" +

        // Pad visualisation
        "<div class='initcfg-pad-zone'>" +
          "<div class='eyebrow' style='margin-bottom:12px'>Pad Layout</div>" +
          "<div class='initcfg-pads'>" + padVis + "</div>" +
          "<div class='initcfg-pad-legend'>" +
            "<span><i class='legend-dot evtol-dot'></i>eVTOL FATO (" + cfg.evtolPads + " pads)</span>" +
            (cfg.uavPads > 0 ? "<span><i class='legend-dot uav-dot'></i>UAV Pad (" + cfg.uavPads + " pads)</span>" : "") +
          "</div>" +
        "</div>" +

        // Metrics
        "<div class='initcfg-metrics'>" +
          "<div class='eyebrow' style='margin-bottom:12px'>Configuration Metrics</div>" +
          "<div class='metric-grid compact'>" +
            "<div class='metric-card'><span>Recommended Tier</span><strong>" + recPlan.label + "</strong></div>" +
            "<div class='metric-card'><span>eVTOL FATO Pads</span><strong>" + cfg.evtolPads + "</strong></div>" +
            "<div class='metric-card'><span>UAV Pads</span><strong>" + (cfg.uavPads || "—") + "</strong></div>" +
            "<div class='metric-card'><span>Module CAPEX</span><strong>HK$ " + recPlan.capex.toFixed(1) + "M</strong></div>" +
            "<div class='metric-card'><span>Pad Infra. CAPEX</span><strong>HK$ " + padCapex.toFixed(2) + "M</strong></div>" +
            "<div class='metric-card capex-total'><span>Total Est. CAPEX</span><strong>HK$ " + totalCapex.toFixed(1) + "M</strong></div>" +
            "<div class='metric-card'><span>Throughput</span><strong>" + recPlan.throughput + " pax/h</strong></div>" +
            "<div class='metric-card'><span>Delivery</span><strong>" + site.finance.deliveryMonths + " months</strong></div>" +
          "</div>" +
        "</div>" +

      "</div>" +

      // Constraints
      "<div class='initcfg-section'>" +
        "<div class='eyebrow initcfg-section-title'>Site-Specific Constraints</div>" +
        "<div class='initcfg-list constraints'>" +
          cfg.keyConstraints.map(function (c) {
            return "<div class='initcfg-list-item'><span class='initcfg-icon warn'>⚠</span><span>" + c + "</span></div>";
          }).join("") +
        "</div>" +
      "</div>" +

      // Actions
      "<div class='initcfg-section'>" +
        "<div class='eyebrow initcfg-section-title'>Recommended Immediate Actions</div>" +
        "<div class='initcfg-list actions'>" +
          cfg.immediateActions.map(function (a, i) {
            return "<div class='initcfg-list-item'><span class='initcfg-icon num'>" + (i + 1) + "</span><span>" + a + "</span></div>";
          }).join("") +
        "</div>" +
      "</div>" +

      // References
      "<div class='initcfg-refs'>" +
        cfg.references.map(function (r) {
          return "<span class='initcfg-ref-chip'>" + r + "</span>";
        }).join("") +
      "</div>" +

      // CTA row — prominently launch configurator with correct pad counts
      "<div class='cta-row' style='margin-top:20px'>" +
        "<a class='button button-primary button-lg' href='" +
          buildPageUrl("configurator", { site: site.id, plan: cfg.plan, evtol: cfg.evtolPads, uav: cfg.uavPads }) +
        "'>Customise This Configuration →</a>" +
        "<a class='button button-secondary' href='" +
          buildPageUrl("simulation", { site: site.id, route: site.routes[0].id }) +
        "'>Route Simulation</a>" +
        "<a class='button button-secondary' href='" +
          buildPageUrl("decision", { site: site.id }) +
        "'>Investment Board</a>" +
      "</div>";
  }

  function renderScoreBars(hostId) {
    const host = document.getElementById(hostId);
    if (!host) return;
    host.innerHTML = renderScoreRows(tierAdjustedScores(getSelectedSite()));
  }

  function renderHardGates() {
    const host = document.getElementById("detailHardGates");
    if (!host) return;
    host.innerHTML = getSelectedSite().hardGates
      .map(function (gate) {
        return (
          "<article class='gate-card " + gate.status + "'>" +
            "<div class='eyebrow-row'>" +
              "<span class='eyebrow'>" + gate.name + "</span>" +
              "<span class='status-pill " + gate.status + "'>" + getGateLabel(gate.status) + "</span>" +
            "</div>" +
            "<p>" + gate.note + "</p>" +
          "</article>"
        );
      })
      .join("");
  }

  function renderEvidence() {
    const host = document.getElementById("detailEvidence");
    if (!host) return;
    host.innerHTML = getSelectedSite().evidence
      .map(function (text) {
        return (
          "<article class='evidence-card'>" +
            "<span class='eyebrow'>Literature Reference</span>" +
            "<p>" + text + "</p>" +
          "</article>"
        );
      })
      .join("");
  }

  function renderRisks() {
    const host = document.getElementById("detailRisks");
    if (!host) return;
    host.innerHTML = getSelectedSite().risks
      .map(function (risk) {
        return (
          "<article class='risk-card'>" +
            "<div class='eyebrow-row'>" +
              "<span class='eyebrow'>" + risk.title + "</span>" +
              "<span class='status-pill " + riskLevelClass(risk.level) + "'>" + risk.level + "</span>" +
            "</div>" +
            "<p>" + risk.text + "</p>" +
          "</article>"
        );
      })
      .join("");
  }

  function renderOperationsReadiness() {
    const host = document.getElementById("detailOperations");
    if (!host) return;
    const site = getSelectedSite();
    const plan = site.plans[state.selectedPlan];
    host.innerHTML =
      "<article class='info-card'>" +
        "<span class='eyebrow'>Implementation Recommendation</span>" +
        "<h3>Start with " + plan.label + ", scale to the next tier on demand</h3>" +
        "<p>The current recommendation is to enter at the " + plan.label + " tier with a " + site.finance.deliveryMonths + "-month delivery target, establish operational proof-of-concept, then upgrade based on load factor and schedule reliability data.</p>" +
        "<div class='readiness-grid'>" +
          "<div class='readiness-item'><span>Permit Readiness</span><strong>" + Math.round(site.finance.permitReadiness * 100) + "%</strong></div>" +
          "<div class='readiness-item'><span>Revenue Index</span><strong>" + site.finance.revenueIndex.toFixed(2) + "×</strong></div>" +
          "<div class='readiness-item'><span>Delivery Timeline</span><strong>" + site.finance.deliveryMonths + " months</strong></div>" +
        "</div>" +
        "<div class='button-row card-actions'>" +
          "<a class='button button-primary' href='" + buildPageUrl("configurator", { site: site.id }) + "'>Open Configurator</a>" +
        "</div>" +
      "</article>" +
      "<article class='info-card accent'>" +
        "<span class='eyebrow'>Next Actions</span>" +
        "<h3>Key uncertainties to resolve before advancing</h3>" +
        "<p>The primary risk is <strong>" + site.risks[0].title + "</strong>. The recommended next step is to enter the configurator, adjust energy, fire, sensor and RMSS modules, then validate the leading route in the simulation page.</p>" +
        "<div class='button-row card-actions'>" +
          "<a class='button button-secondary' href='" + buildPageUrl("simulation", { site: site.id, route: site.routes[0].id }) + "'>Route Simulation</a>" +
          "<a class='button button-secondary' href='" + buildPageUrl("decision", { site: site.id }) + "'>Investment Board</a>" +
        "</div>" +
      "</article>";
  }

  /* ─────────────────────────────────────────────────────────────
     CONFIGURATOR PAGE
  ───────────────────────────────────────────────────────────── */

  function renderConfiguratorModules() {
    const host = document.getElementById("moduleGrid");
    if (!host) return;
    const planModules = getSelectedSite().plans[state.selectedPlan].modules;
    const categoryLabels = {
      flight: "Flight Ops",
      energy: "Energy",
      passenger: "Passenger & Cargo",
      safety: "Safety & Environment",
      digital: "Digital & Operations"
    };
    host.innerHTML = Object.entries(data.modules)
      .map(function (entry) {
        const id = entry[0];
        const module = entry[1];
        const isSelected = state.selectedModules.has(id);
        const recommended = planModules.includes(id);
        return (
          "<article class='module-card " + (isSelected ? "selected" : "") + "'>" +
            "<div class='eyebrow-row'>" +
              "<span class='eyebrow cat-" + module.category + "'>" + (categoryLabels[module.category] || module.category) + "</span>" +
              "<span class='status-pill " + (recommended ? "pass" : "muted") + "'>" + (recommended ? "Recommended" : "Optional") + "</span>" +
            "</div>" +
            "<h3>" + module.name + "</h3>" +
            "<p>" + module.description + "</p>" +
            "<div class='module-meta'>" +
              "<span>CAPEX ±HK$ " + module.capex + "K</span>" +
              "<span>Throughput ±" + module.throughput + " pax/h</span>" +
              "<span>Power " + (module.power > 0 ? module.power + " kW" : "—") + "</span>" +
            "</div>" +
            "<button class='button button-secondary module-toggle' data-module='" + id + "'>" +
              (isSelected ? "Remove Module" : "Add Module") +
            "</button>" +
          "</article>"
        );
      })
      .join("");

    host.querySelectorAll("[data-module]").forEach(function (button) {
      button.addEventListener("click", function () {
        const id = button.dataset.module;
        if (state.selectedModules.has(id)) state.selectedModules.delete(id);
        else state.selectedModules.add(id);
        syncUrl();
        renderConfiguratorModules();
        renderConfiguratorSummary();
        renderFloorPlan();
      });
    });
  }

  function renderConfiguratorSummary() {
    var site = getSelectedSite();
    var basePlan = site.plans[state.selectedPlan];
    var calculated = computeConfiguredPlan(site, state.selectedPlan, state.selectedModules);
    var summaryHost = document.getElementById("configSummary");
    if (!summaryHost) return;

    var padCapex    = state.evtolPads * 2.8 + state.evtolPads * 0.8 + state.uavPads * 0.45;
    var totalCapex  = calculated.capex + padCapex;
    var warnings    = getModuleDependencyWarnings();
    var turnaround  = Math.max(9, basePlan.turnaround - Math.round((calculated.throughput - basePlan.throughput) / 6));

    summaryHost.innerHTML =
      "<div class='panel-header'>" +
        "<div>" +
          "<span class='eyebrow'>Scheme Summary</span>" +
          "<h2>" + site.shortName + " · " + basePlan.label + "</h2>" +
        "</div>" +
        "<span class='status-pill " + getFeasibilityClass(calculated.feasibility) + "'>" + getFeasibilityLabel(calculated.feasibility) + "</span>" +
      "</div>" +

      "<div class='config-capex-breakdown'>" +
        "<div class='capex-line main'>" +
          "<span>Total CAPEX (modules + pads)</span>" +
          "<strong>HK$ " + totalCapex.toFixed(1) + "M</strong>" +
        "</div>" +
        "<div class='capex-line sub'>" +
          "<span>  Modules &amp; systems</span>" +
          "<span>HK$ " + calculated.capex.toFixed(1) + "M</span>" +
        "</div>" +
        "<div class='capex-line sub'>" +
          "<span>  Pad infrastructure (" + state.evtolPads + " FATO + " + state.evtolPads + " stands" + (state.uavPads > 0 ? " + " + state.uavPads + " UAV" : "") + ")</span>" +
          "<span>HK$ " + padCapex.toFixed(2) + "M</span>" +
        "</div>" +
      "</div>" +

      "<div class='metric-grid compact'>" +
        "<div class='metric-card'><span>OPEX / yr</span><strong>HK$ " + calculated.opex.toFixed(2) + "M</strong></div>" +
        "<div class='metric-card'><span>Throughput</span><strong>" + Math.round(calculated.throughput) + " pax/h</strong></div>" +
        "<div class='metric-card'><span>Turnaround</span><strong>" + turnaround + " min</strong></div>" +
        "<div class='metric-card'><span>Peak Power</span><strong>" + calculated.power.toFixed(1) + " MW</strong></div>" +
        "<div class='metric-card'><span>eVTOL Pads</span><strong>" + state.evtolPads + " FATO</strong></div>" +
        "<div class='metric-card'><span>UAV Pads</span><strong>" + state.uavPads + "</strong></div>" +
      "</div>" +

      (warnings.length
        ? "<div class='dependency-warnings'>" +
            warnings.map(function (w) {
              return "<div class='dep-warn'><span class='dep-icon'>⚡</span>" + w + "</div>";
            }).join("") +
          "</div>"
        : "") +

      "<div class='insight-band'>" +
        "<p>Once fast charging, ESS and cooling are added, layout constraints shift from pad count to power routing, fire separation and equipment access — per FAA EB 105A §4.5 and EASA PTS-VPT-DSN §6.3.</p>" +
      "</div>" +

      "<div class='cta-row'>" +
        "<a class='button button-primary' href='" + buildPageUrl("simulation", { site: site.id, route: site.routes[0].id }) + "'>Validate Route Operability</a>" +
        "<a class='button button-secondary' href='" + buildPageUrl("detail", { site: site.id }) + "'>Site Detail</a>" +
        "<a class='button button-secondary' href='" + buildPageUrl("decision", { site: site.id }) + "'>Investment Board</a>" +
      "</div>";
  }

  function renderFloorPlan() {
    var boardHost = document.getElementById("layoutBoard");
    if (!boardHost) return;

    var site = getSelectedSite();
    var basePlan = site.plans[state.selectedPlan];
    var sel = state.selectedModules;
    var evtolCount = state.evtolPads;
    var uavCount = state.uavPads;

    // ── SVG Helpers ──────────────────────────────────────────────
    function zoneRect(x, y, w, h, fill, stroke, active) {
      var dash = active ? "" : "stroke-dasharray='5,3'";
      var op = active ? "1" : "0.38";
      return "<rect x='" + x + "' y='" + y + "' width='" + w + "' height='" + h + "' rx='10' fill='" + fill + "' stroke='" + stroke + "' stroke-width='1.5' " + dash + " opacity='" + op + "'/>";
    }
    function zoneLabel(x, y, text, color, active) {
      return "<text x='" + x + "' y='" + y + "' font-family='system-ui,sans-serif' font-size='9.5' font-weight='700' letter-spacing='0.1em' fill='" + color + "' opacity='" + (active ? "1" : "0.55") + "'>" + text.toUpperCase() + "</text>";
    }
    function emptyHint(cx, cy, color) {
      return "<text x='" + cx + "' y='" + cy + "' font-family='system-ui,sans-serif' font-size='9.5' fill='" + color + "' text-anchor='middle' opacity='0.72'>Add module to activate zone</text>";
    }
    function equip(x, y, w, h, fill, stroke, label, sub) {
      // 浅黄底 + 深色字,左侧保留分区色条以区分类别
      return "<rect x='" + x + "' y='" + y + "' width='" + w + "' height='" + h + "' rx='4' fill='#E8D2A6' stroke='" + stroke + "' stroke-width='1'/>" +
        "<rect x='" + x + "' y='" + y + "' width='4' height='" + h + "' rx='2' fill='" + stroke + "'/>" +
        "<text x='" + (x + w / 2 + 2) + "' y='" + (y + h / 2 - 3) + "' font-family='system-ui,sans-serif' font-size='9.5' font-weight='700' fill='#171310' text-anchor='middle'>" + label + "</text>" +
        (sub ? "<text x='" + (x + w / 2 + 2) + "' y='" + (y + h / 2 + 9) + "' font-family='system-ui,sans-serif' font-size='8' fill='#4A3E2E' text-anchor='middle'>" + sub + "</text>" : "");
    }
    function evtolPad(cx, cy, num) {
      return (
        "<circle cx='" + cx + "' cy='" + cy + "' r='52' fill='rgba(217,184,124,0.10)' stroke='#D9B87C' stroke-width='1' stroke-dasharray='4,3'/>" +
        "<circle cx='" + cx + "' cy='" + cy + "' r='36' fill='#E8D2A6' stroke='#F0D5A0' stroke-width='2'/>" +
        "<line x1='" + (cx - 13) + "' y1='" + (cy - 11) + "' x2='" + (cx - 13) + "' y2='" + (cy + 11) + "' stroke='#171310' stroke-width='3.2' stroke-linecap='round'/>" +
        "<line x1='" + (cx + 13) + "' y1='" + (cy - 11) + "' x2='" + (cx + 13) + "' y2='" + (cy + 11) + "' stroke='#171310' stroke-width='3.2' stroke-linecap='round'/>" +
        "<line x1='" + (cx - 13) + "' y1='" + cy + "' x2='" + (cx + 13) + "' y2='" + cy + "' stroke='#171310' stroke-width='3.2' stroke-linecap='round'/>" +
        "<text x='" + cx + "' y='" + (cy + 50) + "' font-family='system-ui,sans-serif' font-size='8.5' font-weight='700' fill='#F0D5A0' text-anchor='middle'>FATO-" + num + "</text>"
      );
    }
    function standRect(cx, y, active) {
      if (!active) return "<rect x='" + (cx - 25) + "' y='" + y + "' width='50' height='16' rx='4' fill='rgba(255,255,255,0.06)' stroke='rgba(255,255,255,0.28)' stroke-width='1' stroke-dasharray='3,2'/>";
      return "<rect x='" + (cx - 25) + "' y='" + y + "' width='50' height='16' rx='3' fill='#E8D2A6' stroke='#D9B87C' stroke-width='1'/>" +
        "<text x='" + cx + "' y='" + (y + 11.5) + "' font-family='system-ui,sans-serif' font-size='7.5' font-weight='700' fill='#171310' text-anchor='middle'>STAND</text>";
    }
    function hexPad(cx, cy, r, num) {
      var outer = [], inner = [];
      for (var i = 0; i < 6; i++) {
        var a = (60 * i - 30) * Math.PI / 180;
        outer.push((cx + r * Math.cos(a)).toFixed(1) + "," + (cy + r * Math.sin(a)).toFixed(1));
        inner.push((cx + r * 0.55 * Math.cos(a)).toFixed(1) + "," + (cy + r * 0.55 * Math.sin(a)).toFixed(1));
      }
      return "<polygon points='" + outer.join(" ") + "' fill='#B6E7D6' stroke='#6FD3B4' stroke-width='1.5'/>" +
        "<polygon points='" + inner.join(" ") + "' fill='rgba(23,19,16,0.10)' stroke='rgba(23,19,16,0.35)' stroke-width='1' stroke-dasharray='3,2'/>" +
        "<text x='" + cx + "' y='" + (cy + 3.5) + "' font-family='system-ui,sans-serif' font-size='8.5' font-weight='700' fill='#12211D' text-anchor='middle'>U" + num + "</text>";
    }

    // ── Layout constants ────────────────────────────────────────
    var W = 800, H = 510;
    var FZ_H = 210;                          // Flight zone height
    var MID_Y = FZ_H + 8, MID_H = 152;      // Middle row
    var BOT_Y = MID_Y + MID_H + 8, BOT_H = 126; // Bottom row
    var UAV_W = 248, PASS_X = 256, PASS_W = 292, EN_X = 556, EN_W = 244;
    var SAF_W = 396, DIG_X = 404, DIG_W = 396;

    // eVTOL pad X centres
    var padXMap = { 1: [400], 2: [222, 578], 3: [160, 400, 640], 4: [122, 308, 492, 678] };
    var padXs = padXMap[evtolCount] || padXMap[2];
    var padCY = 92, txY = 157, standY = 168;

    // UAV pad grid centres (2-column, up to 3 rows)
    var uavCols = [62, 155];
    var uavRows = [MID_Y + 38, MID_Y + 82, MID_Y + 126];
    var uavPositions = [];
    for (var ri = 0; ri < 3; ri++) for (var ci = 0; ci < 2; ci++) uavPositions.push([uavCols[ci], uavRows[ri]]);

    // Active module flags
    var hasFato     = sel.has("fato_tlof");
    var hasStands   = sel.has("stands");
    var hasPass     = sel.has("passenger_lounge");
    var hasCargo    = sel.has("cargo_bay");
    var hasFastChg  = sel.has("fast_charge");
    var hasOverChg  = sel.has("overnight_charge");
    var hasESS      = sel.has("ess_backup");
    var hasCooling  = sel.has("cooling_loop");
    var hasFire     = sel.has("fire_system");
    var hasWeather  = sel.has("weather_sensor");
    var hasRMSS     = sel.has("rmss");
    var hasSA       = sel.has("situational_awareness");

    var energyActive = hasFastChg || hasOverChg || hasESS || hasCooling;
    var passActive   = hasPass || hasCargo;
    var safetyActive = hasFire || hasWeather;
    var digActive    = hasRMSS || hasSA;

    // ── Build SVG ────────────────────────────────────────────────
    var svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 " + W + " " + H + "' width='100%' style='display:block;max-height:530px;'>";

    // ── ZONE 1: FLIGHT OPERATIONS (full-width, top) ──────────────
    svg += zoneRect(0, 0, W, FZ_H, "rgba(217,184,124,0.12)", "#D9B87C", true);
    svg += zoneLabel(12, 16, "Flight Operations", "#D9B87C", true);

    // North arrow
    svg += "<g transform='translate(782,16)'>" +
      "<line x1='0' y1='11' x2='0' y2='0' stroke='#A6B0AC' stroke-width='1.5' stroke-linecap='round'/>" +
      "<polygon points='0,-2 -3,5 3,5' fill='#A6B0AC'/>" +
      "<text x='0' y='21' font-family='system-ui,sans-serif' font-size='8.5' fill='#A6B0AC' text-anchor='middle' font-weight='700'>N</text>" +
      "</g>";

    // eVTOL FATO pads
    padXs.forEach(function (cx, i) { svg += evtolPad(cx, padCY, i + 1); });

    // Taxiway line
    var txLeft = padXs[0] - 55, txRight = padXs[padXs.length - 1] + 55;
    svg += "<line x1='" + txLeft + "' y1='" + txY + "' x2='" + txRight + "' y2='" + txY + "' stroke='#D9B87C' stroke-width='1.5' stroke-dasharray='8,4' opacity='0.55'/>";
    svg += "<text x='" + ((txLeft + txRight) / 2) + "' y='" + (txY - 4) + "' font-family='system-ui,sans-serif' font-size='7.5' fill='#E3C48E' text-anchor='middle' opacity='0.75'>TAXIWAY / APRON LANE</text>";

    // Aircraft stands
    padXs.forEach(function (cx) { svg += standRect(cx, standY, hasStands); });

    // ── ZONE 2: UAV DECK (middle-left) ───────────────────────────
    var uavZoneActive = uavCount > 0;
    svg += zoneRect(0, MID_Y, UAV_W, MID_H, "rgba(111,211,180,0.12)", "#6FD3B4", uavZoneActive);
    svg += zoneLabel(12, MID_Y + 14, "UAV Deck", "#6FD3B4", uavZoneActive);
    if (uavCount > 0) {
      for (var pi = 0; pi < uavCount && pi < 6; pi++) {
        svg += hexPad(uavPositions[pi][0], uavPositions[pi][1], 22, pi + 1);
      }
    } else {
      svg += emptyHint(124, MID_Y + 78, "#6FD3B4");
    }

    // ── ZONE 3: PASSENGER & CARGO (middle-centre) ────────────────
    svg += zoneRect(PASS_X, MID_Y, PASS_W, MID_H, "rgba(167,155,240,0.11)", "#A79BF0", passActive);
    svg += zoneLabel(PASS_X + 12, MID_Y + 14, "Passenger & Cargo", "#A79BF0", passActive);
    if (hasPass)  svg += equip(PASS_X + 12,  MID_Y + 30, 130, 58, "rgba(167,155,240,0.22)", "#A79BF0", "Passenger Lounge", "Pax Processing");
    if (hasCargo) svg += equip(PASS_X + 152, MID_Y + 30, 128, 58, "rgba(167,155,240,0.18)", "#A79BF0", "Cargo Bay",        "UAV Logistics");
    if (!passActive) svg += emptyHint(PASS_X + PASS_W / 2, MID_Y + 82, "#A79BF0");

    // ── ZONE 4: ENERGY SYSTEMS (middle-right) ───────────────────
    svg += zoneRect(EN_X, MID_Y, EN_W, MID_H, "rgba(227,196,142,0.10)", "#E3C48E", energyActive);
    svg += zoneLabel(EN_X + 12, MID_Y + 14, "Energy Systems", "#E3C48E", energyActive);
    if (hasFastChg) svg += equip(EN_X + 10,  MID_Y + 30, 106, 50, "rgba(227,196,142,0.23)", "#E3C48E", "Fast Charging",  "DC 350 kW");
    if (hasOverChg) svg += equip(EN_X + 124, MID_Y + 30, 110, 50, "rgba(227,196,142,0.17)", "#E3C48E", "Overnight Chg",  "AC Slow");
    if (hasESS)     svg += equip(EN_X + 10,  MID_Y + 88, 106, 50, "rgba(227,196,142,0.23)", "#E3C48E", "ESS Backup",     "Grid Buffer");
    if (hasCooling) svg += equip(EN_X + 124, MID_Y + 88, 110, 50, "rgba(227,196,142,0.17)", "#E3C48E", "Cooling Loop",   "Thermal Mgmt");
    if (!energyActive) svg += emptyHint(EN_X + EN_W / 2, MID_Y + 82, "#E3C48E");

    // ── ZONE 5: SAFETY & ENVIRONMENT (bottom-left) ───────────────
    svg += zoneRect(0, BOT_Y, SAF_W, BOT_H, "rgba(228,116,108,0.10)", "#E4746C", safetyActive);
    svg += zoneLabel(12, BOT_Y + 14, "Safety & Environment", "#E4746C", safetyActive);
    if (hasFire)    svg += equip(12,  BOT_Y + 28, 178, 54, "rgba(228,116,108,0.21)", "#E4746C", "Fire & Egress System", "Battery Suppression");
    if (hasWeather) svg += equip(198, BOT_Y + 28, 190, 54, "rgba(228,116,108,0.16)", "#E4746C", "Weather Sensor Array", "Wind / Visibility");
    if (!safetyActive) svg += emptyHint(SAF_W / 2, BOT_Y + 66, "#E4746C");

    // ── ZONE 6: DIGITAL & CONTROL (bottom-right) ────────────────
    svg += zoneRect(DIG_X, BOT_Y, DIG_W, BOT_H, "rgba(111,211,180,0.10)", "#6FD3B4", digActive);
    svg += zoneLabel(DIG_X + 12, BOT_Y + 14, "Digital & Control", "#6FD3B4", digActive);
    if (hasRMSS) svg += equip(DIG_X + 10,  BOT_Y + 28, 180, 54, "rgba(111,211,180,0.21)", "#6FD3B4", "RMSS Scheduler",     "Dispatch / Reserve");
    if (hasSA)   svg += equip(DIG_X + 198, BOT_Y + 28, 190, 54, "rgba(111,211,180,0.16)", "#6FD3B4", "VAS / Sit. Awareness","Ops Picture");
    if (!digActive) svg += emptyHint(DIG_X + DIG_W / 2, BOT_Y + 66, "#6FD3B4");

    // ── CONNECTOR: stand → passenger terminal ───────────────────
    if (hasPass && evtolCount > 0) {
      var nearX = padXs.reduce(function (p, c) { return Math.abs(c - (PASS_X + 77)) < Math.abs(p - (PASS_X + 77)) ? c : p; });
      svg += "<path d='M" + nearX + " " + (standY + 16) + " L" + nearX + " " + MID_Y + " L" + (PASS_X + 77) + " " + (MID_Y + 30) + "' fill='none' stroke='#A79BF0' stroke-width='1' stroke-dasharray='4,3' opacity='0.3'/>";
    }

    svg += "</svg>";

    var padCapex = (evtolCount * 2.8 + evtolCount * 0.8 + uavCount * 0.45).toFixed(2);
    boardHost.innerHTML = svg +
      "<div class='layout-caption'>" +
        "<strong>" + evtolCount + " eVTOL FATO</strong> @ HK$2.8M ea. &nbsp;·&nbsp; " +
        "<strong>" + evtolCount + " Aircraft Stands</strong> @ HK$0.8M ea." +
        (uavCount > 0 ? " &nbsp;·&nbsp; <strong>" + uavCount + " UAV Pads</strong> @ HK$0.45M ea." : "") +
        " &nbsp;·&nbsp; Pad subtotal: <strong>HK$" + padCapex + "M</strong>" +
        "<br>Layout reference: FAA EB 105A §4.3 · EASA PTS-VPT-DSN §5.2 · ConOps AAM §3.1" +
      "</div>";
  }

  function bindPadControls() {
    var host = document.getElementById("padAssembly");
    if (!host) return;

    function render() {
      var evtolCapex = (state.evtolPads * 2.8).toFixed(1);
      var uavCapex   = (state.uavPads * 0.45).toFixed(2);
      host.innerHTML =
        "<div class='pad-selector-row'>" +

          "<div class='pad-selector-card'>" +
            "<div class='pad-type-icon pad-icon-evtol'></div>" +
            "<label>eVTOL FATO / TLOF Pads</label>" +
            "<div class='pad-stepper'>" +
              "<button class='pad-btn' id='evtolDec' " + (state.evtolPads <= 1 ? "disabled" : "") + ">−</button>" +
              "<span class='pad-count-display'>" + state.evtolPads + "</span>" +
              "<button class='pad-btn' id='evtolInc' " + (state.evtolPads >= 4 ? "disabled" : "") + ">+</button>" +
            "</div>" +
            "<div class='pad-price-band'>" +
              "<strong>HK$ " + evtolCapex + "M</strong>" +
              "<span>HK$2.8M per pad (TLOF surface, safety area,</span>" +
              "<span>drainage, edge lighting, obstacle marking)</span>" +
              "<span class='pad-range-hint'>1 – 4 pads · FAA EB 105A Table 4-1</span>" +
            "</div>" +
          "</div>" +

          "<div class='pad-selector-card'>" +
            "<div class='pad-type-icon pad-icon-uav'></div>" +
            "<label>UAV / Drone Landing Pads</label>" +
            "<div class='pad-stepper'>" +
              "<button class='pad-btn' id='uavDec' " + (state.uavPads <= 0 ? "disabled" : "") + ">−</button>" +
              "<span class='pad-count-display'>" + state.uavPads + "</span>" +
              "<button class='pad-btn' id='uavInc' " + (state.uavPads >= 6 ? "disabled" : "") + ">+</button>" +
            "</div>" +
            "<div class='pad-price-band'>" +
              "<strong>HK$ " + uavCapex + "M</strong>" +
              "<span>HK$0.45M per pad (dock, charging rail,</span>" +
              "<span>weather seal, landing sensors)</span>" +
              "<span class='pad-range-hint'>0 – 6 pads · ConOps AAM §3.2</span>" +
            "</div>" +
          "</div>" +

        "</div>";

      function wire(id, action, type) {
        var btn = document.getElementById(id);
        if (!btn) return;
        btn.addEventListener("click", function () {
          if (type === "evtol") {
            state.evtolPads = Math.min(4, Math.max(1, state.evtolPads + action));
          } else {
            state.uavPads = Math.min(6, Math.max(0, state.uavPads + action));
          }
          syncUrl();
          render();
          renderFloorPlan();
          renderConfiguratorSummary();
        });
      }
      wire("evtolDec", -1, "evtol");
      wire("evtolInc",  1, "evtol");
      wire("uavDec",   -1, "uav");
      wire("uavInc",    1, "uav");
    }
    render();
  }

  function getModuleDependencyWarnings() {
    const warnings = [];
    const selected = state.selectedModules;
    if (selected.has("fast_charge") && !selected.has("cooling_loop")) {
      warnings.push("Fast charging selected without Battery Cooling Loop — fire separation risk elevated.");
    }
    if (selected.has("fast_charge") && !selected.has("ess_backup")) {
      warnings.push("Fast charging without ESS Backup Power — peak demand and grid resilience unmitigated.");
    }
    if (selected.has("situational_awareness") && !selected.has("rmss")) {
      warnings.push("VAS / SA platform works best paired with RMSS Resource Scheduler.");
    }
    return warnings;
  }

  /* ─────────────────────────────────────────────────────────────
     SIMULATION PAGE
  ───────────────────────────────────────────────────────────── */

  function bindSimulationControls() {
    const fleet = document.getElementById("fleetCount");
    const turnaround = document.getElementById("turnaroundMinutes");
    const weather = document.getElementById("weatherMode");
    const fleetValue = document.getElementById("fleetValue");
    const turnaroundValue = document.getElementById("turnaroundValue");
    if (!fleet || !turnaround || !weather) return;

    fleet.value = String(state.fleetCount);
    turnaround.value = String(state.turnaroundMinutes);
    weather.value = state.weatherMode;
    fleetValue.textContent = state.fleetCount + " aircraft";
    turnaroundValue.textContent = state.turnaroundMinutes + " min";

    fleet.addEventListener("input", function () {
      state.fleetCount = Number(fleet.value);
      fleetValue.textContent = state.fleetCount + " aircraft";
      syncUrl();
      renderSimulationSummary();
    });

    turnaround.addEventListener("input", function () {
      state.turnaroundMinutes = Number(turnaround.value);
      turnaroundValue.textContent = state.turnaroundMinutes + " min";
      syncUrl();
      renderSimulationSummary();
    });

    weather.addEventListener("change", function () {
      state.weatherMode = weather.value;
      syncUrl();
      renderSimulationSummary();
    });
  }

  function renderSimulationRoutes() {
    const host = document.getElementById("routeCards");
    if (!host) return;
    const site = getSelectedSite();
    host.innerHTML = site.routes
      .map(function (route) {
        const isActive = route.id === state.selectedRouteId;
        return (
          "<button class='route-card " + (isActive ? "active" : "") + "' data-route-id='" + route.id + "'>" +
            "<span class='eyebrow'>" + route.name + "</span>" +
            "<strong>" + route.destination + "</strong>" +
            "<div class='route-stats'>" +
              "<span>" + route.distanceKm + " km</span>" +
              "<span>" + route.flightMin + " min flight</span>" +
              "<span>Load " + Math.round(route.loadFactor * 100) + "%</span>" +
            "</div>" +
            "<div class='route-alternates'>Alternates: " + route.alternates.join(", ") + "</div>" +
          "</button>"
        );
      })
      .join("");

    host.querySelectorAll("[data-route-id]").forEach(function (button) {
      button.addEventListener("click", function () {
        state.selectedRouteId = button.dataset.routeId;
        syncUrl();
        renderSimulationRoutes();
        renderSimulationSummary();
        renderSimulationNetworkMap();
      });
    });
  }

  function renderSimulationSummary() {
    const site = getSelectedSite();
    const route = site.routes.find(function (item) { return item.id === state.selectedRouteId; }) || site.routes[0];
    const plan = site.plans[state.selectedPlan];
    const weatherPenalty = { clear: 0, normal: 4, constrained: 9 }[state.weatherMode] || 4;
    const chargeMinutes = route.chargingMin + Math.max(0, weatherPenalty - 1);
    const cycleMinutes = route.flightMin * 2 + state.turnaroundMinutes + chargeMinutes + weatherPenalty;
    const dailyCyclesPerAircraft = Math.max(2, Math.floor(720 / cycleMinutes));
    const dailyPassengerCapacity = Math.round(dailyCyclesPerAircraft * state.fleetCount * 3 * route.loadFactor);
    const reserveMargin = Math.max(9, 100 - route.reservePct - weatherPenalty - Math.max(0, 16 - state.turnaroundMinutes));
    const resilience = Math.min(96, Math.round(plan.feasibility + route.alternates.length * 4 - weatherPenalty * 1.5 + state.fleetCount * 1.2));
    const chargerOccupancy = Math.min(98, Math.round((chargeMinutes / cycleMinutes) * 100));
    const padOccupancy = Math.min(95, Math.round((state.turnaroundMinutes / cycleMinutes) * 100 * state.fleetCount / 2));
    let operationalStatus, statusClass;
    if (reserveMargin >= 16 && resilience >= 80) {
      operationalStatus = "Stable Operations";
      statusClass = "pass";
    } else if (reserveMargin >= 12) {
      operationalStatus = "Operable with Constraints";
      statusClass = "warning";
    } else {
      operationalStatus = "Requires Additional Alternates";
      statusClass = "fail";
    }

    const summary = document.getElementById("simulationSummary");
    const timeline = document.getElementById("simulationTimeline");

    if (summary) {
      summary.innerHTML =
        "<div class='panel-header'>" +
          "<div>" +
            "<span class='eyebrow'>Simulation Result — " + route.name + "</span>" +
            "<h2>" + site.shortName + " → " + route.destination + "</h2>" +
          "</div>" +
          "<span class='status-pill " + statusClass + "'>" + operationalStatus + "</span>" +
        "</div>" +
        "<div class='metric-grid compact'>" +
          "<div class='metric-card'><span>Daily Passengers</span><strong>" + dailyPassengerCapacity + "</strong></div>" +
          "<div class='metric-card'><span>Cycles / Aircraft / Day</span><strong>" + dailyCyclesPerAircraft + "</strong></div>" +
          "<div class='metric-card'><span>Energy Reserve</span><strong>" + reserveMargin + "%</strong></div>" +
          "<div class='metric-card'><span>Network Resilience</span><strong>" + resilience + "/100</strong></div>" +
          "<div class='metric-card'><span>Charger Occupancy</span><strong>" + chargerOccupancy + "%</strong></div>" +
          "<div class='metric-card'><span>Stand Occupancy</span><strong>" + padOccupancy + "%</strong></div>" +
        "</div>" +
        "<div class='alternates-band'>" +
          "<span class='eyebrow'>Alternate Sites</span>" +
          route.alternates.map(function (alt) {
            return "<span class='alt-chip'>" + alt + "</span>";
          }).join("") +
        "</div>" +
        "<div class='cta-row'>" +
          "<a class='button button-primary' href='" + buildPageUrl("decision", { site: site.id, route: route.id }) + "'>Carry Parameters to Investment Board</a>" +
          "<a class='button button-secondary' href='" + buildPageUrl("configurator", { site: site.id }) + "'>Back to Configurator</a>" +
        "</div>";
    }

    if (timeline) {
      timeline.innerHTML =
        "<div class='timeline-row'>" +
          "<span>Outbound flight</span>" +
          "<div class='timeline-bar'><span style='width:" + Math.min(100, route.flightMin * 4) + "%'></span></div>" +
          "<strong>" + route.flightMin + " min</strong>" +
        "</div>" +
        "<div class='timeline-row'>" +
          "<span>Turnaround</span>" +
          "<div class='timeline-bar'><span style='width:" + Math.min(100, state.turnaroundMinutes * 3) + "%'></span></div>" +
          "<strong>" + state.turnaroundMinutes + " min</strong>" +
        "</div>" +
        "<div class='timeline-row'>" +
          "<span>Charging window</span>" +
          "<div class='timeline-bar'><span style='width:" + Math.min(100, chargeMinutes * 3) + "%'></span></div>" +
          "<strong>" + chargeMinutes + " min</strong>" +
        "</div>" +
        "<div class='timeline-row'>" +
          "<span>Weather buffer</span>" +
          "<div class='timeline-bar'><span style='width:" + Math.min(100, weatherPenalty * 6 + 12) + "%'></span></div>" +
          "<strong>" + (weatherPenalty + 3) + " min</strong>" +
        "</div>" +
        "<div class='timeline-row'>" +
          "<span>Total cycle</span>" +
          "<div class='timeline-bar'><span style='width:100%'></span></div>" +
          "<strong>" + cycleMinutes + " min</strong>" +
        "</div>";
    }
  }

  function renderSimulationNetworkMap() {
    var host = document.getElementById("simNetworkMap");
    if (!host) return;
    var site = getSelectedSite();
    var route = site.routes.find(function (r) { return r.id === state.selectedRouteId; }) || site.routes[0];

    // Map lat/lng to SVG 310 × 190 coordinate space
    var minLat = 22.265, maxLat = 22.445, minLng = 114.14, maxLng = 114.225;
    var svgW = 310, svgH = 190;
    function toSVG(lat, lng) {
      return {
        x: ((lng - minLng) / (maxLng - minLng)) * svgW + 5,
        y: svgH - ((lat - minLat) / (maxLat - minLat)) * svgH + 5
      };
    }

    // Find destination site by name matching
    function matchSite(nameFragment) {
      return data.sites.find(function (s) {
        return nameFragment.toLowerCase().split(/[\s,]+/).some(function (word) {
          return word.length > 2 && s.shortName.toLowerCase().includes(word);
        });
      });
    }

    var destSite = matchSite(route.destination);
    var originPos = toSVG(site.lat, site.lng);

    // Build SVG
    var svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 200' width='100%' height='200' style='display:block;border-radius:18px;'>";

    // Background gradient
    svg += "<defs>" +
      "<linearGradient id='nmBg' x1='0' y1='0' x2='0' y2='1'>" +
        "<stop offset='0%' stop-color='#101A1C'/>" +
        "<stop offset='42%' stop-color='#0F1719'/>" +
        "<stop offset='100%' stop-color='#0D1416'/>" +
      "</linearGradient></defs>";
    svg += "<rect width='320' height='200' fill='url(#nmBg)'/>";

    // Grid lines (faint geographic ref)
    for (var gx = 0; gx < 5; gx++) {
      var px = gx * 78 + 5;
      svg += "<line x1='" + px + "' y1='0' x2='" + px + "' y2='200' stroke='rgba(255,255,255,0.08)' stroke-width='0.8'/>";
    }
    for (var gy = 0; gy < 4; gy++) {
      var py = gy * 50 + 10;
      svg += "<line x1='0' y1='" + py + "' x2='320' y2='" + py + "' stroke='rgba(255,255,255,0.08)' stroke-width='0.8'/>";
    }

    // Background inter-site mesh (thin grey dashes)
    for (var i = 0; i < data.sites.length; i++) {
      for (var j = i + 1; j < data.sites.length; j++) {
        var a = toSVG(data.sites[i].lat, data.sites[i].lng);
        var b = toSVG(data.sites[j].lat, data.sites[j].lng);
        svg += "<line x1='" + a.x.toFixed(1) + "' y1='" + a.y.toFixed(1) + "' x2='" + b.x.toFixed(1) + "' y2='" + b.y.toFixed(1) + "' stroke='rgba(255,255,255,0.10)' stroke-width='0.9' stroke-dasharray='3,3'/>";
      }
    }

    // Active route arc
    if (destSite) {
      var destPos = toSVG(destSite.lat, destSite.lng);
      var mx = (originPos.x + destPos.x) / 2;
      var my = Math.min(originPos.y, destPos.y) - 28;
      svg += "<path d='M" + originPos.x.toFixed(1) + "," + originPos.y.toFixed(1) + " Q" + mx.toFixed(1) + "," + my.toFixed(1) + " " + destPos.x.toFixed(1) + "," + destPos.y.toFixed(1) + "' fill='none' stroke='#D9B87C' stroke-width='2.5' opacity='0.9'/>";
      // Arrow at destination end
      var dx = destPos.x - mx, dy = destPos.y - my;
      var ang = Math.atan2(dy, dx);
      var ax = destPos.x - Math.cos(ang) * 8, ay = destPos.y - Math.sin(ang) * 8;
      svg += "<polygon points='" + destPos.x.toFixed(1) + "," + destPos.y.toFixed(1) + " " + (ax - Math.sin(ang) * 4).toFixed(1) + "," + (ay + Math.cos(ang) * 4).toFixed(1) + " " + (ax + Math.sin(ang) * 4).toFixed(1) + "," + (ay - Math.cos(ang) * 4).toFixed(1) + "' fill='#D9B87C' opacity='0.9'/>";
    }

    // Alternate site connections (dashed teal)
    route.alternates.forEach(function (altName) {
      var altSite = matchSite(altName);
      if (!altSite || altSite.id === site.id) return;
      var altPos = toSVG(altSite.lat, altSite.lng);
      svg += "<line x1='" + originPos.x.toFixed(1) + "' y1='" + originPos.y.toFixed(1) + "' x2='" + altPos.x.toFixed(1) + "' y2='" + altPos.y.toFixed(1) + "' stroke='rgba(16,100,120,0.45)' stroke-width='1.4' stroke-dasharray='5,4'/>";
    });

    // Site nodes
    data.sites.forEach(function (s) {
      var pos = toSVG(s.lat, s.lng);
      var isOrigin = s.id === site.id;
      var isDest   = destSite && s.id === destSite.id;
      var isAlt    = route.alternates.some(function (a) { return a.toLowerCase().includes(s.shortName.split(" ")[0].toLowerCase()); });

      var fill, stroke, textFill;
      if (isOrigin)     { fill = "#C7A265"; stroke = "rgba(255,255,255,0.6)"; textFill = "#fff"; }
      else if (isDest)  { fill = "#D9B87C"; stroke = "rgba(255,255,255,0.6)"; textFill = "#fff"; }
      else if (isAlt)   { fill = "rgba(255,255,255,0.92)"; stroke = "#C7A265"; textFill = "#C7A265"; }
      else              { fill = "rgba(255,255,255,0.72)"; stroke = "rgba(255,255,255,0.28)"; textFill = "#777"; }

      var label  = s.shortName;
      var rw     = Math.max(44, label.length * 5.6 + 10);
      svg += "<rect x='" + (pos.x - rw / 2).toFixed(1) + "' y='" + (pos.y - 10).toFixed(1) + "' width='" + rw.toFixed(0) + "' height='20' rx='10' fill='" + fill + "' stroke='" + stroke + "' stroke-width='1.2' filter='drop-shadow(0 1px 3px rgba(255,255,255,0.19))'/>";
      svg += "<text x='" + pos.x.toFixed(1) + "' y='" + (pos.y + 4.5).toFixed(1) + "' font-family='system-ui,sans-serif' font-size='9' font-weight='700' fill='" + textFill + "' text-anchor='middle'>" + label + "</text>";
    });

    // Route label over arc
    if (destSite) {
      var dp = toSVG(destSite.lat, destSite.lng);
      var lx = (originPos.x + dp.x) / 2, ly = Math.min(originPos.y, dp.y) - 32;
      svg += "<text x='" + lx.toFixed(1) + "' y='" + ly.toFixed(1) + "' font-family='system-ui,sans-serif' font-size='8' fill='#D9B87C' text-anchor='middle' font-weight='700'>" + route.distanceKm + " km &middot; " + route.flightMin + " min</text>";
    }

    // Legend
    svg += "<rect x='5' y='4' width='8' height='8' rx='4' fill='#C7A265'/><text x='16' y='11.5' font-family='system-ui,sans-serif' font-size='7.5' fill='#555'>Origin</text>";
    svg += "<rect x='55' y='4' width='8' height='8' rx='4' fill='#D9B87C'/><text x='66' y='11.5' font-family='system-ui,sans-serif' font-size='7.5' fill='#555'>Destination</text>";
    svg += "<line x1='120' y1='8' x2='134' y2='8' stroke='rgba(16,100,120,0.6)' stroke-width='1.4' stroke-dasharray='4,3'/><text x='137' y='11.5' font-family='system-ui,sans-serif' font-size='7.5' fill='#555'>Alternate</text>";
    svg += "<text x='315' y='195' font-family='system-ui,sans-serif' font-size='7' fill='#aaa' text-anchor='end'>Hong Kong</text>";

    svg += "</svg>";
    host.innerHTML = svg;
  }

  /* ─────────────────────────────────────────────────────────────
     DECISION PAGE
  ───────────────────────────────────────────────────────────── */

  function renderScenarioTabs() {
    const host = document.getElementById("scenarioTabs");
    if (!host) return;
    host.innerHTML = Object.entries(data.investmentScenarios)
      .map(function (entry) {
        const key = entry[0];
        const scenario = entry[1];
        return (
          "<button class='plan-tab " + (key === state.selectedScenario ? "active" : "") + "' data-scenario='" + key + "'>" +
            scenario.label +
          "</button>"
        );
      })
      .join("");

    host.querySelectorAll("[data-scenario]").forEach(function (button) {
      button.addEventListener("click", function () {
        state.selectedScenario = button.dataset.scenario;
        syncUrl();
        hydrateContextNavigation();
        renderScenarioTabs();
        renderDecisionBoard();
      });
    });
  }

  function renderPersonaTabs() {
    const host = document.getElementById("personaTabs");
    if (!host) return;
    host.innerHTML = data.personas
      .map(function (persona) {
        return (
          "<button class='plan-tab " + (persona.name === state.selectedPersona ? "active" : "") + "' data-persona='" + persona.name + "'>" +
            persona.name +
          "</button>"
        );
      })
      .join("");

    host.querySelectorAll("[data-persona]").forEach(function (button) {
      button.addEventListener("click", function () {
        state.selectedPersona = button.dataset.persona;
        syncUrl();
        hydrateContextNavigation();
        renderPersonaTabs();
        renderDecisionBoard();
      });
    });
  }

  function renderDecisionBoard() {
    const rankingHost = document.getElementById("rankingBoard");
    const compareHost = document.getElementById("decisionTable");
    const summaryHost = document.getElementById("decisionSummary");
    if (!rankingHost || !compareHost || !summaryHost) return;

    const scenario = data.investmentScenarios[state.selectedScenario];
    const ranked = getRankedSites().map(function (entry) {
      const site = getSiteById(entry.siteId);
      const plan = site.plans[state.selectedPlan];
      const annualRevenue = plan.throughput * 0.18 * scenario.demand * site.finance.revenueIndex;
      const annualCash = Math.max(0.55, annualRevenue - plan.opex * scenario.opex * 0.62);
      const capex = plan.capex * scenario.capex;
      const payback = capex / annualCash;
      const irr = Math.round(
        9 + entry.composite / 7 +
        (scenario.demand - 1) * 26 -
        (scenario.capex - 1) * 18 -
        (scenario.risk - 1) * 22
      );
      const priority = Math.round(entry.composite * 0.62 + site.finance.permitReadiness * 24 - payback * 3.4);
      const riskAdj = Math.round((irr - 9) * (scenario.demand / scenario.risk));
      return { site: site, score: entry.composite, capex: capex, annualCash: annualCash, payback: payback, irr: irr, priority: priority, riskAdj: riskAdj };
    });

    rankingHost.innerHTML = ranked
      .slice(0, 3)
      .map(function (item, index) {
        return (
          "<article class='ranking-card " + (index === 0 ? "top" : "") + "'>" +
            "<div class='eyebrow-row'>" +
              "<span class='eyebrow'>Rank #" + (index + 1) + "</span>" +
              "<span class='status-pill'>" + getFeasibilityLabel(item.site.plans[state.selectedPlan].feasibility) + "</span>" +
            "</div>" +
            "<h3>" + item.site.name + "</h3>" +
            "<p>" + item.site.tagline + "</p>" +
            "<div class='ranking-metrics'>" +
              "<div><span>Priority Index</span><strong>" + item.priority + "</strong></div>" +
              "<div><span>Payback</span><strong>" + item.payback.toFixed(1) + " yr</strong></div>" +
              "<div><span>IRR</span><strong>" + item.irr + "%</strong></div>" +
            "</div>" +
            "<div class='button-row card-actions'>" +
              "<a class='button button-primary' href='" + buildPageUrl("detail", { site: item.site.id }) + "'>Site Detail</a>" +
              "<a class='button button-secondary' href='" + buildPageUrl("configurator", { site: item.site.id }) + "'>Configure</a>" +
            "</div>" +
          "</article>"
        );
      })
      .join("");

    compareHost.innerHTML =
      "<thead>" +
        "<tr>" +
          "<th>Site</th>" +
          "<th>Score</th>" +
          "<th>CAPEX</th>" +
          "<th>Annual Cash</th>" +
          "<th>Payback</th>" +
          "<th>IRR</th>" +
          "<th>Risk-Adj.</th>" +
          "<th>Status</th>" +
        "</tr>" +
      "</thead>" +
      "<tbody>" +
        ranked.map(function (item) {
          return (
            "<tr>" +
              "<td><strong>" + item.site.shortName + "</strong>" + (item.site.approved ? " <span style='font-size:9px;color:#E08B62;font-weight:800;'>✓APV</span>" : "") + "</td>" +
              "<td>" + item.score.toFixed(1) + "</td>" +
              "<td>" + siteCur(item.site) + item.capex.toFixed(1) + "M</td>" +
              "<td>" + siteCur(item.site) + item.annualCash.toFixed(2) + "M</td>" +
              "<td>" + item.payback.toFixed(1) + " yr</td>" +
              "<td>" + item.irr + "%</td>" +
              "<td>" + item.riskAdj + "%</td>" +
              "<td><span class='status-pill " + getFeasibilityClass(item.site.plans[state.selectedPlan].feasibility) + "'>" + getFeasibilityLabel(item.site.plans[state.selectedPlan].feasibility) + "</span></td>" +
            "</tr>"
          );
        }).join("") +
      "</tbody>";

    const top = ranked[0];
    summaryHost.innerHTML =
      "<div class='panel-header'>" +
        "<div>" +
          "<span class='eyebrow'>" + state.selectedPersona + " Perspective · " + data.investmentScenarios[state.selectedScenario].label + "</span>" +
          "<h2>Recommended: Advance " + top.site.shortName + " First</h2>" +
        "</div>" +
        "<span class='status-pill strong'>" + top.site.district + "</span>" +
      "</div>" +
      "<p class='panel-lead'>" + top.site.summary + "</p>" +
      "<div class='summary-grid'>" +
        "<div class='summary-cell'><span>Why ranked first</span><strong>Most balanced network value and implementation feasibility under current persona weights</strong></div>" +
        "<div class='summary-cell'><span>Primary risk</span><strong>" + top.site.risks[0].title + " — " + top.site.risks[0].level + " priority</strong></div>" +
        "<div class='summary-cell'><span>Recommended action</span><strong>Enter at " + top.site.plans[state.selectedPlan].label + " tier; retain Enhanced upgrade interface</strong></div>" +
      "</div>" +
      "<div class='sensitivity-row'>" +
        "<div class='sens-cell'><span>Optimistic demand (+18%)</span><strong>Payback " + (top.payback * 0.84).toFixed(1) + " yr</strong></div>" +
        "<div class='sens-cell'><span>Base case</span><strong>Payback " + top.payback.toFixed(1) + " yr</strong></div>" +
        "<div class='sens-cell'><span>Conservative (−14%)</span><strong>Payback " + (top.payback * 1.19).toFixed(1) + " yr</strong></div>" +
      "</div>" +
      "<div class='cta-row'>" +
        "<a class='button button-primary' href='" + buildPageUrl("detail", { site: top.site.id }) + "'>Open Recommended Site</a>" +
        "<a class='button button-secondary' href='" + buildPageUrl("simulation", { site: top.site.id, route: top.site.routes[0].id }) + "'>Validate Route Operability</a>" +
        "<a class='button button-secondary' href='" + buildPageUrl("configurator", { site: top.site.id }) + "'>Configure Scheme</a>" +
        "<button class='button button-primary' id='generateReportBtn' style='background:var(--aqua-deep);border-color:var(--aqua-deep);'>⬡ Generate Investment Report</button>" +
      "</div>";

    /* Wire report button */
    const reportBtn = document.getElementById("generateReportBtn");
    if (reportBtn) {
      reportBtn.addEventListener("click", function () { openReportModal(ranked); });
    }
  }

  /* ─────────────────────────────────────────────────────────────
     INVESTMENT REPORT MODAL
  ───────────────────────────────────────────────────────────── */
  function openReportModal(ranked) {
    const backdrop = document.getElementById("reportBackdrop");
    const body     = document.getElementById("reportBody");
    if (!backdrop || !body) return;

    const scenario   = data.investmentScenarios[state.selectedScenario];
    const personaObj = getActivePersona();
    const top        = ranked[0];
    const planKey    = state.selectedPlan;
    const today      = new Date().toLocaleDateString("en-GB", { day:"numeric", month:"long", year:"numeric" });

    /* ── Sub-title ── */
    const sub = document.getElementById("reportModalSub");
    if (sub) sub.textContent = scenario.label + " Scenario · " + personaObj.label + " Perspective · " + today;

    /* Scoring dimension colours */
    const dimColours = ["#D9B87C","#7FA8E8","#E3C48E","#A79BF0","#E08B62","#6FD3B4"];

    /* ── Build HTML ── */
    let html = "";

    /* 1 — Executive summary KPIs */
    html += "<section>";
    html += "<h3 class='report-section-title'>Executive Summary</h3>";
    html += "<p style='font-size:13px;color:var(--ink-soft);line-height:1.65;margin:0 0 16px;'>" +
      "Under the <strong>" + scenario.label + "</strong> scenario and <strong>" + personaObj.label + "</strong> investment perspective, " +
      "<strong>" + top.site.shortName + "</strong> ranks first across all five Hong Kong candidates with a composite score of " +
      "<strong>" + top.score.toFixed(1) + " / 100</strong>. " +
      "The recommended entry scheme is the <strong>" + top.site.plans[planKey].label + "</strong> tier, delivering " +
      top.site.plans[planKey].throughput + " movements/day at indicative IRR of <strong>" + top.irr + "%</strong>. " +
      top.site.summary +
    "</p>";
    html += "<div class='report-exec-grid'>";
    html += kpi("Top-Ranked Site", top.site.shortName, top.site.type);
    html += kpi("Composite Score", top.score.toFixed(1) + " / 100", personaObj.label + " weights");
    html += kpi("Indicative IRR", top.irr + "%", scenario.label + " scenario");
    html += kpi("CAPEX (adj.)", siteCur(top.site) + top.capex.toFixed(1) + "M", planKey + " tier");
    html += kpi("Payback Period", top.payback.toFixed(1) + " yr", "base cash flow");
    html += kpi("Daily Throughput", top.site.plans[planKey].throughput + " mvts/day", top.site.plans[planKey].turnaround + " min turnaround");
    html += "</div>";
    html += "</section>";

    /* 2 — Site ranking with score bars */
    html += "<section>";
    html += "<h3 class='report-section-title'>Priority Ranking — All Candidates</h3>";
    const rankClasses = ["gold","silver","bronze","",""];
    ranked.forEach(function (item, i) {
      const pl = item.site.plans[planKey];
      html += "<div class='report-site-row'>";
      html += "<div class='report-site-rank " + (rankClasses[i] || "") + "'>" + (i+1) + "</div>";
      html += "<div class='report-site-info'>";
      html += "<div class='report-site-name'>" + item.site.name + "</div>";
      html += "<div class='report-site-type'>" + item.site.type + " · " + item.site.district + "</div>";
      html += "<div class='report-score-bar-wrap'><div class='report-score-bar' style='width:" + item.score + "%'></div></div>";
      html += "<div class='report-score-label'>Score " + item.score.toFixed(1) + " · " + getFeasibilityLabel(pl.feasibility) + "</div>";
      html += "</div>";
      html += "<div class='report-site-metrics'>";
      html += siteMet("CAPEX", siteCur(item.site) + item.capex.toFixed(1) + "M");
      html += siteMet("IRR", item.irr + "%");
      html += siteMet("Payback", item.payback.toFixed(1) + " yr");
      html += siteMet("Throughput", pl.throughput + "/d");
      html += "</div>";
      html += "</div>";
    });
    html += "</section>";

    /* 3 — Scoring dimensions for top site */
    html += "<section>";
    html += "<h3 class='report-section-title'>Scoring Dimensions — " + top.site.shortName + "</h3>";
    const dims = [
      { label:"Safety & Airspace",        key:"safety" },
      { label:"Implementation Feasibility",key:"implementation" },
      { label:"Regulatory Readiness",      key:"regulation" },
      { label:"Operational Fit",           key:"operations" },
      { label:"Connectivity & Network",    key:"network" },
      { label:"Investment Attractiveness", key:"investment" }
    ];
    html += "<div class='report-dim-grid'>";
    dims.forEach(function (d, i) {
      const v = top.site.scores[d.key] || 0;
      html += "<div class='report-dim-item'>";
      html += "<div class='report-dim-label'><span>" + d.label + "</span><strong>" + v + "</strong></div>";
      html += "<div class='report-dim-bar-wrap'><div class='report-dim-bar' style='width:" + v + "%;background:" + dimColours[i] + ";'></div></div>";
      html += "</div>";
    });
    html += "</div>";
    html += "</section>";

    /* 4 — CAPEX / OPEX tier comparison */
    html += "<section>";
    html += "<h3 class='report-section-title'>Scheme Tier Comparison — " + top.site.shortName + "</h3>";
    html += "<table class='report-table'><thead><tr><th>Tier</th><th>CAPEX (adj.)</th><th>OPEX/yr (adj.)</th><th>Throughput</th><th>Turnaround</th><th>Power</th><th>Feasibility</th></tr></thead><tbody>";
    ["lean","standard","enhanced"].forEach(function (tk) {
      const pl = top.site.plans[tk];
      if (!pl) return;
      const capAdj = (pl.capex * scenario.capex).toFixed(1);
      const opAdj  = (pl.opex  * scenario.opex ).toFixed(2);
      const active = tk === planKey;
      html += "<tr" + (active ? " style='background:rgba(217,184,124,0.08);font-weight:700;'" : "") + ">";
      html += "<td><strong>" + pl.label + "</strong>" + (active ? " ★" : "") + "</td>";
      html += "<td>" + siteCur(top.site) + capAdj + "M</td>";
      html += "<td>" + siteCur(top.site) + opAdj + "M</td>";
      html += "<td>" + pl.throughput + " mvts/d</td>";
      html += "<td>" + pl.turnaround + " min</td>";
      html += "<td>" + pl.power + " MW</td>";
      html += "<td>" + pl.feasibility + "%</td>";
      html += "</tr>";
    });
    html += "</tbody></table>";
    html += "</section>";

    /* 5 — Route analysis */
    if (top.site.routes && top.site.routes.length) {
      html += "<section>";
      html += "<h3 class='report-section-title'>Route Analysis — " + top.site.shortName + "</h3>";
      html += "<table class='report-table'><thead><tr><th>Route</th><th>Destination</th><th>Distance</th><th>Flight</th><th>Charging</th><th>Load Factor</th><th>Reserve</th></tr></thead><tbody>";
      top.site.routes.forEach(function (rt) {
        html += "<tr>";
        html += "<td><strong>" + rt.name + "</strong></td>";
        html += "<td>" + rt.destination + "</td>";
        html += "<td>" + rt.distanceKm + " km</td>";
        html += "<td>" + rt.flightMin + " min</td>";
        html += "<td>" + rt.chargingMin + " min</td>";
        html += "<td>" + Math.round(rt.loadFactor * 100) + "%</td>";
        html += "<td>" + rt.reservePct + "%</td>";
        html += "</tr>";
      });
      html += "</tbody></table>";
      if (top.site.routes[0].alternates && top.site.routes[0].alternates.length) {
        html += "<p style='font-size:11px;color:var(--ink-soft);margin:8px 0 0;'>Alternates: " + top.site.routes[0].alternates.join(" · ") + "</p>";
      }
      html += "</section>";
    }

    /* 6 — Risk matrix */
    html += "<section>";
    html += "<h3 class='report-section-title'>Risk Matrix — " + top.site.shortName + "</h3>";
    html += "<table class='report-table'><thead><tr><th>Risk</th><th>Level</th><th>Detail</th></tr></thead><tbody>";
    top.site.risks.forEach(function (rk) {
      const cls = rk.level.toLowerCase();
      html += "<tr><td><strong>" + rk.title + "</strong></td>";
      html += "<td><span class='risk-badge " + cls + "'>" + rk.level + "</span></td>";
      html += "<td>" + rk.text + "</td></tr>";
    });
    html += "</tbody></table>";
    html += "</section>";

    /* 7 — Sensitivity */
    html += "<section>";
    html += "<h3 class='report-section-title'>Payback Sensitivity — " + top.site.shortName + "</h3>";
    html += "<div class='report-exec-grid'>";
    html += kpi("Optimistic (+18% demand)", (top.payback * 0.84).toFixed(1) + " yr", "IRR +" + Math.round(top.irr * 0.18) + "% uplift");
    html += kpi("Base Case", top.payback.toFixed(1) + " yr", scenario.label + " scenario");
    html += kpi("Conservative (−14% demand)", (top.payback * 1.19).toFixed(1) + " yr", "IRR −" + Math.round(top.irr * 0.12) + "% haircut");
    html += "</div>";
    html += "</section>";

    /* 8 — Recommended config */
    const rc = top.site.recommendedConfig;
    if (rc) {
      html += "<section>";
      html += "<h3 class='report-section-title'>Recommended Configuration — " + top.site.shortName + "</h3>";
      html += "<p style='font-size:12px;color:var(--ink-soft);line-height:1.65;margin:0 0 12px;'>" + rc.rationale + "</p>";
      if (rc.keyConstraints && rc.keyConstraints.length) {
        html += "<table class='report-table'><thead><tr><th>Key Constraints</th></tr></thead><tbody>";
        rc.keyConstraints.forEach(function (c) { html += "<tr><td>" + c + "</td></tr>"; });
        html += "</tbody></table>";
      }
      if (rc.immediateActions && rc.immediateActions.length) {
        html += "<table class='report-table' style='margin-top:10px;'><thead><tr><th>Immediate Actions</th></tr></thead><tbody>";
        rc.immediateActions.forEach(function (a) { html += "<tr><td>" + a + "</td></tr>"; });
        html += "</tbody></table>";
      }
      html += "</section>";
    }

    /* 9 — Literature references */
    const allRefs = [];
    ranked.forEach(function (item) {
      if (item.site.evidence) item.site.evidence.forEach(function (e) { allRefs.push(e); });
      const rc2 = item.site.recommendedConfig;
      if (rc2 && rc2.references) rc2.references.forEach(function (r) { allRefs.push(r); });
    });
    const uniqueRefs = allRefs.filter(function (r, i, a) { return a.indexOf(r) === i; }).slice(0, 12);
    if (uniqueRefs.length) {
      html += "<section>";
      html += "<h3 class='report-section-title'>Literature & Regulatory References</h3>";
      html += "<div class='report-ref-list'>";
      uniqueRefs.forEach(function (r) { html += "<div class='report-ref-item'>" + r + "</div>"; });
      html += "</div>";
      html += "</section>";
    }

    body.innerHTML = html;

    /* Show modal */
    backdrop.style.display = "flex";
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { backdrop.classList.add("open"); });
    });

    /* Close handlers */
    document.getElementById("reportCloseBtn").onclick = closeReportModal;
    backdrop.addEventListener("click", function (e) { if (e.target === backdrop) closeReportModal(); }, { once: true });
  }

  function closeReportModal() {
    const backdrop = document.getElementById("reportBackdrop");
    if (!backdrop) return;
    backdrop.classList.remove("open");
    setTimeout(function () { backdrop.style.display = "none"; }, 260);
  }

  /* Small helper builders */
  function kpi(label, value, note) {
    return "<div class='report-kpi'><span>" + label + "</span><strong>" + value + "</strong><em>" + (note || "") + "</em></div>";
  }
  function siteMet(label, value) {
    return "<div class='report-site-metric'><span>" + label + "</span><strong>" + value + "</strong></div>";
  }

  /* ─────────────────────────────────────────────────────────────
     STATE HANDLERS
  ───────────────────────────────────────────────────────────── */

  function handleSiteChange(siteId) {
    state.selectedSiteId = siteId;
    state.selectedRouteId = resolveRouteId(null, getSelectedSite());
    syncModuleSelection();
    syncUrl();
    hydrateContextNavigation();
    rerenderPage();
  }

  function handlePlanChange(planKey) {
    state.selectedPlan = planKey;
    syncModuleSelection();
    syncUrl();
    hydrateContextNavigation();
    rerenderPage();
  }

  function rerenderPage() {
    const page = document.body.dataset.page;
    const rerender = {
      overview: function () {
        renderCities();
        renderRecentAnalyses();
        renderWorkflow();
        renderScoringDimensions();
        renderOverviewHighlights();
      },
      map: function () {
        renderSiteChooser("mapSiteList", true, handleSiteChange);
        renderPlanTabs("mapPlanTabs", handlePlanChange);
        renderMapMarkers();
        renderMapDetail();
        renderMapLegend();
        // Update map markers if MapLibre is active
        if (window._vertiportMap) {
          const sel = getSelectedSite();
          window._vertiportMap.flyTo({ center: [sel.lng, sel.lat], zoom: 14, pitch: 55 });
        }
      },
      detail: function () {
        renderSiteChooser("detailSiteTabs", false, handleSiteChange);
        renderDetailHero();
        renderInitialConfig();
        renderScoreBars("detailScoreBars");
        renderHardGates();
        renderEvidence();
        renderRisks();
        renderOperationsReadiness();
      },
      configurator: function () {
        renderSiteChooser("configSiteTabs", false, handleSiteChange);
        renderPlanTabs("configPlanTabs", handlePlanChange);
        bindPadControls();
        renderConfiguratorModules();
        renderConfiguratorSummary();
        renderFloorPlan();
      },
      simulation: function () {
        renderSiteChooser("simSiteTabs", false, handleSiteChange);
        renderPlanTabs("simPlanTabs", handlePlanChange);
        renderSimulationRoutes();
        renderSimulationSummary();
        renderSimulationNetworkMap();
      },
      decision: function () {
        renderPlanTabs("decisionPlanTabs", handlePlanChange);
        renderScenarioTabs();
        renderPersonaTabs();
        renderDecisionBoard();
      }
    };

    if (rerender[page]) rerender[page]();
    renderJourneyRail();
    renderPageNavigator();
  }

  /* ─────────────────────────────────────────────────────────────
     CALCULATION HELPERS
  ───────────────────────────────────────────────────────────── */

  function syncModuleSelection() {
    state.selectedModules = new Set(getSelectedSite().plans[state.selectedPlan].modules);
  }

  function computeConfiguredPlan(site, planKey, selectedModules) {
    const basePlan = site.plans[planKey];
    const selected = new Set(selectedModules);
    const defaults = new Set(basePlan.modules);
    const totals = {
      capex: basePlan.capex,
      opex: basePlan.opex,
      throughput: basePlan.throughput,
      feasibility: basePlan.feasibility,
      power: basePlan.power
    };

    Object.entries(data.modules).forEach(function (entry) {
      const id = entry[0];
      const module = entry[1];
      const current = selected.has(id) ? 1 : 0;
      const baseline = defaults.has(id) ? 1 : 0;
      const diff = current - baseline;
      if (!diff) return;
      totals.capex += (module.capex / 100) * diff;
      totals.opex += (module.opex / 200) * diff;
      totals.throughput += module.throughput * diff;
      totals.feasibility += module.feasibility * diff;
      totals.power += (module.power / 1000) * diff;
    });

    totals.feasibility = Math.max(58, Math.min(95, totals.feasibility));
    return totals;
  }

  function getRankedSites() {
    return data.sites
      .filter(function (site) { return cityMatchApp(site, state.selectedCity); })
      .map(function (site) {
        return {
          siteId: site.id,
          composite: computeCompositeScore(site, getActivePersona().weights)
        };
      })
      .sort(function (a, b) { return b.composite - a.composite; });
  }

  /* Returns a plain scores object with tier modifiers applied — used by renderScoreRows */
  function tierAdjustedScores(site, planKey) {
    const mods = TIER_SCORE_MODS[planKey || state.selectedPlan] || TIER_SCORE_MODS.standard;
    function adj(v, m) { return Math.max(0, Math.min(100, (v||0) + m)); }
    return {
      safety:         adj(site.scores.safety,         mods.safety),
      structural:     adj(site.scores.structural||0,  mods.structural),
      power:          adj(site.scores.power||0,        mods.power),
      regulation:     adj(site.scores.regulation,     mods.regulation),
      ground:         adj(site.scores.ground||0,       mods.ground),
      comms:          adj(site.scores.comms||0,        mods.comms),
      operations:     adj(site.scores.operations,     mods.operations),
      weather:        adj(site.scores.weather||0,      mods.weather),
      network:        adj(site.scores.network,        mods.network),
      investment:     adj(site.scores.investment,     mods.investment),
      implementation: adj(site.scores.implementation, mods.implementation)
    };
  }

  /* Per-tier score adjustments — reflect that scheme complexity, throughput ceiling
     and revenue potential differ materially between Lean / Standard / Enhanced.
     Modifiers are additive deltas to the raw dimension scores (capped 0–100). */
  const TIER_SCORE_MODS = {
    lean: {
      safety: 0,
      structural:     +4,   /* simpler load footprint, fewer civil works */
      power:          +2,   /* lower peak demand — existing supply often sufficient */
      regulation:     +2,   /* smaller scheme has a shorter approval pathway */
      ground:          0,
      comms:           0,
      operations:     -9,   /* fewer FATOs / stands → lower throughput efficiency */
      weather:         0,
      network:        -3,   /* lower movement capacity reduces network utility */
      investment:     -7,   /* fewer daily movements cap revenue; lower IRR ceiling */
      implementation: +4    /* simpler build, fewer structural interventions */
    },
    standard: {
      safety: 0, structural: 0, power: 0, regulation: 0, ground: 0,
      comms: 0, operations: 0, weather: 0, network: 0, investment: 0, implementation: 0
    },
    enhanced: {
      safety: 0,
      structural:     -4,   /* heavier equipment, larger FATO footprint */
      power:          -3,   /* peak demand may exceed existing transformer capacity */
      regulation:     -3,   /* larger scheme → longer CAD/BD approval chain */
      ground:          0,
      comms:           0,
      operations:     +10,  /* additional FATOs, fast-charge, higher daily throughput */
      weather:         0,
      network:        +5,   /* higher capacity strengthens corridor value */
      investment:     +8,   /* higher revenue ceiling + better IRR under growth demand */
      implementation: -5    /* more complex civil works and equipment integration */
    }
  };

  function computeCompositeScore(site, weights, planKey) {
    const mods = TIER_SCORE_MODS[planKey || state.selectedPlan] || TIER_SCORE_MODS.standard;
    function adj(raw, mod) { return Math.max(0, Math.min(100, (raw||0) + mod)); }
    return (
      adj(site.scores.safety,          mods.safety)         * (weights.safety||0) +
      adj(site.scores.structural||0,   mods.structural)     * (weights.structural||0) +
      adj(site.scores.power||0,        mods.power)          * (weights.power||0) +
      adj(site.scores.regulation,      mods.regulation)     * (weights.regulation||0) +
      adj(site.scores.ground||0,       mods.ground)         * (weights.ground||0) +
      adj(site.scores.comms||0,        mods.comms)          * (weights.comms||0) +
      adj(site.scores.operations,      mods.operations)     * (weights.operations||0) +
      adj(site.scores.weather||0,      mods.weather)        * (weights.weather||0) +
      adj(site.scores.network,         mods.network)        * (weights.network||0) +
      adj(site.scores.investment,      mods.investment)     * (weights.investment||0) +
      adj(site.scores.implementation,  mods.implementation) * (weights.implementation||0)
    );
  }

  /* Score dimension groups — four thematic clusters for grouped display */
  const SCORE_GROUPS = [
    {
      label: "Airspace & Physical Safety",
      icon: "✈",
      keys: ["safety", "structural", "power"],
      labels: {
        safety:     "Safety & Airspace",
        structural: "Structural Load",
        power:      "Power Grid Capacity"
      },
      desc: "Flyability, load-bearing capacity and electrical infrastructure"
    },
    {
      label: "Regulatory & Connectivity",
      icon: "⚖",
      keys: ["regulation", "ground", "comms"],
      labels: {
        regulation: "Regulatory Readiness",
        ground:     "Ground Transport Access",
        comms:      "5G / EMI Environment"
      },
      desc: "Approval likelihood, last-mile access and communications coverage"
    },
    {
      label: "Operational Performance",
      icon: "⚙",
      keys: ["operations", "weather"],
      labels: {
        operations: "Operational Fit",
        weather:    "Weather Reliability"
      },
      desc: "Throughput capacity and estimated annual operational uptime"
    },
    {
      label: "Commercial Viability",
      icon: "¥",
      keys: ["network", "investment", "implementation"],
      labels: {
        network:        "Network & Route Value",
        investment:     "Investment Attractiveness",
        implementation: "Implementation Feasibility"
      },
      desc: "Network centrality, IRR ceiling and buildability"
    }
  ];

  function renderScoreRows(scores) {
    return SCORE_GROUPS.map(function(group) {
      const rows = group.keys.map(function(key) {
        const value = scores[key];
        if (value === undefined) return "";
        const barPct = Math.min(100, value);
        const scoreClass = value >= 85 ? "score-high" : value >= 70 ? "score-mid" : "score-low";
        return (
          "<div class='score-row'>" +
            "<span>" + group.labels[key] + "</span>" +
            "<div class='score-bar'><span class='" + scoreClass + "' style='width:" + barPct + "%'></span></div>" +
            "<strong>" + value + "</strong>" +
          "</div>"
        );
      }).join("");
      return (
        "<div class='score-group'>" +
          "<div class='score-group-header'>" +
            "<span class='score-group-icon'>" + group.icon + "</span>" +
            "<div>" +
              "<div class='score-group-label'>" + group.label + "</div>" +
              "<div class='score-group-desc'>" + group.desc + "</div>" +
            "</div>" +
          "</div>" +
          rows +
        "</div>"
      );
    }).join("");
  }

  /* ─────────────────────────────────────────────────────────────
     NAVIGATION & URL
  ───────────────────────────────────────────────────────────── */

  function setActiveNav() {
    const current = document.body.dataset.page;
    document.querySelectorAll("[data-nav]").forEach(function (link) {
      link.href = buildPageUrl(link.dataset.nav);
      link.classList.toggle("active", link.dataset.nav === current);
    });
  }

  function hydrateContextNavigation() {
    document.querySelectorAll("[data-nav]").forEach(function (link) {
      link.href = buildPageUrl(link.dataset.nav);
    });

    const staticMap = {
      "index.html": "overview",
      "index.html": "overview",
      "map.html": "map",
      "map.html": "map",
      "site-detail.html": "detail",
      "site-detail.html": "detail",
      "configurator.html": "configurator",
      "configurator.html": "configurator",
      "simulation.html": "simulation",
      "simulation.html": "simulation",
      "decision.html": "decision",
      "decision.html": "decision"
    };

    document.querySelectorAll("a[href]").forEach(function (link) {
      const rawHref = link.getAttribute("href");
      if (!rawHref || rawHref.includes("?")) return;
      const targetPage = staticMap[rawHref];
      if (!targetPage) return;
      link.href = buildPageUrl(targetPage);
    });
  }

  function renderJourneyRail() {
    const shell = document.querySelector(".page-shell");
    if (!shell) return;
    let rail = document.getElementById("journeyRail");
    if (!rail) {
      rail = document.createElement("section");
      rail.id = "journeyRail";
      rail.className = "panel compact-panel";
      const firstSection = shell.firstElementChild;
      if (firstSection) shell.insertBefore(rail, firstSection.nextSibling);
      else shell.appendChild(rail);
    }

    const current = document.body.dataset.page;
    rail.innerHTML =
      "<div class='journey-rail'>" +
        pageFlow.map(function (step, index) {
          return (
            "<a class='journey-step " + (step.key === current ? "active" : "") + "' href='" + buildPageUrl(step.key) + "'>" +
              "<span class='journey-step-index'>0" + (index + 1) + "</span>" +
              "<span class='journey-step-label'>" + step.label + "</span>" +
            "</a>"
          );
        }).join("") +
      "</div>";
  }

  function renderPageNavigator() {
    const shell = document.querySelector(".page-shell");
    if (!shell) return;
    const current = document.body.dataset.page;
    const currentIndex = pageFlow.findIndex(function (step) { return step.key === current; });
    if (currentIndex === -1) return;

    let nav = document.getElementById("pageNavigator");
    if (!nav) {
      nav = document.createElement("section");
      nav.id = "pageNavigator";
      nav.className = "panel compact-panel";
      shell.appendChild(nav);
    }

    const prev = currentIndex > 0 ? pageFlow[currentIndex - 1] : null;
    const next = currentIndex < pageFlow.length - 1 ? pageFlow[currentIndex + 1] : null;
    nav.innerHTML =
      "<div class='page-navigator'>" +
        "<div class='page-nav-cell'>" +
          (prev
            ? "<a class='button button-secondary' href='" + buildPageUrl(prev.key) + "'>← " + prev.label + "</a>"
            : "<span class='page-nav-placeholder'>Start of workflow</span>") +
        "</div>" +
        "<div class='page-nav-context'>" +
          "<span class='eyebrow'>Current Context</span>" +
          "<strong>" + getSelectedSite().shortName + " · " + getSelectedSite().plans[state.selectedPlan].label + "</strong>" +
        "</div>" +
        "<div class='page-nav-cell page-nav-cell-right'>" +
          (next
            ? "<a class='button button-primary' href='" + buildPageUrl(next.key) + "'>" + next.label + " →</a>"
            : "<a class='button button-primary' href='" + buildPageUrl("overview") + "'>Back to Overview</a>") +
        "</div>" +
      "</div>";
  }

  function syncUrl() {
    const url = new URL(window.location.href);
    url.search = buildStateParams().toString();
    window.history.replaceState({}, "", url.toString());
  }

  function buildStateParams(overrides) {
    const o = overrides || {};
    const merged = {
      site: state.selectedSiteId,
      plan: state.selectedPlan,
      scenario: state.selectedScenario,
      persona: state.selectedPersona,
      route: state.selectedRouteId,
      city: state.selectedCity,
      fleet: state.fleetCount,
      turnaround: state.turnaroundMinutes,
      weather: state.weatherMode,
      evtol: state.evtolPads,
      uav: state.uavPads
    };
    Object.keys(o).forEach(function (k) { merged[k] = o[k]; });
    const params = new URLSearchParams();
    Object.entries(merged).forEach(function (entry) {
      if (entry[1] !== undefined && entry[1] !== null && entry[1] !== "") {
        params.set(entry[0], String(entry[1]));
      }
    });
    return params;
  }

  function buildPageUrl(pageKey, overrides) {
    const params = buildStateParams(overrides);
    const query = params.toString();
    return getPagePath(pageKey) + (query ? "?" + query : "");
  }

  function getPagePath(pageKey) {
    const fileMap = {
      overview: "index.html",
      map: "map.html",
      detail: "site-detail.html",
      configurator: "configurator.html",
      simulation: "simulation.html",
      decision: "decision.html"
    };
    return fileMap[pageKey];
  }

  function resolveRouteId(routeId, site) {
    if (!site || !site.routes || !site.routes.length) return null;
    return site.routes.some(function (r) { return r.id === routeId; }) ? routeId : site.routes[0].id;
  }

  function setYear() {
    document.querySelectorAll("[data-year]").forEach(function (node) {
      node.textContent = String(new Date().getFullYear());
    });
  }

  /* ─────────────────────────────────────────────────────────────
     LOOKUP HELPERS
  ───────────────────────────────────────────────────────────── */

  function getSelectedSite() { return getSiteById(state.selectedSiteId); }

  function getSiteById(siteId) {
    return data.sites.find(function (s) { return s.id === siteId; }) || null;
  }

  /* ── City helpers ── */
  function cityMatchApp(site, cityKey) {
    if (cityKey === "hong-kong") return site.city === "hong-kong" || !site.city;
    if (cityKey === "shenzhen") return site.city === "shenzhen";
    if (cityKey === "guangzhou-zhuhai") return site.city === "guangzhou" || site.city === "zhuhai";
    return true;
  }

  function siteCur(site) {
    return site && site.currency === "RMB" ? "¥" : "HK$ ";
  }

  function getActivePersona() {
    return data.personas.find(function (p) { return p.name === state.selectedPersona; }) || data.personas[data.personas.length - 1];
  }

  function getGateLabel(status) {
    return { pass: "Pass", warning: "Requires Justification", fail: "Blocking" }[status] || "Pending";
  }

  function getFeasibilityLabel(score) {
    if (score >= 88) return "Priority";
    if (score >= 78) return "Green";
    if (score >= 68) return "Amber";
    return "Red";
  }

  function getFeasibilityClass(score) {
    if (score >= 88) return "strong";
    if (score >= 78) return "pass";
    if (score >= 68) return "warning";
    return "fail";
  }

  function riskLevelClass(level) {
    return { High: "fail", Medium: "warning", Low: "muted" }[level] || "muted";
  }

  function heroMetricLabel(key) {
    return {
      area: "Available Area",
      grid: "Power Supply",
      access: "Ground Access",
      alternate: "Alternate Sites"
    }[key] || key;
  }

  function getQueryValue(key) {
    return new URLSearchParams(window.location.search).get(key);
  }
})();
