import { useState } from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { IconTwentyStarFilled } from '@/ui/display/icon/components/IconTwentyStarFilled';

import { RATING_LEVELS_NB } from '../../../hooks/useRatingField';

const StyledContainer = styled.div`
  align-items: center;
  display: flex;
`;

const StyledRatingIconContainer = styled.div<{ isActive?: boolean }>`
  color: ${({ isActive, theme }) =>
    isActive ? theme.font.color.secondary : theme.background.quaternary};
  display: inline-flex;
`;

type RatingInputProps = {
  onChange: (newValue: number) => void;
  rating: number;
  readonly?: boolean;
};

export const RatingInput = ({
  onChange,
  rating,
  readonly,
}: RatingInputProps) => {
  const theme = useTheme();
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const currentRating = hoveredRating ?? rating;

  return (
    <StyledContainer>
      {Array.from({ length: RATING_LEVELS_NB }, (_, index) => {
        const rating = index + 1;

        return (
          <StyledRatingIconContainer
            key={index}
            isActive={rating <= currentRating}
            onClick={readonly ? undefined : () => onChange(rating)}
            onMouseEnter={readonly ? undefined : () => setHoveredRating(rating)}
            onMouseLeave={readonly ? undefined : () => setHoveredRating(null)}
          >
            <IconTwentyStarFilled size={theme.icon.size.md} />
          </StyledRatingIconContainer>
        );
      })}
    </StyledContainer>
  );
};
