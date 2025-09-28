import type { Props } from "astro";
import IconBrandBlueSky from "@/assets/icons/IconBrandBluesky.svg";
import IconGitHub from "@/assets/icons/IconGitHub.svg";
import IconLinkedin from "@/assets/icons/IconLinkedin.svg";
import IconMail from "@/assets/icons/IconMail.svg";

interface Social {
  name: string;
  href: string;
  linkTitle: string;
  icon: (_props: Props) => Element;
}

export const SOCIALS: Social[] = [
  {
    name: "GitHub",
    href: "https://github.com/sberube",
    linkTitle: `See my GitHub profile`,
    icon: IconGitHub,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/simonberube/",
    linkTitle: `Follow me on LinkedIn`,
    icon: IconLinkedin,
  },
  {
    name: "Bluesky",
    href: "https://bsky.app/profile/m1sterb.bsky.social/",
    linkTitle: `Follow me on Bluesky`,
    icon: IconBrandBlueSky,
  },
  {
    name: "Email",
    href: "mailto:contact@devbites.info",
    linkTitle: `Contact me by email`,
    icon: IconMail,
  },
] as const;

export const SHARE_LINKS: Social[] = [] as const;
