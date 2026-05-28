"use client";

// import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { BackButton } from "./utils";
import styles from "./subscriptions.module.css";

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number; // yearly price per month (e.g. $24 instead of $29)
  features: string[];
  isPopular: boolean;
  ctaText: string;
}

const PLANS: SubscriptionPlan[] = [
  {
    id: "plus",
    name: "Plus",
    description: "Unlock uninterrupted learning and progress faster through structured coding education",
    monthlyPrice: 199,
    yearlyPrice: 159,
    features: [
      "Unlimited Energy",
      "Streak Pass",
      "Unlimited Solutions",
      "Detailed Profile Statistics",
      "Early Access Features"
    ],
    isPopular: false,
    ctaText: "Start Learning"
  },
  {
    id: "pro",
    name: "Pro",
    description: "Unlock advanced systems, premium labs, and deeper engineering experiences",
    monthlyPrice: 286,
    yearlyPrice: 229,
    features: [
      "Everything in Plus",
      "Full Labs Access",
      "Detailed Learning Analytics",
      "Advanced Challenges",
      "Exclusive Advanced Features"
    ],
    isPopular: true,
    ctaText: "Get An Upgrade"
  },
  {
    id: "elite",
    name: "Elite",
    description: "Designed for developers aiming for top tech careers with premium mentorship and reviews.",
    monthlyPrice: 599,
    yearlyPrice: 479,
    features: [
      "Everything included in the Pro tier",
      "1-on-1 monthly video mentorship session",
      "Quarterly resume & portfolio reviews",
      "Access to exclusive masterclasses",
      "Guaranteed priority support under 2 hours",
      "Exclusive mock interview preparation"
    ],
    isPopular: false,
    ctaText: "Unlock Elite Access"
  }
];

export default function SubscriptionList() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");


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
        {PLANS.map((plan) => {
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
