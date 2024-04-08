import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs } from '../tabs';
import { TabPanel } from '../tab-panel';

const data = {
  title1: 'Tab one',
  content1: 'Tab content one',
  title2: 'Tab two',
  content2: 'Tab content two',
  testId1: 'content-1',
  testId2: 'content-2',
  tabClass: 'm-4 h-32',
  tabTestId: 'tab',
  tabIcon: 'user'
};

describe('Tab Component', () => {
  let wrapper;

  beforeEach(() => {
    const { container } = render(
      <Tabs data-testid={data.tabTestId} className={data.tabClass}>
        <TabPanel icon={data.tabIcon} title={data.title1}>
          <span data-testid={data.testId1}>{data.content1}</span>
        </TabPanel>
        <TabPanel title={data.title2}>
          <span data-testid={data.testId2}>{data.content2}</span>
        </TabPanel>
      </Tabs>
    );

    wrapper = container;
  });

  it('should be Tab one button in document', () => {
    const tabButton1 = screen.getByText(data.title1);

    expect(tabButton1).toBeInTheDocument();
  });

  it('should be Tab two button in document', () => {
    const tabButton2 = screen.getByText(data.title2);

    expect(tabButton2).toBeInTheDocument();
  });

  it('should be Tab one content', () => {
    const tab1Content = screen.getByText(data.content1);

    expect(tab1Content).toBeInTheDocument();
  });

  it('when tab two button is clicked, the correct content should be', () => {
    const tab2Button = screen.getByText(data.title2);

    fireEvent.click(tab2Button);

    const content = screen.getByTestId(/content-2/i);

    expect(content).toHaveTextContent(data.content2);
  });

  it('when tab one button is clicked, the correct content should be', () => {
    const tab1Button = screen.getByText(data.title1);

    fireEvent.click(tab1Button);

    const content = screen.getByTestId(/content-1/i);

    expect(content).toHaveTextContent(data.content1);
  });

  it('should be able to navigate between tabs', () => {
    const tab1Button = screen.getByText(data.title1);
    const tab2Button = screen.getByText(data.title2);

    fireEvent.click(tab1Button);

    const content1 = screen.getByTestId(/content-1/i);

    expect(content1).toHaveTextContent(data.content1);

    fireEvent.click(tab2Button);

    const content2 = screen.getByTestId(/content-2/i);

    expect(content2).toHaveTextContent(data.content2);
  });

  it('has given class names', () => {
    const tab = screen.getByTestId(data.tabTestId);

    expect(tab).toHaveClass(data.tabClass);
  });

  it('should be icon', () => {
    const svg = wrapper.querySelector('svg');

    expect(svg).toBeInTheDocument();
  });
});
