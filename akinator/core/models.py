# coding=utf-8
from django.db import models
from logic.AkinatorDataSource import AkinatorDataSource, ANSWERS
from logic.AkinatorDataSource import Entity as AkinatorEntity
from logic.AkinatorDataSource import Question as AkinatorQuestion


class Entity(models.Model):
    name = models.CharField(max_length=100, verbose_name=u'Название')
    description = models.TextField(verbose_name=u'Описание')

    def __unicode__(self):
        return unicode(self.name)

    class Meta:
        verbose_name = u'сущность'
        verbose_name_plural = u'сущности'


class Question(models.Model):
    text = models.TextField(verbose_name=u'Текст вопроса')

    def __unicode__(self):
        return unicode(self.text)

    class Meta:
        verbose_name = u'вопрос'
        verbose_name_plural = u'вопросы'


class AnswersDistribution(models.Model):
    entity = models.ForeignKey(Entity, verbose_name=u'Сущность')
    question = models.ForeignKey(Question, verbose_name=u'Вопрос')

    yes_count = models.PositiveIntegerField(verbose_name=u'Ответов \'Да\'')
    no_count = models.PositiveIntegerField(verbose_name=u'Ответов \'Нет\'')
    dm_count = models.PositiveIntegerField(verbose_name=u'Ответов \'Не имеет значение\'')

    def __unicode__(self):
        return u'{0} - {1}'.format(self.entity, self.question)

    class Meta:
        verbose_name = u'ответы'
        verbose_name_plural = u'ответы'

        unique_together = ('entity', 'question')


class GameResult(models.Model):
    entity = models.ForeignKey(Entity)
    success = models.BooleanField()
    game_length = models.PositiveIntegerField()


class DBDataSource(AkinatorDataSource):
    """
    Adapter for database objects to use them with akinator
    """
    def __init__(self):
        super(DBDataSource, self).__init__()

        self.__entities = {}
        for e in Entity.objects.all():
            self.__entities[e.pk] = AkinatorEntity(e.pk, e.name, e.description)

        self.__questions = {}
        for q in Question.objects.all():
            self.__questions[q.pk] = AkinatorQuestion(q.pk, q.text)

        self.__answers = {}
        for d in AnswersDistribution.objects.all():
            key_tuple = (d.entity.pk, d.question.pk)
            answers = {
                ANSWERS.YES: d.yes_count,
                ANSWERS.NO: d.no_count,
                ANSWERS.DOES_NOT_MATTER: d.dm_count,
            }

            total_answers = sum(x for x in answers.itervalues())
            for k in answers:
                answers[k] = answers[k] * 100.0 / total_answers

            self.__answers[key_tuple] = answers

    def get_entities_list(self):
        return self.__entities.values()

    def get_entity(self, key):
        return self.__entities[key]

    def get_questions_list(self):
        return self.__questions.values()

    def get_question(self, key):
        return self.__questions[key]

    def get_answers_count(self, entity_key, question_key):
        default_distribution = {
            ANSWERS.YES: 0.05,
            ANSWERS.NO: 0.05,
            ANSWERS.DOES_NOT_MATTER: 0.90,
        }
        return self.__answers.get((entity_key, question_key), default_distribution)

    def create_entity(self, name, description):
        e = Entity(name=name, description=description)
        e.save()

        akinator_entity = AkinatorEntity(e.pk, e.name, e.description)
        self.__entities[e.pk] = akinator_entity
        return akinator_entity

    def save_history(self, history, entity, success):
        e = Entity.objects.get(pk=entity.key)
        game_length = len(history)

        result = GameResult(entity=e, game_length=game_length, success=success)
        result.save()

        for question, answer in history.iteritems():
            e = Entity.objects.get(pk=entity.key)
            q = Question.objects.get(pk=question.key)

            if (entity.key, question.key) not in self.__answers:
                distribution = AnswersDistribution(entity=e, question=q, yes_count=5, no_count=5, dm_count=5)

                if answer == ANSWERS.YES:
                    distribution.yes_count = 90
                elif answer == ANSWERS.NO:
                    distribution.no_count = 90
                else:
                    distribution.dm_count = 90

                distribution.save()

            else:
                distribution = AnswersDistribution.objects.get(entity=e, question=q)

                if answer == ANSWERS.YES:
                    distribution.yes_count += 1
                elif answer == ANSWERS.NO:
                    distribution.no_count += 1
                else:
                    distribution.dm_count += 1

                distribution.save()
