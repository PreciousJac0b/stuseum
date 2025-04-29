import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import flash = require('connect-flash');
import * as session from 'express-session';
import * as hbs from 'hbs';
import * as hbsUtils from 'hbs-utils';
import { HttpErrorFilter } from './filters/http-exception.filter';
// import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'public/views'));
  hbs.registerPartials(join(__dirname, '..', 'public/views/layouts'));
  hbsUtils(hbs).registerWatchedPartials(
    join(__dirname, '..', 'public/views/layouts'),
  );
  app.setViewEngine('hbs');

  const config = new DocumentBuilder()
    .setTitle('NestJS Swagger')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(
    session({
      secret: 'just secret', // Env variable soon
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.useGlobalFilters(new HttpErrorFilter);

  app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
  });

  const port = process.env.PORT;
  const hostname = '0.0.0.0';
  await app.listen(port, hostname);
}
bootstrap();
