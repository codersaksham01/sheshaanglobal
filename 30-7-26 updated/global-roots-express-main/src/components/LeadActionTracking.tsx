import { useEffect } from "react";
import { trackLeadEvent } from "@/lib/lead-tracking";

/** Tracks commercial actions without changing their destination or behaviour. */
export function LeadActionTracking() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const href = link.href;
      const label = (link.textContent || "").trim().slice(0, 100);
      const parameters = { link_url: href, link_text: label, page_location: window.location.href };

      if (/^https:\/\/wa\.me\//i.test(href)) trackLeadEvent("whatsapp_click", parameters);
      else if (/^mailto:/i.test(href)) trackLeadEvent("email_click", parameters);
      else if (/^tel:/i.test(href)) trackLeadEvent("phone_click", parameters);
      else if (link.hasAttribute("download") || /\/catalogue\.pdf(?:$|[?#])/i.test(href)) {
        trackLeadEvent("catalogue_download", parameters);
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
