# Report Spec

## Report identity
- App name: Attorney Report Analytic App
- Report title: Attorney Report
- Semantic model: `sm4RayfinTest` in workspace `Rayfin Testing`
- Audience: Attorneys, partners, practice leaders, and executive leadership
- Primary purpose: Provide an executive view of attorney performance, client and matter exposure, and billing and collection outcomes
- Delivery target: Existing `rayfin-app-sm` Fabric Analytics web app project; local build and Fabric portal embed validation

## User decisions and constraints
- Scope: Four views covering Executive Overview, Attorney Performance, Client & Matter Portfolio, and Billing & Collections
- Interactivity: Persistent searchable Attorney and Client slicers, view navigation, reset filters, and chart/grid selection events
- Design direction: Executive legal briefing with a navy/ivory palette, restrained semantic risk accents, and a recurring performance band
- Publishing: Not included; implementation remains local to the existing app project
- Tooling: React, TypeScript, Tailwind CSS v4, Fabric App Data SDK, Vega-Lite/Fabric Visuals, and Fabric DataGrid
- Model edit permissions: No semantic-model changes are required; query-local measures may be used when an existing measure is unavailable
- Accessibility: WCAG AA contrast, keyboard-operable controls, visible focus, non-color status cues, descriptive chart labels, and responsive layouts
- Data caveats:
  - The model has no dedicated date dimension, so monthly trends group `work_date` and `invoice_date` directly.
  - Attorney filters do not naturally propagate from `matter_attorney_assignment` back to `matter`; matter/client/invoice queries must apply assignment-derived matter keys with `TREATAS`.
  - The existing `Utilization %` measure depends on the selected work-date span and can appear low when the full history is selected.
  - Monetary values retain source precision but render in compact notation with zero decimal places.

## Dependency status
- Semantic model: Available and inspected through the Power BI modeling connection
- Model mode: Direct Lake fact/dimension tables with an Import calculation table
- App project: Available at `rayfin-app-sm`
- App connection configuration: Not yet registered in `fabric.yaml`
- Node.js: Available
- App dependencies: Declared in `package-lock.json`; installation is pending
- Fabric AppBackend environment: `.env.local` and `.env.fabric` are not yet present
- Desktop/PBIP: Not applicable to this Fabric Analytics web app
- Fabric publishing: Out of scope

## Narrative
- Core story: Show whether attorney effort is productive and billable, which attorneys and clients drive value, where matter risk is concentrated, and where collections require action.
- Audience promise: An attorney or practice leader can understand firm-level performance in seconds, then move to attorney, client, matter, or invoice detail without leaving the app.
- Key questions answered:
  - How much work and billed value are attorneys producing?
  - Which attorneys lead or lag on utilization, hours, and effective rate?
  - Which clients and matters concentrate workload, value, and legal risk?
  - How much has been invoiced, collected, or remains outstanding?

## Model inventory
- `attorney`: name, role, title, office, practice area, standard bill rate, active flag
- `client`: name/type, industry, region, risk rating, AML status, sanctions flag, active flag
- `matter`: client, name/type/status, practice area, jurisdiction, dates, lead attorney, responsible partner, risk level
- `matter_attorney_assignment`: matter-to-attorney assignment bridge, role/dates, primary flag
- `time_entry`: work date, hours, rates, standard/billed amounts, task/activity, attorney and matter keys
- `invoice`: invoice date/status, fees, expenses, tax, total, paid, and outstanding amounts
- Existing measures: Total Hours, Billed Value, Standard Value, Entry Count, Distinct Workdays, Daily Target Hours, Workday Target Hours, Utilization %, Hours vs Target, Effective Bill Rate

## Design identity
- Tone: Editorial Newsroom remixed as an executive legal briefing
- Signature: A recurring navy performance band with tabular numerals and a single brass highlight; amber and red are reserved for risk and collection exceptions
- Typography: Source Serif 4 for headings; Source Sans 3 for UI/chart text; Bahnschrift/Segoe UI tabular numerals for KPIs
- Surface: Warm ivory background with white cards, navy typography, hairline dividers, and restrained shadows

## Page plan
1. Executive Overview
   - Archetype/variant: Executive Summary B — KPI Strip
   - Visuals: Contextual KPI band, monthly billed-value trend, attorney value ranking, and high-risk/open-matter action grid
2. Attorney Performance
   - Archetype/variant: Comparative Benchmark C — Rank Comparison First
   - Visuals: Billed-value versus utilization rank comparison, selected-attorney profile, monthly workload trend, and performance grid
3. Client & Matter Portfolio
   - Archetype/variant: Analytical Canvas B — Inline Slicers
   - Visuals: Client value ranking, matter mix, risk matrix, and matter detail grid
4. Billing & Collections
   - Archetype/variant: Operational Monitor A — 4-Up Status
   - Visuals: Invoiced/paid/outstanding/collection status, outstanding distribution, monthly collection trend, and invoice action grid

## Design system summary
- Theme: Counsel Briefing
- Palette: navy `#17233B`, ivory `#F7F3EA`, white `#FFFFFF`, brass `#B8892D`, slate `#667085`, success `#2F6B4F`, warning `#A96718`, danger `#A33A3A`
- Color semantics: Billed/invoiced value uses navy; paid uses green; outstanding uses brass; risk and overdue exceptions use red only when action is required
- Layout: Responsive 12-column grid, 8-pixel snap, 24-pixel desktop gutters, mixed spans, and detail grids near the bottom
- Amount formatting: Compact whole-number notation such as `$119K`, `$1M`, and `$0`; no decimal points
- Accessibility: Minimum 4.5:1 text contrast, persistent labels, icons paired with text, reduced-motion support, and precise values in grids

## Model requirements
- Existing measures: Reuse all ten measures in `Attorney Performance`
- Query-local measures: Active Matters, Matter Count, High-Risk Matters, Total Invoiced, Total Paid, Outstanding Amount, Collection Rate, Active Clients, and Open Matters
- New calculated columns: None
- Relationship/sort requirements: No model changes; query factories implement attorney-to-matter filtering with `TREATAS`

## Canonical design contract

```yaml
Design Brief:
  generated_by: powerbi-report-design
  contract_version: 1
  mode: greenfield
  delivery_surface: Fabric Analytics React web app
  design_identity:
    tone: "Editorial Newsroom remixed as an executive legal briefing: navy and ivory, disciplined whitespace, restrained legal-risk accents"
    signature: "Recurring navy performance band with tabular numerals and one brass highlight"
  archetype: Executive + Comparative + Analytical + Operational
  color_map:
    - { measure: "Attorney Performance[Billed Value]", color: "#17233B", tint: "#E8ECF2" }
    - { measure: "Attorney Performance[Total Hours]", color: "#52677F", tint: "#EDF1F5" }
    - { measure: "Attorney Performance[Utilization %]", color: "#B8892D", tint: "#F5EAD2" }
    - { measure: "Attorney Performance[Effective Bill Rate]", color: "#6C5C3D", tint: "#EEE8DD" }
    - { measure: "Total Paid", color: "#2F6B4F", tint: "#DFEEE5" }
    - { measure: "Outstanding Amount", color: "#A96718", tint: "#F7E8D3" }
    - { measure: "High-Risk Matters", color: "#A33A3A", tint: "#F4DEDE" }
  global_filters:
    - { id: attorney_slicer, field_bindings: "attorney[attorney_name]", slicer_type: searchable_dropdown, persistence: cross_view }
    - { id: client_slicer, field_bindings: "client[client_name]", slicer_type: searchable_dropdown, persistence: cross_view }
  pages:
    - name: "Executive Overview"
      role: landing
      archetype: Executive
      layout_variant: B
      variant_rationale: "Six firm-level signals are similarly important, so a KPI strip provides the fastest executive scan without making a bare number the hero."
      page_background: "#F7F3EA"
      layout_contract:
        canvas: { width: 1920, height: 1080, margin: 32, gutter: 24, snap: 8 }
        grid:
          columns: 12
          rows: 12
          regions:
            header: [1, 1, 8, 2]
            filters: [8, 1, 13, 2]
            performance_band: [1, 2, 13, 4]
            hero: [1, 4, 8, 9]
            risk: [8, 4, 13, 9]
            detail: [1, 9, 13, 13]
        placements:
          - { id: page_title, region: header, kind: textbox, text: "Attorney Report", purpose: "Anchor the executive briefing." }
          - { id: attorney_slicer, region: filters, kind: slicer, field_bindings: "attorney[attorney_name]", slicer_type: searchable_dropdown, slot: 1, of: 2 }
          - { id: client_slicer, region: filters, kind: slicer, field_bindings: "client[client_name]", slicer_type: searchable_dropdown, slot: 2, of: 2 }
          - id: executive_kpi_band
            region: performance_band
            kind: compositeKpiBand
            purpose: "Are workload, value, utilization, rate, matter volume, and receivables on track?"
            field_bindings: ["[Total Hours]", "[Billed Value]", "[Utilization %]", "[Effective Bill Rate]", "[Active Matters]", "[Outstanding Amount]"]
            color_strategy: measure_match
          - { id: billed_value_trend, region: hero, kind: lineChart, purpose: "How is billed value changing by work month?", field_bindings: { Category: "time_entry[work_date]", Y: "[Billed Value]" }, color_strategy: measure_match }
          - { id: attorney_value_ranking, region: risk, kind: barChart, purpose: "Which attorneys generate the most billed value?", field_bindings: { Category: "attorney[attorney_name]", X: "[Billed Value]" }, sort_policy: value_desc, color_strategy: highlight_and_grey }
          - { id: matter_action_grid, region: detail, kind: dataGrid, purpose: "Which open or high-risk matters require attention?", field_bindings: ["client[client_name]", "matter[matter_name]", "matter[matter_status]", "matter[risk_level]", "[Billed Value]", "[Total Hours]"] }
        space_audit:
          content_cell_count: 132
          placed_cell_count: 132
          empty_cell_pct: 0
          unplaced_regions: []
          largest_region: { name: detail, pct_of_content: 36 }
          balance_rationale: "The KPI band supports scanning while the trend, ranking, and action grid provide explanatory evidence."
    - name: "Attorney Performance"
      role: detail
      archetype: Comparative
      layout_variant: C
      variant_rationale: "Ten attorneys can be ranked on two performance dimensions, making a connected rank comparison the primary analytical surface."
      page_background: "#F7F3EA"
      layout_contract:
        canvas: { width: 1920, height: 1080, margin: 32, gutter: 24, snap: 8 }
        grid:
          columns: 12
          rows: 12
          regions:
            header: [1, 1, 8, 2]
            filters: [8, 1, 13, 2]
            ranking: [1, 2, 8, 8]
            profile: [8, 2, 13, 8]
            trend: [1, 8, 7, 13]
            detail: [7, 8, 13, 13]
        placements:
          - { id: page_title, region: header, kind: textbox, text: "Attorney Performance", purpose: "Frame contribution and relative standing." }
          - { id: attorney_slicer, region: filters, kind: slicer, field_bindings: "attorney[attorney_name]", slicer_type: searchable_dropdown, slot: 1, of: 2 }
          - { id: client_slicer, region: filters, kind: slicer, field_bindings: "client[client_name]", slicer_type: searchable_dropdown, slot: 2, of: 2 }
          - { id: attorney_rank_comparison, region: ranking, kind: slopeChart, purpose: "How does billed-value rank compare with utilization rank?", field_bindings: { Entity: "attorney[attorney_name]", Left: "[Billed Value Rank]", Right: "[Utilization Rank]" }, color_strategy: highlight_and_grey }
          - { id: selected_attorney_profile, region: profile, kind: compositeKpiPanel, purpose: "What is the selected attorney's role, office, practice, workload, value, utilization, and rate?", field_bindings: ["attorney[title]", "attorney[office_name]", "attorney[practice_area_name]", "[Total Hours]", "[Billed Value]", "[Utilization %]", "[Effective Bill Rate]"] }
          - { id: attorney_monthly_trend, region: trend, kind: lineChart, purpose: "How are hours and billed value changing by month?", field_bindings: { Category: "time_entry[work_date]", Y: ["[Total Hours]", "[Billed Value]"] }, color_strategy: measure_match }
          - { id: attorney_performance_grid, region: detail, kind: dataGrid, purpose: "What are the precise performance values for every attorney?", field_bindings: ["attorney[attorney_name]", "attorney[title]", "attorney[office_name]", "[Total Hours]", "[Billed Value]", "[Utilization %]", "[Effective Bill Rate]"] }
        space_audit:
          content_cell_count: 132
          placed_cell_count: 132
          empty_cell_pct: 0
          unplaced_regions: []
          largest_region: { name: ranking, pct_of_content: 32 }
          balance_rationale: "The rank comparison leads while the profile, trend, and grid remain large enough for readable labels and precise values."
    - name: "Client & Matter Portfolio"
      role: detail
      archetype: Analytical
      layout_variant: B
      variant_rationale: "Only attorney and client slicers are required, so inline filters preserve full-width analytical space."
      page_background: "#F7F3EA"
      layout_contract:
        canvas: { width: 1920, height: 1080, margin: 32, gutter: 24, snap: 8 }
        grid:
          columns: 12
          rows: 12
          regions:
            header: [1, 1, 8, 2]
            filters: [8, 1, 13, 2]
            portfolio: [1, 2, 8, 7]
            mix: [8, 2, 13, 7]
            risk: [1, 7, 6, 13]
            matters: [6, 7, 13, 13]
        placements:
          - { id: page_title, region: header, kind: textbox, text: "Client & Matter Portfolio", purpose: "Frame concentration, workload, and legal risk." }
          - { id: attorney_slicer, region: filters, kind: slicer, field_bindings: "attorney[attorney_name]", slicer_type: searchable_dropdown, slot: 1, of: 2 }
          - { id: client_slicer, region: filters, kind: slicer, field_bindings: "client[client_name]", slicer_type: searchable_dropdown, slot: 2, of: 2 }
          - { id: client_value_ranking, region: portfolio, kind: barChart, purpose: "Which clients account for the most billed value and hours?", field_bindings: { Category: "client[client_name]", X: ["[Billed Value]", "[Total Hours]"] }, sort_policy: value_desc, color_strategy: highlight_and_grey }
          - { id: matter_mix, region: mix, kind: stackedBarChart, purpose: "How is the portfolio distributed by status and practice area?", field_bindings: { Category: "matter[practice_area_name]", Series: "matter[matter_status]", X: "[Matter Count]" }, color_strategy: semantic_categories }
          - { id: risk_matrix, region: risk, kind: heatmap, purpose: "Where do client and matter risk combine into elevated exposure?", field_bindings: { X: "client[risk_rating]", Y: "matter[risk_level]", Color: "[Matter Count]" }, color_strategy: semantic_risk }
          - { id: matter_detail_grid, region: matters, kind: dataGrid, purpose: "Which matters, clients, jurisdictions, statuses, and assignments need review?", field_bindings: ["client[client_name]", "matter[matter_name]", "matter[matter_type]", "matter[matter_status]", "matter[practice_area_name]", "matter[jurisdiction_name]", "matter[risk_level]", "[Billed Value]", "[Total Hours]"] }
        space_audit:
          content_cell_count: 132
          placed_cell_count: 132
          empty_cell_pct: 0
          unplaced_regions: []
          largest_region: { name: matters, pct_of_content: 32 }
          balance_rationale: "The detail grid leads follow-up while concentration, mix, and risk visuals retain sufficient analytical space."
    - name: "Billing & Collections"
      role: detail
      archetype: Operational
      layout_variant: A
      variant_rationale: "Four collection signals plus trend, distribution, and invoice triage support balanced monitoring and action on a desktop."
      page_background: "#F7F3EA"
      layout_contract:
        canvas: { width: 1920, height: 1080, margin: 32, gutter: 24, snap: 8 }
        grid:
          columns: 12
          rows: 12
          regions:
            header: [1, 1, 8, 2]
            filters: [8, 1, 13, 2]
            status: [1, 2, 13, 4]
            aging: [1, 4, 7, 9]
            collections: [7, 4, 13, 9]
            invoice_queue: [1, 9, 13, 13]
        placements:
          - { id: page_title, region: header, kind: textbox, text: "Billing & Collections", purpose: "Frame cash realization and receivable risk." }
          - { id: attorney_slicer, region: filters, kind: slicer, field_bindings: "attorney[attorney_name]", slicer_type: searchable_dropdown, slot: 1, of: 2 }
          - { id: client_slicer, region: filters, kind: slicer, field_bindings: "client[client_name]", slicer_type: searchable_dropdown, slot: 2, of: 2 }
          - { id: collection_status_band, region: status, kind: compositeKpiBand, purpose: "What has been invoiced, paid, left outstanding, and collected?", field_bindings: ["[Total Invoiced]", "[Total Paid]", "[Outstanding Amount]", "[Collection Rate]"], color_strategy: semantic_status }
          - { id: outstanding_by_status, region: aging, kind: barChart, purpose: "Which invoice statuses hold the most outstanding value?", field_bindings: { Category: "invoice[invoice_status]", X: "[Outstanding Amount]" }, sort_policy: value_desc, color_strategy: semantic_status }
          - { id: invoiced_paid_trend, region: collections, kind: lineChart, purpose: "How do invoiced and paid amounts compare by month?", field_bindings: { Category: "invoice[invoice_date]", Y: ["[Total Invoiced]", "[Total Paid]"] }, color_strategy: measure_match }
          - { id: invoice_action_grid, region: invoice_queue, kind: dataGrid, purpose: "Which invoices have the largest balances and require collection follow-up?", field_bindings: ["client[client_name]", "matter[matter_name]", "invoice[invoice_id]", "invoice[invoice_date]", "invoice[invoice_status]", "invoice[total_amount]", "invoice[paid_amount]", "invoice[outstanding_amount]"] }
        space_audit:
          content_cell_count: 132
          placed_cell_count: 132
          empty_cell_pct: 0
          unplaced_regions: []
          largest_region: { name: invoice_queue, pct_of_content: 36 }
          balance_rationale: "The status band supports rapid monitoring, balanced charts explain collection conditions, and the largest region holds actionable invoice detail."
  interaction_pattern:
    drill_targets: ["Attorney Performance", "Client & Matter Portfolio", "Billing & Collections"]
    cross_filter_rules: "Selections filter compatible visuals within the active view; Attorney and Client persist across views; Reset clears global and local selections."
  accessibility:
    alt_text_strategy: "Each chart label states measure, grouping, sort, and active filter context; grids retain explicit column labels."
    contrast_notes: "Navy on ivory and white exceeds WCAG AA; warning and danger colors are paired with text/icons and never stand alone."
  theme:
    base: "Existing Tailwind semantic token system adapted to Counsel Briefing"
    user_overrides: "Preserve light/dark mode, Fabric visual runtime tokens, visible focus rings, and responsive behavior."
```

## Implementation notes
- Register the supplied model URL under a stable `legalModel` alias and regenerate `src/fabric.generated.ts`.
- Store every base query in a `.dax` file and validate it through `fabric-app-data query legalModel`.
- Centralize DAX string escaping and Attorney/Client filter injection in typed query factories.
- Use `VegaVisual` for charts and `DataGrid` for detail tables; all visual data must come from the live semantic model.
- Use shared compact-currency and whole-number formatters; percentages may retain one decimal because the no-decimal constraint applies to amounts.
- Give every data region loading, empty, and explicit error states.
- Run targeted tests, lint, production build, then validate inside the Fabric portal embed.
- Do not publish or deploy beyond the local Fabric portal development embed without separate approval.
