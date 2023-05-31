import { PropsWithChildren } from "react"

export const InputFrame = ({ label, children }: PropsWithChildren<{ label: string }>) => {
    return <div className="flex flex-row justify-around flex-wrap">
        <div className="flex-col flex space-y-2">
            <label>{label}</label>
            <div className="child:text-gray-800 child:tracking-wide child:indent-2 child:rounded-sm child:w-56 child:h-6">
                {children}
            </div>
        </div>
    </div>
}