import { Accordion, Content, Tab, Trigger } from '@/shared/components/lukachoui/accordion';
import { Checkbox } from '@/shared/components/shadcnui/ui/checkbox';
import { Label } from '@/shared/components/shadcnui/ui/label';
import { ReceiptsPersonalDrawerList } from '@/widgets/ReceiptsPersonalDrawerList';

const questions = [
  {
    question: "What's the best manga ever written and why?",
    answer: `Berserk. It's about a warrior born from a dead flesh of a hanged mother, marked by the brand of sacrifice by apostles of the devil themselves. But he never gave a fuck and fought them as if he were immortal, despite the unending enemies and absence of hope for escape. Through his endless struggle, he became a creator of his own destiny and escaped unavoidable death at the Eclipse.`,
  },
  { question: 'How to get kawai waifu?', answer: 'stop watching anime, hit the gym, go to japan' },
  {
    question: 'Who is behind this project?',
    answer: 'Dude named Luka Donadze (@lukachodonadze)',
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
