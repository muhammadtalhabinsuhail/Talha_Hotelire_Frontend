"use client";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import axios from "axios";
import { authCheck } from "@/services/authCheck";
import { useRouter } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;


export function Header() {

  const router = useRouter();

  const [userName, setuserName] = useState();
  const [ProfilePic, setProfilePic] = useState<string>();
  const [roleId, setroleId] = useState();

  const getUser = async () => {

    const user = await authCheck();

    console.log("user from /auth/me is: ", user);

    if (user) {
      setuserName(user.user.firstname);
      setProfilePic(user.user.profilepic);
      setroleId(user.user.roleid);
      console.log("roleid", user.user.roleid)
    }
  }


  const handleLogout = async () => {
    try {


      const res = await axios.post(`${baseUrl}/auth/logout`,
         {},
          { withCredentials: true }
        );

        

      router.push("/")
    } catch (ex) {
      alert("Something went wrong! Unable to logout");
    }
  }

  useEffect(() => {
    getUser();
  }, [])







  return (
    <header className="w-full bg-[#59A5B2] h-12 flex items-center justify-between px-4 md:px-8 lg:px-[203px]">
      <div className="flex items-center gap-4">

        <div className="hidden lg:flex items-center gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#febc11] transition-colors duration-200"
            aria-label="Facebook"
            data-testid="link-facebook"
          >
            <FaFacebookF size={14} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#febc11] transition-colors duration-200"
            aria-label="Twitter"
            data-testid="link-twitter"
          >
            <FaTwitter size={14} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#febc11] transition-colors duration-200"
            aria-label="Instagram"
            data-testid="link-instagram"
          >
            <FaInstagram size={14} />
          </a>
        </div>
      </div>
      <a
        href="mailto:info@hotelire.ca"
        className="text-white text-xs flex items-center justify-between [font-family:'Poppins',Helvetica] font-normal hidden md:block hover:text-[#febc11] transition-colors duration-200"
      >
        info@hotelire.ca
      </a>




      {
        !userName ? (

          <button
            className="flex items-center gap-2 cursor-pointer bg-transparent border-none outline-none"
            aria-label="Login"
          >



            <Image
              src="/figmaAssets/login.png"
              alt="User avatar"
              width={32}
              height={32}
              className="w-6 h-6 rounded-full"
            />



            <Link
              href="./customer/signin"
              className="text-[#ffffff] [font-family:'Poppins',Helvetica] font-medium text-[#FFFFFF] text-[12px] leading-[30px] cursor-pointer w-full"
            >
              Login
            </Link>
          </button>
        ) : (
          // ------------------ USER DROPDOWN (only when logged in) ------------------
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center gap-2 cursor-pointer bg-transparent border-none outline-none"
                aria-label="User menu"
              >
                <Image
                  src={ProfilePic || "/figmaAssets/login.png"}
                  alt="User avatar"
                  width={32}
                  height={32}
                  className="w-6 h-6 rounded-full"
                />

                <span className="text-[#ffffff] text-[13px] [font-family:'Poppins',Helvetica] font-bold hidden sm:block">
                  {userName}
                </span>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-[131px] bg-[#f5f6fdf0] rounded-[0px_0px_4px_4px] p-4 shadow-md">
              <DropdownMenuItem asChild>
                {roleId === 1 ? (
                  <Link
                    href="/admin"
                    prefetch={false}
                    className="[font-family:'Poppins',Helvetica] font-medium text-[#59A5B2] text-[11px] leading-[30px] cursor-pointer w-full"
                  >
                    Admin Panel
                  </Link>
                ) : roleId === 2 ? (
                  <Link
                    href="/owner"
                    prefetch={false}
                    className="[font-family:'Poppins',Helvetica] font-medium text-[#59A5B2] text-[11px] leading-[30px] cursor-pointer w-full"
                  >
                    Owner Panel
                  </Link>
                ) : null}
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link
                  href="/profile"
                  prefetch={false}
                  className="[font-family:'Poppins',Helvetica] font-medium text-[#59A5B2] text-[11px] leading-[30px] cursor-pointer w-full"
                >
                  My Profile
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <button
                  onClick={handleLogout}
                  className="[font-family:'Poppins',Helvetica] font-medium text-[#59A5B2] text-[11px] leading-[30px] cursor-pointer w-full text-left"
                >
                  Logout
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }






    </header>
  );
}