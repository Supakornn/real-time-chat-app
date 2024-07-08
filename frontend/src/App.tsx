import { Card, Text } from "@mantine/core";
import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <MantineProvider>
      <Card>
        <Text>Hello</Text>
      </Card>
    </MantineProvider>
  );
}

export default App;
