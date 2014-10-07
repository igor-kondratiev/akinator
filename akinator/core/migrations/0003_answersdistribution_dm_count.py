# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_auto_20141005_1037'),
    ]

    operations = [
        migrations.AddField(
            model_name='answersdistribution',
            name='dm_count',
            field=models.PositiveIntegerField(default=0, verbose_name="\u041e\u0442\u0432\u0435\u0442\u043e\u0432 '\u041d\u0435 \u0438\u043c\u0435\u0435\u0442 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435'"),
            preserve_default=False,
        ),
    ]
