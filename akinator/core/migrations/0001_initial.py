# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AnswersDistribution',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('yes_count', models.PositiveIntegerField(verbose_name="\u041e\u0442\u0432\u0435\u0442\u043e\u0432 '\u0414\u0430'")),
                ('no_count', models.PositiveIntegerField(verbose_name="\u041e\u0442\u0432\u0435\u0442\u043e\u0432 '\u041d\u0435\u0442'")),
            ],
            options={
                'verbose_name': '\u043e\u0442\u0432\u0435\u0442\u044b',
                'verbose_name_plural': '\u043e\u0442\u0432\u0435\u0442\u044b',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Entity',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=100, verbose_name='\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435')),
                ('description', models.TextField(verbose_name='\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435')),
            ],
            options={
                'verbose_name': '\u0441\u0443\u0449\u043d\u043e\u0441\u0442\u044c',
                'verbose_name_plural': '\u0441\u0443\u0449\u043d\u043e\u0441\u0442\u0438',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('caption', models.TextField(max_length=100, verbose_name='\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435')),
                ('text', models.TextField(verbose_name='\u0422\u0435\u043a\u0441\u0442 \u0432\u043e\u043f\u0440\u043e\u0441\u0430')),
            ],
            options={
                'verbose_name': '\u0432\u043e\u043f\u0440\u043e\u0441',
                'verbose_name_plural': '\u0432\u043e\u043f\u0440\u043e\u0441\u044b',
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='answersdistribution',
            name='entity',
            field=models.ForeignKey(verbose_name='\u0421\u0443\u0449\u043d\u043e\u0441\u0442\u044c', to='core.Entity'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='answersdistribution',
            name='question',
            field=models.ForeignKey(verbose_name='\u0412\u043e\u043f\u0440\u043e\u0441', to='core.Question'),
            preserve_default=True,
        ),
    ]
