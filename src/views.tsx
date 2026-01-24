import {Button, FormControl, TextField} from '@mui/material';
import styled from 'styled-components';

interface ThemeProps {
  darkMode: boolean;
}

function getTextColor(props: ThemeProps): string {
  return props.darkMode ? 'white' : 'text-slate-900';
}

function getHintColor(props: ThemeProps): string {
  return props.darkMode ? 'var(--color-slate-600)' : 'var(--color-slate-400)';
}

function getAccentColor(props: ThemeProps): string {
  return props.darkMode ? 'var(--color-orange-500)' : 'var(--color-orange-700)';
}

const StyledTextField =
  styled(TextField)<ThemeProps>`
    & .MuiInputBase-input {
      color: ${getTextColor};
    }

    & .MuiSvgIcon-root {
      color: ${getTextColor};
    }

    & label {
      color: ${getHintColor};
    }

    & label.Mui-focused {
      color: ${getAccentColor};
    }

    & .MuiOutlinedInput-root {
      & fieldset {
        border-color: ${getHintColor};
      }

      &:hover fieldset {
        border-color: ${getTextColor};
      }

      &.Mui-focused fieldset {
        border-color: ${getAccentColor};
      }
    }
  `;

const StyledFormControl =
  styled(FormControl)<ThemeProps>`
    & .MuiInputBase-input {
      color: ${getTextColor};
    }

    & .MuiSvgIcon-root {
      color: ${getTextColor};
    }

    & label {
      color: ${getHintColor};
    }

    & .MuiInputLabel-root.Mui-focused {
      color: ${getAccentColor};
    }

    & .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
      border-color: ${getHintColor};
    }

    & .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
      border-color: ${getTextColor};
    }

    & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: ${getAccentColor};
    }
  `;

const StyledButton =
  styled(Button)<ThemeProps>`
    && {
      background-color: ${getAccentColor};
      color: white;
      border-radius: 12px;
      text-transform: none;
      font-weight: 600;

      &:hover {
        background-color: ${props => props.darkMode
          ? 'var(--color-orange-400)'
          : 'var(--color-orange-800)'};
      }

      &:disabled {
        background-color: ${getHintColor};
        color: ${getTextColor};
        opacity: 0.5;
      }
    }
  `;

export {StyledButton, StyledFormControl, StyledTextField};
