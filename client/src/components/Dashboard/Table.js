import React from 'react'
import moment from 'moment'
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

const data = [
  {
    key: '1',
    name: 'Looi Han Liong',
    startLocation: 'North Hill',
    endLocation:'North Spine',
    driver: 'Ah Choon',
    plateNumber: 'SGB1234H',
    endTime: moment(new Date()).format('DD-MMM-YYYY h:mm:ss a'),
    startTime: moment(new Date()).format('DD-MMM-YYYY h:mm:ss a')
  },
  {
    key: '2',
    name: 'Lee Wonn Jen',
    startLocation: 'Canteen 2',
    endLocation:'North Spine',
    driver: 'Ah Choon',
    plateNumber: 'SGB1234H',
    endTime: moment(new Date()).format('DD-MMM-YYYY h:mm:ss a'),
    startTime: moment(new Date()).format('DD-MMM-YYYY h:mm:ss a')
  },
  {
    key: '3',
    name: 'Garyl Ng',
    startLocation: 'Canteen 2',
    endLocation:'North Spine',
    driver: 'Ah Choon',
    plateNumber: 'SGB1234H',
    endTime: moment(new Date()).format('DD-MMM-YYYY h:mm:ss a'),
    startTime: moment(new Date()).format('DD-MMM-YYYY h:mm:ss a')
  },
  {
    key: '4',
    name: 'Looi Han Liong',
    startLocation: 'Hall 4',
    endLocation:'South Spine',
    driver: 'Ah Teck',
    plateNumber: 'SGB1564H',
    endTime: moment(new Date()).format('DD-MMM-YYYY h:mm:ss a'),
    startTime: moment(new Date()).format('DD-MMM-YYYY h:mm:ss a')
  },
  {
    key: '5',
    name: 'Samuel Duck',
    startLocation: 'Hall 49',
    endLocation:'South Spline',
    driver: 'Ah Teck',
    plateNumber: 'SGB1564H',
    endTime: moment(new Date()).format('DD-MMM-YYYY h:mm:ss a'),
    startTime: moment(new Date()).format('DD-MMM-YYYY h:mm:ss a')
  },
  {
    key: '6',
    name: 'Looi Han Liong',
    startLocation: 'North Hill',
    endLocation:'Canteen 2',
    driver: 'Ah Choon',
    plateNumber: 'SGB1234H',
    endTime: moment(new Date()).format('DD-MMM-YYYY h:mm:ss a'),
    startTime: moment(new Date()).format('DD-MMM-YYYY h:mm:ss a')
  },
  {
    key: '7',
    name: 'Lee Wonn Jen',
    startLocation: 'Canteen 2',
    endLocation:'Pioneer MRT',
    driver: 'Ah Hu',
    plateNumber: 'SGB8234H',
    endTime: moment(new Date()).format('DD-MMM-YYYY h:mm:ss a'),
    startTime: moment(new Date()).format('DD-MMM-YYYY h:mm:ss a')
  },
  {
    key: '8',
    name: 'Garyl Ng',
    startLocation: 'Hall 8',
    endLocation:'Center Spine',
    driver: 'Ah Choong',
    plateNumber: 'SGB1094J',
    endTime: moment(new Date()).format('DD-MMM-YYYY h:mm:ss a'),
    startTime: moment(new Date()).format('DD-MMM-YYYY h:mm:ss a')
  },
  {
    key: '9',
    name: 'Looi Han Liong',
    startLocation: 'Chinese Garden',
    endLocation:'Hall 14',
    driver: 'Ah Teck',
    plateNumber: 'SGB1564H',
    endTime: moment(new Date()).format('DD-MMM-YYYY h:mm:ss a'),
    startTime: moment(new Date()).format('DD-MMM-YYYY h:mm:ss a')
  },
  {
    key: '10',
    name: 'Samuel Duck',
    startLocation: 'Hall 49',
    endLocation:'Chicken Farm',
    driver: 'Ah Teck',
    plateNumber: 'SGB1564H',
    endTime: moment(new Date()).format('DD-MMM-YYYY h:mm:ss a'),
    startTime: moment(new Date()).format('DD-MMM-YYYY h:mm:ss a')
  },
  
];

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
        dataIndex: 'name',
        key: 'name',
        width: '20%',
        ...this.getColumnSearchProps('name'),
      },
      {
        title: 'Driver',
        dataIndex: 'driver',
        key: 'driver',
        width: '10%',
      },
      {
        title: 'Bus Plate',
        dataIndex: 'plateNumber',
        key: 'plateNumber',
        width: '10%',
      },
      {
        title: 'Start Location',
        dataIndex: 'startLocation',
        key: 'startLocation',
        width: '10%',
        ...this.getColumnSearchProps('startLocation'),
      },
      {
        title: 'Start Time',
        dataIndex: 'startTime',
        key: 'startTime',
        width: '20%',
      },
      {
        title: 'End Location',
        dataIndex: 'endLocation',
        key: 'endLocation',
        width: '10%',
        ...this.getColumnSearchProps('endLocation'),
      },
      {
        title: 'End Time',
        dataIndex: 'endTime',
        key: 'endTime',
        width: '20%',
      },
    ];
    return <Table columns={columns} dataSource={data} />;
  }
}