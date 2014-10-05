# coding=utf-8
from django.db import models


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