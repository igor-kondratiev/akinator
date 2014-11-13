import csv
import os

from django.conf import settings
from django.core.management.base import BaseCommand
from core.models import Entity, Question, AnswersDistribution


BOOKS_FILE = os.path.join(settings.PROJECT_ROOT, 'core', 'fixtures', 'Books.csv')
QUESTIONS_FILE = os.path.join(settings.PROJECT_ROOT, 'core', 'fixtures', 'Questions.csv')
DISTRIBUTION_FILE = os.path.join(settings.PROJECT_ROOT, 'core', 'fixtures', 'Distribution.csv')


class Command(BaseCommand):

    def handle(self, *args, **options):
        print 'Reset db started.'

        Entity.objects.all().delete()
        print 'db clear done.'

        print 'Loading books...'
        with open(BOOKS_FILE, 'rb') as f:
            b_reader = csv.DictReader(f, delimiter=';')
            for book in b_reader:
                pk = book['id_b']
                name = book['name'].decode('cp1251')
                description = ''

                db_book = Entity(pk=pk, name=name, description=description)
                db_book.save()

        print 'Done.'

        print 'Loading questions...'
        with open(QUESTIONS_FILE, 'rb') as f:
            q_reader = csv.DictReader(f, delimiter=';')
            for question in q_reader:
                pk = question['id_q']
                text = question['question'].decode('cp1251')

                db_question = Question(pk=pk, text=text)
                db_question.save()

        print 'Done.'

        print 'Loading distributions...'
        with open(DISTRIBUTION_FILE, 'rb') as f:
            d_reader = csv.DictReader(f, delimiter=';')
            for distribution in d_reader:
                book_id = int(distribution['id_b'])
                question_id = int(distribution['id_q'])

                yes_count = int(float(distribution['yes'].replace(',', '.')) * 100)
                no_count = int(float(distribution['no'].replace(',', '.')) * 100)
                dm_count = int(float(distribution['does not matter'].replace(',', '.')) * 100)

                book = Entity.objects.get(pk=book_id)
                question = Question.objects.get(pk=question_id)

                db_distribution = AnswersDistribution(entity=book, question=question, yes_count=yes_count, no_count=no_count, dm_count=dm_count)
                db_distribution.save()

        print 'Done.'
