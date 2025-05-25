import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    // app.module.ts
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/tasks-app',
    ),

    TasksModule,
  ],
})
export class AppModule {}
