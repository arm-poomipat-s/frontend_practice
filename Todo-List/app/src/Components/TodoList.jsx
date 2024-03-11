import React, { useEffect, useState } from "react";
import { List, Input, Button, Row, Col, Divider, Typography } from "antd";
import _ from "lodash";
import axios from 'axios';
import Todo from "./Todo";

const { Text, Link } = Typography;

function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const [inputField, setInputField] = useState("");

  const fetchTodoList = async () => {
    const httpResponse = await axios.get("http://localhost:8000/todo-list");
    setTodoList(httpResponse.data);
  }

  useEffect( () => {
    fetchTodoList();
  },[]);

  const addTodoItem = async () => {
    await axios.post("http://localhost:8000/todo-list", {task: inputField});
    fetchTodoList();
  }

  const deleteTodoItem = async (id) =>{
    await axios.delete(`http://localhost:8000/todo-list/${id}`);
    fetchTodoList();
  }

  return (
    <>
      <Row justify="center">
        <Col>
          <Row>
            <Text type="success">กรุณาใส่ To do ที่ต้องการเพิ่ม</Text>
          </Row>
          <Row justify="center">
            <Col span={20}>
              <Input
                value={inputField}
                onChange={(e) => setInputField(e.target.value)}
              ></Input>
            </Col>
            <Col span={4}>
              <Button onClick={addTodoItem} style={{ width: "100%" }}>
                Add
              </Button>
            </Col>
          </Row>
          <Divider />
          <Row>
            <List
              style={{ width: "450px" }}
              header={<div style={{ textAlign: "center" }}>Todo List Page</div>}
              bordered
              dataSource={todoList}
              renderItem={(todo) => (
                <List.Item>
                  <Todo delete={deleteTodoItem} fetchData={fetchTodoList} todo={todo}/>
                </List.Item>
              )}
            />
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default TodoList;
