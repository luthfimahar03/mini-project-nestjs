import { Module } from '@nestjs/common';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TasksModule],
  // controllers: [AppController, TasksController],
  // providers: [AppService, TasksService],
})
export class AppModule {}
