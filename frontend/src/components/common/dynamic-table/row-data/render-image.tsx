import Image from "next/image";

const RenderImage = (data: any, columnData: ColumnData) => {
  return (
    <Image
      width={columnData.width ? Math.min(columnData.width - 20, 80) : 50}
      height={50}
      src={data}
      alt="image"
      style={{
        objectFit: 'cover',
        borderRadius: 4
      }}
      placeholder={
        <div style={{
          width: '100%',
          height: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f5f5f5'
        }}>
          <span>Loading</span>
        </div>
      }
    />
  );

};
export default RenderImage;