# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_remove_question_caption'),
    ]

    operations = [
        migrations.CreateModel(
            name='GameResult',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('success', models.BooleanField()),
                ('game_length', models.PositiveIntegerField()),
                ('entity', models.ForeignKey(to='core.Entity')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
