import { SegmentedProps as AntSegmentedProps } from 'antd';
import { isObject } from 'lodash-es';
import { useState } from 'react';

import { cn } from '~shared/utils/cn.util';

type SegmentedProps<T extends string | number> = Pick<
  AntSegmentedProps<T>,
  'className' | 'options' | 'value' | 'onChange'
>;

export function Segmented<T extends string | number>({
  options,
  value: outerValue,
  className,
  onChange,
}: SegmentedProps<T>) {
  const [innerValue, setInnerValue] = useState(
    isObject(options[0]) ? options[0].value : options[0]
  );
  const value = outerValue ?? innerValue;

  const activeIdx = options.findIndex(
    opt => (isObject(opt) ? opt.value : opt) === value
  );

  return (
    <ul
      className={cn('grid relative', className)}
      style={{ gridTemplateColumns: `repeat(${options?.length}, 1fr)` }}
    >
      {options?.map(opt => {
        const optValue = isObject(opt) ? opt.value : opt;
        const optLabel = isObject(opt) ? opt.label : opt;
        const isActive = optValue === value;

        return (
          <li
            key={optValue}
            className={cn(
              'text-center px-4 py-3 font-medium text-gray-6 cursor-pointer transition-all',
              {
                'text-typo': isActive,
              }
            )}
            onClick={() => {
              setInnerValue(optValue);
              onChange?.(optValue);
            }}
          >
            {optLabel}
          </li>
        );
      })}

      <div
        className="absolute bottom-0 h-0.5 bg-typo transition-all"
        style={{
          width: `${100 / options.length}%`,
          left: `${activeIdx * (100 / options.length)}%`,
        }}
      />
    </ul>
  );
}
