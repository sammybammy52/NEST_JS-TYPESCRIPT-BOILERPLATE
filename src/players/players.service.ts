import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class PlayersService {
  private players: Array<CreatePlayerDto> = [
    {
      name : 'henry',
      age: 24,
      strongFoot: 'R',
      rating: 85
    },
    {
      name : 'rodrygo',
      age: 24,
      strongFoot: 'R',
      rating: 91
    },
    {
      name : 'Vini Jr',
      age: 25,
      strongFoot: 'R',
      rating: 93
    },
  ];
  create(createPlayerDto: CreatePlayerDto) {
    const result:object = {
      status: 'success',
      data: createPlayerDto
    }
    return result;
  }

  findAll() {
    console.log(this.players);
    return this.players;
  }

  findOne(id: number) {
    return `This action returns a #${id} player`;
  }

  update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return `This action updates a #${id} player`;
  }

  remove(id: number) {
    return `This action removes a #${id} player`;
  }

  minRating(id: number) {
    const filtered: Array<CreatePlayerDto> = this.players.filter((i) => i.rating > id);

    return {
      status: 'success',
      players: filtered
    };
  }
}
