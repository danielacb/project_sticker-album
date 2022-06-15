import { css, Theme } from "@emotion/react";
import styled from "@emotion/styled";
import { ButtonHTMLAttributes } from "react";

type ButtonProps = {
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  variant = "primary",
  fullWidth,
  children,
  ...props
}: ButtonProps) {
  return (
    <Wrapper variant={variant} fullWidth={fullWidth} {...props}>
      {children}
    </Wrapper>
  );
}

const modifiers = {
  primary: (theme: Theme) => css`
    background-color: ${theme.colors.primary};
  `,
  secondary: (theme: Theme) => css`
    background-color: ${theme.colors.secondary};
  `,

  fullWidth: () => css`
    width: 100%;
  `,
};

const Wrapper = styled.button<ButtonProps>`
  ${({ theme, variant, fullWidth }) => css`
    width: ${fullWidth ? "100%" : "auto"};
    padding: 16px 24px;
    border: none;
    border-radius: 6px;
    display: block;
    cursor: pointer;

    ${modifiers[variant](theme)}
  `}
`;
