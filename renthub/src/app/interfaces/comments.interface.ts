export interface Comment {
  id: string;
  apartmentId: string;
  userId: string;
  content: string;
  timestamp: Date;
  avatarInitials?: string;
  author?: string;
}
