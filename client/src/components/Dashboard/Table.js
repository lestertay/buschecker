import React, { Fragment, useEffect } from "react";
import { Table, Input, Button, Space, Modal } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import ReactFlow from "react-flow-renderer";
import { useState } from "react";

const elementMock = [
  {
    id: "1",
    data: { label: "Hall 10" },
    sourcePosition: "left",
    targetPosition: "right",
    style: {
      cursor: "pointer",
      width: 80,
      borderRadius: 30,
      borderColor: "#DF2935",
      backgroundColor: "#DF2935",
      fontWeight: 700,
    },
    position: { x: 450, y: 25 },
    draggable: false,
  },
  // default node
  {
    id: "2",
    // you can also pass a React component as a label
    data: { label: "North Hill" },
    targetPosition: "right",
    sourcePosition: "left",
    style: {
      cursor: "pointer",
      width: 80,
      borderRadius: 30,
      borderColor: "#DF2935",
      backgroundColor: "#DF2935",
      fontWeight: 700,
    },
    position: { x: 350, y: 25 },
    draggable: false,
  },
  {
    id: "3",
    data: { label: "Hall 11" },
    targetPosition: "right",
    sourcePosition: "left",
    style: {
      cursor: "pointer",
      width: 80,
      borderRadius: 30,
      borderColor: "#DF2935",
      backgroundColor: "#DF2935",
      fontWeight: 700,
    },
    position: { x: 250, y: 25 },
    draggable: false,
  },
  {
    id: "4",
    data: { label: "Tamarind" },
    targetPosition: "right",
    sourcePosition: "left",
    style: {
      cursor: "pointer",
      width: 80,
      borderRadius: 30,
      borderColor: "black",
    },
    position: { x: 150, y: 25 },
    draggable: false,
  },
  {
    id: "5",
    data: { label: "Hall 13" },
    targetPosition: "top",
    sourcePosition: "bottom",
    style: {
      cursor: "pointer",
      width: 80,
      borderRadius: 30,
      borderColor: "black",
    },
    position: { x: 85, y: 85 },
    draggable: false,
  },
  {
    id: "6",
    data: { label: "Hall 14" },
    targetPosition: "left",
    sourcePosition: "right",
    style: {
      cursor: "pointer",
      width: 80,
      borderRadius: 30,
      borderColor: "black",
    },
    position: { x: 180, y: 145 },
    draggable: false,
  },
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "straight",
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    type: "straight",
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    type: "straight",
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
    type: "smoothedge",
  },
  {
    id: "7",
    data: { label: "North Spine" },
    targetPosition: "left",
    sourcePosition: "right",
    style: {
      cursor: "pointer",
      width: 100,
      borderRadius: 30,
      borderColor: "black",
    },
    position: { x: 290, y: 145 },
    draggable: false,
  },
  {
    id: "8",
    data: { label: "South Spine" },
    targetPosition: "left",
    sourcePosition: "right",
    style: {
      cursor: "pointer",
      width: 100,
      borderRadius: 30,
      borderColor: "black",
    },
    position: { x: 420, y: 145 },
    draggable: false,
  },
  {
    id: "9",
    data: { label: "Hall 7" },
    targetPosition: "bottom",
    sourcePosition: "top",
    style: {
      cursor: "pointer",
      width: 80,
      borderRadius: 30,
      borderColor: "black",
    },
    position: { x: 515, y: 85 },
    draggable: false,
  },

  // animated edge

  {
    id: "e5-6",
    source: "5",
    target: "6",
    type: "smoothedge",
  },
  {
    id: "e6-7",
    source: "6",
    target: "7",
    type: "smoothedge",
  },
  {
    id: "e8-9",
    source: "8",
    target: "9",
    type: "smoothedge",
  },
  {
    id: "e7-8",
    source: "7",
    target: "8",
    type: "smoothedge",
  },
  {
    id: "e9-1",
    source: "9",
    target: "1",
    type: "smoothedge",
  },
];
export default class SearchableTable extends React.Component {
  state = {
    searchText: "",
    searchedColumn: "",
    graphVisible: false,
    selectedId: undefined,
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          {/* <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button> */}
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    const { graphVisible, selectedId } = this.state;
    const { data } = this.props;
    const columns = [
      {
        title: "Name",
        dataIndex: "commuterName",
        key: "commuterName",
        width: "12%",
        ...this.getColumnSearchProps("commuterName"),
      },
      {
        title: "busDriver",
        dataIndex: "busDriver",
        key: "busDriver",
        width: "10%",
      },
      {
        title: "Plate Number",
        dataIndex: "busPlate",
        key: "busPlate",
        width: "10%",
      },
      {
        title: "Start Location",
        dataIndex: "startLoc",
        key: "startLoc",
        width: "10%",
        ...this.getColumnSearchProps("startLoc"),
      },
      {
        title: "Start Time",
        dataIndex: "startTime",
        key: "startTime",
        width: "19%",
      },
      {
        title: "End Location",
        dataIndex: "stopLoc",
        key: "stopLoc",
        width: "10%",
        ...this.getColumnSearchProps("stopLoc"),
      },
      {
        title: "End Time",
        dataIndex: "stopTime",
        key: "stopTime",
        width: "19%",
      },
      {
        title: "Action",
        dataIndex: "action",
        render: (_: any, record: Item) => (
          <Button
            onClick={(e, i) => {
              this.setState({ graphVisible: true, selectedId: record._id });
              console.log("click", record._id);
            }}
          >
            Contact Trace
          </Button>
        ),
        width: "2%",
      },
    ];
    return (
      <Fragment>
        <Table columns={columns} dataSource={data} />
        <Graph
          socket={this.props.socket}
          visible={graphVisible}
          selectedId={selectedId}
          onCancel={() => {
            this.setState({ graphVisible: false });
          }}
        />
      </Fragment>
    );
  }
}

const Graph = ({ visible, onCancel, selectedId, socket }) => {
  const [elements, setElements] = useState(elementMock);
  useEffect(() => {
    if (selectedId && socket) {
      socket.emit("CONTACT_TRACE", { data: selectedId });
      socket.on("CONTACT_TRACE_FOUND", (data) => {
        console.log("found covid: ", data);
      });
    }
  }, [selectedId, socket]);
  const onClickNode = (event, element) => {
    console.log("clicked", element);
  };
  return (
    <Modal
      visible={visible}
      title="Contact Tracing"
      okText=""
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={onCancel}
      width={700}
    >
      <div style={{ height: 400 }}>
        <ReactFlow onElementClick={onClickNode} elements={elements} />
      </div>
    </Modal>
  );
};
