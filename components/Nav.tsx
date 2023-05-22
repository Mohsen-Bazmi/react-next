import URL from "next"
import Link from "next/link";
import { PropsWithChildren } from "react";
import { UrlObject } from "url";

type MenuItemProps = PropsWithChildren<{ href: string | UrlObject, className?: string }>;

const MenuItem = ({ children, href, className = "" }: MenuItemProps) => {

    let classes = className + "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium";

    return <Link href={href} className={classes}>{children}</Link>
}


const AuthMenu = () => <>
    <MenuItem href="/api/signin" >Sign in</MenuItem>
    <MenuItem href="/api/signout" >Sign out</MenuItem>
</>



const Nav = () => {

    return <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
            <div className="relative flex h-16 items-center justify-between">
                <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                        <MenuItem href="/" className="bg-gray-900 text-white" aria-current="page">Dashboard</MenuItem>
                        <AuthMenu />
                    </div>
                </div>
            </div>
        </div>
    </nav>
}

export default Nav;