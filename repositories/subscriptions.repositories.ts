import { createServerSupabase } from '@/lib/supabase/server';
const supabase = createServerSupabase();


export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  isPopular: boolean;
  ctaText: string;
  monthlyRezId: string;
  yearlyRezId: string;
}


export async function getSubscriptions() {
  const { data, error } = await supabase.from("subscriptions").select("*");

  if (error) {
    throw error;
  }

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
      monthlyRezId: plan.razorpay_monthly_id,
      yearlyRezId: plan.razorpay_yearly_id,
    };
  });

  return plans;
}