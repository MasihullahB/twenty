import { useEffect } from 'react';
import { expect, jest } from '@storybook/jest';
import { Decorator, Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import { useSetHotkeyScope } from '@/ui/utilities/hotkey/hooks/useSetHotkeyScope';
import { FieldMetadataType } from '~/generated-metadata/graphql';

import { FieldContextProvider } from '../../../__stories__/FieldContextProvider';
import { useRatingField } from '../../../hooks/useRatingField';
import { RatingFieldInput, RatingFieldInputProps } from '../RatingFieldInput';

const RatingFieldValueSetterEffect = ({ value }: { value: number }) => {
  const { setFieldValue } = useRatingField();

  useEffect(() => {
    setFieldValue(value);
  }, [setFieldValue, value]);

  return <></>;
};

type RatingFieldInputWithContextProps = RatingFieldInputProps & {
  value: number;
  entityId?: string;
};

const RatingFieldInputWithContext = ({
  entityId,
  value,
  onSubmit,
}: RatingFieldInputWithContextProps) => {
  const setHotKeyScope = useSetHotkeyScope();

  useEffect(() => {
    setHotKeyScope('hotkey-scope');
  }, [setHotKeyScope]);

  return (
    <FieldContextProvider
      fieldDefinition={{
        fieldMetadataId: 'rating',
        label: 'Rating',
        type: FieldMetadataType.Probability,
        iconName: 'Icon123',
        metadata: {
          fieldName: 'Rating',
        },
      }}
      entityId={entityId}
    >
      <RatingFieldValueSetterEffect value={value} />
      <RatingFieldInput onSubmit={onSubmit} />
    </FieldContextProvider>
  );
};

const submitJestFn = jest.fn();

const clearMocksDecorator: Decorator = (Story, context) => {
  if (context.parameters.clearMocks) {
    submitJestFn.mockClear();
  }
  return <Story />;
};

const meta: Meta = {
  title: 'UI/Data/Field/Input/RatingFieldInput',
  component: RatingFieldInputWithContext,
  args: {
    value: 25,
    isPositive: true,
    onSubmit: submitJestFn,
  },
  argTypes: {
    onSubmit: { control: false },
  },
  decorators: [clearMocksDecorator],
  parameters: {
    clearMocks: true,
  },
};

export default meta;

type Story = StoryObj<typeof RatingFieldInputWithContext>;

export const Default: Story = {};

export const Submit: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(submitJestFn).toHaveBeenCalledTimes(0);

    const item = (await canvas.findByText('25%'))?.nextElementSibling
      ?.firstElementChild;

    if (item) {
      userEvent.click(item);
    }

    expect(submitJestFn).toHaveBeenCalledTimes(1);
  },
};
