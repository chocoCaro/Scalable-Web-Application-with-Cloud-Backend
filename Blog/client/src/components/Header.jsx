export default function Header() {
  return (
    <header className='fixed w-full h-[90px] flex items-center top-0 px-[40px] bg-white'>
      <a href='/' className='fixed'>
        <img
          src='/logo.jpg'
          alt='Blog Logo'
          width={50}
          height={50}
        />
      </a>
      <p className='mx-auto text-3xl text-black font-bold'>Personal Blog Project</p>
    </header>
  );
};
