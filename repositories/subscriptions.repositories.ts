import { createServerSupabase } from '@/lib/supabase/server';
const supabase = createServerSupabase();


export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number; // yearly price per month (e.g. $24 instead of $29)
  features: string[];
  isPopular: boolean;
  ctaText: string;
}


export async function getSubscriptions() {
  const { data, error } = await supabase.from("subscriptions").select("*");

  if (error) {
    throw error;
  }
  console.log(data);

  const plans: SubscriptionPlan[] = data.map((plan) => {
    return {
      id: plan.id,
      name: plan.name,
      description: plan.description,
      monthlyPrice: plan.monthlyPrice,
      yearlyPrice: plan.yearlyPrice,
      features: plan.features,
      isPopular: plan.popular,
      ctaText: plan.ctaText,
    }
  });

  return plans;
}