# BazarSight — Bangladesh Retail Intelligence

A full, free-to-run Bangladesh retail intelligence application. BazarSight converts daily sales history into product/store-level demand outlooks, projected revenue in Bangladeshi Taka (৳), and reorder quantities.

## Features

- Interactive product and store filters
- 7, 30, and 90-day demand forecasts
- Model selection via rolling holdout validation: seasonal naive, trend regression, and seasonal-trend regression compete on historical accuracy
- The strongest historical model is used behind the scenes; the business UI stays focused on decisions rather than model jargon
- Confidence bands from the selected model's validation residuals
- Inventory reorder recommendation with a 15% safety-stock buffer
- CSV import with data validation and exports for demo data and forecasts
- Generated deterministic Bangladesh retail sales data built in (Dhaka, Chattogram, and Sylhet stores; local products and BDT prices)—no API key, server, or paid service needed
- Scenario slider for demand increases/decreases from -30% to +30%
- Data-health score covering date gaps, duplicate date/store/product keys, and 3σ sales outliers
- Local browser session saving, print-to-PDF reporting, and optional Supabase schema for later cloud persistence

## Bangladesh-ready workspace

The included generated data models a Bangladesh retail operation: Dhaka (Gulshan and Dhanmondi), Chattogram (GEC), and Sylhet (Zindabazar), with BDT pricing and local retail-style products. The application displays all value metrics in Bangladeshi Taka (৳).

## Business decision views

- Executive dashboard: demand, projected revenue, purchase plan, data health, store contribution, and action center
- Demand outlook: actual sales, future demand range, and promotion/growth scenarios
- Inventory planning: reorder quantity, operating buffer, and execution checklist
- Product portfolio: category, stores, units sold, and total sales value

## Data format

```csv
date,store_id,product_id,product_name,category,sales_quantity,unit_price,promotion
2025-01-02,DHK-01,SKU-101,Walton Primo Wireless Earbuds,Electronics,42,2490,false
```

Only `date`, a product identifier/name, and `sales_quantity` are necessary for a forecast. `unit_price` enables revenue projections.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The app starts with no values; upload a CSV or choose **Use generated dataset**. You can also click **Download sample** and upload that file to test the complete import path.

## Deploy to Vercel (free)

Push this folder to GitHub, import the repository in Vercel, and deploy. No environment variables are needed—the application is static and fully client-side.

Before publishing, run `npm run check`. GitHub Actions runs the same test and production-build checks for every pull request and push to `main`.

## Optional Supabase setup

The app works locally without a database. When you are ready to persist projects in the cloud, create a free Supabase project and run [`supabase/schema.sql`](./supabase/schema.sql) in its SQL Editor. The environment-variable names are in `.env.example`.
