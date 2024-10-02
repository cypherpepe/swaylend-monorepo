'use client';

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { appConfig } from '@/configs';
import { useTrackExternalPageView } from '@/lib/posthog';
import { cn } from '@/lib/utils';
import { MARKET_MODE, useMarketStore } from '@/stores';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import {
  ChartLine,
  ChevronDown,
  Coins,
  ExternalLink,
  LayoutDashboard,
  Menu,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Logo from '/public/icons/dark-logo.svg?url';
import LogoIcon from '/public/icons/sway-icon-logo.svg?url';
import { Line } from '../Line';
import { MarketSwitcher } from '../MarketSwitcher';
import { Button } from '../ui/button';
import { ConnectButton } from './ConnectButton';
import { Points } from './Points';

const NAVBAR_LINKS = [
  { href: '/market', label: 'Market', icon: <ChartLine /> },
  // TODO: Uncomment when mainnet is ready
  // ...(appConfig.env === 'testnet'
  //   ? [{ href: '/faucet', label: 'Faucet', icon: <Coins /> }]
  //   : []),
  { href: '/faucet', label: 'Faucet', icon: <Coins /> },
];

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { marketMode, changeMarketMode } = useMarketStore();
  // const { mutate: trackExternalPageView } = useTrackExternalPageView();

  return (
    <>
      {/* DESKTOP */}
      <div className="max-lg:hidden">
        <div className="flex justify-between items-center px-16 min-h-[93px]">
          <div className="flex items-center gap-x-[70px]">
            <Link href="/">
              <Image src={Logo} alt="logo" />
            </Link>
            <div className="flex items-center gap-x-[25px] h-full">
              <div>
                <button
                  type="button"
                  onClick={() => {
                    changeMarketMode(MARKET_MODE.BORROW);
                    router.push('/');
                  }}
                  className={cn(
                    pathname === '/' && marketMode === MARKET_MODE.BORROW
                      ? 'text-primary'
                      : 'text-lavender',
                    (pathname !== '/' || marketMode !== MARKET_MODE.BORROW) &&
                      'hover:text-lavender/80',
                    'flex items-center cursor-pointer justify-center text-md font-semibold min-h-[93px]'
                  )}
                >
                  Borrow
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    changeMarketMode(MARKET_MODE.LEND);
                    router.push('/');
                  }}
                  className={cn(
                    pathname === '/' && marketMode === MARKET_MODE.LEND
                      ? 'text-primary'
                      : 'text-lavender',
                    (pathname !== '/' || marketMode !== MARKET_MODE.LEND) &&
                      'hover:text-lavender/80',
                    'flex items-center cursor-pointer justify-center text-md font-semibold  min-h-[93px]'
                  )}
                >
                  Earn
                </button>
              </div>
              {NAVBAR_LINKS.map(({ href, label }) => (
                <Link key={href} href={href}>
                  <div
                    className={cn(
                      pathname === href ? 'text-primary' : 'text-lavender',
                      pathname !== href && 'hover:text-lavender/80',
                      'flex items-center justify-center text-md font-semibold  min-h-[93px]'
                    )}
                  >
                    {label}
                  </div>
                </Link>
              ))}
            </div>
            {/* <DropdownMenu>
              <DropdownMenuTrigger>
              <div className="text-lavender outline-none border-none focus:outline-none focus:border-none hover:text-lavender/80 text-md font-semibold flex items-center gap-x-1">
                  Bridges
                  <ChevronDown className="w-4 h-4" />
                  </div>
                  </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <div
                    onMouseDown={() => {
                      trackExternalPageView('https://app.uniswap.io/1');
                      window.open('https://app.uniswap.io', '_blank');
                    }}
                    rel="noreferrer"
                    className="w-full"
                  >
                    <div className="w-full flex items-center justify-between text-md font-medium text-lavender py-1 px-0.5 gap-x-2 cursor-pointer hover:underline">
                      Bridge 1
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div
                    onMouseDown={() => {
                      trackExternalPageView('https://app.uniswap.io/2');
                      window.open('https://app.uniswap.io', '_blank');
                    }}
                    className="w-full"
                  >
                    <div className="w-full flex items-center justify-between text-md font-medium text-lavender py-1 px-0.5 gap-x-2 cursor-pointer hover:underline">
                      Bridge 2
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="text-lavender outline-none border-none focus:outline-none focus:border-none hover:text-lavender/80 text-md font-semibold flex items-center gap-x-1">
                  DEX
                  <ChevronDown className="w-4 h-4" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <div
                    onMouseDown={() => {
                      trackExternalPageView('https://app.uniswap.io/3');
                      window.open('https://app.uniswap.io', '_blank');
                    }}
                    rel="noreferrer"
                    className="w-full"
                  >
                    <div className="w-full flex items-center justify-between text-md font-medium text-lavender py-1 px-0.5 gap-x-2 cursor-pointer hover:underline">
                      DEX 1
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div
                    onMouseDown={() => {
                      trackExternalPageView('https://app.uniswap.io/4');
                      window.open('https://app.uniswap.io', '_blank');
                    }}
                    className="w-full"
                  >
                    <div className="w-full flex items-center justify-between text-md font-medium text-lavender py-1 px-0.5 gap-x-2 cursor-pointer hover:underline">
                      DEX 2
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
          </div>
          <div className="flex items-center gap-x-2">
            <Points />
            <ConnectButton />
          </div>
        </div>
        <Line />
      </div>

      {/* MOBILE */}
      <div className="hidden max-lg:block">
        <div className="flex justify-between items-center px-4 h-[80px]">
          <Link href="/">
            <Image src={LogoIcon} alt="logo" />
          </Link>
          <div className="flex items-center gap-x-2">
            <Points />
            <div className="hidden md:block">
              <MarketSwitcher />
            </div>
            <ConnectButton />
            <Button
              onMouseDown={() => setOpen(true)}
              className="rounded-full w-[40px] h-[40px] p-0"
              variant="secondary"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <Line />
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent className="h-screen">
            <VisuallyHidden.Root>
              <DrawerHeader>
                <DrawerTitle>Hamburger Menu</DrawerTitle>
              </DrawerHeader>
            </VisuallyHidden.Root>
            <div className="flex flex-col items-center w-full h-full justify-center">
              <div className="flex justify-between w-full items-center px-4 h-[80px]">
                <a href="https://swaylend.com" target="_blank" rel="noreferrer">
                  <Image src={LogoIcon} alt="logo" />
                </a>
                <Button
                  onMouseDown={() => setOpen(false)}
                  className="rounded-full w-[40px] h-[40px] p-0"
                  variant="secondary"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="h-full flex flex-col justify-between items-start px-8 w-full py-16 mt-8">
                <div className="flex flex-col w-full h-full items-start gap-y-8  pt-16">
                  <Link href="/" onMouseDown={() => setOpen(false)}>
                    <div
                      className={cn(
                        pathname === '/' ? 'text-primary' : 'text-lavender',
                        pathname !== '/' && 'hover:text-lavender/80',
                        'flex font-bold text-xl items-center gap-x-2 h-full'
                      )}
                    >
                      Dashboard
                    </div>
                  </Link>
                  {NAVBAR_LINKS.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      onMouseDown={() => setOpen(false)}
                    >
                      <div
                        className={cn(
                          pathname === href ? 'text-primary' : 'text-lavender',
                          pathname !== href && 'hover:text-lavender/80',
                          'flex font-bold text-xl items-center gap-x-2 h-full'
                        )}
                      >
                        {label}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};