import { IconBaseProps } from '@renderer/components/Icon/Icon'

export function SheetCheckIcon({ color = 'white', size = 20 }: IconBaseProps): JSX.Element {
  return (
    <svg
      width={size}
      height={size + 4}
      viewBox="0 0 28 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.384 28.3529H5.2C4.35131 28.3529 3.53737 28.0059 2.93726 27.3881C2.33714 26.7703 2 25.9325 2 25.0588V5.29412C2 4.42046 2.33714 3.58259 2.93726 2.96482C3.53737 2.34706 4.35131 2 5.2 2H18C18.8487 2 19.6626 2.34706 20.2627 2.96482C20.8629 3.58259 21.2 4.42046 21.2 5.29412V18.4706M16.4 26.7059L19.6 30L26 23.4118M8.4 8.58824H14.8M8.4 15.1765H11.6"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
