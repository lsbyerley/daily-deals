
export default async function CreateBusinessSuccess() {
  return (
    <div className='w-full flex flex-col items-center'>
      <div className='animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3 py-16 lg:py-24 text-foreground w-full'>
        <div className='w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent' />

        <div className='flex flex-col gap-8 text-foreground w-full'>
          <h2 className='text-lg font-bold text-center'>Create Business</h2>
          <p className="text-center">Business Created Successfully!</p>
        </div>
      </div>
    </div>
  );
}