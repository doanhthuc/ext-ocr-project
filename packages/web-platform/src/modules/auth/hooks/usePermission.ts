import { useAuth } from '~/auth/hooks/useAuth';

export function usePermission() {
  const { user } = useAuth();

  const isAdmin = () => user?.roles.includes('org.admin');
  const isManager = () => user?.roles.includes('org.manager');
  const isLeader = () => user?.roles.includes('org.leader');
  const isHr = () => user?.roles.includes('org.hr');
  const isMember = () => user?.roles.includes('org.member');

  return { isAdmin, isManager, isLeader, isHr, isMember };
}
