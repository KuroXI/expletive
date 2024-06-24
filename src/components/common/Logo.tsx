import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  href: string;
  src: string;
  alt: string;
};

export const Logo = ({ href, src, alt }: LogoProps) => {
  return (
    <Link href={href}>
      <Image src={src} alt={alt} height={50} width={100} />
    </Link>
  );
};
