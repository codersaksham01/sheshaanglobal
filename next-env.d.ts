declare module "next" {
  export interface Metadata {
    metadataBase?: URL;
    title?: string | { default: string; template?: string };
    description?: string;
    keywords?: string[];
    alternates?: {
      canonical?: string;
      languages?: Record<string, string>;
    };
    robots?: Record<string, unknown> | string;
    openGraph?: Record<string, unknown>;
    twitter?: Record<string, unknown>;
  }

  export namespace MetadataRoute {
    export interface Robots {
      rules:
        | {
            userAgent?: string | string[];
            allow?: string | string[];
            disallow?: string | string[];
          }
        | Array<{
            userAgent?: string | string[];
            allow?: string | string[];
            disallow?: string | string[];
          }>;
      sitemap?: string | string[];
      host?: string;
    }

    export type Sitemap = Array<{
      url: string;
      lastModified?: string | Date;
      changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
      priority?: number;
      alternates?: {
        languages?: Record<string, string>;
      };
    }>;
  }
}

declare module "next/link" {
  export interface LinkProps {
    href: string;
    className?: string;
    target?: string;
    rel?: string;
    title?: string;
    id?: string;
    prefetch?: boolean;
    children?: import("react").ReactNode;
    [key: string]: unknown;
  }
  export default function Link(props: LinkProps): import("react").ReactElement | null;
}

declare module "next/navigation" {
  export function notFound(): never;
  export function redirect(url: string): never;
  export function usePathname(): string;
  export function useRouter(): {
    push: (href: string) => void;
    replace: (href: string) => void;
    back: () => void;
  };
}
