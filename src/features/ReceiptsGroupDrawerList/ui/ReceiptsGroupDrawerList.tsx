import { Accordion, Content, Tab, Trigger } from '@/shared/components/lukachoui/accordion';
import { Checkbox } from '@/shared/components/shadcnui/ui/checkbox';
import { Label } from '@/shared/components/shadcnui/ui/label';
import { ReceiptsPersonalDrawerList } from '@/features/ReceiptsPersonalDrawerList';

const questions = [
  {
    question: 'Папа',
  },
  { question: 'Мама' },
  {
    question: 'Сын',
  },
];

export const ReceiptsGroupDrawerList = () => {
  return (
    <Accordion>
      {questions.map((e, i) => {
        return (
          <Tab key={i}>
            <Trigger>{e.question}</Trigger>
            <Content>
              <ReceiptsPersonalDrawerList />
            </Content>
          </Tab>
        );
      })}
    </Accordion>
  );
};
