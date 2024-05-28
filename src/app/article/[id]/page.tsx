import axios from 'axios';

import markdownToHtml from "@/lib/markdownToHtml";
import { PostBody } from '@/app/_components/post-body';
import Container from '@/app/_components/container';
import { PostHeader } from '@/app/_components/post-header';
import Header from '@/app/_components/header';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import DateFormatter from '@/app/_components/date-formatter';
import CoverImage from '@/app/_components/cover-image';
import Avatar from '@/app/_components/avatar';
import Article from '@/app/_components/article_card';

interface Post {
  title: string;
  postcontent: string;
  created_by: string;
  image:string;
  id:string;
  date:string
}



export async function getRecentPost(): Promise<Post[]> {
  // Fetch data from external API


  // const url=`http://192.168.195.87:8085/post/${postId}`
  const url=`http://192.168.195.87:8085/posts`
  const res = await fetch(url);
  const time="2020-03-16T05:35:07.322Z"
  const data = await res.json();

  return data.aaData.slice(0, 4).map((post:any) => ({
    title: post.title,
    id: post.id,
    postcontent: post.postcontent,
    created_by: post.created_by,
    image:post.image,
  date:time
  }));


}


export async function getPost(postId:string): Promise<Post> {
  // Fetch data from external API


  // const url=`http://192.168.195.87:8085/post/${postId}`
  const url=`http://192.168.195.87:8085/post/${postId}`
  const res = await fetch(url);
  const post = await res.json();
  const time="2020-03-16T05:35:07.322Z"
  const content = await markdownToHtml( post.postcontent || "");

  // Pass data to the page via props
  return {

      title: post.title,
      postcontent:content,
      created_by: post.created_by,
      image:"https://images.unsplash.com/photo-1496395031280-4201b0e022ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      id:"22",
      date:time
   
  };
}


export default async function  PostPage({ params }: Params) {
  


const time="2020-03-16T05:35:07.322Z"
const post=await getPost(params.id);
const recentPosts=await getRecentPost()
let author1={
  "name": post.created_by,
  "picture" :"https://avatar.iran.liara.run/public/3"
}


  return (
    <>

<main>

  <article>

    <header className="mx-auto mt-20 max-w-screen-lg rounded-t-lg bg-white text-center shadow-lg">
  <div className='mb-16 rounded-t-lg ' style={{backgroundColor:"rgb(126, 34, 206)",height:"10px"}}></div>

      <p className="text-gray-500">Published <DateFormatter dateString={time} /></p>
      <h1 className="mt-2 text-4xl font-bold text-gray-900 sm:text-5xl">{post.title}</h1>
      <p className="mt-2 text-lg text-gray-700 ">
   by {author1.name}
    
    

      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <button className="rounded-lg bg-gray-100 px-2 py-1 font-medium text-gray-600 hover:bg-gray-200">Cybersecurity</button>
        <button className="rounded-lg bg-gray-100 px-2 py-1 font-medium text-gray-600 hover:bg-gray-200">CVE</button>
        <button className="rounded-lg bg-gray-100 px-2 py-1 font-medium text-gray-600 hover:bg-gray-200">Penetration test Test</button>
        <button className="rounded-lg bg-gray-100 px-2 py-1 font-medium text-gray-600 hover:bg-gray-200">Vulnariablity</button>
      </div>
      <img className="-z-10 absolute top-0 left-0 mt-10 h-96 w-full object-cover" src="https://images.unsplash.com/photo-1638184984605-af1f05249a56?q=80&w=3840&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
   </img> </header>

    <div className="mx-auto max-w-screen-lg space-y-12 rounded-b-lg bg-white px-8 pt-10 pb-20 font-serif text-lg tracking-wide text-gray-700 sm:shadow-lg">

    <PostBody content={post.postcontent} />
 </div>
  </article>
</main>




      <section className="bg-gray-10 py-6 sm:py-8 lg:py-12 md:mt-8 md:mb-8 ">
  <div className="mx-auto max-w-screen-xl px-4 md:px-8"> 
    
    <div className="mb-10 md:mb-16">
      <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Most Recent Posts</h2>

      <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">Read the latest cybersecurity news and updates from Sentinel360.</p>
    </div>

    <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-2 xl:grid-cols-2 xl:gap-16">

    

    {recentPosts.map((post) => (
  
      
  <Article image={post.image} 
  title={post.title} content={post.postcontent.slice(0,150)} date={post.date} id={post.id}></Article>
  

        ))}



    </div>
  </div>
</section>

    </>
  );



};

