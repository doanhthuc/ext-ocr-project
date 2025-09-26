import { CaretLeft } from '@phosphor-icons/react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from 'antd';

import IMAGE_NOT_FOUND from '~/assets/images/404.png';
import { DashboardIllustration } from '~shared/components/DashboardIllustration';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 min-h-screen">
      <div className="flex justify-center items-center flex-col relative">
        <Button
          className="absolute top-4 left-4 text-xl items-center"
          type="text"
          onClick={() => navigate({ to: '/' })}
        >
          <CaretLeft size={20} />
          Back
        </Button>

        <h1 className="text-5xl font-semibold mb-6">Page not found</h1>
        <img width={200} height={150} src={IMAGE_NOT_FOUND} className="mb-6" />
        <div className="text-xl">Requested action could not be completed.</div>
        <div className="text-xl">
          Please contact your organization&apos;s administrator for assistance.
        </div>
      </div>

      <DashboardIllustration />
    </div>
  );
}
