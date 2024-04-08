import { ReactNode } from "react";

export default function DynamicForm({
  children,
  className,
  onSubmit
}: {
  children: ReactNode;
  className?: string;
  onSubmit?: () => void;
}) {
  return (
    <form className={className} onSubmit={onSubmit}>
      {children}
    </form>
  );
}
