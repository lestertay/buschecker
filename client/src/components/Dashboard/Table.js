import React from 'react'
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

export default class SearchableTable extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
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
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
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

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'commuterName',
        key: 'commuterName',
        width: '20%',
        ...this.getColumnSearchProps('commuterName'),
      },
      {
        title: 'busDriver',
        dataIndex: 'busDriver',
        key: 'busDriver',
        width: '10%',
      },
      {
        title: 'Plate Number',
        dataIndex: 'busPlate',
        key: 'busPlate',
        width: '10%',
      },
      {
        title: 'Start Location',
        dataIndex: 'startLoc',
        key: 'startLoc',
        width: '10%',
        ...this.getColumnSearchProps('startLoc'),
      },
      {
        title: 'Start Time',
        dataIndex: 'startTime',
        key: 'startTime',
        width: '20%',
      },
      {
        title: 'End Location',
        dataIndex: 'stopLoc',
        key: 'stopLoc',
        width: '10%',
        ...this.getColumnSearchProps('stopLoc'),
      },
      {
        title: 'End Time',
        dataIndex: 'stopTime',
        key: 'stopTime',
        width: '20%',
      },
    ];
    return <Table columns={columns} dataSource={this.props.data} />;
  }
}