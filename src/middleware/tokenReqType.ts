import { User } from 'src/user/model/user.schema';

export class tokenRequestType extends Request {
  user: User;
}
