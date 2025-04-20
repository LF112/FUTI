import { IconType, SiBilibili, SiGithub, SiGmail, SiSteamdeck } from '@icons-pack/react-simple-icons';

interface ILink {
  Icon: IconType;
  href: string;
  label: string;
}

export const LINKS: ILink[] = [
  {
    Icon: SiGithub,
    href: 'https://github.com/LF112',
    label: 'Github',
  },
  {
    Icon: SiBilibili,
    href: 'https://space.bilibili.com/131579371',
    label: 'BiliBili',
  },
  {
    Icon: SiSteamdeck,
    href: 'https://steamcommunity.com/id/LF112',
    label: 'Steam',
  },
  {
    Icon: SiGmail,
    href: 'mailto:lf@lf112.net',
    label: 'Email',
  },
];
