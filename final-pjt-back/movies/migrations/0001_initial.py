# Generated by Django 3.2.12 on 2022-05-22 20:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Actor',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('profile_path', models.CharField(blank=True, max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='CastedActors',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('character', models.CharField(blank=True, max_length=100)),
                ('actor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='movies.actor')),
            ],
        ),
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100)),
                ('release_date', models.DateField()),
                ('popularity', models.FloatField()),
                ('vote_count', models.IntegerField()),
                ('vote_average', models.FloatField()),
                ('overview', models.TextField()),
                ('homepage', models.TextField(blank=True)),
                ('runtime', models.CharField(max_length=20)),
                ('poster_path', models.CharField(blank=True, max_length=200)),
                ('video_key', models.CharField(blank=True, max_length=50)),
                ('image_key', models.TextField(blank=True)),
                ('actors', models.ManyToManyField(related_name='movies', through='movies.CastedActors', to='movies.Actor')),
                ('genres', models.ManyToManyField(related_name='movies', to='movies.Genre')),
            ],
        ),
        migrations.AddField(
            model_name='castedactors',
            name='movie',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='movies.movie'),
        ),
    ]
