# Generated by Django 4.2.4 on 2023-09-07 15:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dataapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AttributesOfDataset',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('attributeList', models.JSONField()),
            ],
        ),
        migrations.DeleteModel(
            name='UploadedFile',
        ),
    ]