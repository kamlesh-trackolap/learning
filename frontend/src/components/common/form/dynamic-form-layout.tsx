import { Col, Row } from "antd";
import { Fragment } from "react/jsx-runtime";
import { isNotEmptyArray, isNotEmptyObject } from "../utils/main-utils";
import DynamicField from "./dynamic-fileld";
import { classNames } from "primereact/utils";
import type { RowType } from "./form.type";
interface DynamicFormLayoutType {
  rows: RowType[]
  className?: string;
};
const DynamicFormLayout = (props: DynamicFormLayoutType) => {
  const { rows, className } = props;
  return (
    <Fragment>
      <Row className={classNames("w-full", className)} gutter={[8,16]} >
        {
          isNotEmptyArray(rows) && rows.map((r, i) => {
            if (isNotEmptyObject(r)) {
              return <DynamicField  {...r}  key={i} />
            }
          })
        }
      </Row>
    </Fragment>
  )
}

export default DynamicFormLayout;
