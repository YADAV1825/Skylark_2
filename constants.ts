// Logo URL - ensure this matches the user's uploaded asset in a real deployment
export const LOGO_URL = "https://placehold.co/240x80/0ea5e9/ffffff?text=SKYLARK+Express&font=montserrat";

export const AI_ADVISORY_PROMPT = `
You are a Senior Logistics Consultant for Skylark Express. 
Analyze the customer's shipping request and the generated quotes.

Inputs:
- Route: [ORIGIN] to [DESTINATION]
- Weight: [WEIGHT] kg
- Quotes: [QUOTES_SUMMARY]

Your Task:
1. Briefly analyze the route complexity (e.g., cross-country, local, urban).
2. Recommend the BEST Service Tier (Standard, Speed, or Express) balancing cost vs. reliability for this specific shipment.
3. Provide ONE pro-tip for packaging or documentation.

Tone: Professional, knowledgeable, and concise (max 60 words).
Format: Plain text, no markdown headers.
`;

export const SERVICE_FEATURES = {
  Standard: ["Cost-effective", "Ground transport", "Basic tracking"],
  Speed: ["Air & Ground", "Priority handling", "SMS updates"],
  Express: ["Direct Air", "Next-flight out", "Insurance included"]
};