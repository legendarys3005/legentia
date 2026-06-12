import { razorpay } from "@/lib/razorpay/razorpay";

export async function POST(req: Request) {
  const { plan_id } = await req.json();
  const dummy_plan_id = "plan_SzvCcwtLb0iJqO";


  const subscription = await razorpay.subscriptions.create({
    plan_id: dummy_plan_id,
    customer_notify: true,
    total_count: 12,
  });


  return Response.json({
    success: true,
    subscriptionId: subscription.id,
  });
}