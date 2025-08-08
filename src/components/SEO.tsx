import { useEffect } from "react";

type SEOProps = {
  title: string;
  description: string;
  canonical?: string;
  structuredData?: Record<string, any>;
};

const SEO = ({ title, description, canonical, structuredData }: SEOProps) => {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const setProperty = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    setProperty("og:title", title);
    setProperty("og:description", description);

    const url = canonical || window.location.href;
    let link = document.querySelector("link[rel=canonical]") as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", url);

    let scriptEl = document.getElementById("ld-json") as HTMLScriptElement | null;
    if (scriptEl && !structuredData) {
      scriptEl.remove();
    }
    if (structuredData) {
      if (!scriptEl) {
        scriptEl = document.createElement("script");
        scriptEl.id = "ld-json";
        (scriptEl as HTMLScriptElement).type = "application/ld+json";
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(structuredData);
    }
  }, [title, description, canonical, structuredData]);

  return null;
};

export default SEO;