import { PostType } from "@/data/postData";

export default function Post({ post }: { post: PostType }) {
  return <li>{post.message}</li>;
}
