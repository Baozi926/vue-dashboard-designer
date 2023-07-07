type StylesheetItem = {
  name: string;
  value: string | number;
  alias: string;
  editor?: string;
};

type propertyItem = {
  name: string;
  value: string | number;
  alias: string;
};

type DataSource = {
  type: "static" | "url";
  value: any;
};

/**
 * @property order - 排序字段
 * @property catagory - 分类
 * @property name - 组件名
 * @property alias - 别名，组件显示的名称
 */
type MyComponent = {
  desc?:string
  order?: number;
  catagory?: "";
  name?: string;
  alias?: string;
  width?: number;
  height?: number;
  source?: DataSource;
  stylesheet?: StylesheetItem[];
  properties?: propertyItem[];
};

type MyComponentInstance = {
  i: string | number;
  component: MyComponent;
  x: number;
  y: number;
  w: number;
  h: number;
};
