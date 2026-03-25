"use client"
import { useState } from "react"
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from "recharts"

// ── Data ─────────────────────────────────────────────────
const businesses = [
  { name: "Longfellow Design Build",  category: "Real Estate",   location: "Boston MA",    revenue: 8500000, tech: 8, growth: 18, season: "Year-Round", employees: 35 },
  { name: "South Peak Resort",        category: "Resort",        location: "Lincoln NH",   revenue: 5200000, tech: 7, growth: 22, season: "Winter",     employees: 80 },
  { name: "Flying Bridge Restaurant", category: "Restaurant",    location: "Falmouth MA",  revenue: 2800000, tech: 6, growth: 12, season: "Summer",     employees: 45 },
  { name: "Lighthouse Station",       category: "Real Estate",   location: "Woods Hole MA",revenue: 3200000, tech: 6, growth: 28, season: "Year-Round", employees: 12 },
  { name: "Falmouth Tides Hotel",     category: "Hotel",         location: "Falmouth MA",  revenue: 1600000, tech: 6, growth: 15, season: "Summer",     employees: 30 },
  { name: "Flying Bridge Marina",     category: "Marina",        location: "Falmouth MA",  revenue: 1900000, tech: 5, growth: 8,  season: "Summer",     employees: 20 },
  { name: "Whale's Tale Waterpark",   category: "Entertainment", location: "Lincoln NH",   revenue: 1800000, tech: 5, growth: 15, season: "Summer",     employees: 60 },
  { name: "The Mills Marketplace",    category: "Retail",        location: "Lincoln NH",   revenue: 1200000, tech: 5, growth: 10, season: "Winter",     employees: 25 },
  { name: "Alpine Adventures",        category: "Entertainment", location: "Lincoln NH",   revenue: 1100000, tech: 5, growth: 20, season: "Year-Round", employees: 25 },
  { name: "Basecamp Brewing",         category: "Restaurant",    location: "Lincoln NH",   revenue: 950000,  tech: 5, growth: 25, season: "Winter",     employees: 22 },
  { name: "Timber Axe Bar & Bowl",    category: "Entertainment", location: "Falmouth MA",  revenue: 880000,  tech: 5, growth: 30, season: "Summer",     employees: 18 },
  { name: "Snowfish Sushi",           category: "Restaurant",    location: "Lincoln NH",   revenue: 720000,  tech: 4, growth: 20, season: "Winter",     employees: 15 },
  { name: "Timber Wood Fired",        category: "Restaurant",    location: "Lincoln NH",   revenue: 650000,  tech: 4, growth: 18, season: "Winter",     employees: 14 },
  { name: "Flying Bridge Service",    category: "Marina",        location: "Fairhaven MA", revenue: 560000,  tech: 4, growth: 12, season: "Year-Round", employees: 12 },
  { name: "Three Suns Captiva",       category: "Hospitality",   location: "Captiva FL",   revenue: 480000,  tech: 4, growth: 35, season: "Winter",     employees: 8  },
  { name: "Mountain Furniture Co.",   category: "Retail",        location: "Lincoln NH",   revenue: 380000,  tech: 3, growth: 15, season: "Year-Round", employees: 8  },
  { name: "Bluebird Martini Bar",     category: "Restaurant",    location: "Lincoln NH",   revenue: 420000,  tech: 3, growth: 22, season: "Winter",     employees: 10 },
  { name: "The Shop at South Peak",   category: "Retail",        location: "Lincoln NH",   revenue: 220000,  tech: 3, growth: 18, season: "Winter",     employees: 6  },
  { name: "South Peak Coffee Cart",   category: "Restaurant",    location: "Lincoln NH",   revenue: 180000,  tech: 2, growth: 25, season: "Winter",     employees: 4  },
  { name: "Little Blue Coffee",       category: "Restaurant",    location: "Falmouth MA",  revenue: 280000,  tech: 3, growth: 20, season: "Summer",     employees: 6  },
]

const CAT_COLORS = {
  "Restaurant":    "#e74c3c",
  "Marina":        "#2980b9",
  "Resort":        "#8e44ad",
  "Hotel":         "#16a085",
  "Real Estate":   "#d35400",
  "Entertainment": "#f39c12",
  "Retail":        "#27ae60",
  "Hospitality":   "#2c3e50",
}

const PROJECTS = [
  { title: "🤖 AI Lead Generation Portal", biz: "Flying Bridge Marina + Longfellow Design Build", month: "Month 1-2", stack: "Python • React • Claude API", impact: "$150K-300K revenue uplift", color: "#e74c3c" },
  { title: "📱 Marina Slip Booking System", biz: "Flying Bridge Marina", month: "Month 1-2", stack: "React • Next.js • Node.js • PostgreSQL", impact: "$80K+ from reduced no-shows", color: "#2980b9" },
  { title: "🏨 Hotel Booking Dashboard", biz: "Falmouth Tides Hotel", month: "Month 2-3", stack: "Next.js • Tailwind • REST API", impact: "$60K+ from direct bookings", color: "#16a085" },
  { title: "📊 Portfolio Analytics", biz: "All Waterside Businesses", month: "Month 1", stack: "Next.js • Recharts • Tailwind", impact: "10-15% portfolio efficiency gain", color: "#8e44ad" },
  { title: "🛒 E-commerce Store", biz: "The Shop at South Peak", month: "Month 3-4", stack: "Next.js • Stripe • WooCommerce", impact: "$40K+ from online sales", color: "#27ae60" },
  { title: "📅 Event Booking Platform", biz: "Timber Axe Bar & Bowl", month: "Month 4-5", stack: "React • Node.js • MongoDB", impact: "$35K+ from optimized bookings", color: "#f39c12" },
]

// ── KPI Card ─────────────────────────────────────────────
function KPICard({ value, label, color }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 text-center border-t-4" style={{ borderColor: color }}>
      <div className="text-3xl font-bold" style={{ color }}>{value}</div>
      <div className="text-gray-500 text-sm mt-1">{label}</div>
    </div>
  )
}

// ── Main ─────────────────────────────────────────────────
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [catFilter, setCatFilter] = useState("All")

  const totalRev  = businesses.reduce((s, b) => s + b.revenue, 0)
  const totalEmp  = businesses.reduce((s, b) => s + b.employees, 0)
  const avgGrowth = (businesses.reduce((s, b) => s + b.growth, 0) / businesses.length).toFixed(1)
  const avgTech   = (businesses.reduce((s, b) => s + b.tech, 0) / businesses.length).toFixed(1)

  // Chart data
  const catRevData = Object.entries(
    businesses.reduce((acc, b) => {
      acc[b.category] = (acc[b.category] || 0) + b.revenue
      return acc
    }, {})
  ).map(([name, rev]) => ({ name, rev: +(rev/1e6).toFixed(1) }))
   .sort((a,b) => b.rev - a.rev)

  const top10 = [...businesses].sort((a,b) => b.revenue - a.revenue).slice(0,10)

  const pieData = Object.entries(
    businesses.reduce((acc, b) => {
      acc[b.category] = (acc[b.category] || 0) + 1
      return acc
    }, {})
  ).map(([name, value]) => ({ name, value }))

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  const summerIdx = [0.3,0.3,0.4,0.6,0.9,1.2,1.5,1.5,1.0,0.6,0.3,0.3]
  const winterIdx = [1.2,1.1,0.8,0.5,0.4,0.3,0.3,0.3,0.5,0.8,1.1,1.3]
  const seasonData = months.map((m,i) => ({
    month: m,
    Summer: +(summerIdx[i] * 3).toFixed(1),
    Winter: +(winterIdx[i] * 2.5).toFixed(1),
    "Year-Round": 1.5
  }))

  const tabs = [
    { id: "overview",   label: "📊 Overview" },
    { id: "revenue",    label: "💰 Revenue" },
    { id: "tech",       label: "🤖 Tech Ops" },
    { id: "seasonal",   label: "📅 Seasonal" },
    { id: "directory",  label: "🗺️ Directory" },
    { id: "coop",       label: "🎯 Co-op Plan" },
  ]

  const cats = ["All", ...new Set(businesses.map(b => b.category))]
  const filtered = catFilter === "All" ? businesses : businesses.filter(b => b.category === catFilter)

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white text-center py-10 px-4">
        <h1 className="text-4xl font-bold">🌊 Waterside Group</h1>
        <h2 className="text-xl mt-2 opacity-85">Portfolio Analytics Dashboard</h2>
        <p className="text-sm mt-2 opacity-60">20+ businesses across New England & Florida - Built by Vaishnavi Gajarla</p>
      </div>

      {/* KPIs */}
      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-5 gap-4">
        <KPICard value={`$${(totalRev/1e6).toFixed(1)}M`} label="Total Revenue"      color="#1a5276" />
        <KPICard value={businesses.length}                  label="Active Businesses"  color="#1a5276" />
        <KPICard value={`${avgGrowth}%`}                    label="Avg YoY Growth"     color="#27ae60" />
        <KPICard value={totalEmp}                           label="Total Employees"    color="#1a5276" />
        <KPICard value={`${avgTech}/10`}                    label="Avg Tech Maturity"  color="#e74c3c" />
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex gap-2 flex-wrap mb-6">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === t.id
                  ? "bg-blue-800 text-white shadow"
                  : "bg-white text-gray-600 hover:bg-blue-50 shadow-sm"
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW ── */}
        {activeTab === "overview" && (
          <div className="grid md:grid-cols-2 gap-6 pb-8">
            <div className="bg-white rounded-xl shadow p-5">
              <h3 className="font-bold text-gray-800 mb-4">Revenue by Category ($M)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={catRevData} layout="vertical">
                  <XAxis type="number" tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={120} />
                  <Tooltip formatter={v => `$${v}M`} />
                  <Bar dataKey="rev" radius={[0,6,6,0]}>
                    {catRevData.map((e,i) => (
                      <Cell key={i} fill={CAT_COLORS[e.name] || "#999"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl shadow p-5">
              <h3 className="font-bold text-gray-800 mb-4">Business Mix by Category</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name"
                       cx="50%" cy="50%" outerRadius={100} label={({name,percent}) => `${name} ${(percent*100).toFixed(0)}%`}
                       labelLine={false}>
                    {pieData.map((e,i) => (
                      <Cell key={i} fill={CAT_COLORS[e.name] || "#999"} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Region cards */}
            <div className="md:col-span-2">
              <h3 className="font-bold text-gray-800 mb-3">📍 Geographic Distribution</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { region: "Cape Cod / Falmouth MA", filter: ["Falmouth MA","Woods Hole MA"], color: "#2196F3" },
                  { region: "Lincoln NH / White Mtns", filter: ["Lincoln NH"], color: "#8e44ad" },
                  { region: "Boston MA", filter: ["Boston MA"], color: "#e74c3c" },
                  { region: "Florida", filter: ["Captiva FL"], color: "#f39c12" },
                ].map(r => {
                  const biz = businesses.filter(b => r.filter.includes(b.location))
                  const rev = biz.reduce((s,b) => s + b.revenue, 0)
                  return (
                    <div key={r.region} className="bg-white rounded-xl shadow p-4 text-center"
                         style={{ borderTop: `4px solid ${r.color}` }}>
                      <div className="text-2xl font-bold" style={{ color: r.color }}>{biz.length}</div>
                      <div className="text-xs font-semibold text-gray-700 mt-1">{r.region}</div>
                      <div className="text-xs text-gray-500">${(rev/1e6).toFixed(1)}M revenue</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── REVENUE ── */}
        {activeTab === "revenue" && (
          <div className="grid md:grid-cols-2 gap-6 pb-8">
            <div className="bg-white rounded-xl shadow p-5">
              <h3 className="font-bold text-gray-800 mb-4">Top 10 by Revenue</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={top10.map(b => ({ name: b.name.split(" ").slice(0,2).join(" "), rev: +(b.revenue/1e6).toFixed(1) }))} layout="vertical">
                  <XAxis type="number" tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={130} />
                  <Tooltip formatter={v => `$${v}M`} />
                  <Bar dataKey="rev" fill="#1a5276" radius={[0,6,6,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl shadow p-5">
              <h3 className="font-bold text-gray-800 mb-4">Fastest Growing Businesses</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart
                  data={[...businesses].sort((a,b) => b.growth - a.growth).slice(0,10)
                    .map(b => ({ name: b.name.split(" ").slice(0,2).join(" "), growth: b.growth }))}
                  layout="vertical">
                  <XAxis type="number" tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={130} />
                  <Tooltip formatter={v => `${v}%`} />
                  <Bar dataKey="growth" fill="#27ae60" radius={[0,6,6,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* ── TECH OPS ── */}
        {activeTab === "tech" && (
          <div className="pb-8">
            <h3 className="font-bold text-gray-800 mb-4">🎯 Highest Impact Tech Opportunities</h3>
            <p className="text-gray-500 text-sm mb-4">Low tech score + high revenue = biggest opportunity</p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {businesses.filter(b => b.tech <= 5)
                .sort((a,b) => b.revenue - a.revenue)
                .slice(0,8)
                .map(b => (
                  <div key={b.name} className="bg-white rounded-xl shadow p-4"
                       style={{ borderLeft: `5px solid ${CAT_COLORS[b.category]}` }}>
                    <div className="font-bold text-gray-800">{b.name}</div>
                    <div className="text-sm text-gray-500">{b.category} • {b.location}</div>
                    <div className="flex gap-4 mt-2 text-sm">
                      <span>💰 ${(b.revenue/1e6).toFixed(1)}M</span>
                      <span>🤖 Tech: {b.tech}/10</span>
                      <span className="text-red-500 font-bold">Gap: {10-b.tech}/10</span>
                    </div>
                  </div>
                ))}
            </div>

            <h3 className="font-bold text-gray-800 mb-4">💡 AI Recommendations</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                ["Flying Bridge Restaurant", "AI chatbot for reservations — reduce staff workload 40%"],
                ["Flying Bridge Marina",     "Online slip booking — real-time availability + auto confirmations"],
                ["Basecamp Brewing",         "POS analytics — track best sellers + peak hours"],
                ["Snowfish Sushi",           "Online ordering — estimated 25% revenue increase"],
                ["Timber Axe Bar & Bowl",    "Event booking — automate lane reservations"],
                ["Three Suns Captiva",       "Vacation rental management — dynamic pricing"],
                ["The Shop at South Peak",   "E-commerce store — sell merchandise online year-round"],
                ["Bluebird Martini Bar",     "Digital loyalty program — reward repeat customers"],
              ].map(([biz, rec]) => (
                <div key={biz} className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-lg">
                  <div className="font-semibold text-sm text-blue-900">{biz}</div>
                  <div className="text-sm text-gray-600 mt-1">{rec}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── SEASONAL ── */}
        {activeTab === "seasonal" && (
          <div className="pb-8">
            <div className="bg-white rounded-xl shadow p-5 mb-6">
              <h3 className="font-bold text-gray-800 mb-4">Seasonal Revenue Patterns</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={seasonData}>
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Summer"     stroke="#f39c12" strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="Winter"     stroke="#2196F3" strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="Year-Round" stroke="#27ae60" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {["Summer","Winter","Year-Round"].map((season, si) => {
                const colors = ["#f39c12","#2196F3","#27ae60"]
                const biz = businesses.filter(b => b.season === season)
                return (
                  <div key={season}>
                    <h4 className="font-bold mb-2" style={{ color: colors[si] }}>{season} Businesses</h4>
                    {biz.map(b => (
                      <div key={b.name} className="bg-white rounded-lg shadow-sm p-3 mb-2"
                           style={{ borderLeft: `4px solid ${colors[si]}` }}>
                        <div className="font-semibold text-sm">{b.name}</div>
                        <div className="text-xs text-gray-500">${(b.revenue/1e6).toFixed(1)}M • {b.location}</div>
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ── DIRECTORY ── */}
        {activeTab === "directory" && (
          <div className="pb-8">
            <div className="flex gap-2 flex-wrap mb-4">
              {cats.map(c => (
                <button key={c} onClick={() => setCatFilter(c)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    catFilter === c ? "text-white shadow" : "bg-white text-gray-600 shadow-sm"
                  }`}
                  style={{ background: catFilter === c ? (CAT_COLORS[c] || "#1a5276") : undefined }}>
                  {c}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 mb-4">Showing {filtered.length} businesses</p>
            <div className="grid md:grid-cols-2 gap-4">
              {filtered.map(b => (
                <div key={b.name} className="bg-white rounded-xl shadow p-4"
                     style={{ borderLeft: `6px solid ${CAT_COLORS[b.category]}` }}>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-gray-800">{b.name}</div>
                      <div className="text-sm text-gray-500">{b.category} • {b.location} • {b.employees} employees</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-blue-800">${(b.revenue/1e6).toFixed(1)}M</div>
                      <div className="text-xs text-green-600">↑ {b.growth}%</div>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-3 text-xs text-gray-500">
                    <span>📅 {b.season}</span>
                    <span>🤖 Tech: {"🟢".repeat(b.tech)}{"⚪".repeat(10-b.tech)} {b.tech}/10</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── CO-OP PLAN ── */}
        {activeTab === "coop" && (
          <div className="pb-8">
            <h3 className="font-bold text-gray-800 mb-1">🎯 What I'd Build During the Co-op</h3>
            <p className="text-gray-500 text-sm mb-5">6 projects mapped to Waterside's biggest opportunities</p>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {PROJECTS.map(p => (
                <div key={p.title} className="bg-white rounded-xl shadow p-5"
                     style={{ borderLeft: `6px solid ${p.color}` }}>
                  <div className="font-bold text-gray-800 text-base">{p.title}</div>
                  <div className="text-sm text-gray-500 mt-1">📍 {p.biz}</div>
                  <div className="flex gap-3 mt-3 flex-wrap">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-xs">
                      ⏱️ {p.month}
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-xs">
                      💻 {p.stack}
                    </span>
                  </div>
                  <div className="mt-3 bg-green-50 text-green-700 px-3 py-2 rounded-lg text-xs font-semibold">
                    💰 {p.impact}
                  </div>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <h3 className="font-bold text-gray-800 mb-4">📅 6-Month Timeline</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
              {[
                { m: "Month 1", tasks: ["Portfolio Dashboard","AI Lead Portal","Codebase onboarding"], c: "#e74c3c" },
                { m: "Month 2", tasks: ["Marina Booking","Lead Portal launch","First production deploy"], c: "#e67e22" },
                { m: "Month 3", tasks: ["Tides Hotel Booking","Dashboard v2","Analytics"], c: "#f1c40f" },
                { m: "Month 4", tasks: ["E-commerce store","Performance optimization","User testing"], c: "#2ecc71" },
                { m: "Month 5", tasks: ["Event Booking","Mobile optimization","SEO"], c: "#3498db" },
                { m: "Month 6", tasks: ["Polish + bugfixes","Documentation","New features"], c: "#9b59b6" },
              ].map(({ m, tasks, c }) => (
                <div key={m} className="bg-white rounded-xl shadow p-3"
                     style={{ borderTop: `4px solid ${c}` }}>
                  <div className="font-bold text-sm mb-2" style={{ color: c }}>{m}</div>
                  {tasks.map(t => (
                    <div key={t} className="text-xs text-gray-600 mb-1">• {t}</div>
                  ))}
                </div>
              ))}
            </div>

            {/* About me */}
            <div className="bg-blue-900 text-white rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2">👩‍💻 Vaishnavi Gajarla</h3>
              <p className="text-blue-200 text-sm mb-3">
                MS Data Analytics Engineering @ Northeastern University | GPA 3.7
              </p>
              <p className="text-sm opacity-90 mb-4">
                I built this dashboard specifically for Waterside Group to show how I think about
                technology across your portfolio. I'm excited to contribute to your co-op team in
                Fall 2026 - shipping real products that drive real business impact across your 20+ brands.
              </p>
              <div className="flex gap-4 text-sm">
                <span>📧 gajarla.v@northeastern.edu</span>
                <span>🔗 github.com/1825Vaishnavi</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}