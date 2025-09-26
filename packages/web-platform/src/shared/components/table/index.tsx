import styled from '@emotion/styled';
import { Table as AntTable, Select, TableProps } from 'antd';
import { ceil, clamp } from 'lodash-es';
import { useState } from 'react';

import { getCSSVariable } from '~shared/utils/get-css-variable.util';

const StyledWrapper = styled.div`
  .atlas-table-thead th {
    font-weight: 500 !important;
  }

  .atlas-table-wrapper {
    border-radius: 12px;
    border: 1px solid ${getCSSVariable('--color-gray-1')};
    overflow: hidden;
    background-color: white;
  }

  .atlas-table-pagination {
    padding: 16px 24px;
    margin: 0 !important;
  }

  .atlas-pagination-total-text {
    margin-right: auto;
  }

  .atlas-pagination-prev,
  .atlas-pagination-next,
  .atlas-pagination-item {
    border: 1px solid ${getCSSVariable('--color-gray-5')};
  }

  .atlas-pagination-item-active {
    background-color: ${getCSSVariable('--color-blue-1')};
    color: ${getCSSVariable('--color-blue-2')};
  }
`;

export function Table<Record>({
  pagination = {},
  ...props
}: TableProps<Record>) {
  const [innerPageSize, setInnerPageSize] = useState(10);

  return (
    <StyledWrapper>
      <AntTable
        {...props}
        pagination={
          pagination && {
            ...pagination,
            className: 'border-t border-border',
            showTotal: (total, [start, end]) => {
              const currentSize = end - start + 1;
              const currentPage =
                pagination.current || Math.ceil(end / currentSize);
              const options = [10, 25, 50]
                .filter(v => v <= total)
                .map(value => ({ value }));

              return (
                <div className="flex items-center gap-1">
                  <span>Show</span>
                  <Select
                    className="w-16"
                    value={currentSize}
                    options={options}
                    disabled={!options.length}
                    onChange={size => {
                      setInnerPageSize?.(size);
                      const maxPages = ceil(total / size);
                      pagination.onShowSizeChange?.(
                        clamp(currentPage, 0, maxPages),
                        size
                      );
                    }}
                  />
                  <span>from {total}</span>
                </div>
              );
            },
            showSizeChanger: false,
            pageSize: pagination.pageSize || innerPageSize,
          }
        }
      />
    </StyledWrapper>
  );
}
