import RenderImage from "./render-image";

const BuildRowData = (columnData) => {
    switch (columnData?.dataType) {
      case 'image':
        return RenderImage(rowData, columnData);
      
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
  return (
    <div>
      
    </div>
  )
}

export default BuildRowData
