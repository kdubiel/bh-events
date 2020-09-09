import { Link as RouterLink, LinkProps } from 'react-router-dom';
import styled from 'styled-components';
import { LanguageSelect } from 'components';

const HeaderLink = styled(RouterLink)<LinkProps>`
  color: inherit;
  text-decoration: none;
  align-self: center;
`;

const StyledLanguageSelect = styled(LanguageSelect)``;

export default {
  HeaderLink,
  LanguageSelect: StyledLanguageSelect,
};
