export interface Post {
  id: string;
  user_id: string;
  created_at: string;
  content: string;
  image_id: string | null;
  user_email: string;
}

export interface PostCardProps {
  post: Post;
  onDelete?: (postId: string) => void;
}
