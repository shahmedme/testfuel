import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from 'account/dto';
import { User, UserDocument } from 'account/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findById(id: number) {
    // return await User.findOne(id);

    return 'found by id';
  }

  async findByEmail(email: string) {
    // return await User.findOne({
    //   where: {
    //     email,
    //   },
    // });

    return 'find my email';
  }
}
