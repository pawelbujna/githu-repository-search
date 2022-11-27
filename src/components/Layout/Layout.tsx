// AntD provides reset functionality out of the box.
// https://ant.design/docs/react/introduce
import 'antd/dist/reset.css';

import { Col, Layout, Row } from 'antd';
import { PropsWithChildren } from 'react';

export const AppLayout = ({ children }: PropsWithChildren) => {
    return (
        // V5 AntD overwrites all styles added by styled-components.
        // It was almost impossible to style anything with this library.
        // So the final decision was to style components inline.
        <Layout style={{ minHeight: '100vh' }}>
            <Layout.Header style={{ background: '#fff' }}>Big fat logo!</Layout.Header>

            <Layout.Content>
                <Row style={{ margin: '40px 0 40px 0' }}>
                    <Col xl={{ span: 12, offset: 6 }} md={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }}>
                        {children}
                    </Col>
                </Row>
            </Layout.Content>

            <Layout.Footer style={{ background: '#fff' }}>Little tiny footer</Layout.Footer>
        </Layout>
    );
};
