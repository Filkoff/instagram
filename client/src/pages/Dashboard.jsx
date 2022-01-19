import Header from "../components/Header/Header";
import Timeline from "../components/Timeline/Timeline";
import Sidebar from "../components/Sidebar/Index";
import Flex from "../components/styled-components/Flex";

export default function Dashboard() {
  return (
    <div>
      <Header />
      <Flex justify="space-between">
        <Timeline />
        <Sidebar />
      </Flex>
    </div>
  );
}
