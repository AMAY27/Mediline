# Generated by Django 4.2.4 on 2023-08-23 19:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mediline', '0004_remove_appuser_userid'),
    ]

    operations = [
        migrations.RenameField(
            model_name='files',
            old_name='user_id',
            new_name='uid',
        ),
    ]
