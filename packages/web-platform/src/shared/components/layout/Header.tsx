import { SignOut } from '@phosphor-icons/react';
import { Avatar, Badge, Button, Divider, Layout, Menu, Popover } from 'antd';

import { IconNotification, IconScan } from '~/assets/icons';
import { useAuth } from '~/auth/hooks/useAuth';
import { LanguageSelector } from '~shared/components/LanguageSelector';
import { useTranslation } from '~shared/hooks/useTranslation';
import { cn } from '~shared/utils/cn.util';

export function Header() {
  const { user, signOut } = useAuth();
  const { t } = useTranslation();

  return (
    <Layout.Header className="bg-[#2970FF] px-6 py-0 flex items-center justify-between h-12 w-full z-10">
      <div className="flex items-center gap-1">
        <IconScan className="text-white w-[30px] h-[30px]" />
        <span className="text-white text-2xl font-semibold">OCR Scan</span>
      </div>

      <div className="flex items-center gap-4">
        <LanguageSelector />

        <Badge count={4} size="small">
          <Button
            type="text"
            className="text-white flex items-center justify-center p-0 w-6 h-6"
            icon={<IconNotification className="text-white w-6 h-6" />}
          />
        </Badge>

        <Popover
          content={
            <div className="bg-white rounded-2.5 py-1 flex flex-col w-60">
              <Avatar size={32} src={user?.pictureUrl} className="mb-1.5" />
              <span className="mb-1 font-semibold">{user?.name}</span>
              <span className="text-gray-2">{user?.email}</span>

              <Divider
                variant="dashed"
                className="-mx-3 w-[calc(100%+24px)] my-4"
              />

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

              <div className="w-max mx-auto text-gray-2 text-xs">
                Version 1.0.2
              </div>
            </div>
          }
          arrow={false}
          placement="bottomRight"
        >
          <Button type="text" className="flex items-center gap-1 p-0">
            <Avatar size={32} src={user?.pictureUrl} />
            <span className="text-white font-medium">{user?.name}</span>
          </Button>
        </Popover>
      </div>
    </Layout.Header>
  );
}
