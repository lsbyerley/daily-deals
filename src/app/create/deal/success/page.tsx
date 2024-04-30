import Link from "next/link";

export default async function CreateDealSuccess() {
  return (
    <div className='w-full flex flex-col items-center'>
      <div className='animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3 py-8 lg:py-16 text-foreground w-full'>
        <h2 className='text-lg font-bold text-center'>Create Deal</h2>
        <div className='w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent' />
        <div className='flex flex-col gap-8 text-foreground w-full'>
          <p className="text-center">Deal Created Successfully!</p>
          <p className='text-center'><Link href={'/create/deal'} className='text-blue-400'>Create another</Link></p>
        </div>
      </div>
    </div>
  );
}