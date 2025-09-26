import type { PropsWithChildren } from 'react';

import { Spin } from 'antd';

type SpinnerProps = PropsWithChildren<{
  spinning?: boolean;
}>;

export function Spinner({ spinning, children }: SpinnerProps) {
  return spinning ? (
    <Spin className="my-4 w-full" spinning={spinning} />
  ) : (
    children
  );
}
