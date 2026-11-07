"use client";

import { AlertCircle, CheckCircle2, MapPin, TrendingUp } from "lucide-react";
import type { Sale } from "../lib/forecast";

const taka = new Intl.NumberFormat("en-BD", { style: "currency", currency: "BDT", maximumFractionDigits: 0 });

export function CategoryMix({ sales, active, onSelect }: { sales: Sale[]; active: string; onSelect: (category: string) => void }) {
  const groups = Object.entries(sales.reduce<Record<string, number>>((result, sale) => {
    result[sale.category] = (result[sale.category] || 0) + sale.quantity * sale.unitPrice;
    return result;
  }, {})).sort((a, b) => b[1] - a[1]);
  const total = groups.reduce((sum, [, value]) => sum + value, 0) || 1;
  let progress = 0;
  const slices = groups.map(([, value], index) => {
    const start = progress; progress += value / total * 100;
    return `var(--mix-${index}) ${start}% ${progress}%`;
  }).join(", ");
  return <section className="widget category-widget"><header><div><p>REVENUE MIX</p><h3>Category performance</h3></div><TrendingUp size={18}/></header><div className="mix-body"><div className="donut" style={{ background: `conic-gradient(${slices})` }}><span><b>{groups.length}</b>Categories</span></div><div className="mix-list">{groups.map(([name, value], index) => <button key={name} onClick={() => onSelect(active === name ? "All categories" : name)} className={active === name ? "mix-active" : ""}><i style={{ background: `var(--mix-${index})` }}/><span>{name}</span><b>{(value / total * 100).toFixed(0)}%</b><small>{taka.format(value)}</small></button>)}</div></div></section>;
}

export function StoreBoard({ sales, activeStore, onSelect }: { sales: Sale[]; activeStore: string; onSelect: (store: string) => void }) {
  const stores = [...new Set(sales.map(s => s.storeId))];
  const total = sales.reduce((sum, sale) => sum + sale.quantity, 0) || 1;
  return <section className="widget store-widget"><header><div><p>STORE NETWORK</p><h3>Location contribution</h3></div><MapPin size={18}/></header><div className="store-board">{stores.map((store, index) => { const units = sales.filter(s => s.storeId === store).reduce((sum, s) => sum + s.quantity, 0); const share = units / total * 100; return <button key={store} className={activeStore === store ? "store-active" : ""} onClick={() => onSelect(activeStore === store ? "All stores" : store)}><span className={`store-dot d${index}`}/><strong>{store}</strong><b>{share.toFixed(0)}%</b><i><em style={{ width: `${share}%` }}/></i><small>{units.toLocaleString()} units</small></button>; })}</div></section>;
}

export function AlertBoard({ reorder, missingDays, promotionLift, onExport }: { reorder: number; missingDays: number; promotionLift: number; onExport: () => void }) {
  const alerts = [
    { icon: <AlertCircle />, title: "Replenishment recommended", text: `Prepare an order for ${reorder.toLocaleString()} units.`, button: "Export order", action: onExport, type: "priority" },
    { icon: <TrendingUp />, title: "Promotion signal", text: `${promotionLift >= 0 ? "+" : ""}${promotionLift.toFixed(1)}% unit uplift during promotions.`, button: "Review plan", type: "signal" },
    { icon: <CheckCircle2 />, title: "Data coverage", text: missingDays ? `${missingDays} calendar days need review.` : "No gaps detected in the reporting period.", button: "View quality", type: "good" },
  ];
  return <section className="widget alert-widget"><header><div><p>OPERATIONAL PULSE</p><h3>Action queue</h3></div><span className="alert-count">{alerts.length}</span></header>{alerts.map(alert => <article key={alert.title}><div className={alert.type}>{alert.icon}</div><section><b>{alert.title}</b><p>{alert.text}</p><button onClick={alert.action}>{alert.button} →</button></section></article>)}</section>;
}
