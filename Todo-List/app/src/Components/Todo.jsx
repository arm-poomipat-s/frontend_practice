import React, { useState } from "react";
import { List, Input, Button, Row, Col, Divider, Typography } from "antd";
const { Text, Link } = Typography;
import axios from "axios";

function Todo(props) {
  const [changeInput, setChangeInput] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const updateTodoItem = async (id) => {
    await axios.put(`http://localhost:8000/todo-list/${id}`, {
      task: changeInput,
    });
    props.fetchData();
    setChangeInput("");
    setIsEdit(false);
  };

  const toggleEdit = () => {
    setChangeInput(props.todo.task);
    setIsEdit(true);
  };

  let content = (
    <Row style={{ width: "100%" }}>
      <Col span={20}>
        <Input
          value={changeInput}
          onChange={(e) => setChangeInput(e.target.value)}
        ></Input>
      </Col>
      <Col span={4}>
        <Button
          onClick={() => updateTodoItem(props.todo.id)}
          type="primary"
          blue
        >
          Done
        </Button>
      </Col>
    </Row>
  );

  if (!isEdit) {
    content = (
      <Row style={{ width: "100%" }}>
        <Col span={16}>{props.todo.task}</Col>
        <Col span={4}>
          <Button
            style={{ backgroundColor: "orange" }}
            onClick={() => toggleEdit()}
            type="primary"
            danger
          >
            Edit
          </Button>
        </Col>
        <Col span={4}>
          <Button
            onClick={() => props.delete(props.todo.id)}
            type="primary"
            danger
          >
            Delete
          </Button>
        </Col>
      </Row>
    );
  }
  return <div style={{ width: "100%" }}>{content}</div>;
}

export default Todo;
