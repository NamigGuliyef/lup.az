import { User } from '../user/model/user.schema';

export class tokenRequestType extends Request {
  user: User;
}
