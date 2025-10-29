import type { TranslationKey } from '@ocr-platform/shared/i18n';

import { SignOut } from '@phosphor-icons/react';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { Avatar, Button, Layout, Menu, Popover } from 'antd';

import { IconDashboard, IconScan, IconTranslate } from '~/assets/icons';
import { useAuth } from '~/auth/hooks/useAuth';
import { useTranslation } from '~shared/hooks/useTranslation';
import { Path } from '~shared/types/route.type';
import { cn } from '~shared/utils/cn.util';

type NavItem = {
  path: Path;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  labelKey: TranslationKey;
};

// ChevronDown icon component
function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Sidebar() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { t } = useTranslation();
  const currentPath = useLocation({ select: location => location.pathname });

  const NAV_ITEMS: Array<NavItem> = [
    { path: '/ocr', icon: IconScan, labelKey: 'navigation.ocr' },
    {
      path: '/translate',
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
      style={{
        background: 'linear-gradient(180deg, #000C25 0%, #0049DA 100%)',
      }}
      collapsedWidth={96}
      width={312}
    >
      <div className="flex flex-col justify-between h-full">
        {/* Navigation */}
        <div className="flex flex-col pt-4 pb-0 px-0 gap-8">
          <div className="flex flex-col gap-2 px-4">
            {NAV_ITEMS.map(item => {
              const isActive = currentPath.startsWith(item.path);
              return (
                <div
                  key={item.path}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer',
                    isActive
                      ? 'bg-[#0049DA]'
                      : 'bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.05)]'
                  )}
                  onClick={() => item.path && navigate({ to: item.path })}
                >
                  <item.icon
                    className={cn(
                      'w-6 h-6',
                      isActive ? 'text-white' : 'text-[#7485A9]'
                    )}
                  />
                  <span
                    className={cn(
                      'text-base font-semibold',
                      isActive ? 'text-white' : 'text-[#505F79]'
                    )}
                  >
                    {t(item.labelKey)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-4 px-4 pb-4">
          {/* Credit Card */}
          <div className="bg-[rgba(255,255,255,0.05)] rounded-lg p-5 flex flex-col gap-4">
            <p className="text-sm font-semibold text-white">
              {t('credits.yourCredit')}
            </p>

            {/* Scan Credit */}
            <div className="flex flex-col gap-1">
              <span className="text-sm text-white">
                {t('credits.scanCredit')}
              </span>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-[#F5F6FF] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2970FF] rounded-full"
                    style={{ width: '80%' }}
                  />
                </div>
                <span className="text-sm text-white whitespace-nowrap">
                  {t('credits.creditUsage', { used: 8, total: 10 })}
                </span>
              </div>
            </div>

            {/* Translate Credit */}
            <div className="flex flex-col gap-1">
              <span className="text-sm text-white">
                {t('credits.translateCredit')}
              </span>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-[#F5F6FF] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2970FF] rounded-full"
                    style={{ width: '80%' }}
                  />
                </div>
                <span className="text-sm text-white whitespace-nowrap">
                  {t('credits.creditUsage', { used: 8, total: 10 })}
                </span>
              </div>
            </div>

            {/* Upgrade Button */}
            <Button className="w-full bg-white border border-[#C2C7D0] rounded-full text-[#091E42] text-sm font-medium h-8 hover:bg-gray-50">
              {t('credits.upgradePlan')}
            </Button>
          </div>

          {/* User Profile */}
          <Popover
            content={
              <div className="bg-white rounded-2.5 py-1 flex flex-col w-60">
                <Menu
                  className={cn(
                    'border-none mb-4',
                    '[&_li]:flex [&_li]:items-center [&_li]:m-0 [&_li]:px-2.5'
                  )}
                  items={[
                    {
                      key: 'log-out',
                      icon: <SignOut size={18} />,
                      label: t('auth.signOut'),
                      onClick: signOut,
                    },
                  ]}
                />
              </div>
            }
            arrow={false}
            placement="bottomRight"
          >
            <div className="bg-[rgba(255,255,255,0.05)] rounded-lg p-4 flex items-center gap-1">
              <Avatar size={32} src={user?.pictureUrl} />
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-sm font-semibold text-white truncate">
                  {user?.name || 'Olivia Rhye'}
                </span>
                <span className="text-xs text-white truncate">
                  {user?.email || 'olivia@untitledui.com'}
                </span>
              </div>
              <ChevronDown className="text-white shrink-0" />
            </div>
          </Popover>
        </div>
      </div>
    </Layout.Sider>
  );
}
