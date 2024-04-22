import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

export default function Breadcrumb({ dashboard, path }) {
  return (
    <Breadcrumbs
      isDisabled
      separator="/"
      itemClasses={{
        separator: "px-2",
      }}
    >
      <BreadcrumbItem color="primary">{dashboard}</BreadcrumbItem>
      <BreadcrumbItem color="primary">{path}</BreadcrumbItem>
    </Breadcrumbs>
  );
}
