import { FC } from 'react';
import { parse } from 'yaml';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Nav } from '@/core/types';
import Link from 'next/link';

const NAV_FILE = join(process.cwd(), `content/navigation.yml`);

export const Navigation: FC = () => {
  const nav: Nav = parse(readFileSync(NAV_FILE, 'utf8'));
  return (
    <nav className="flex justify-between items-center h-14 bg-dark-10 border-b border-line-20 font-head text-2xl px-3">
      <div>Home</div>
      <ul className="flex gap-4">
        {nav.mainNavigation.map((item) => {
          const Comp = item.external ? 'a' : Link;
          return (
            <li key={item.url}>
              <Comp href={item.url}>{item.label}</Comp>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
