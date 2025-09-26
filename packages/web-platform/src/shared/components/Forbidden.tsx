import { CaretLeft } from '@phosphor-icons/react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from 'antd';

export function Forbidden() {
  const navigate = useNavigate();

  return (
    <div className="max-w-312 m-auto max-h-208 h-screen flex justify-center items-center flex-col relative">
      <Button
        className="absolute top-4 left-4 text-xl items-center"
        type="text"
        onClick={() => navigate({ to: '/' })}
      >
        <CaretLeft size={20} />
        Back
      </Button>

      <h1 className="text-5xl font-semibold mb-6">Error 403 - Forbidden</h1>
      <div className="text-xl">
        You don&apos;t have permission to access this page..
      </div>
      <div className="text-xl">
        Please contact your organization&apos;s administrator for assistance.
      </div>
    </div>
  );
}
