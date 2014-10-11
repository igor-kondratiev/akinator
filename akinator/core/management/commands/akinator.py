from django.core.management.base import BaseCommand
from core.models import DBDataSource
from logic.Akinator import Akinator


class Command(BaseCommand):

    def handle(self, *args, **options):
        print 'Game initialization...'
        akinator = Akinator(DBDataSource())
        print 'done.'

        finished = False
        while not finished:
            print akinator.current_question.text
            answer = raw_input()

            answer, question = akinator.process_answer(answer)
            akinator.print_status()

            if answer:
                print u'I think it is {0}'.format(answer.name)
                finished = True
