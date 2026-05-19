import { Monitor, Server, Palette } from 'lucide-react';
import type { RoleSection } from '@/components/credits/RoleSectionBlock';
import jihunImg from '@/assets/credits/kim-jihun.webp';
import seongminImg from '@/assets/credits/bae-seongmin.webp';
import junseobImg from '@/assets/credits/lee-junseob.webp';
import changmokImg from '@/assets/credits/lee-changmok.webp';
import seongyunImg from '@/assets/credits/park-seongyun.webp';
import wooskImg from '@/assets/credits/yu-woosk.webp';
import sangminImg from '@/assets/credits/lee-sangmin.webp';
import hyeongcheolImg from '@/assets/credits/seo-hyeongcheol.webp';
import minjungImg from '@/assets/credits/kwon-minjung.webp';
import jieonImg from '@/assets/credits/kim-jieon.webp';
import gyuwonImg from '@/assets/credits/yun-gyuwon.webp';
import seoyunImg from '@/assets/credits/lee-seoyun.webp';

export const ROLES: RoleSection[] = [
  {
    id: 'frontend',
    label: '프론트엔드',
    icon: <Monitor className="size-6 text-white" />,
    members: [
      {
        name: '김지훈',
        major: '글로벌SW융합전공 20학번',
        photo: jihunImg,
        socials: [
          {
            type: 'instagram',
            handle: 'hoon_ground',
            url: 'https://www.instagram.com/hoon_ground?igsh=MXRqbDZzcDliZmJzdA==',
          },
          { type: 'github', handle: 'hoon-ground', url: 'https://github.com/hoon-ground' },
        ],
      },
      {
        name: '배성민',
        major: '심화컴퓨터공학전공 21학번',
        photo: seongminImg,
        socials: [
          { type: 'github', handle: 'BaeSeong-min', url: 'https://github.com/BaeSeong-min' },
        ],
      },
      {
        name: '이준섭',
        major: '글로벌SW융합전공 21학번',
        photo: junseobImg,
        socials: [
          { type: 'instagram', handle: 'junsub0605', url: 'https://www.instagram.com/junsub0605/' },
          { type: 'github', handle: 'SubJeeLee', url: 'https://github.com/SubJeeLee' },
        ],
      },
      {
        name: '이창목',
        major: '글로벌SW융합전공 20학번',
        photo: changmokImg,
        socials: [
          { type: 'instagram', handle: 'lll_0311', url: 'https://www.instagram.com/lll_0311' },
          { type: 'github', handle: 'eelkom', url: 'https://github.com/eelkom' },
        ],
      },
    ],
  },
  {
    id: 'backend',
    label: '백엔드/서버',
    icon: <Server className="size-6 text-white" />,
    members: [
      {
        name: '박성윤',
        major: '글로벌SW융합전공 20학번',
        photo: seongyunImg,
        socials: [
          { type: 'instagram', handle: 'syoon_x', url: 'https://www.instagram.com/syoon_x' },
          { type: 'github', handle: 'syoon-x', url: 'https://github.com/syoon-x' },
        ],
      },
      {
        name: '유우석',
        major: '심화컴퓨터공학전공 20학번',
        photo: wooskImg,
        socials: [
          {
            type: 'instagram',
            handle: 'milk_stone_',
            url: 'https://www.instagram.com/milk_stone_/',
          },
          { type: 'github', handle: 'milk-stone', url: 'https://github.com/milk-stone' },
        ],
      },
      {
        name: '이상민',
        major: '심화컴퓨터공학전공 23학번',
        photo: sangminImg,
        socials: [
          { type: 'instagram', handle: 'minn._n__', url: 'https://www.instagram.com/minn._n__/' },
          { type: 'github', handle: 'lsmin3388', url: 'https://github.com/lsmin3388' },
        ],
      },
      {
        name: '서형철',
        major: '심화컴퓨터공학전공 23학번',
        photo: hyeongcheolImg,
        socials: [
          { type: 'instagram', handle: 'hiron_west', url: 'https://www.instagram.com/hiron_west' },
          { type: 'github', handle: 'wjdqh6544', url: 'https://github.com/wjdqh6544' },
        ],
      },
    ],
  },
  {
    id: 'design',
    label: '디자인',
    icon: <Palette className="size-6 text-white" />,
    members: [
      {
        name: '권민정',
        major: '디자인학과 22학번',
        photo: minjungImg,
        pinkBg: true,
        socials: [{ type: 'instagram', handle: '_13.03mj', url: 'https://instagram.com/_13.03mj' }],
      },
      {
        name: '김지언',
        major: '디자인학과 22학번',
        photo: jieonImg,
        pinkBg: true,
        socials: [
          {
            type: 'instagram',
            handle: 'kzieon',
            url: 'https://www.instagram.com/kzieon?igsh=Mjg2d3QzcHZzd2pj',
          },
        ],
      },
      {
        name: '윤규원',
        major: '글로벌SW융합전공 21학번',
        photo: gyuwonImg,
        pinkBg: true,
        socials: [
          { type: 'instagram', handle: 'bethevvon', url: 'https://instagram.com/bethevvon' },
        ],
      },
      {
        name: '이서윤',
        major: '디자인학과 23학번',
        photo: seoyunImg,
        pinkBg: true,
        socials: [
          {
            type: 'instagram',
            handle: '2222seoyun',
            url: 'https://www.instagram.com/2222seoyun?igsh=Mjd2eXAwdGlxcmhr&utm_source=qr',
          },
        ],
      },
    ],
  },
];
