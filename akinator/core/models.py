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
    caption = models.TextField(max_length=100, verbose_name=u'Название')
    text = models.TextField(verbose_name=u'Текст вопроса')

    def __unicode__(self):
        return unicode(self.caption)

    class Meta:
        verbose_name = u'вопрос'
        verbose_name_plural = u'вопросы'


class AnswersDistribution(models.Model):
    entity = models.ForeignKey(Entity, verbose_name=u'Сущность')
    question = models.ForeignKey(Question, verbose_name=u'Вопрос')

    yes_count = models.PositiveIntegerField(verbose_name=u'Ответов \'Да\'')
    no_count = models.PositiveIntegerField(verbose_name=u'Ответов \'Нет\'')

    def __unicode__(self):
        return u'{0} - {1}'.format(self.entity, self.question)

    class Meta:
        verbose_name = u'ответы'
        verbose_name_plural = u'ответы'

        unique_together = ('entity', 'question')


class DBDataSource(object, AkinatorDataSource):
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
            self.__questions[q.pk] = AkinatorQuestion(e.pk, e.caption, e.text)

        self.__answers = {}
        for d in AnswersDistribution.objects.all():
            key_tuple = (d.entity.pk, d.question.pk)
            self.__answers[key_tuple] = {
                ANSWERS.YES: d.yes_count,
                ANSWERS.NO: d.no_count,
            }

    def get_entities_list(self):
        return self.__entities.values()

    def get_entity(self, key):
        return self.__entities[key]

    def get_questions_list(self):
        return self.__questions.values()

    def get_question(self, key):
        return self.__questions[key]

    def get_answers_count(self, entity_key, question_key):
        return self.__answers[(entity_key, question_key)]
