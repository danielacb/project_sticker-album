import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { InputHTMLAttributes } from "react";

type TextFieldProps = {
  name: string;
  label: string;
  initialValue?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function TextField({
  name,
  label,
  initialValue,
  ...props
}: TextFieldProps) {
  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <Input {...props} id={name} name={name} />
    </>
  );
}

const Input = styled.input`
  ${({ theme }) => css`
    width: 100%;
    padding: 16px 18px;
    color: ${theme.colors.primary};
    background-color: ${theme.colors.white};
    border: none;
    border-radius: 6px;
    margin-bottom: 24px;
  `}
`;

const Label = styled.label`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    display: inline-block;
    margin-bottom: 6px;
  `}
`;
