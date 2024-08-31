import { getPostList } from "@/data/postData";
import PostContainer from "./PostContainer";

export default async function CallPostsContainer() {
  const posts = await getPostList();
  if (!posts) {
    return <h1>An Error Occurred please Reload the Page</h1>;
  }
  return (
    <>
      <PostContainer serverPosts={posts} />
    </>
  );
}
