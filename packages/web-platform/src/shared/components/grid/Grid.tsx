import { Col, ColProps, Row, RowProps } from 'antd';

type GridProps = Omit<RowProps, 'children'> & {
  items?: Array<ColProps>;
};

export function Grid({ items, ...rowProps }: GridProps) {
  return (
    <Row {...rowProps}>
      {items?.map(({ children, span = 24, ...colProps }, idx) => (
        <Col key={idx} span={span} {...colProps}>
          {children}
        </Col>
      ))}
    </Row>
  );
}
