import { css } from 'styled-components'

export const createChildMarginMixin = (direction, margin) => css`
    > :not(:first-child) {
        margin-${ direction }: ${ margin };
    }
`;
