import { ThemeProvider } from '../shared/providers/theme-provider';
import Layout from './ui/Layout';
import {} from 'preline';

export const App = () => {
  return (
    <ThemeProvider>
      <Layout>Hello world!</Layout>
    </ThemeProvider>
  );
};
