import { Button, Col, Layout, Row, Typography } from "antd";

function MainTemplate({ title, actionText, onActionClick, children }) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Header>
        <Row justify="space-between">
          <Col align="middle">
            <Typography.Title style={{ margin: "0.5rem", color: "white" }}>
              {title}
            </Typography.Title>
          </Col>
          <Col>
            <Button type="primary" onClick={onActionClick}>
              {actionText}
            </Button>
          </Col>
        </Row>
      </Layout.Header>
      <Layout.Content style={{ padding: "36px" }}>{children}</Layout.Content>
    </Layout>
  );
}

export default MainTemplate;
