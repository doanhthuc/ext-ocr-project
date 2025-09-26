import { SVGProps } from 'react';

type LogoSquareProps = SVGProps<SVGSVGElement> & {
  variant?: 'white' | 'black';
};

export function LogoSquare({ variant = 'black', ...props }: LogoSquareProps) {
  return (
    <svg
      width={36}
      height={36}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        width={36}
        height={36}
        rx={6}
        fill={variant === 'white' ? 'white' : 'black'}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28.6587 19.4876C28.6587 21.156 28.2886 22.7519 27.6965 24.2028C28.8808 22.4618 29.547 20.3581 29.547 18.1093C29.547 11.8708 24.3656 6.79297 17.9998 6.79297C11.6341 6.79297 6.45264 11.8708 6.45264 18.1093C6.45264 20.213 7.0448 22.1716 8.00706 23.84C7.48892 22.5343 7.19284 21.0835 7.19284 19.5601C7.19284 13.3216 12.0042 8.24378 17.9258 8.24378C23.8474 8.0987 28.6587 13.1766 28.6587 19.4876ZM18.518 14.6999L18.1478 13.9745L17.8518 14.6999L11.1159 28.7728L10.8939 29.2081H13.1885L13.2625 28.9904L18.0738 18.5446L22.8851 28.9904L22.9592 29.2081H25.4018L25.1798 28.7728L18.518 14.6999Z"
        fill={variant === 'black' ? 'white' : 'black'}
      />
    </svg>
  );
}
