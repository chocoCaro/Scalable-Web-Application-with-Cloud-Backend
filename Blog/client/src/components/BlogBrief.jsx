import { Link } from 'react-router-dom';

export default function BlogBrief({ key, title, date, topics, content }) {
  return (
    <Link
      to={`/blog/${key}`}
      className='w-full p-[20px] rounded-[15px] shadow-[2px_2px_10px_rgba(0,0,0,0.1)]'
    >
      <div className='flex items-start justify-between mb-[8px]'>
        <div>
          <p className='text-2xl text-black'>{title}</p>
          <p className='text-sm text-[#555555]'>{date}</p>
        </div>
        <div className='flex flex-wrap gap-[10px] h-full'>
          {topics.map((topic, index) => (
            <span
              key={index}
              className='flex items-center justify-center h-[30px] px-[10px] bg-[#0195f7] rounded-[10px] text-white'
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
      <p className='text-black'>{content}</p>
    </Link>
  );
};
