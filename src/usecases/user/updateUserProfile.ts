import { UserRepoImpl } from '../../infrastructure/repositories/userRepoImpl';
import { User } from '../../domain/entities/user';

export const updateUserProfile = async (
  userId: string,
  updates: Partial<User> 
 ): Promise<User | null> => {
  const userRepo = new UserRepoImpl();
  return await userRepo.updateByUser(userId, updates);
};