"use client";

// import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from 'react';
import { BackButton } from "./utils";
import styles from "./subscriptions.module.css";
import { getSubscriptions, SubscriptionPlan } from "@/repositories/subscriptions.repositories";
import { createSubscription } from "@/services/subsctiptions.service";


export default function SubscriptionList() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);

  useEffect(() => {
    getSubscriptions().then(setPlans);
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const formatSubscriptionPrice = (price: number) => {
    return price.toLocaleString('en-IN');
  };

  const calculateYearlyTotal = (pricePerMonth: number) => {
    const totalPrice = pricePerMonth * 12;

    if (totalPrice % 10 === 0) {
      return formatSubscriptionPrice(totalPrice - 1);
    }

    return formatSubscriptionPrice(totalPrice);
  };

  const calculateDiscountPersentage = (monthlyPrice: number, yearlyPrice: number) => {
    const discount = monthlyPrice - yearlyPrice;

    const percentage = discount / yearlyPrice * 100;
    return Math.round(percentage);
  };

  const handleSubscriptions = async (yearlyPlanId: string, monthlyPlanId: string, planName: string, planDesc: string) => {
      const data = await createSubscription(billingCycle == "yearly" ? yearlyPlanId : monthlyPlanId);

      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        subscription_id: data.subscriptionId,

        name: `Legentia — ${planName}`,
        description: planDesc,

        handler: (response: any) => {
          console.log(response);
        }
      };

      const razorpay = new (window as any).Razorpay(options);

      razorpay.open();
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        {/* <Link href="/courses" className={styles.backBtn}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Dashboard
        </Link> */}
        <BackButton />
        <h1 className={styles.title}>Choose Your Path to Mastery</h1>
        <p className={styles.subtitle}>
          Unlock full access to Legentia's interactive learning platform, real-world projects, and expert-led roadmaps. Select the plan that fits your coding goals.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className={styles.tabContainer}>
        <button
          onClick={() => {
            setBillingCycle("monthly");
            // router.push("/subscriptions/monthly");
          }}
          className={`${styles.tabBtn} ${billingCycle === "monthly" ? styles.activeTabBtn : ""}`}
        >
          Monthly
        </button>
        <button
          onClick={() => setBillingCycle("yearly")}
          className={`${styles.tabBtn} ${billingCycle === "yearly" ? styles.activeTabBtn : ""}`}
        >
          Yearly
        </button>
      </div>

      {/* Pricing Grid */}
      <div className={styles.grid}>
        {plans.map((plan) => {
          const price = billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;

          return (
            <div
              key={plan.id}
              className={`${styles.card} ${plan.isPopular ? styles.popularCard : ""}`}
            >
              {plan.isPopular && (
                <div className={styles.popularBadge}>Most Popular</div>
              )}
              {billingCycle === "yearly" && (
                <span className={styles.discountBadge}>Save {calculateDiscountPersentage(plan.monthlyPrice, plan.yearlyPrice)}%</span>
              )}

              <h3 className={styles.planName}>{plan.name}</h3>

              <div className={styles.priceContainer}>
                <div className={styles.priceRow}>
                  <span className={styles.currency}>₹</span>
                  <span className={styles.price}>{formatSubscriptionPrice(price)}</span>
                  <span className={styles.period}>/month</span>
                </div>
                <div className={styles.billingSubtitle}>
                  {billingCycle === "yearly" ? (
                    `Billed annually (₹${calculateYearlyTotal(price)}/year)`
                  ) : (
                    "Billed monthly, cancel anytime"
                  )}
                </div>
              </div>
              <p className={styles.planDesc}><q>{plan.description}</q></p><br />

              <hr className={styles.divider} />

              <ul className={styles.featureList}>
                {plan.features.map((feature, idx) => (
                  <li key={idx} className={styles.featureItem}>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`${styles.featureIcon} ${plan.isPopular ? styles.popularFeatureIcon : ""}`}
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`${styles.ctaBtn} ${plan.isPopular ? styles.popularCtaBtn : ""}`}
                onClick={() => handleSubscriptions(plan.yearlyRezId, plan.monthlyRezId, plan.name, plan.description)}
              >
                {plan.ctaText || "Go " + plan.name}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
