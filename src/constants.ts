import type { Props } from "astro";
import IconGitHub from "@/assets/icons/IconGitHub.svg";
import IconLinkedin from "@/assets/icons/IconLinkedin.svg";
import IconRss from "@/assets/icons/IconRss.svg";
import { SITE } from "@/config";

interface Social {
  name: string;
  href: string;
  linkTitle: string;
  icon: (_props: Props) => Element;
}

export const SOCIALS: Social[] = [
  {
    name: "GitHub",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `Me on GitHub`,
    icon: IconGitHub,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/simonberube/",
    linkTitle: `Me on LinkedIn`,
    icon: IconLinkedin,
  },
  {
    name: "RSS",
    href: "/rss.xml",
    linkTitle: `RSS feed`,
    icon: IconRss,
  },
] as const;

export const SHARE_LINKS: Social[] = [] as const;
