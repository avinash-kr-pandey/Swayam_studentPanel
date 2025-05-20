import Image from "next/image";
import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { FaExternalLinkAlt } from "react-icons/fa";

export default function Header() {
  // const path = usePathname();
  return (
    <div className="fixed shadow-lg top-0 z-10 text-sm font-bold w-full justify-between items-center bg-white py-3.5 text-gray-600 px-24 hidden xl:flex">
      <div className="flex items-center gap-x-5">
        <Link href={"/"}>
          <Image
            src="https://storage.googleapis.com/online-degree-node1-prod-cdn/assets/img/swayam_images/swayam_logo.png"
            width={120}
            height={120}
            alt="logo"
          />
        </Link>
        <div className="border-2 h-[10vh]"></div>

        <Link href={"/"}>
          <Image
            src="https://ptuexams.in/images/logo.png"
            width={300}
            height={300}
            alt="logo"
          />
        </Link>
      </div>

      <ul className="flex-row flex gap-x-5">
        {/* <Link
          href={"/"}
          className={`hover:text-primary-500 min-w-20 p-2 text-center ${
            path === "/" && "active"
          }`}
        >
          <li className="capitalize">Home</li>
        </Link> */}

        <div>
          <input
            type="text"
            placeholder="Search Courses..."
            className="border-2 border-gray-300 rounded-lg p-2 w-64"
          />
        </div>
        {/* <Link
          href={"/about-us"}
          className={`hover:text-primary-500 min-w-20 p-2 text-center ${
            path === "/about-us" && "active"
          }`}
        >
          <li className="capitalize">About Us</li>
        </Link>

        <Link
          href={"/contact"}
          className={`hover:text-primary-500 min-w-20 p-2 text-center ${
            path === "/contact" && "active"
          }`}
        >
          <li className="capitalize">contact</li>
        </Link> */}
      </ul>
    </div>
  );
}
