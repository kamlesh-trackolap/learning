import { Col } from "antd";
import type { FieldType } from "./form.type";
import { isNotEmptyArray, isNotEmptyObject } from "../utils/main-utils";
import InputField from "./input/input-field";
import type { FC } from "react";
import { classNames } from "primereact/utils";

interface DynamicFieldPropsType {
  fields: FieldType[];
  className?: string;
}

type ComponentMapType = Record<string, FC<any>>;

const DynamicField: FC<DynamicFieldPropsType> = ({ fields, className }) => {
  const componentMap: ComponentMapType = {
    text: InputField,
    password: InputField,
    otp: InputField,
    search: InputField,
    textarea: InputField,
  };
  const getTitle = (title: string, optional: boolean) => {
    return <h2 className={classNames('text-[15px]')}>{title} {!optional && '*'}</h2>;
  }

  return (
    <>
      {isNotEmptyArray(fields) &&
        fields.map((f, i) => {
          if (!isNotEmptyObject(f)) return <NotFoundComponent />
          const Component = componentMap[f.type?.toLocaleLowerCase()];
          return (
            <Col key={i} span={window.innerWidth < 1370 ? 24 : f?.span || 24} className={classNames('flex flex-col gap-1', className)}>
              {getTitle(f?.title, f?.optional)}
              {Component ? <Component {...f} /> : <NotFoundComponent /> }
            
            </Col>
          );
        })}
    </>
  );
};

export default DynamicField;


const NotFoundComponent: FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 text-gray-400">
      <span>No component found</span>
    </div>
  );

}