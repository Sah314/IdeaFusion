import { SignUp } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <div className="flex w-[100%] h-[100%] justify-center ">
        <div className=" mt-16">
        <SignUp />
        </div>

    </div>
  )

}