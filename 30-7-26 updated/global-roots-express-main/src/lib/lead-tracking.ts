type LeadEventName =
  | "generate_lead"
  | "whatsapp_click"
  | "email_click"
  | "phone_click"
  | "catalogue_download";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Sends a conversion event only when an analytics tag has been configured by
 * the deployment. The browser event is also useful to a tag manager without
 * coupling the site to one particular analytics provider.
 */
export function trackLeadEvent(name: LeadEventName, parameters: Record<string, string> = {}) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(new CustomEvent("sheshaan:lead", { detail: { name, ...parameters } }));
  window.gtag?.("event", name, parameters);
}
