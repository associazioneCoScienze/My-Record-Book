import { Col, Popconfirm, Row, Space, Statistic, Table } from "antd";
import { useMemo } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

function ExamsList({ items, statistics, onEdit, onRemove }) {
  const columns = useMemo(
    () => [
      {
        title: "Nome Esame",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Crediti",
        dataIndex: "ects",
        key: "ects",
      },
      {
        title: "Data",
        dataIndex: "date",
        key: "date",
        render: (date) => date?.format("DD-MM-YYYY") ?? "",
      },
      {
        title: "Voto",
        dataIndex: "grade",
        key: "grade",
      },
      {
        title: "Lode",
        dataIndex: "honors",
        key: "honors",
        render: (bool) => (bool ? "Sì" : "No"),
      },
      {
        title: "Azioni",
        key: "action",
        render: (text, record) => (
          <Space size="middle">
            <EditOutlined onClick={() => onEdit(record.key)} />
            <Popconfirm
              title="Vuoi eliminare questo esame?"
              onConfirm={() => onRemove(record.key)}
              okText="Sì"
              cancelText="No"
            >
              <DeleteOutlined style={{ color: "red" }} />
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [onEdit, onRemove]
  );

  return (
    <Table
      columns={columns}
      dataSource={items}
      pagination={false}
      footer={() => (
        <Row gutter={16} align="middle">
          <Col span={8}>
            <Statistic
              title="Media Aritmetica"
              value={statistics.arithmeticAverage}
              precision={2}
              style={{ textAlign: "center" }}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Media Pesata"
              value={statistics.weightedAverage}
              precision={2}
              style={{ textAlign: "center" }}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="CFU"
              value={statistics.doneECTS}
              suffix={`/ ${statistics.totalECTS}`}
              style={{ textAlign: "center" }}
            />
          </Col>
        </Row>
      )}
    />
  );
}

export default ExamsList;
