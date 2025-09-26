import { Empty as AntEmpty, EmptyProps } from 'antd';

export function Empty(props: EmptyProps) {
  return (
    <AntEmpty
      image={AntEmpty.PRESENTED_IMAGE_SIMPLE}
      description="No matching data found"
      {...props}
    />
  );
}
