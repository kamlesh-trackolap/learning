import { memo, useState, useEffect, type ReactNode } from "react";
import { Popover, type PopoverProps } from "antd";
import { isFunction } from "../../utils/main-utils";

interface PopOverFieldProps extends PopoverProps {
  content?: ReactNode;
  title?: ReactNode;
  children: ReactNode;
  className?: string;
}

const PopOverField = ({
  content,
  title,
  children,
  onOpenChange,
  trigger = "hover",
  className,
  open,
  ...rest
}: PopOverFieldProps) => {
  const [visible, setVisible] = useState<boolean>(!!open);

  useEffect(() => {
    if (open !== undefined) {
      setVisible(open);
    }
  }, [open]);

  const handleOpenChange: PopoverProps["onOpenChange"] = (isOpen, e) => {
    if (isFunction(onOpenChange)) onOpenChange(isOpen, e);
    if (open === undefined) setVisible(isOpen);
  };

  return (
    <Popover
      content={content ?? <span>No content</span>}
      title={title}
      trigger={trigger}
      open={visible}
      onOpenChange={handleOpenChange}
      overlayClassName={className}
      {...rest}
    >
      {children}
    </Popover>
  );
};

export default memo(PopOverField);
