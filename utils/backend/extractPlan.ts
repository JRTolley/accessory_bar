type Plan = "Full" | "Pro";

export function extractPlan(planName: string): Plan {
  if (planName.includes("Full")) {
    return "Full";
  }
  if (planName.includes("Pro")) {
    return "Pro";
  } else {
    throw Error("Couldnn't extract planName");
  }
}
