"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Table, Spin, Tag, Image, Button, Tooltip } from "antd";
import { LinkOutlined, EyeOutlined, DownloadOutlined } from '@ant-design/icons';
import InfiniteScroll from "react-infinite-scroll-component";
import { useFetch } from "@/hooks/use-fetch";
import { api } from "../utils";
import { isNotEmptyArray, isNotEmptyObject } from "../utils/main-utils";

interface TablePropsType {
  apiUrl: string;
  apiType: "GET" | "POST" | "TEST";
  params: Record<string, unknown>;
  apiData: Record<string, unknown>;
}

interface columnDataType {
  key: string;
  title: string;
  width?: number;
  align?: 'left' | 'center' | 'right';
  fixed?: boolean;
  dataType?: 'text' | 'image' | 'link' | 'email' | 'phone' | 'status' | 'tags' | 'number' | 'currency' | 'date' | 'datetime' | 'boolean' | 'action' | 'custom';
  renderCustom?: (value: any, record: any, index: number) => React.ReactNode;
  format?: string;
  statusConfig?: {
    [key: string]: { color: string; text: string };
  };
  actions?: Array<{
    type: 'view' | 'edit' | 'delete' | 'download' | 'custom';
    icon?: React.ReactNode;
    label?: string;
    onClick?: (record: any) => void;
    url?: string;
  }>;
}

interface rowDataType {
  src?: string;
  text?: string;
  subLable?: string;
  color: string;
}

interface tableReponseData {
  rows: rowDataType[],
  cols: columnDataType[],
  pagination: boolean;
  limit: number;
  page: number;
}
interface tableReponseType {
  loading: boolean;
  success: boolean;
  message: string;
  data: tableReponseData 
}
const initialPagination = {
  limit: 20,
  page: 1
};

const DynamicTable = (tableProps: TablePropsType) => {
  const { apiUrl, apiType, params = {}, apiData } = tableProps;
  const [pagination, setPagination] = useState(initialPagination);
  const [rowsData, setRowsData] = useState<rowDataType[]>([]);

  const apiRequest = useMemo(() => {
    let request = api.callGet;
    if (apiType === "POST") request = api.callPost;
    if (apiType === "TEST") request = api.callMockApi;
    return { request };
  }, [apiType]);

  const newParams = useMemo(() => {
    return {
      ...params,
      ...pagination
    };
  }, [pagination, params]);

  const response: tableReponseType = useFetch({
    request: apiRequest?.request,
    payload: {
      url: apiUrl,
      params: newParams,
      data: apiData
    }
  });

  useEffect(() => {
    if (isNotEmptyArray(response.data?.rows)) {
      if (pagination.page === 1) {
        setRowsData(response.data.rows);
      } else {
        setRowsData(prev => [...prev, ...response.data.rows]);
      }
    }
  }, [response.data, pagination.page]);

  const buildRowData = (rowData: any, columnData: columnDataType, record: any, rowIndex: number) => {
    if (columnData.renderCustom) {
      return columnData.renderCustom(rowData, record, rowIndex);
    }

    switch (columnData.dataType) {
      case 'image':
        return renderImage(rowData, columnData);

      case 'link':
        return renderLink(rowData, columnData);

      case 'email':
        return renderEmail(rowData);

      case 'phone':
        return renderPhone(rowData);

      case 'status':
        return renderStatus(rowData, columnData);

      case 'tags':
        return renderTags(rowData);

      case 'number':
        return renderNumber(rowData, columnData);

      case 'currency':
        return renderCurrency(rowData, columnData);

      case 'date':
        return renderDate(rowData, columnData);

      case 'datetime':
        return renderDateTime(rowData, columnData);

      case 'boolean':
        return renderBoolean(rowData);

      case 'action':
        return renderActions(rowData, columnData, record);

      case 'custom':
        return renderCustomContent(rowData, columnData);

      default:
        return renderText(rowData, columnData);
    }
  };

  // Individual render functions for different data types


  const renderLink = (data: any, columnData: columnDataType) => {
    if (!data) return <div className="cell">No Link</div>;

    const href = typeof data === 'string' ? data : data.url || data.href;
    const text = data.text || data.label || href;

    return (
      <Tooltip title={href}>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#1890ff',
            textDecoration: 'none'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <LinkOutlined style={{ marginRight: 4 }} />
          {text}
        </a>
      </Tooltip>
    );
  };

  const renderEmail = (data: any) => {
    if (!data) return <div className="cell">No Email</div>;

    return (
      <a
        href={`mailto:${data}`}
        style={{ color: '#1890ff' }}
        onClick={(e) => e.stopPropagation()}
      >
        {data}
      </a>
    );
  };

  const renderPhone = (data: any) => {
    if (!data) return <div className="cell">No Phone</div>;

    return (
      <a
        href={`tel:${data}`}
        style={{ color: '#1890ff' }}
        onClick={(e) => e.stopPropagation()}
      >
        {data}
      </a>
    );
  };

  const renderStatus = (data: any, columnData: columnDataType) => {
    if (!data) return <div className="cell">-</div>;

    const statusConfig = columnData.statusConfig || {
      active: { color: 'green', text: 'Active' },
      inactive: { color: 'red', text: 'Inactive' },
      pending: { color: 'orange', text: 'Pending' },
      completed: { color: 'blue', text: 'Completed' }
    };

    const config = statusConfig[data] || { color: 'default', text: data };

    return (
      <Tag color={config.color} style={{ margin: 0 }}>
        {config.text}
      </Tag>
    );
  };

  const renderTags = (data: any) => {
    if (!isNotEmptyArray(data)) return <div className="cell">No Tags</div>;

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {data.slice(0, 3).map((tag: string, index: number) => (
          <Tag key={index} color="blue" style={{ margin: 0 }}>
            {tag}
          </Tag>
        ))}
        {data.length > 3 && (
          <Tag color="default">+{data.length - 3} more</Tag>
        )}
      </div>
    );
  };

  const renderNumber = (data: any, columnData: ColumnData) => {
    if (data === null || data === undefined) return <div className="cell">-</div>;

    const number = typeof data === 'number' ? data : parseFloat(data);
    if (isNaN(number)) return <div className="cell">Invalid Number</div>;

    return (
      <div style={{ textAlign: columnData.align === 'right' ? 'right' : 'left' }}>
        {number.toLocaleString()}
      </div>
    );
  };

  const renderCurrency = (data: any, columnData: columnDataType) => {
    if (data === null || data === undefined) return <div className="cell">-</div>;

    const number = typeof data === 'number' ? data : parseFloat(data);
    if (isNaN(number)) return <div className="cell">Invalid Currency</div>;

    const currency = columnData.format || 'USD';

    return (
      <div style={{ textAlign: columnData.align === 'right' ? 'right' : 'left' }}>
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: currency
        }).format(number)}
      </div>
    );
  };

  const renderDate = (data: any, columnData: columnDataType) => {
    if (!data) return <div className="cell">-</div>;

    try {
      const date = new Date(data);
      const format = columnData.format || 'medium';

      const formattedDate = format === 'short'
        ? date.toLocaleDateString()
        : date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });

      return <div className="cell">{formattedDate}</div>;
    } catch (error) {
      return <div className="cell">Invalid Date</div>;
    }
  };

  const renderDateTime = (data: any, columnData: columnDataType) => {
    if (!data) return <div className="cell">-</div>;

    try {
      const date = new Date(data);
      const format = columnData.format || 'medium';

      const formattedDateTime = format === 'short'
        ? date.toLocaleString()
        : date.toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });

      return <div className="cell">{formattedDateTime}</div>;
    } catch (error) {
      return <div className="cell">Invalid Date/Time</div>;
    }
  };

  const renderBoolean = (data: any) => {
    return (
      <Tag color={data ? 'green' : 'red'}>
        {data ? 'Yes' : 'No'}
      </Tag>
    );
  };

  const renderActions = (data: any, columnData: columnDataType, record: any) => {
    const actions = columnData.actions || [];

    return (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {actions.map((action, index) => {
          if (action.type === 'view') {
            return (
              <Tooltip key={index} title={action.label || 'View'}>
                <Button
                  type="text"
                  icon={<EyeOutlined />}
                  onClick={() => action.onClick?.(record)}
                  size="small"
                />
              </Tooltip>
            );
          }

          if (action.type === 'download') {
            return (
              <Tooltip key={index} title={action.label || 'Download'}>
                <Button
                  type="text"
                  icon={<DownloadOutlined />}
                  onClick={() => action.onClick?.(record)}
                  size="small"
                />
              </Tooltip>
            );
          }

          if (action.type === 'custom' && action.icon) {
            return (
              <Tooltip key={index} title={action.label}>
                <Button
                  type="text"
                  icon={action.icon}
                  onClick={() => action.onClick?.(record)}
                  size="small"
                />
              </Tooltip>
            );
          }

          return null;
        })}
      </div>
    );
  };

  const renderCustomContent = (data: any, columnData: columnDataType) => {
    if (isNotEmptyArray(data)) {
      return (
        <div className="row-cell">
          {data.map((rowElement: rowDataType, elementIndex: number) => (
            <div
              key={elementIndex}
              className="cell"
              style={{
                width: `${100 / data.length}%`,
                justifyContent: columnData.align === 'center' ? 'center' : 'normal'
              }}
            >
              <div className="row-cell">
                {rowElement.icon && (
                  <img src={rowElement.icon} className="img-icon" alt="icon" />
                )}
                {rowElement.url ? (
                  <a href={rowElement.url} target="_blank" rel="noopener noreferrer">
                    <span style={{
                      color: rowElement.textCc,
                      fontSize: rowElement.subText ? 15 : 13
                    }}>
                      {rowElement.text || 'NA'}
                    </span>
                  </a>
                ) : (
                  <span style={{
                    color: rowElement.textCc,
                    fontSize: rowElement.subText ? 15 : 13
                  }}>
                    {rowElement.text || 'NA'}
                  </span>
                )}
                {rowElement.subText && (
                  <span style={{ color: rowElement.subTextCc }}>
                    {rowElement.subText}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    }

    return renderText(data, columnData);
  };

  const renderText = (data: any, columnData: ColumnData) => {
    if (!data && data !== 0) return <div className="cell">NA</div>;

    return (
      <div
        className="cell"
        style={{
          textAlign: columnData.align === 'center' ? 'center' :
            columnData.align === 'right' ? 'right' : 'left'
        }}
      >
        {String(data)}
      </div>
    );
  };

  const columns = useMemo(() => {
    if (isNotEmptyObject(response?.data)) {
      return buildColumns(response?.data?.columns);
    }
    return [];
  }, [response?.data]);

  const buildColumns = (columnData: ColumnData[]) => {
    if (!isNotEmptyArray(columnData)) return [];

    return columnData.map((colData, index) => ({
      key: colData?.key || `col-${index}`,
      dataIndex: colData?.key,
      width: colData?.width || 220,
      align: colData?.align,
      fixed: colData?.fixed,
      title: colData?.title,
      render: (rowData: any, record: any, rowIndex: number) =>
        buildRowData(rowData, colData, record, rowIndex)
    }));
  };

  const loadMore = () => {
    if (hasMore) {
      setPagination(prev => ({
        ...prev,
        page: prev.page + 1
      }));
    }
  };

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 500,
        overflow: "auto",
        padding: "0 16px",
        border: "1px solid #ddd",
      }}
    >
      <InfiniteScroll
        dataLength={rowsData.length}
        next={loadMore}
        hasMore={response.data?.pagination}
        loader={
          <div style={{ textAlign: "center", padding: 20 }}>
            <Spin size="large" />
          </div>
        }
        scrollableTarget="scrollableDiv"
      >
        <Table
          dataSource={rowsData}
          columns={columns}
          pagination={false}
          rowKey="id"
          scroll={{ x: true }}
        />
      </InfiniteScroll>
    </div>
  );
};

export default DynamicTable;