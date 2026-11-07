"use client";

import { AlertCircle, CheckCircle2, MapPin, TrendingUp } from "lucide-react";
import type { Sale } from "../lib/forecast";

const taka = new Intl.NumberFormat("en-BD", { style: "currency", currency: "BDT", maximumFractionDigits: 0 });

export function StorePerformance({ sales, activeStore, onSelect }: { sales: Sale[]; activeStore: string; onSelect: (store: string) => void }) {
  const stores = [...new Set(sales.map(s => s.storeId))];
  const total = sales.reduce((sum, s) => sum + s.quantity, 0) || 1;
  return <section className="insight-card"><header><div><p className="section-label">STORE PERFORMANCE</p><h3>Contribution by location</h3></div><MapPin size={18}/></header><div className="store-rows">{stores.map((store, index) => {
    const units = sales.filter(s => s.storeId === store).reduce((sum, s) => sum + s.quantity, 0);
    const share = units / total * 100;
    return <button key={store} className={activeStore === store ? "selected" : ""} onClick={() => onSelect(activeStore === store ? "All stores" : store)}><span className={`marker marker-${index}`}/><strong>{store}</strong><b>{share.toFixed(0)}%</b><i><em style={{ width: `${share}%` }}/></i><small>{units.toLocaleString()} units</small></button>;
  })}</div></section>;
}

export function CategoryPerformance({ sales, activeCategory, onSelect }: { sales: Sale[]; activeCategory: string; onSelect: (category: string) => void }) {
  const rows = Object.entries(sales.reduce<Record<string, number>>((result, sale) => { result[sale.category] = (result[sale.category] || 0) + sale.quantity * sale.unitPrice; return result; }, {})).sort((a, b) => b[1] - a[1]);
  const total = rows.reduce((sum, [, value]) => sum + value, 0) || 1;
  return <section className="insight-card"><header><div><p className="section-label">CATEGORY PERFORMANCE</p><h3>Revenue contribution</h3></div><TrendingUp size={18}/></header><div className="category-rows">{rows.map(([name, value], index) => <button key={name} className={activeCategory === name ? "selected" : ""} onClick={() => onSelect(activeCategory === name ? "All categories" : name)}><span className={`marker marker-${index}`}/><strong>{name}</strong><b>{taka.format(value)}</b><i><em style={{ width: `${value / total * 100}%` }}/></i><small>{(value / total * 100).toFixed(1)}% of revenue</small></button>)}</div></section>;
}

export function Actions({ reorder, missingDays, promotionLift, onPlan, onForecast, onQuality }: { reorder: number; missingDays: number; promotionLift: number; onPlan: () => void; onForecast: () => void; onQuality: () => void }) {
  const items = [
    { title: "Issue replenishment plan", text: `Prepare an order for ${reorder.toLocaleString()} units.`, type: "priority", icon: <AlertCircle />, action: onPlan, label: "Export plan" },
    { title: "Review promotion impact", text: `${promotionLift >= 0 ? "+" : ""}${promotionLift.toFixed(1)}% sales lift against baseline.`, type: "signal", icon: <TrendingUp />, action: onForecast, label: "Open forecast" },
    { title: "Confirm data quality", text: missingDays ? `${missingDays} missing dates need review.` : "Daily reporting coverage is complete.", type: "success", icon: <CheckCircle2 />, action: onQuality, label: "View checks" },
  ];
  return <section className="action-card"><header><div><p className="section-label">ACTION QUEUE</p><h3>Priority actions</h3></div><span>{items.length}</span></header>{items.map(item => <article key={item.title}><div className={item.type}>{item.icon}</div><section><b>{item.title}</b><p>{item.text}</p><button onClick={item.action}>{item.label} →</button></section></article>)}</section>;
}
