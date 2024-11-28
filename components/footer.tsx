import Image from "next/image";
import Link from "next/link";
import { LocationIcon } from "./shared/location-icon";
import { PhoneIcon } from "./shared/phone-icon";

export const Footer = () => {
  return (
    <footer className="mt-auto container">
      <div className="flex max-sm:flex-wrap justify-between items-center gap-x-3 gap-y-8 py-6 pb-4 border-t-2 border-brown">
        <div className="flex flex-col gap-6 w-full">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Логотип Читай Сам"
              width={154}
              height={33}
            />
          </Link>
          <span className="text-brown/50 text-xs">
            © Все права защищены. 2019-2024
          </span>
        </div>
        <div className="flex flex-col gap-3 sm:gap-6 w-full">
          <p className="flex items-center gap-3 text-brown max-sm:text-sm">
            <LocationIcon />
            Москва, ул. Пушкина, дом 10
          </p>
          <Link
            href="tel:+1234567890"
            className="flex items-center gap-3 text-brown max-sm:text-sm opacity-transition"
          >
            <PhoneIcon />
            (123) 456-7890
          </Link>
        </div>
      </div>
    </footer>
  );
};
