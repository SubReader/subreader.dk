export type PlanID = string;
export type Features = Array<String>;
export type BillingInterval = "monthly" | "yearly";
export type Country = string;
export type ReeplanID = string;
export type Price = {
  amount: number;
  currency: string;
  currencySymbol: string;
};

export type Feature = {
  description: string;
};

export type PlanAppearance = {
  title: string;
  features: Array<Feature>;
  colors: Array<string>;
};

export type Plan = {
  id: PlanID;
  billingInterval: BillingInterval;
  country?: Country;
  price: Price;
  features: Features;
  appearance?: PlanAppearance;
  reepayPlanId: ReeplanID;
};

export type AvailablePlans = Array<Plan>;
