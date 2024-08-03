import { Module } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { ChatroomResolver } from './chatroom.resolver';

@Module({
  providers: [ChatroomService, ChatroomResolver]
})
export class ChatroomModule {}
