import styled from '@emotion/styled';
import { Drawer as AntDrawer, DrawerProps } from 'antd';

const StyledAntDrawer = styled(AntDrawer)`
  .atlas-drawer-close {
    order: 2;
    margin: 0;
  }
  .atlas-drawer-header {
    border: none;
    padding: 24px;
  }
  .atlas-drawer-body {
    padding: 0 24px;
  }

  .atlas-drawer-footer {
    padding: 16px 24px;
  }
`;

export function Drawer({ children, ...props }: DrawerProps) {
  return <StyledAntDrawer {...props}>{children}</StyledAntDrawer>;
}
