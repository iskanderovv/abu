import { ConfigProvider } from "antd";
import RouteController from "./routes";

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#0EB182",
          colorBorder: "#E3E3E3",
        },
      }}
    >
      <RouteController />
    </ConfigProvider>
  );
}
