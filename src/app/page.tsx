import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";

import markdownToHtml from "@/lib/markdownToHtml";



interface Post {
  title: string;
  postcontent: string;
  created_by: string;
  image:string;
  id:string;
  date:string
}


 async function getPost(): Promise<Post[]> {
  // Fetch data from external API


  // const url=`http://192.168.195.87:8085/post/${postId}`
  const url=`http://64.227.132.173:8085/posts`
  const res = await fetch(url);
  const time="2020-03-16T05:35:07.322Z"
  const data = await res.json();

  return data.aaData.map((post:any) => ({
    title: post.title,
    id: post.id,
    postcontent: post.postcontent,
    created_by: post.created_by,
    image:post.image,
  date:time
  }));
}


export default async function Index() {


  const allPosts =  await getPost();

  const heroPost = allPosts[0];

  const morePosts = allPosts.slice(1);

  return (
    <main className="mt-4">
      <Container>
        <Intro />
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.image}
          date={heroPost.date}
          author={heroPost.created_by}
          slug={heroPost.id}
          excerpt={heroPost.postcontent.slice(0, 350)}
        />
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </main>
  );
}
