import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
.setTitle('Home Library Service')
.setDescription('Home music library service')
.setVersion('1.0.0')
.build();

