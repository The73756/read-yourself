import { IconProps } from "@/types/icon";

export const PhoneIcon = ({ className }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.2037 15.25L16.6637 14.96C16.0537 14.89 15.4537 15.1 15.0237 15.53L13.1837 17.37C10.3537 15.93 8.03367 13.62 6.59367 10.78L8.44367 8.93C8.87367 8.5 9.08367 7.9 9.01367 7.29L8.72367 4.77C8.60367 3.76 7.75367 3 6.73367 3H5.00367C3.87367 3 2.93367 3.94 3.00367 5.07C3.53367 13.61 10.3637 20.43 18.8937 20.96C20.0237 21.03 20.9637 20.09 20.9637 18.96V17.23C20.9737 16.22 20.2137 15.37 19.2037 15.25Z"
        fill="currentColor"
      />
    </svg>
  );
};
