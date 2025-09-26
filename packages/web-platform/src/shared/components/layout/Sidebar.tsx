import type { TranslationKey } from '@ocr-platform/shared/i18n';

import { useLocation, useNavigate } from '@tanstack/react-router';
import { Avatar, Button, Input, Layout } from 'antd';
import { useState } from 'react';

import {
  IconDashboard,
  IconLogout,
  IconScan,
  IconSearch,
  IconTranslate,
} from '~/assets/icons';
import { useAuth } from '~/auth/hooks/useAuth';
import { ProgressBar } from '~shared/components/progress/ProgressBar';
import { useTranslation } from '~shared/hooks/useTranslation';
import { Path } from '~shared/types/route.type';
import { cn } from '~shared/utils/cn.util';

type NavItem = {
  path: Path;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  labelKey: TranslationKey;
};

export function Sidebar() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { t } = useTranslation();
  const currentPath = useLocation({ select: location => location.pathname });
  const [searchValue, setSearchValue] = useState('');

  const NAV_ITEMS: Array<NavItem> = [
    { path: '/ocr', icon: IconScan, labelKey: 'navigation.ocr' },
    {
      path: '/dashboard',
      icon: IconTranslate,
      labelKey: 'navigation.translate',
    },
    {
      path: '/dashboard',
      icon: IconDashboard,
      labelKey: 'navigation.dashboard',
    },
  ];

  return (
    <Layout.Sider
      trigger={null}
      collapsible
      className="bg-white border-r border-border-light"
      collapsedWidth={96}
      width={312}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col">
          <div className="px-6 pt-8">
            <div className="relative mb-6">
              <Input
                placeholder={t('common.search')}
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                className="bg-white rounded-lg border-border-lighter shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
                prefix={<IconSearch className="text-text-light" />}
              />
            </div>

            <div className="space-y-1">
              {NAV_ITEMS.map(item => {
                const isActive = currentPath.startsWith(item.path);
                return (
                  <div
                    key={item.path}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer',
                      isActive
                        ? 'bg-bg-active text-text-secondary'
                        : 'hover:bg-bg-muted text-text-lighter'
                    )}
                    onClick={() => item.path && navigate({ to: item.path })}
                  >
                    <item.icon
                      className={cn(
                        'w-6 h-6',
                        isActive ? 'text-primary-light' : 'text-text-lightest'
                      )}
                    />
                    <span
                      className={cn(
                        'text-base',
                        isActive ? 'font-semibold' : 'font-medium'
                      )}
                    >
                      {t(item.labelKey)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="px-4 pb-8 flex flex-col gap-6">
          <div className="bg-bg-tertiary rounded-lg p-5 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-text-primary">
                {t('credits.yourCredit')}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-sm text-text-muted">
                {t('credits.scanCredit')}
              </span>
              <ProgressBar
                value={8}
                max={10}
                label={t('credits.creditUsage', { used: 8, total: 10 })}
              />
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-sm text-text-muted">
                {t('credits.translateCredit')}
              </span>
              <ProgressBar
                value={8}
                max={10}
                label={t('credits.creditUsage', { used: 8, total: 10 })}
              />
            </div>

            <div className="flex justify-between">
              <Button
                type="link"
                className="text-sm font-semibold text-text-muted p-0"
              >
                {t('credits.dismiss')}
              </Button>
              <Button
                type="link"
                className="text-sm font-semibold text-primary-light p-0"
              >
                {t('credits.upgradePlan')}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-border-light pt-6 px-2 relative">
            <div className="flex items-center gap-3">
              <Avatar size={40} src={user?.pictureUrl} />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-text-tertiary">
                  {user?.name || 'Olivia Rhye'}
                </span>
                <span className="text-sm text-text-muted">
                  {user?.email || 'olivia@untitledui.com'}
                </span>
              </div>
            </div>
            <Button
              type="text"
              className="absolute right-2 top-6 p-2"
              icon={<IconLogout className="w-5 h-5 text-text-muted" />}
              onClick={signOut}
            />
          </div>
        </div>
      </div>
    </Layout.Sider>
  );
}
