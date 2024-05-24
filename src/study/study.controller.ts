import { Body, Controller, Get, Post, Render, Req, Res } from '@nestjs/common';
import { FlashCard } from 'src/models/flashcards.entity';
import { StudyService } from './study.service';

@Controller('users/study')
export class StudyController {
  constructor(private readonly studyService: StudyService) {}

  @Get('')
  @Render('users/study/study')
  async studyTech() {
    const viewData = [
      {
        title: 'Flashcards',
        icon: 'flashcard.png',
        link: 'flashcards',
      },
      {
        title: 'Flashcards',
        icon: 'flashcard.png',
        link: 'flashcard',
      },
      {
        title: 'Flashcards',
        icon: '',
        link: 'flashcards',
      },
    ];

    return {
      viewData,
    };
  }

  @Get('flashcards')
  @Render('users/study/flashcard-home')
  async flashCardHome() {
    const viewData = {};
    viewData['title'] = "Welcome to Flashcards";

    return {
      viewData
    }
  }

  @Post('flashcards')
  async createFlashCard(@Body() body, @Res() res, @Req() req) {
    if (!body) {
      return;
    }
    const newCard = new FlashCard();
    newCard.question = body.question;
    newCard.answer = body.answer;
    console.log("first:", newCard.getNumberOfFlashcards())
    newCard.increaseFlashcards();
    console.log("Second", newCard.getNumberOfFlashcards())
    await this.studyService.createFlashCard(newCard);
    res.redirect(req.get('referer'));
  }
}

