import React, { Fragment, useEffect, useState } from "react";
import { Table, Input, Button, Space, Modal, Typography } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import ReactFlow from "react-flow-renderer";

const STOP_MAP = [
  "Hall 10",
  "North Hill",
  "Hall 11",
  "Tamarind",
  "Hall 13",
  "Hall 14",
  "North Spine",
  "South Spine",
  "Hall 7",
];
const SOURCE_MAP = [
  "left",
  "left",
  "left",
  "left",
  "bottom",
  "right",
  "right",
  "right",
  "top",
];
const TARGET_MAP = [
  "right",
  "right",
  "right",
  "right",
  "top",
  "left",
  "left",
  "left",
  "bottom",
];
const WIDTH_MAP = [80, 80, 80, 80, 80, 80, 100, 100, 80];
const POS_MAP = [
  { x: 450, y: 25 },
  { x: 350, y: 25 },
  { x: 250, y: 25 },
  { x: 150, y: 25 },
  { x: 85, y: 85 },
  { x: 180, y: 145 },
  { x: 290, y: 145 },
  { x: 420, y: 145 },
  { x: 515, y: 85 },
];
const { Title } = Typography;
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
    const { graphVisible, selectedId, selectedUser } = this.state;
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
        title: "Driver",
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
              this.setState({
                graphVisible: true,
                selectedId: record._id,
                selectedUser: record.commuterName.replace(" ", "_"),
              });
              console.log(
                "click",
                record._id,
                record.commuterName.replace(" ", "_")
              );
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
          selectedUser={selectedUser}
          onCancel={() => {
            this.setState({ graphVisible: false });
          }}
        />
      </Fragment>
    );
  }
}

const Graph = ({ visible, onCancel, selectedId, selectedUser, socket }) => {
  const [elements, setElements] = useState([]);
  const [names, setNames] = useState([]);
  const [display, setDisplay] = useState(-1);
  useEffect(() => {
    if (selectedId && socket) {
      socket.emit("CONTACT_TRACE", { data: selectedId });
    }
  }, [selectedId, socket]);

  useEffect(() => {
    socket.on("CONTACT_TRACE_FOUND", (data) => {
      console.log("found covid: ", data);
      setNames(data);
      let el = [];
      for (let i = 0; i < data.length; i++) {
        let d = data[i];
        let node, edge;
        if (d.length > 0) {
          node = {
            id: `${i + 1}`,
            data: { label: STOP_MAP[i] },
            sourcePosition: SOURCE_MAP[i],
            targetPosition: TARGET_MAP[i],
            style: {
              cursor: "pointer",
              width: WIDTH_MAP[i],
              borderRadius: 30,
              borderColor: "#DF2935",
              backgroundColor: "#DF2935",
              fontWeight: 700,
            },
            position: POS_MAP[i],
            draggable: false,
          };
        } else {
          node = {
            id: `${i + 1}`,
            data: { label: STOP_MAP[i] },
            sourcePosition: SOURCE_MAP[i],
            targetPosition: TARGET_MAP[i],
            style: {
              cursor: "pointer",
              width: WIDTH_MAP[i],
              backgroundColor: "white",
              borderRadius: 30,
              borderColor: "black",
              fontWeight: 400,
            },
            position: POS_MAP[i],
            draggable: false,
          };
        }
        edge = {
          id: `e${(i % 9) + 1}-${((i + 1) % 9) + 1}`,
          source: `${(i % 9) + 1}`,
          target: `${((i + 1) % 9) + 1}`,
          type: "smoothedge",
        };

        el.push(node, edge);
      }
      setElements(el);
    });
  }, [socket]);
  const onClickNode = (event, element) => {
    setDisplay(parseInt(element.id) - 1);
    console.log("clicked", parseInt(element.id) - 1);
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
        <div style={{ height: 200 }}>
          <ReactFlow onElementClick={onClickNode} elements={elements} />
        </div>

        {display !== -1 && <Title level={3}>Close Contacts: </Title>}
        {display !== -1 &&
          names[display].map((n) => {
            if (n !== selectedUser)
              return (
                <Title style={{ marginTop: 0, fontWeight: 400 }} level={5}>
                  {n.replaceAll("_", " ")}
                </Title>
              );
          })}
      </div>
    </Modal>
  );
};
