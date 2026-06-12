import type { Metadata } from "next";
import SubscriptionList from "./SubscriptionList";

export const metadata: Metadata = {
    title: "Pricing & Subscriptions | Legentia",
    description: "Unlock full access to Legentia's interactive learning platform, real-world projects, and expert-led roadmaps. Choose a plan that matches your learning goals.",
};

export default function SubscriptionPage() {

    return <SubscriptionList />;
}