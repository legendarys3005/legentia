export async function createSubscription(plan_id: string) {
    const response = await fetch("/api/subscriptions/create",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify({plan_id})
    });

    return response.json();
}