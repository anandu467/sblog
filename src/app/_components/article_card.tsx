import DateFormatter from "./date-formatter";

type Props = {
    image: string;
    title: string;
    content: string;
    date: string;
    id:string
  };
  
  const Article = ({ image, title ,content,date,id}: Props) => {
    return (
      
        <article className="flex flex-col items-center gap-4 md:flex-row lg:gap-6">
        <a href={`/article/${id}`} className="group relative block h-56 w-full shrink-0 self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-40 lg:w-40">
          <img className="h-full" src={image} />
        </a>

        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-400">   <DateFormatter dateString={date} /></span>

          <h2 className="text-xl font-bold text-gray-800">
            <a href={`/article/${id}`} className="transition duration-100 hover:text-rose-500 active:text-rose-600">{title}</a>
          </h2>

          <p className="text-gray-500">{content}</p>

          <div>
            <a href={`/article/${id}`}  className="font-semibold text-rose-500 transition duration-100 hover:text-rose-600 active:text-rose-700">Read more</a>
          </div>
        </div>
      </article>

    );
  };
  
  export default Article;
  