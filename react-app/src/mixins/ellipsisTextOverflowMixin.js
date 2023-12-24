import { css } from 'styled-components';

export const createEllipsisTextOverflowMixin = maxWidth => css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: ${ maxWidth };
`;