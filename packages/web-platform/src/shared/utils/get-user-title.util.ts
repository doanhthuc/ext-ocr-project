import { Maybe } from '@ocr-platform/shared';
import { toUpper, upperFirst } from 'lodash-es';

enum UserTitleType {
  None = 'none',
  SoftwareEngineer = 'software_engineer',
  SeniorSoftwareEngineer = 'senior_software_engineer',
  TechLead = 'tech_lead',
  CEO = 'ceo',
  CTO = 'cto',
}

export function getUserTitle(titleType: Maybe<UserTitleType>) {
  if (!titleType || titleType === UserTitleType.None) return '';
  const acronyms = new Set(['qa', 'ai', 'hr', 'ceo', 'cto', 'coo']);

  return titleType
    .split('_')
    .map((part: string) =>
      acronyms.has(part) ? toUpper(part) : upperFirst(part)
    )
    .join(' ');
}
