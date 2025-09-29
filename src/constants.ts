import type { Props } from "astro";
import IconBrandBlueSky from "@/assets/icons/IconBrandBluesky.svg";
import IconBrandX from "@/assets/icons/IconBrandX.svg";
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
    name: "BlueSky",
    href: "https://bsky.app/profile/m1sterb.bsky.social/",
    linkTitle: `Follow me on BlueSky`,
    icon: IconBrandBlueSky,
  },
  {
    name: "Email",
    href: "mailto:contact@devbites.info",
    linkTitle: `Contact me by email`,
    icon: IconMail,
  },
] as const;

export const SHARE_LINKS: Social[] = [
  {
    name: "X",
    href: "https://x.com/intent/post?url=",
    linkTitle: `Share this post on X`,
    icon: IconBrandX,
  },
  {
    name: "Mail",
    href: "mailto:?subject=See%20this%20post&body=",
    linkTitle: `Share this post via email`,
    icon: IconMail,
  },
  {
    name: "BlueSky",
    href: "https://bsky.app/intent/compose?text=",
    linkTitle: `Share this post on BlueSky`,
    icon: IconBrandBlueSky,
  },
  {
    name: 'LinkedIn',
    href: `https://www.linkedin.com/sharing/share-offsite/?url=`,
    linkTitle: `Share this post on LinkedIn`,
    icon: IconLinkedin,
  }
] as const;
