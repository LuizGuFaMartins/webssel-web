import React from "react";
import "./styles.css";
import { Card, Col, Row, Input, Space } from 'antd';

const { Meta } = Card;
const { Search } = Input;

const onSearch = (value) => console.log(value);

const Product = () => {
  return (
    <div style={{ marginLeft: 55 }}>
      <h1>Product</h1>
      <Space direction="vertical">
        <Search
          placeholder="Buscar por nome do produto..."
          onSearch={onSearch}
          style={{
            width: 1037,
            marginBottom: 20,
            background: "#F7F7F7"
          }}
        />
      </Space>
      <div style={{ }}>
        <Row gutter={16}>
          <Col span={8}>
            <Card
              hoverable
              bordered={true}
              style={{
                width: 280,
                height: 180,
                marginBottom: 10,
                borderColor: "#61A6AB",
              }}
            >
              <Meta
                title="Código: "
                style={{
                  textAlign: "center",
                  color: "#61A6AB",
                  marginBottom: 10
                }}></Meta>
              <p>Card content</p>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Product;
